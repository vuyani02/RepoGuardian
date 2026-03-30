import { createContext } from 'react'
import { IRepository } from '@/Types/Repository/Types'
import { IScanResult } from '@/Types/Scan/Types'

export interface IRepositoryStateContext {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  isAddPending: boolean
  isScanPending: boolean
  scanningRepositoryId?: string
  repositories?: IRepository[]
  scanResult?: IScanResult
}

export interface IRepositoryActionContext {
  getRepositories: () => void
  addRepository: (githubUrl: string) => void
  startScan: (repositoryId: string) => void
  clearScanResult: () => void
}

export const INITIAL_STATE: IRepositoryStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  isAddPending: false,
  isScanPending: false,
}

export const RepositoryStateContext = createContext<IRepositoryStateContext>(INITIAL_STATE)
export const RepositoryActionContext = createContext<IRepositoryActionContext>(undefined as unknown as IRepositoryActionContext)
