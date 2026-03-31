'use client'

import { useContext, useReducer } from 'react'
import axios from 'axios'
import { INITIAL_STATE, RepositoryDetailActionContext, RepositoryDetailStateContext } from './context'
import { RepositoryDetailReducer } from './reducer'
import { getDetailPending, getDetailSuccess, getDetailError } from './actions'

export const RepositoryDetailProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(RepositoryDetailReducer, INITIAL_STATE)

  const getRepositoryDetail = async (id: string) => {
    dispatch(getDetailPending())
    await axios.get(`/api/repositories/${id}`)
      .then((res) => dispatch(getDetailSuccess(res.data)))
      .catch(() => dispatch(getDetailError()))
  }

  return (
    <RepositoryDetailStateContext.Provider value={state}>
      <RepositoryDetailActionContext.Provider value={{ getRepositoryDetail }}>
        {children}
      </RepositoryDetailActionContext.Provider>
    </RepositoryDetailStateContext.Provider>
  )
}

export const useRepositoryDetailState = () => {
  const context = useContext(RepositoryDetailStateContext)
  if (!context) throw new Error('useRepositoryDetailState must be used within a RepositoryDetailProvider')
  return context
}

export const useRepositoryDetailActions = () => {
  const context = useContext(RepositoryDetailActionContext)
  if (!context) throw new Error('useRepositoryDetailActions must be used within a RepositoryDetailProvider')
  return context
}
