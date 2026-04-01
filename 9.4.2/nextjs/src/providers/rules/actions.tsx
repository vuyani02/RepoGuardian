import { createAction } from 'redux-actions'
import { IRuleDefinition } from '@/Types/Rules/Types'
import { IRulesStateContext } from './context'

export enum RulesActionEnums {
  getRulesPending = 'GET_RULES_PENDING',
  getRulesSuccess = 'GET_RULES_SUCCESS',
  getRulesError   = 'GET_RULES_ERROR',

  toggleRulePending = 'TOGGLE_RULE_PENDING',
  toggleRuleSuccess = 'TOGGLE_RULE_SUCCESS',
  toggleRuleError   = 'TOGGLE_RULE_ERROR',
}

export const getRulesPending = createAction<Partial<IRulesStateContext>>(
  RulesActionEnums.getRulesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
)
export const getRulesSuccess = createAction<Partial<IRulesStateContext>, IRuleDefinition[]>(
  RulesActionEnums.getRulesSuccess,
  (rules) => ({ isPending: false, isSuccess: true, isError: false, rules })
)
export const getRulesError = createAction<Partial<IRulesStateContext>>(
  RulesActionEnums.getRulesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
)

export const toggleRulePending = createAction<Partial<IRulesStateContext>>(
  RulesActionEnums.toggleRulePending,
  () => ({ isTogglePending: true })
)
export const toggleRuleSuccess = createAction<Partial<IRulesStateContext>>(
  RulesActionEnums.toggleRuleSuccess,
  () => ({ isTogglePending: false })
)
export const toggleRuleError = createAction<Partial<IRulesStateContext>>(
  RulesActionEnums.toggleRuleError,
  () => ({ isTogglePending: false })
)
