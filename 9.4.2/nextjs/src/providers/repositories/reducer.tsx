import { handleActions } from 'redux-actions'
import { IRepository } from '@/lib/definitions'
import { INITIAL_STATE, IRepositoryStateContext } from './context'
import { RepositoryActionEnums } from './actions'

export const RepositoryReducer = handleActions<IRepositoryStateContext, IRepositoryStateContext>(
  {
    [RepositoryActionEnums.getRepositoriesPending]: (state, action) => ({ ...state, ...action.payload }),
    [RepositoryActionEnums.getRepositoriesSuccess]: (state, action) => ({ ...state, ...action.payload }),
    [RepositoryActionEnums.getRepositoriesError]:   (state, action) => ({ ...state, ...action.payload }),

    [RepositoryActionEnums.addRepositoryPending]: (state, action) => ({ ...state, ...action.payload }),
    [RepositoryActionEnums.addRepositorySuccess]: (state, action) => {
      // Append the new repo to the existing list without a full refetch
      const payload = action.payload as IRepositoryStateContext & { _newRepo?: IRepository }
      const newRepo = payload._newRepo
      const existing = state.repositories ?? []
      const alreadyExists = existing.some((r) => r.id === newRepo?.id)
      return {
        ...state,
        isAddPending: false,
        repositories: alreadyExists || !newRepo ? existing : [...existing, newRepo],
      }
    },
    [RepositoryActionEnums.addRepositoryError]: (state, action) => ({ ...state, ...action.payload }),

    [RepositoryActionEnums.startScanPending]: (state, action) => ({ ...state, ...action.payload }),
    [RepositoryActionEnums.startScanSuccess]: (state, action) => ({ ...state, ...action.payload }),
    [RepositoryActionEnums.startScanError]:   (state, action) => ({ ...state, ...action.payload }),

    [RepositoryActionEnums.clearScanResult]: (state, action) => ({ ...state, ...action.payload }),
  },
  INITIAL_STATE
)
