'use client'

import { useContext, useReducer } from 'react'
import axios from 'axios'
import { INITIAL_STATE, ProfileActionContext, ProfileStateContext } from './context'
import { ProfileReducer } from './reducer'
import { getProfilePending, getProfileSuccess, getProfileError } from './actions'

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ProfileReducer, INITIAL_STATE)

  const getProfile = async () => {
    dispatch(getProfilePending())
    await axios.get('/api/profile')
      .then((res) => dispatch(getProfileSuccess(res.data)))
      .catch(() => dispatch(getProfileError()))
  }

  return (
    <ProfileStateContext.Provider value={state}>
      <ProfileActionContext.Provider value={{ getProfile }}>
        {children}
      </ProfileActionContext.Provider>
    </ProfileStateContext.Provider>
  )
}

export const useProfileState = () => {
  const context = useContext(ProfileStateContext)
  if (!context) throw new Error('useProfileState must be used within a ProfileProvider')
  return context
}

export const useProfileActions = () => {
  const context = useContext(ProfileActionContext)
  if (!context) throw new Error('useProfileActions must be used within a ProfileProvider')
  return context
}
