'use client'

import { useActionState, useEffect, useTransition } from 'react'
import { toast } from 'sonner'
import type { ActionResult } from '@/app/territory-management-system/actions/shared'

// Centralizes the "is state.error a real error or an info sentinel like 'SAVED'"
// branching so forms don't hand-roll it. Pass the sentinel strings a given action
// returns on success; everything else in state.error is treated as a real
// validation/server error. Pass toastSuccessMessage to also fire a toast on success.
//
// Returns `submit` rather than the raw useActionState dispatch: when a form is
// driven by React Hook Form's handleSubmit (not a native <form action=...>), calling
// the dispatch function outside a transition makes React warn and leaves `pending`
// out of sync — wrapping it in startTransition here fixes that for every caller.
export function useServerAction(
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>,
  successSentinels: string[] = [],
  toastSuccessMessage?: string
) {
  const [state, dispatch] = useActionState<ActionResult, FormData>(action, {})
  const [isPending, startTransition] = useTransition()
  const isSentinel = state.error ? successSentinels.includes(state.error) : false
  const error = state.error && !isSentinel ? state.error : null
  const successMessage = isSentinel ? (state.error as string) : null

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  useEffect(() => {
    if (successMessage && toastSuccessMessage) toast.success(toastSuccessMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage])

  function submit(formData: FormData) {
    startTransition(() => {
      dispatch(formData)
    })
  }

  return {
    dispatch: submit,
    pending: isPending,
    error,
    successMessage,
    // Exposed for callers that need to react to *every* successful submission, including two
    // in a row with the same sentinel value (e.g. 'SAVED' twice) — successMessage/state.error
    // don't change identity between two such submissions, but state itself is a fresh object
    // reference on every action resolution, so a useEffect keyed on it fires reliably each time.
    state,
  }
}
