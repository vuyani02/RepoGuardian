import { handleActions } from 'redux-actions'
import { INITIAL_STATE, IScansStateContext } from './context'
import { ScansActionEnums } from './actions'

export const ScansReducer = handleActions<IScansStateContext, Partial<IScansStateContext>>(
  {
    [ScansActionEnums.getAllScansPending]: (state, action) => ({ ...state, ...action.payload }),
    [ScansActionEnums.getAllScansSuccess]: (state, action) => ({ ...state, ...action.payload }),
    [ScansActionEnums.getAllScansError]:   (state, action) => ({ ...state, ...action.payload }),
  },
  INITIAL_STATE
)
