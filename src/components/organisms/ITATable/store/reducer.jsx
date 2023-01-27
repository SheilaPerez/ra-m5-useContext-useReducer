import { createNextState } from '@reduxjs/toolkit'

export const initialState = {
  data: [],
  columns: [],
  currentPage: 1,
  showMoreHouses: 10,
}

export const Actions = {
  SET_DATA: 'SET_DATA',
  SET_COLUMNS: 'SET_COLUMNS',
  NEXT_PAGE: 'NEXT_PAGE',
  PREVIOUS_PAGE: 'PREVIOUS_PAGE',
  SHOW_MORE_HOUSES: 'SHOW_MORE_HOUSES',
}

// eslint-disable-next-line default-param-last
export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_DATA:
      return createNextState(state, (draft) => {
        if (action.payload !== null) {
          draft.data = action.payload
        }
      })

    case Actions.SET_COLUMNS:
      return createNextState(state, (draft) => {
        draft.columns = action.payload
      })

    case Actions.NEXT_PAGE:
      return createNextState(state, (draft) => {
        if (state.currentPage < 2) {
          draft.currentPage += 1
        }
      })

    case Actions.PREVIOUS_PAGE:
      return createNextState(state, (draft) => {
        if (state.currentPage > 1) {
          draft.currentPage -= 1
        }
      })

    case Actions.SHOW_MORE_HOUSES:
      return createNextState(state, (draft) => {
        draft.showMoreHouses = action.payload
      })

    default:
      return state
  }
}
