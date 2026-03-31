import { createContext } from 'react'
import { IRepositoryDetail } from '@/Types/Repository/Types'

export interface IRepositoryDetailStateContext {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  detail?: IRepositoryDetail
}

export interface IRepositoryDetailActionContext {
  getRepositoryDetail: (id: string) => void
}

export const INITIAL_STATE: IRepositoryDetailStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
}

export const RepositoryDetailStateContext =
  createContext<IRepositoryDetailStateContext>(INITIAL_STATE)

export const RepositoryDetailActionContext =
  createContext<IRepositoryDetailActionContext>(undefined as unknown as IRepositoryDetailActionContext)
