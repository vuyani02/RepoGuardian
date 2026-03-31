'use client'

import { useContext, useReducer } from 'react'
import axios from 'axios'
import { IDashboardFilters } from '@/Types/Dashboard/Types'
import { INITIAL_STATE, DashboardActionContext, DashboardStateContext } from './context'
import { DashboardReducer } from './reducer'
import { getDashboardStatsPending, getDashboardStatsSuccess, getDashboardStatsError } from './actions'

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(DashboardReducer, INITIAL_STATE)

  const getDashboardStats = async (filters: IDashboardFilters) => {
    const params: Record<string, string> = { latestPerRepo: String(filters.latestPerRepo) }
    if (filters.daysBack !== null) params['daysBack'] = String(filters.daysBack)

    dispatch(getDashboardStatsPending())
    await axios.get('/api/dashboard', { params })
      .then((res) => dispatch(getDashboardStatsSuccess(res.data)))
      .catch(() => dispatch(getDashboardStatsError()))
  }

  return (
    <DashboardStateContext.Provider value={state}>
      <DashboardActionContext.Provider value={{ getDashboardStats }}>
        {children}
      </DashboardActionContext.Provider>
    </DashboardStateContext.Provider>
  )
}

export const useDashboardState = () => {
  const context = useContext(DashboardStateContext)
  if (!context) throw new Error('useDashboardState must be used within a DashboardProvider')
  return context
}

export const useDashboardActions = () => {
  const context = useContext(DashboardActionContext)
  if (!context) throw new Error('useDashboardActions must be used within a DashboardProvider')
  return context
}
