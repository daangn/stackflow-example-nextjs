import { useActions } from '@stackflow/react'
import { useCallback, useMemo, useTransition } from 'react'
import { TypeActivities } from '../stackflow'

export function useFlow() {
  const [isPending, startTransition] = useTransition()
  const { push: _push, pop: _pop, replace: _replace } = useActions<TypeActivities>()

  const push: typeof _push = useCallback((...args) => {
    if (isPending) {
      return
    }
    startTransition(() => {
      _push(...args)
    })
  }, [isPending, startTransition, _push])

  const replace: typeof _replace = useCallback((...args) => {
    if (isPending) {
      return
    }
    startTransition(() => {
      _replace(...args)
    })
  }, [isPending, startTransition, _replace])

  const pop: typeof _pop = useCallback((...args) => {
    if (isPending) {
      return
    }
    startTransition(() => {
      _pop(...args)
    })
  }, [isPending, startTransition, _pop])

  return useMemo(() => ({
    push,
    pop,
    replace,
  }), [push, pop, replace])
}
