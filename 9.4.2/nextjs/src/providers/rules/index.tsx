'use client'

import { useContext, useReducer } from 'react'
import axios from 'axios'
import { INITIAL_STATE, RulesActionContext, RulesStateContext } from './context'
import { RulesReducer } from './reducer'
import {
  getRulesPending, getRulesSuccess, getRulesError,
  toggleRulePending, toggleRuleSuccess, toggleRuleError,
} from './actions'

export const RulesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(RulesReducer, INITIAL_STATE)

  const getRules = async () => {
    dispatch(getRulesPending())
    await axios.get('/api/rules')
      .then((res) => dispatch(getRulesSuccess(res.data)))
      .catch(() => dispatch(getRulesError()))
  }

  const toggleRule = async (ruleId: string, activate: boolean) => {
    dispatch(toggleRulePending())
    try {
      await axios.post('/api/rules/toggle', { ruleId, activate })
      dispatch(toggleRuleSuccess())
      // Reload so the page reflects the updated active status
      await getRules()
    } catch {
      dispatch(toggleRuleError())
    }
  }

  return (
    <RulesStateContext.Provider value={state}>
      <RulesActionContext.Provider value={{ getRules, toggleRule }}>
        {children}
      </RulesActionContext.Provider>
    </RulesStateContext.Provider>
  )
}

export const useRulesState = () => {
  const context = useContext(RulesStateContext)
  if (!context) throw new Error('useRulesState must be used within a RulesProvider')
  return context
}

export const useRulesActions = () => {
  const context = useContext(RulesActionContext)
  if (!context) throw new Error('useRulesActions must be used within a RulesProvider')
  return context
}
