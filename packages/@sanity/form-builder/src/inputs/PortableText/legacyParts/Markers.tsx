// @todo: remove the following line when part imports has been removed from this file
///<reference types="@sanity/types/parts" />

import React, {useCallback, useMemo} from 'react'
import CustomMarkers from 'part:@sanity/form-builder/input/block-editor/block-markers-custom-default'
import {Path, Marker, isValidationMarker} from '@sanity/types'
import {Box, Flex, Stack, Text} from '@sanity/ui'
import {InfoOutlineIcon} from '@sanity/icons'
import block from 'part:@sanity/components/previews/block'
import {isEqual} from 'lodash'
import {RenderCustomMarkers} from '../types'
import styles from './Markers.module.css'

type Props = {
  markers: Marker[]
  onFocus: (path: Path) => void
  renderCustomMarkers?: RenderCustomMarkers
}
export default function Markers(props: Props) {
  const {markers, renderCustomMarkers, onFocus} = props
  const handleValidationMarkerClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.preventDefault()
      event.stopPropagation()
      const validationMarkers = markers.filter(isValidationMarker)
      onFocus(validationMarkers[0].path)
    },
    [markers, onFocus]
  )

  // const handleCancelEvent = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
  //   event.preventDefault()
  //   event.stopPropagation()
  // }, [])

  const customMarkersForBlock = useMemo(
    () =>
      markers.filter(
        (marker: any) => !isValidationMarker(marker) && isEqual(marker.path, [{_key: block._key}])
      ),
    [markers]
  )
  const validationMarkersForBlock = useMemo(
    () =>
      markers.filter(
        (marker: any) => isValidationMarker(marker) && isEqual(marker.path, [{_key: block._key}])
      ),
    [markers]
  )
  if (markers.length === 0) {
    return null
  }
  return (
    <Stack>
      {validationMarkersForBlock.length > 0 && (
        <div className={styles.markerGroup} onClick={handleValidationMarkerClick}>
          {customMarkersForBlock?.map(({item}) => (
            <Flex key={item?.message}>
              <Box marginRight={2}>
                <Text size={1} accent>
                  <InfoOutlineIcon />
                </Text>
              </Box>
              <Box>
                <Text size={1}>{item?.message || 'Error'}</Text>
              </Box>
            </Flex>
          ))}
        </div>
      )}
      {customMarkersForBlock.length > 0 && (
        <Flex>
          <Box>
            {renderCustomMarkers && renderCustomMarkers(customMarkersForBlock)}
            {!renderCustomMarkers && <CustomMarkers markers={markers} />}
          </Box>
        </Flex>
      )}
    </Stack>
  )
}
