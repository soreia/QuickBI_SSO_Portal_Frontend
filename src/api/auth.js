/**
 * MSD 单点登录前端调用封装
 *
 * 链路：
 *   1. 点击登录 -> window.location 跳到后端 /auth/msd/authorize
 *   2. 后端 302 到 Entra ID，用户完成认证
 *   3. Entra ID 带 code 回调 /auth/callback，回调页调 exchange 换 token
 */

import { BASE_URL, http, setToken, getToken } from './client'

/** 跳转到后端发起 OIDC 登录 */
export function startMsdLogin() {
  window.location.href = `${BASE_URL}/auth/msd/authorize`
}

/**
 * 用授权码换取登录态
 * @param {string} code
 * @param {string} state
 * @returns {Promise<{token: string, userId: number, username: string, nickname: string}>}
 */
export async function exchangeMsdCode(code, state) {
  const res = await http.post('/auth/msd/exchange', { code, state })
  // 后端 Result 包装：{ code, message, data }
  const payload = res && typeof res === 'object' && 'data' in res ? res.data : res
  if (!payload || !payload.token) {
    throw new Error(res?.message || 'SSO 登录失败')
  }
  setToken(payload.token)
  return payload
}

/** 登出：先通知后端，再清本地 token */
export async function logout() {
  try {
    if (getToken()) {
      await http.post('/auth/logout')
    }
  } finally {
    setToken('')
  }
}
