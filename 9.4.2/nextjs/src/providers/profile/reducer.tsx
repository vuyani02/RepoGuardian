import { handleActions } from 'redux-actions'
import { INITIAL_STATE, IProfileStateContext } from './context'
import { ProfileActionEnums } from './actions'

export const ProfileReducer = handleActions<IProfileStateContext, IProfileStateContext>(
  {
    [ProfileActionEnums.getProfilePending]: (state, action) => ({ ...state, ...action.payload }),
    [ProfileActionEnums.getProfileSuccess]: (state, action) => ({ ...state, ...action.payload }),
    [ProfileActionEnums.getProfileError]:   (state, action) => ({ ...state, ...action.payload }),
  },
  INITIAL_STATE
)
