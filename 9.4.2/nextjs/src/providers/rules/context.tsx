import { createContext } from 'react'
import { IRuleDefinition } from '@/Types/Rules/Types'

export interface IRulesStateContext {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  isTogglePending: boolean
  rules?: IRuleDefinition[]
}

export interface IRulesActionContext {
  getRules: () => void
  toggleRule: (ruleId: string, activate: boolean) => Promise<void>
}

export const INITIAL_STATE: IRulesStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  isTogglePending: false,
}

export const RulesStateContext = createContext<IRulesStateContext>(INITIAL_STATE)
export const RulesActionContext = createContext<IRulesActionContext>(undefined as unknown as IRulesActionContext)
