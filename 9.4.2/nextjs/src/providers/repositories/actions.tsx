import { createAction } from 'redux-actions'
import { IRepository, IScanResult } from '@/lib/definitions'
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

export const getRepositoriesPending = createAction<IRepositoryStateContext>(
  RepositoryActionEnums.getRepositoriesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
)
export const getRepositoriesSuccess = createAction<IRepositoryStateContext, IRepository[]>(
  RepositoryActionEnums.getRepositoriesSuccess,
  (repositories) => ({ isPending: false, isSuccess: true, isError: false, repositories })
)
export const getRepositoriesError = createAction<IRepositoryStateContext>(
  RepositoryActionEnums.getRepositoriesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
)

export const addRepositoryPending = createAction<IRepositoryStateContext>(
  RepositoryActionEnums.addRepositoryPending,
  () => ({ isAddPending: true })
)
export const addRepositorySuccess = createAction<IRepositoryStateContext, IRepository>(
  RepositoryActionEnums.addRepositorySuccess,
  (repo) => ({ isAddPending: false, repositories: undefined, _newRepo: repo })
)
export const addRepositoryError = createAction<IRepositoryStateContext>(
  RepositoryActionEnums.addRepositoryError,
  () => ({ isAddPending: false })
)

export const startScanPending = createAction<IRepositoryStateContext, string>(
  RepositoryActionEnums.startScanPending,
  (repositoryId) => ({ isScanPending: true, scanningRepositoryId: repositoryId })
)
export const startScanSuccess = createAction<IRepositoryStateContext, IScanResult>(
  RepositoryActionEnums.startScanSuccess,
  (scanResult) => ({ isScanPending: false, scanningRepositoryId: undefined, scanResult })
)
export const startScanError = createAction<IRepositoryStateContext>(
  RepositoryActionEnums.startScanError,
  () => ({ isScanPending: false, scanningRepositoryId: undefined })
)

export const clearScanResult = createAction<IRepositoryStateContext>(
  RepositoryActionEnums.clearScanResult,
  () => ({ scanResult: undefined })
)
