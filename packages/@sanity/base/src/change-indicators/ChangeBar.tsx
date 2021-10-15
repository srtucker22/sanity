import React, {useCallback, useMemo, useState} from 'react'
import {ConnectorContext} from './ConnectorContext'
import {
  ChangeBarWrapper,
  FieldWrapper,
  HitAreaButton,
  TooltipTriggerWrapper,
  BarWrapper,
} from './ChangeBar.styled'

export function ChangeBar(props: {
  children: React.ReactNode
  hasFocus: boolean
  isChanged: boolean
  disabled?: boolean
}) {
  const {children, hasFocus, isChanged, disabled} = props

  const [hover, setHover] = useState(false)
  const {onOpenReviewChanges, isReviewChangesOpen} = React.useContext(ConnectorContext)

  const handleMouseEnter = useCallback(() => setHover(true), [])
  const handleMouseLeave = useCallback(() => setHover(false), [])

  const tooltip = useMemo(
    () =>
      disabled ? null : (
        <TooltipTriggerWrapper data-testid="change-bar__tooltip-wrapper">
          <BarWrapper />

          <HitAreaButton
            aria-label="Review changes"
            onClick={isReviewChangesOpen ? undefined : onOpenReviewChanges}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            tabIndex={isReviewChangesOpen || !isChanged ? -1 : 0}
            type="button"
          />
        </TooltipTriggerWrapper>
      ),
    [
      handleMouseEnter,
      handleMouseLeave,
      isReviewChangesOpen,
      onOpenReviewChanges,
      isChanged,
      disabled,
    ]
  )

  return (
    <ChangeBarWrapper
      data-testid="change-bar"
      focus={hasFocus}
      hover={hover}
      changed={isChanged}
      isReviewChangeOpen={isReviewChangesOpen}
      disabled={disabled}
    >
      <FieldWrapper data-testid="change-bar__field-wrapper">{children}</FieldWrapper>
      {tooltip}
    </ChangeBarWrapper>
  )
}
