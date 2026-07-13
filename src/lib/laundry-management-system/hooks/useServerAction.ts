'use client'

import { useActionState, useEffect, useTransition } from 'react'
import { toast } from 'sonner'
import type { ActionResult } from '@/app/lms/actions/shared'

// Centralizes the "is state.error a real error or an info sentinel like
// 'SAVED'/'INVITED'" branching that was hand-rolled per component (const saved
// = state.error === 'SAVED', repeated across ~6 forms). Pass the sentinel
// strings a given action returns on success; everything else in state.error
// is treated as a real validation/server error. Pass toastSuccessMessage to
// also fire a toast on success — omitted for forms that redirect on success
// (the navigation itself is the feedback), since the raw sentinel string
// isn't fit for display.
//
// Returns `submit` rather than the raw useActionState dispatch: when a form
// is driven by React Hook Form's handleSubmit (not a native <form action=...>
// or formAction prop), calling the dispatch function directly outside a
// transition makes React warn ("called outside of a transition") and leaves
// `pending` out of sync — wrapping it in startTransition here means every
// caller gets a working pending state for free instead of hitting this the
// same way once per form.
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
  }
}
