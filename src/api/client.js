/**
 * 极简 HTTP 客户端（基于原生 fetch，零依赖）
 *
 * 使用方式：
 *   const data = await request('/quickbi/reports')
 *   const data = await request('/quickbi/reports', { method: 'POST', body: { id: 1 } })
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const DEFAULT_TIMEOUT = 15000

export const TOKEN_KEY = 'quickbi_token'

export function getToken() {
  return window.localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken(token) {
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token)
  } else {
    window.localStorage.removeItem(TOKEN_KEY)
  }
}

export { BASE_URL }

/**
 * @param {string} path 相对路径，如 '/quickbi/reports'
 * @param {object} [options]
 * @param {string} [options.method='GET']
 * @param {object} [options.headers]
 * @param {object|BodyInit} [options.body] 普通对象会自动 JSON 序列化
 * @param {number} [options.timeout]
 * @param {AbortSignal} [options.signal]
 * @returns {Promise<any>}
 */
export async function request(path, options = {}) {
  const { method = 'GET', headers = {}, body, timeout = DEFAULT_TIMEOUT, signal } = options

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeout)

  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true })
  }

  const isPlainObject = body !== null && typeof body === 'object' && !(body instanceof FormData)

  const token = getToken()

  const init = {
    method,
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isPlainObject ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    signal: controller.signal,
  }

  if (body !== undefined && method !== 'GET' && method !== 'HEAD') {
    init.body = isPlainObject ? JSON.stringify(body) : body
  }

  try {
    const response = await fetch(`${BASE_URL}${path}`, init)

    if (!response.ok) {
      const error = new Error(`请求失败：${response.status} ${response.statusText}`)
      error.status = response.status
      throw error
    }

    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      return await response.json()
    }
    return await response.text()
  } finally {
    window.clearTimeout(timer)
  }
}

export const http = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}
