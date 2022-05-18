export const tabsBorderRadius =
  (key: number) => (side: 'left' | 'right') => (buttonIdx?: number) => {
    if (key === 0 && side === 'left') return 'm'
    if (key === 4 && side === 'right') return 'm'
    if (buttonIdx && key === buttonIdx + 1 && side === 'left') return 's'
    if (buttonIdx && key === buttonIdx - 1 && side === 'right') return 's'
    return undefined
  }
