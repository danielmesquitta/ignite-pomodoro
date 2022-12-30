import { differenceInSeconds } from 'date-fns'
import React, { useEffect, useMemo } from 'react'
import { useCyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export const Countdown: React.FC = () => {
  const {
    activeCycle,
    amountSecondsPassed,
    markCycleAsFinished,
    setSecondsPassed,
  } = useCyclesContext()

  const totalSeconds = useMemo(() => {
    if (!activeCycle) return 0

    return activeCycle.minutesAmount * 60
  }, [activeCycle])

  const currentSeconds = useMemo(() => {
    if (!activeCycle) return 0

    return totalSeconds - amountSecondsPassed
  }, [activeCycle, totalSeconds, amountSecondsPassed])

  const minutesAmount = useMemo(() => {
    if (!activeCycle) return 0

    return Math.floor(currentSeconds / 60)
  }, [activeCycle, currentSeconds])

  const secondsAmount = useMemo(() => {
    if (!activeCycle) return 0

    return currentSeconds % 60
  }, [activeCycle, currentSeconds])

  const formattedMinutes = useMemo(
    () => minutesAmount.toString().padStart(2, '0'),
    [minutesAmount],
  )

  const formattedSeconds = useMemo(
    () => secondsAmount.toString().padStart(2, '0'),
    [secondsAmount],
  )

  useEffect(() => {
    if (!activeCycle) return

    const calculateAndSetSecondsPassed = () => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startedAt),
      )

      if (secondsDifference >= totalSeconds) {
        markCycleAsFinished()

        setSecondsPassed(totalSeconds)

        clearInterval(interval)
      } else {
        setSecondsPassed(secondsDifference)
      }
    }

    calculateAndSetSecondsPassed()

    const interval = setInterval(calculateAndSetSecondsPassed, 1000)

    return () => clearInterval(interval)
  }, [activeCycle, markCycleAsFinished, setSecondsPassed, totalSeconds])

  useEffect(() => {
    if (amountSecondsPassed === totalSeconds) {
      markCycleAsFinished()
    }
  }, [amountSecondsPassed, markCycleAsFinished, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${formattedMinutes}:${formattedSeconds}`
    }
  }, [activeCycle, formattedMinutes, formattedSeconds])

  return (
    <CountdownContainer>
      <span>{formattedMinutes[0]}</span>
      <span>{formattedMinutes[1]}</span>

      <Separator>:</Separator>

      <span>{formattedSeconds[0]}</span>
      <span>{formattedSeconds[1]}</span>
    </CountdownContainer>
  )
}
