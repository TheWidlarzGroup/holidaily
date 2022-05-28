export const tabsBorderRadius = (p: { key: number; side: 'left' | 'right' }) => {
  if (p.key === 0 && p.side === 'left') return 'm'
  if (p.key === 4 && p.side === 'right') return 'm'
  return undefined
}
