export enum ActionsType {
  START_MODELING,
  PAUSE_MODELING,
  STOP_MODELING,
  CHANGE_INITIAL_CONDITIONS
}

export interface Action {
  type: ActionsType,
  payload?: any
}

export const createAction = (type: ActionsType, payload?: any): Action => ({
  type,
  payload
})
