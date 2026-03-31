import { handleActions } from 'redux-actions'
import { INITIAL_STATE, IDashboardStateContext } from './context'
import { DashboardActionEnums } from './actions'

export const DashboardReducer = handleActions<IDashboardStateContext, Partial<IDashboardStateContext>>(
  {
    [DashboardActionEnums.getDashboardStatsPending]: (state, action) => ({ ...state, ...action.payload }),
    [DashboardActionEnums.getDashboardStatsSuccess]: (state, action) => ({ ...state, ...action.payload }),
    [DashboardActionEnums.getDashboardStatsError]:   (state, action) => ({ ...state, ...action.payload }),
  },
  INITIAL_STATE
)
