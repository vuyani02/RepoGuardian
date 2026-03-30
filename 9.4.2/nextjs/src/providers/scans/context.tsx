import { createContext } from 'react'
import { IScanSummary } from '@/Types/Scan/Types'

export interface IScansStateContext {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  scans?: IScanSummary[]
}

export interface IScansActionContext {
  getAllScans: () => void
}

export const INITIAL_STATE: IScansStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
}

export const ScansStateContext = createContext<IScansStateContext>(INITIAL_STATE)
export const ScansActionContext = createContext<IScansActionContext>(undefined as unknown as IScansActionContext)
