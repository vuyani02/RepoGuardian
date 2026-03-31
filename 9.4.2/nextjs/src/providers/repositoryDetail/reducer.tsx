import { handleActions } from 'redux-actions'
import { INITIAL_STATE, IRepositoryDetailStateContext } from './context'
import { RepositoryDetailActionEnums } from './actions'

export const RepositoryDetailReducer = handleActions<
  IRepositoryDetailStateContext,
  IRepositoryDetailStateContext
>(
  {
    [RepositoryDetailActionEnums.getDetailPending]: (state, action) => ({ ...state, ...action.payload }),
    [RepositoryDetailActionEnums.getDetailSuccess]: (state, action) => ({ ...state, ...action.payload }),
    [RepositoryDetailActionEnums.getDetailError]:   (state, action) => ({ ...state, ...action.payload }),
  },
  INITIAL_STATE
)
