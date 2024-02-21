import {postQuery} from '../utils/api'

/**
 * Осуществляет API-запрос на авторизацию
 * @function login
 * @param {Object} params
 * @param {string} params.username - имя пользователя
 * @param {string} params.password - пароль пользователя
 * @returns {Observable} поток с ответом сервера на авторизацию
 * @example login({username: 'testuser', password: '27wGIesV'})
 */

export const login = postQuery('auth.login')
