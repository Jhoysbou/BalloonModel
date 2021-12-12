export enum ActionsType {
  START_MODELING,
  PAUSE_MODELING,
  STOP_MODELING
}

export interface Action {
  type: ActionsType,
  payload?: any
}

export const createAction = (type: ActionsType, payload?: any): Action => ({
  type,
  payload
})
