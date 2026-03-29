'use client'

import { useContext, useReducer } from 'react'
import axios from 'axios'
import { INITIAL_STATE, RepositoryActionContext, RepositoryStateContext } from './context'
import { RepositoryReducer } from './reducer'
import {
  getRepositoriesPending, getRepositoriesSuccess, getRepositoriesError,
  addRepositoryPending, addRepositorySuccess, addRepositoryError,
  startScanPending, startScanSuccess, startScanError,
  clearScanResult,
} from './actions'

export const RepositoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(RepositoryReducer, INITIAL_STATE)

  const getRepositories = async () => {
    dispatch(getRepositoriesPending())
    await axios.get('/api/repositories')
      .then((res) => dispatch(getRepositoriesSuccess(res.data)))
      .catch(() => dispatch(getRepositoriesError()))
  }

  const addRepository = async (githubUrl: string) => {
    dispatch(addRepositoryPending())
    await axios.post('/api/repositories', { githubUrl })
      .then((res) => dispatch(addRepositorySuccess(res.data)))
      .catch(() => dispatch(addRepositoryError()))
  }

  const startScan = async (repositoryId: string) => {
    dispatch(startScanPending(repositoryId))
    await axios.post('/api/repositories/scan', { repositoryId })
      .then((res) => dispatch(startScanSuccess(res.data)))
      .catch(() => dispatch(startScanError()))
  }

  const clearScan = () => dispatch(clearScanResult())

  return (
    <RepositoryStateContext.Provider value={state}>
      <RepositoryActionContext.Provider value={{ getRepositories, addRepository, startScan, clearScanResult: clearScan }}>
        {children}
      </RepositoryActionContext.Provider>
    </RepositoryStateContext.Provider>
  )
}

export const useRepositoryState = () => {
  const context = useContext(RepositoryStateContext)
  if (!context) throw new Error('useRepositoryState must be used within a RepositoryProvider')
  return context
}

export const useRepositoryActions = () => {
  const context = useContext(RepositoryActionContext)
  if (!context) throw new Error('useRepositoryActions must be used within a RepositoryProvider')
  return context
}
