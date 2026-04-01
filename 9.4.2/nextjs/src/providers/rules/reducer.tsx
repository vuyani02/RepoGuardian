import { handleActions } from 'redux-actions'
import { INITIAL_STATE, IRulesStateContext } from './context'
import { RulesActionEnums } from './actions'

export const RulesReducer = handleActions<IRulesStateContext, Partial<IRulesStateContext>>(
  {
    [RulesActionEnums.getRulesPending]: (state, action) => ({ ...state, ...action.payload }),
    [RulesActionEnums.getRulesSuccess]: (state, action) => ({ ...state, ...action.payload }),
    [RulesActionEnums.getRulesError]:   (state, action) => ({ ...state, ...action.payload }),

    [RulesActionEnums.toggleRulePending]: (state, action) => ({ ...state, ...action.payload }),
    [RulesActionEnums.toggleRuleSuccess]: (state, action) => ({ ...state, ...action.payload }),
    [RulesActionEnums.toggleRuleError]:   (state, action) => ({ ...state, ...action.payload }),
  },
  INITIAL_STATE
)
