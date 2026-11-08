<script setup>
import { useRouter } from 'vue-router'

/**
 * Common Error 静态 mock
 * 无交互逻辑；仅 "Back to My Reports" 为路由跳转。
 */

const router = useRouter()

const user = { name: 'John Li', org: 'MSD China', initials: 'JL' }

const tips = [
  'Check your network connection (MSD corporate network)',
  'Try again later',
  'Return to My Reports',
  'Contact IT Support if the problem persists',
]
</script>

<template>
  <div class="portal">
    <!-- 顶部导航 -->
    <header class="topbar">
      <div class="brand">
        <svg class="brand-mark" viewBox="0 0 48 48" role="img" aria-label="MSD">
          <g fill="#0a7b66">
            <ellipse cx="24" cy="16.4" rx="11.2" ry="13" />
            <ellipse cx="24" cy="31.6" rx="11.2" ry="13" />
            <ellipse cx="16.4" cy="24" rx="13" ry="11.2" />
            <ellipse cx="31.6" cy="24" rx="13" ry="11.2" />
          </g>
          <circle cx="24" cy="24" r="5" fill="#fff" />
        </svg>
        <span class="brand-word">MSD</span>
        <span class="brand-title">QuickBI SSO Portal</span>
      </div>

      <div class="account">
        <span class="avatar" aria-hidden="true">{{ user.initials }}</span>
        <div class="account-text">
          <span class="account-name">{{ user.name }}</span>
          <span class="account-org">{{ user.org }}</span>
        </div>
        <span class="account-divider" aria-hidden="true"></span>
        <button class="logout" type="button" @click="router.push('/')">Logout</button>
      </div>
    </header>

    <!-- 错误提示 -->
    <main class="main">
      <div class="state">
        <svg class="state-art" viewBox="0 0 150 96" aria-hidden="true">
          <g fill="#eef3f8">
            <ellipse cx="46" cy="62" rx="34" ry="24" />
            <ellipse cx="100" cy="58" rx="38" ry="26" />
            <ellipse cx="74" cy="40" rx="30" ry="22" />
            <ellipse cx="62" cy="76" rx="22" ry="14" />
          </g>
          <g>
            <circle cx="75" cy="44" r="27" fill="#f5484e" />
            <rect x="73.2" y="28" width="3.6" height="20" rx="1.8" fill="#fff" />
            <circle cx="75" cy="55.6" r="2.3" fill="#fff" />
          </g>
        </svg>

        <h1>Unable to load the report</h1>
        <p class="message">
          The report may have expired, you do not have access, or it is temporarily unavailable.
        </p>

        <section class="tipbox" aria-label="Try the following">
          <h2>Please try the following:</h2>
          <ul>
            <li v-for="tip in tips" :key="tip">{{ tip }}</li>
          </ul>
        </section>

        <div class="actions">
          <button class="btn btn-primary" type="button">Try Again</button>
          <router-link class="btn btn-outline" to="/MyReports">Back to My Reports</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.portal {
  --accent: #0b63f6;
  --accent-strong: #0952cc;
  --navy: #1b2559;
  --sub: #5b6885;
  --line: #e8ecf3;
  --tiny: #8b93a3;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-surface, #fff);
  color: var(--color-text, #3a4459);
}

/* ===== 顶部导航（与 MyReports 一致） ===== */
.topbar {
  flex: none;
  height: 62px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background: var(--color-surface, #fff);
  border-bottom: 1px solid var(--line);
}

.brand {
  display: flex;
  align-items: center;
  min-width: 0;
}

.brand-mark {
  width: 32px;
  height: 32px;
  flex: none;
}

.brand-word {
  margin-left: 10px;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: 0.01em;
  line-height: 1;
  color: #0a7b66;
}

.brand-title {
  margin-left: 20px;
  font-size: 15px;
  font-weight: 700;
  color: var(--navy);
  white-space: nowrap;
}

.account {
  display: flex;
  align-items: center;
  flex: none;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #dceaff;
  color: #1b5cd6;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.03em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.account-text {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}

.account-name {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--navy);
}

.account-org {
  font-size: 10.5px;
  color: var(--tiny);
}

.account-divider {
  width: 1px;
  height: 26px;
  margin: 0 18px;
  background: var(--line);
}

.logout {
  border: 0;
  padding: 0;
  background: none;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
}

.logout:hover {
  text-decoration: underline;
}

/* ===== 错误状态 ===== */
.main {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 14px 24px 40px;
}

.state {
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.state-art {
  width: 150px;
  height: 96px;
  margin-top: 0;
}

.state h1 {
  margin: 10px 0 0;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--navy);
}

.message {
  margin: 6px 0 0;
  max-width: 340px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--sub);
}

.tipbox {
  width: 100%;
  margin-top: 16px;
  padding: 13px 18px 14px;
  background: #f4f7fb;
  border-radius: 8px;
  text-align: left;
}

.tipbox h2 {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--navy);
}

.tipbox ul {
  margin: 0;
  padding: 0 0 0 18px;
  list-style: none;
}

.tipbox li {
  position: relative;
  padding-left: 12px;
  font-size: 12.5px;
  line-height: 1.5;
  color: #3f4b66;
}

.tipbox li + li {
  margin-top: 4px;
}

.tipbox li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #1b2559;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  margin-top: 18px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 6px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
}

.btn-primary {
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
}

.btn-primary:hover {
  background: var(--accent-strong);
  border-color: var(--accent-strong);
}

.btn-outline {
  border: 1.5px solid var(--accent);
  background: #fff;
  color: var(--accent);
}

.btn-outline:hover {
  background: #f2f7ff;
}

.btn:focus-visible {
  outline: 2px solid #0a3fa8;
  outline-offset: 3px;
}

/* ===== 响应式 ===== */
@media (max-width: 720px) {
  .topbar {
    height: 58px;
    padding: 0 16px;
  }

  .brand-title {
    display: none;
  }

  .account-divider {
    margin: 0 12px;
  }

  .main {
    padding: 16px 16px 32px;
  }

  .state h1 {
    font-size: 19px;
  }

  .actions {
    gap: 12px;
  }
}

@media (max-width: 420px) {
  .actions {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
</style>
