import { LOGIN_USER, SIGNOUT_USER } from "./authConstants"
import { createReducer } from "../../app/common/utils/reducerUtil"

const initialState = {
  currentUser: {}
}

const loginUser = (state, { email }) => ({
  ...state,
  authenticated: true,
  currentUser: email
})

const signOutUser = (state, payload) => ({
  ...state,
  authenticated: false,
  currentUser: {}
})

export default createReducer(initialState, {
  [LOGIN_USER]: loginUser,
  [SIGNOUT_USER]: signOutUser
})
