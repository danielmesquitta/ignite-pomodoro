import { ReactNode } from 'react'
import { Cycle } from '../../reducers/cycles/reducer'

export interface CreateNewCycleData {
  task: string
  minutesAmount: number
}

export interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | null
  amountSecondsPassed: number
  markCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateNewCycleData) => void
  interruptCurrentCycle: () => void
}

export interface CyclesContextProviderProps {
  children: ReactNode
}
