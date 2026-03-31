import { createAction } from 'redux-actions'
import { IDashboardStats } from '@/Types/Dashboard/Types'
import { IDashboardStateContext } from './context'

export enum DashboardActionEnums {
  getDashboardStatsPending = 'GET_DASHBOARD_STATS_PENDING',
  getDashboardStatsSuccess = 'GET_DASHBOARD_STATS_SUCCESS',
  getDashboardStatsError   = 'GET_DASHBOARD_STATS_ERROR',
}

export const getDashboardStatsPending = createAction<Partial<IDashboardStateContext>>(
  DashboardActionEnums.getDashboardStatsPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
)

export const getDashboardStatsSuccess = createAction<Partial<IDashboardStateContext>, IDashboardStats>(
  DashboardActionEnums.getDashboardStatsSuccess,
  (stats) => ({ isPending: false, isSuccess: true, isError: false, stats })
)

export const getDashboardStatsError = createAction<Partial<IDashboardStateContext>>(
  DashboardActionEnums.getDashboardStatsError,
  () => ({ isPending: false, isSuccess: false, isError: true })
)
