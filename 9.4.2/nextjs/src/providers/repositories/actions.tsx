import { createAction } from 'redux-actions'
import { IRepository } from '@/Types/Repository/Types'
import { IScanResult } from '@/Types/Scan/Types'
import { IRepositoryStateContext } from './context'

export enum RepositoryActionEnums {
  getRepositoriesPending = 'GET_REPOSITORIES_PENDING',
  getRepositoriesSuccess = 'GET_REPOSITORIES_SUCCESS',
  getRepositoriesError   = 'GET_REPOSITORIES_ERROR',

  addRepositoryPending = 'ADD_REPOSITORY_PENDING',
  addRepositorySuccess = 'ADD_REPOSITORY_SUCCESS',
  addRepositoryError   = 'ADD_REPOSITORY_ERROR',

  startScanPending = 'START_SCAN_PENDING',
  startScanSuccess = 'START_SCAN_SUCCESS',
  startScanError   = 'START_SCAN_ERROR',

  clearScanResult = 'CLEAR_SCAN_RESULT',
}

export const getRepositoriesPending = createAction<Partial<IRepositoryStateContext>>(
  RepositoryActionEnums.getRepositoriesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
)
export const getRepositoriesSuccess = createAction<Partial<IRepositoryStateContext>, IRepository[]>(
  RepositoryActionEnums.getRepositoriesSuccess,
  (repositories) => ({ isPending: false, isSuccess: true, isError: false, repositories })
)
export const getRepositoriesError = createAction<Partial<IRepositoryStateContext>>(
  RepositoryActionEnums.getRepositoriesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
)

export const addRepositoryPending = createAction<Partial<IRepositoryStateContext>>(
  RepositoryActionEnums.addRepositoryPending,
  () => ({ isAddPending: true })
)
export const addRepositorySuccess = createAction<Partial<IRepositoryStateContext>, IRepository>(
  RepositoryActionEnums.addRepositorySuccess,
  (repo) => ({ isAddPending: false, repositories: undefined, _newRepo: repo })
)
export const addRepositoryError = createAction<Partial<IRepositoryStateContext>>(
  RepositoryActionEnums.addRepositoryError,
  () => ({ isAddPending: false })
)

export const startScanPending = createAction<Partial<IRepositoryStateContext>, string>(
  RepositoryActionEnums.startScanPending,
  (repositoryId) => ({ isScanPending: true, scanningRepositoryId: repositoryId })
)
export const startScanSuccess = createAction<Partial<IRepositoryStateContext>, IScanResult>(
  RepositoryActionEnums.startScanSuccess,
  (scanResult) => ({ isScanPending: false, scanningRepositoryId: undefined, scanResult })
)
export const startScanError = createAction<Partial<IRepositoryStateContext>>(
  RepositoryActionEnums.startScanError,
  () => ({ isScanPending: false, scanningRepositoryId: undefined })
)

export const clearScanResult = createAction<Partial<IRepositoryStateContext>>(
  RepositoryActionEnums.clearScanResult,
  () => ({ scanResult: undefined })
)
