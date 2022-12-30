import produce from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export interface CyclesAction {
  type: ActionTypes
  payload?: Record<string, any>
}

export const cyclesReducer = (state: CyclesState, action: CyclesAction) => {
  console.log(state, action)

  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload!.newCycle)

        draft.activeCycleId = action.payload!.newCycle.id
      })
    }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex === -1) return state

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedAt = new Date()

        draft.activeCycleId = null
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex === -1) return state

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedAt = new Date()

        draft.activeCycleId = null
      })
    }

    default: {
      return state
    }
  }
}
