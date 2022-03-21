import React from 'react'
import { Box } from 'utils/theme/index'
import { Photo } from '../Photo'

type Side = 'left' | 'right'

export const SummaryRequestVacationPhotos = ({
  photos,
}: {
  photos?: { id: string; uri: string }[]
}) => {
  const getPadding = (index: number, side: Side) => {
    const n = index % 3
    const paddingSize = 2
    if (n === 0) return side === 'left' ? 0 : 2 * paddingSize
    if (n === 1) return paddingSize
    if (n === 2) return side === 'left' ? 2 * paddingSize : 0
  }
  return (
    <>
      {!!photos?.length && (
        <Box flexDirection="row" flexWrap="wrap">
          {photos.map(({ uri, id }, uriIndex) => (
            <Box
              key={id}
              paddingTop="s"
              style={{
                paddingLeft: getPadding(uriIndex, 'left'),
                paddingRight: getPadding(uriIndex, 'right'),
                width: '33.33%',
              }}>
              <Photo src={uri} onClose={() => {}} />
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}
