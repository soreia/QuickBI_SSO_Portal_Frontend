<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { exchangeMsdCode } from '@/api/auth'

/**
 * SSO 回调页。
 *
 * Entra ID 认证完成后会带 code + state 跳回这里，
 * 这里把 code 交给后端换取 token，成功则进入业务首页。
 */

const route = useRoute()
const router = useRouter()

const state = ref('working')
const message = ref('正在完成登录，请稍候…')

onMounted(async () => {
  const code = route.query.code
  const returnedState = route.query.state
  const err = route.query.error

  if (err) {
    state.value = 'error'
    message.value = `认证被拒绝：${route.query.error_description || err}`
    return
  }

  if (!code || !returnedState) {
    state.value = 'error'
    message.value = '回调参数缺失，无法完成登录。'
    return
  }

  try {
    const user = await exchangeMsdCode(code, returnedState)
    state.value = 'done'
    message.value = `登录成功，欢迎 ${user.nickname || user.username}`
    router.replace('/MyReports')
  } catch (e) {
    state.value = 'error'
    message.value = e.message || '登录失败，请重试。'
  }
})

function backToLogin() {
  router.replace('/login')
}
</script>

<template>
  <div class="callback">
    <div class="box">
      <div class="spinner" :class="{ 'is-hidden': state !== 'working' }" aria-hidden="true"></div>
      <h2>{{ state === 'error' ? '登录未完成' : state === 'done' ? '登录成功' : '正在登录' }}</h2>
      <p>{{ message }}</p>
      <button v-if="state === 'error'" type="button" class="retry" @click="backToLogin">
        返回登录页
      </button>
    </div>
  </div>
</template>

<style scoped>
.callback {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d2233;
  color: #fff;
  font-family:
    'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.box {
  background: #fff;
  color: #1e2a47;
  border-radius: 6px;
  padding: 40px 44px;
  text-align: center;
  max-width: 460px;
  box-shadow: 0 26px 70px rgba(7, 22, 38, 0.34);
}

.box h2 {
  margin: 18px 0 0;
  font-size: 20px;
  font-weight: 600;
}

.box p {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: #5a6577;
}

.spinner {
  width: 34px;
  height: 34px;
  margin: 0 auto;
  border: 3px solid #e3e9f5;
  border-top-color: #1a5ce5;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

.spinner.is-hidden {
  display: none;
}

.retry {
  margin-top: 20px;
  min-height: 44px;
  padding: 0 22px;
  border: 0;
  border-radius: 5px;
  background: #1a5ce5;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}

.retry:hover {
  background: #1549c4;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }
}
</style>
