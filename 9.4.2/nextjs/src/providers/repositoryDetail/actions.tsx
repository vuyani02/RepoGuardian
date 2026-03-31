import { createAction } from 'redux-actions'
import { IRepositoryDetailStateContext } from './context'
import { IRepositoryDetail } from '@/Types/Repository/Types'

export enum RepositoryDetailActionEnums {
  getDetailPending = 'GET_REPOSITORY_DETAIL_PENDING',
  getDetailSuccess = 'GET_REPOSITORY_DETAIL_SUCCESS',
  getDetailError   = 'GET_REPOSITORY_DETAIL_ERROR',
}

export const getDetailPending = createAction<IRepositoryDetailStateContext>(
  RepositoryDetailActionEnums.getDetailPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
)

export const getDetailSuccess = createAction<IRepositoryDetailStateContext, IRepositoryDetail>(
  RepositoryDetailActionEnums.getDetailSuccess,
  (detail) => ({ isPending: false, isSuccess: true, isError: false, detail })
)

export const getDetailError = createAction<IRepositoryDetailStateContext>(
  RepositoryDetailActionEnums.getDetailError,
  () => ({ isPending: false, isSuccess: false, isError: true })
)
