import 'server-only'
import Anthropic from '@anthropic-ai/sdk'
import type { Business, Service } from './types'
import { getTerms } from './terminology'

// Haiku handles only the free-text messages the button flow can't parse
// (~1 in 5 messages). Buttons and quick replies cost zero AI tokens.
const MODEL = 'claude-haiku-4-5'

let client: Anthropic | null = null
function getClient(): Anthropic {
  if (!client) client = new Anthropic()
  return client
}

export interface ParsedIntent {
  intent: 'book' | 'question' | 'human' | 'cancel' | 'greeting' | 'other'
  service_name: string | null
  time_preference: string | null
  intake_note: string | null
  answer: string | null
}

const INTENT_SCHEMA = {
  type: 'object',
  properties: {
    intent: {
      type: 'string',
      enum: ['book', 'question', 'human', 'cancel', 'greeting', 'other'],
      description: 'What the customer wants',
    },
    service_name: {
      type: ['string', 'null'],
      description: 'Which service they mentioned, matched to the service list, else null',
    },
    time_preference: {
      type: ['string', 'null'],
      description: "Time preference in their words, e.g. 'tomorrow afternoon', else null",
    },
    intake_note: {
      type: ['string', 'null'],
      description: "Any symptom, concern, or request details they described, e.g. 'masakit ang ngipin', else null",
    },
    answer: {
      type: ['string', 'null'],
      description:
        'For intent=question only: a short friendly answer (max 2 sentences, mirror their language) using ONLY the business info provided. If the info is not available, say so and suggest talking to staff. Otherwise null.',
    },
  },
  required: ['intent', 'service_name', 'time_preference', 'intake_note', 'answer'],
  additionalProperties: false,
} as const

export interface AiUsage {
  input_tokens: number
  output_tokens: number
  cache_read_input_tokens: number
}

export async function parseIntent(
  business: Business,
  services: Service[],
  userText: string
): Promise<{ parsed: ParsedIntent; usage: AiUsage } | null> {
  try {
    const serviceList = services
      .map((s) => `- ${s.name} (${s.duration_min} min, ₱${Number(s.price).toFixed(0)})`)
      .join('\n')

    // Per-business context is stable across messages → prompt-cached.
    // The volatile user message goes after the cache breakpoint.
    const response = await getClient().messages.create({
      model: MODEL,
      max_tokens: 300,
      system: [
        {
          type: 'text',
          text: `You classify Facebook Messenger messages sent to a ${getTerms(business.business_type).business}'s page. Customers write in English, Tagalog, or Taglish.

Business: ${business.name} (${getTerms(business.business_type).business})
Address: ${business.address || 'not provided'}
Phone: ${business.phone || 'not provided'}
Services:
${serviceList || '(none configured)'}

Classify the message and extract fields per the output schema. "book" = wants an appointment. "question" = asking about price/location/hours/services. "human" = wants to talk to a person or is upset. "cancel" = wants to cancel/move an existing booking.`,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userText.slice(0, 1000) }],
      output_config: {
        format: { type: 'json_schema', schema: INTENT_SCHEMA },
      },
    } as Anthropic.MessageCreateParamsNonStreaming)

    const textBlock = response.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') return null
    const parsed = JSON.parse(textBlock.text) as ParsedIntent
    const usage = {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      cache_read_input_tokens: response.usage.cache_read_input_tokens ?? 0,
    }
    return { parsed, usage }
  } catch (err) {
    // AI is a fallback, never a dependency: the button flow keeps working.
    console.error('[appointment-system] parseIntent failed', err)
    return null
  }
}
