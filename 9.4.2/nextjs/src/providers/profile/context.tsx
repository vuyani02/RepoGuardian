import { createContext } from 'react'
import { IProfile } from '@/Types/Profile/Types'

export interface IProfileStateContext {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  profile?: IProfile
}

export interface IProfileActionContext {
  getProfile: () => void
}

export const INITIAL_STATE: IProfileStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
}

export const ProfileStateContext = createContext<IProfileStateContext>(INITIAL_STATE)
export const ProfileActionContext = createContext<IProfileActionContext>(undefined)
