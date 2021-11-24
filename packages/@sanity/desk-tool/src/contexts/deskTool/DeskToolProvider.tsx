import React, {useMemo} from 'react'
import {DeskToolContext} from './DeskToolContext'
import {DeskToolContextValue} from './types'

/**
 * @internal
 */
export function DeskToolProvider(props: {
  children?: React.ReactNode
  debug: boolean
  layoutCollapsed: boolean
}): React.ReactElement {
  const {children, debug, layoutCollapsed} = props

  const features = useMemo(
    () => ({
      backButton: layoutCollapsed,
      reviewChanges: !layoutCollapsed,
      splitPanes: !layoutCollapsed,
      splitViews: !layoutCollapsed,
    }),
    [layoutCollapsed]
  )

  const contextValue: DeskToolContextValue = useMemo(
    () => ({
      debug,
      features,
      layoutCollapsed,
    }),
    [debug, features, layoutCollapsed]
  )

  return <DeskToolContext.Provider value={contextValue}>{children}</DeskToolContext.Provider>
}
