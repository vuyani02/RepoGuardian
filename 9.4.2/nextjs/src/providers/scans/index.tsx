'use client'

import { useContext, useReducer } from 'react'
import axios from 'axios'
import { INITIAL_STATE, ScansActionContext, ScansStateContext } from './context'
import { ScansReducer } from './reducer'
import { getAllScansPending, getAllScansSuccess, getAllScansError } from './actions'

export const ScansProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ScansReducer, INITIAL_STATE)

  const getAllScans = async () => {
    dispatch(getAllScansPending())
    await axios.get('/api/scans')
      .then((res) => dispatch(getAllScansSuccess(res.data)))
      .catch(() => dispatch(getAllScansError()))
  }

  return (
    <ScansStateContext.Provider value={state}>
      <ScansActionContext.Provider value={{ getAllScans }}>
        {children}
      </ScansActionContext.Provider>
    </ScansStateContext.Provider>
  )
}

export const useScansState = () => {
  const context = useContext(ScansStateContext)
  if (!context) throw new Error('useScansState must be used within a ScansProvider')
  return context
}

export const useScansActions = () => {
  const context = useContext(ScansActionContext)
  if (!context) throw new Error('useScansActions must be used within a ScansProvider')
  return context
}
