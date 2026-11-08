<script setup>
import { ref } from 'vue'

const pending = ref(false)

/**
 * 占位实现：正式接入时替换为 SSO 授权跳转
 * 例：window.location.href = `${ssoAuthorizeUrl}?client_id=...&redirect_uri=...`
 */
function startSso() {
  pending.value = true
  window.setTimeout(() => {
    pending.value = false
  }, 1200)
}
</script>

<template>
  <main class="page">
    <section class="card">
      <h1>登录 QuickBI SSO Portal</h1>
      <p class="lead">使用企业账号登录，以访问已授权的 QuickBI 报表。</p>

      <button class="btn" type="button" :disabled="pending" @click="startSso">
        {{ pending ? '正在跳转…' : '使用企业账号登录' }}
      </button>

      <p class="hint">当前为工程占位页，尚未接入真实 SSO 服务。</p>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
}

.card {
  width: 100%;
  max-width: 400px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 34px 30px 26px;
  box-shadow: var(--shadow-sm);
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 22px;
  color: var(--color-text-strong);
  letter-spacing: -0.01em;
}

.lead {
  margin: 12px auto 24px;
  max-width: 300px;
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--color-text-muted);
}

.btn {
  width: 100%;
  min-height: 46px;
  border: 0;
  border-radius: 6px;
  background: var(--color-brand);
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease;
}

.btn:hover:not(:disabled) {
  background: var(--color-brand-strong);
}

.btn:disabled {
  opacity: 0.7;
  cursor: progress;
}

.btn:focus-visible {
  outline: 2px solid var(--color-brand-strong);
  outline-offset: 3px;
}

.hint {
  margin: 18px 0 0;
  font-size: 12px;
  color: var(--color-text-faint);
}
</style>
