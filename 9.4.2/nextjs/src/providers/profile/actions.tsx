import { createAction } from 'redux-actions'
import { IProfileStateContext } from './context'
import { IProfile } from '@/Types/Profile/Types'

export enum ProfileActionEnums {
  getProfilePending = 'GET_PROFILE_PENDING',
  getProfileSuccess = 'GET_PROFILE_SUCCESS',
  getProfileError   = 'GET_PROFILE_ERROR',
}

export const getProfilePending = createAction<IProfileStateContext>(
  ProfileActionEnums.getProfilePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
)

export const getProfileSuccess = createAction<IProfileStateContext, IProfile>(
  ProfileActionEnums.getProfileSuccess,
  (profile) => ({ isPending: false, isSuccess: true, isError: false, profile })
)

export const getProfileError = createAction<IProfileStateContext>(
  ProfileActionEnums.getProfileError,
  () => ({ isPending: false, isSuccess: false, isError: true })
)
