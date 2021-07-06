import React from 'react'
import ConfettiCannon from 'react-native-confetti-cannon'

type ConfettiProps = {
  count?: number
  origin?: { x: number; y: number }
  autoStart?: boolean
  fadeOut?: boolean
  explosionSpeed?: number
  fallSpeed?: number
  onAnimationEnd?: F0
}

export const Confetti = ({
  count = 500,
  origin = { x: -20, y: 0 },
  autoStart = true,
  fadeOut = true,
  explosionSpeed = 500,
  fallSpeed = 3500,
  onAnimationEnd,
}: ConfettiProps) => (
  <ConfettiCannon
    count={count}
    origin={origin}
    explosionSpeed={explosionSpeed}
    fallSpeed={fallSpeed}
    fadeOut={fadeOut}
    autoStart={autoStart}
    autoStartDelay={0}
    onAnimationEnd={onAnimationEnd}
  />
)
