/* eslint-disable no-unused-vars */
import { Cycle } from './reducer'

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export const createNewCycleAction = (newCycle: Cycle) => {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export const markCurrentCycleAsFinishedAction = () => {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export const interruptCurrentCycleAction = () => {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
