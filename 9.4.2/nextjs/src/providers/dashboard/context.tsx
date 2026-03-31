import { createContext } from 'react'
import { IDashboardFilters, IDashboardStats } from '@/Types/Dashboard/Types'

export interface IDashboardStateContext {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  stats?: IDashboardStats
}

export interface IDashboardActionContext {
  getDashboardStats: (filters: IDashboardFilters) => void
}

export const INITIAL_STATE: IDashboardStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
}

export const DashboardStateContext = createContext<IDashboardStateContext>(INITIAL_STATE)
export const DashboardActionContext = createContext<IDashboardActionContext>(undefined as unknown as IDashboardActionContext)
