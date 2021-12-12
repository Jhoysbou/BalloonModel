export enum ActionsTypes {
  START_MODELING,
  STOP_MODELING,
  PAUSE_MODELING
}

export interface Action {
  type: ActionsTypes,
  payload: any
}

export const createAction = (type: ActionsTypes, payload: any): Action => ({
  type,
  payload
})
