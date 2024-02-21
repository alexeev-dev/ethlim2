import {makeActionCreator} from '../utils/actions'

export const LOGIN = 'auth/login'
export const LOGOUT = 'auth/logout'

export const login = makeActionCreator(LOGIN, ['username', 'password', 'remember'])
export const logout = makeActionCreator(LOGOUT)
