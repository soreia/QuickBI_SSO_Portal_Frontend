<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { startMsdLogin } from '@/api/auth'

/**
 * QuickBI SSO Portal 登录页（视觉稿复刻）
 * 说明：登录按钮走 MSD Entra ID 单点登录，由后端 /auth/msd/authorize 发起 OIDC 流程。
 */

const toastOn = ref(false)
const toastText = ref('')
let toastTimer = null

function notify(title, body) {
  toastText.value = title ? `${title}：${body}` : body
  toastOn.value = true
  clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toastOn.value = false
  }, 2800)
}

function signIn() {
  startMsdLogin()
}

onBeforeUnmount(() => {
  clearTimeout(toastTimer)
})
</script>

<template>
  <div class="page">
    <!-- 背景 -->
    <div class="bg" aria-hidden="true">
      <img src="../assets/login-bg.jpg" alt="" />
      <div class="scrim"></div>
    </div>

    <!-- 登录卡片 -->
    <main class="center">
      <section class="card" aria-labelledby="portal-title">
        <div class="brand">
          <div class="brand-row">
            <svg class="brand-mark" viewBox="0 0 48 48" role="img" aria-label="MSD">
              <g fill="#0a7b66">
                <ellipse cx="24" cy="16.4" rx="11.2" ry="13" />
                <ellipse cx="24" cy="31.6" rx="11.2" ry="13" />
                <ellipse cx="16.4" cy="24" rx="13" ry="11.2" />
                <ellipse cx="31.6" cy="24" rx="13" ry="11.2" />
              </g>
              <circle cx="24" cy="24" r="5" fill="#fff" />
            </svg>
            <div class="brand-name">MSD</div>
          </div>
          <div class="brand-tag">INVENTING FOR LIFE</div>
        </div>

        <h1 id="portal-title">
          <span>Welcome to</span>
          <span class="l2">QuickBI SSO Portal</span>
        </h1>

        <p class="lead">Access your authorized QuickBI reports with your MSD corporate account.</p>

        <button class="signin" type="button" @click="signIn">
          <span class="win-grid" aria-hidden="true">
            <i></i><i></i><i></i><i></i>
          </span>
          Sign in with MSD
        </button>

        <button
          class="help"
          type="button"
          @click="notify('Contact IT Support', 'IT Support 工单入口在此为演示占位。')"
        >
          Need help? Contact IT Support
        </button>
      </section>

      <aside class="hero-copy" aria-label="Slogan">
        <em>Better</em>
        <em>data.</em>
        <em>Brighter</em>
        <em>decisions.</em>
        <em>For a healthier</em>
        <em>tomorrow.</em>
      </aside>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="copy">© 2024 Merck &amp; Co., Inc., Rahway, NJ, USA. All rights reserved.</div>
      <nav>
        <a href="#privacy" @click.prevent="notify('Privacy', '隐私声明页面为演示占位。')">Privacy</a>
        <a href="#terms" @click.prevent="notify('Terms', '使用条款页面为演示占位。')">Terms</a>
        <a href="#support" @click.prevent="notify('Support', '支持中心页面为演示占位。')">Support</a>
      </nav>
    </footer>

    <!-- Toast -->
    <div class="toast" :class="{ 'is-on': toastOn }" role="status" aria-live="polite">
      {{ toastText }}
    </div>
  </div>
</template>

<style scoped>
.page {
  --ink: #1e2a47;
  --muted: #5a6577;
  --brand-blue: #1a5ce5;
  --brand-blue-hover: #1549c4;
  --card-w: 540px;

  position: relative;
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #0d2233;
  font-family:
    'Segoe UI Variable Display', 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue',
    'PingFang SC', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ===== 背景 ===== */
.bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 58%;
  display: block;
}

.scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(9, 26, 42, 0.28) 0%,
      rgba(9, 26, 42, 0.06) 34%,
      rgba(9, 26, 42, 0.12) 62%,
      rgba(9, 26, 42, 0.5) 100%
    ),
    radial-gradient(120% 90% at 50% 42%, rgba(6, 20, 32, 0) 46%, rgba(6, 20, 32, 0.34) 100%);
}

/* ===== 主内容 ===== */
.center {
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 24px 40px;
}

.card {
  width: 100%;
  max-width: var(--card-w);
  min-width: 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px 40px 24px;
  box-shadow:
    0 26px 70px rgba(7, 22, 38, 0.34),
    0 2px 6px rgba(7, 22, 38, 0.16);
  text-align: center;
}

/* logo */
.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 52px;
  height: 52px;
  display: block;
}

.brand-name {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--ink);
  line-height: 1;
}

.brand-tag {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.24em;
  color: #0a7b66;
  line-height: 1;
}

/* headline */
h1 {
  margin: 22px 0 0;
  font-size: 30px;
  line-height: 1.28;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.01em;
}

h1 span {
  display: block;
}

h1 .l2 {
  font-weight: 700;
}

.lead {
  margin: 12px auto 0;
  max-width: 288px;
  font-size: 15px;
  line-height: 1.66;
  color: var(--muted);
  font-weight: 400;
}

/* 登录按钮 */
.signin {
  margin-top: 24px;
  width: 100%;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 0;
  border-radius: 5px;
  background: var(--brand-blue);
  color: #fff;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    background 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
  box-shadow: 0 6px 16px rgba(26, 92, 229, 0.22);
}

.signin:hover {
  background: var(--brand-blue-hover);
  box-shadow: 0 8px 20px rgba(26, 92, 229, 0.28);
}

.signin:active {
  transform: translateY(1px);
}

.signin:focus-visible {
  outline: 2px solid #0a3fa8;
  outline-offset: 3px;
}

.win-grid {
  display: grid;
  grid-template-columns: 7px 7px;
  grid-template-rows: 7px 7px;
  gap: 2px;
  flex: none;
}

.win-grid i {
  background: #fff;
  border-radius: 1px;
  display: block;
}

.help {
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0 6px;
  font-size: 13px;
  color: var(--brand-blue);
  text-decoration: none;
  border: 0;
  background: none;
  font-family: inherit;
  cursor: pointer;
}

.help:hover {
  text-decoration: underline;
}

.help:focus-visible {
  outline: 2px solid var(--brand-blue);
  outline-offset: 3px;
  border-radius: 3px;
}

/* 右侧标语 */
.hero-copy {
  position: absolute;
  right: 5.5%;
  top: 50%;
  transform: translateY(-52%);
  max-width: 300px;
  text-align: right;
  color: #fff;
  font-size: 27px;
  line-height: 1.3;
  font-weight: 500;
  letter-spacing: 0.005em;
  text-shadow: 0 2px 14px rgba(4, 16, 28, 0.55);
}

.hero-copy em {
  display: block;
  font-style: normal;
  white-space: nowrap;
}

/* 页脚 */
.footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 22px 16px;
  font-size: 10px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.82);
  text-shadow: 0 1px 6px rgba(4, 16, 28, 0.5);
}

.footer .copy {
  max-width: 62%;
}

.footer nav {
  display: flex;
  gap: 16px;
  flex: none;
}

.footer nav a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 10.5px;
  cursor: pointer;
  border: 0;
  background: none;
  padding: 0;
  font-family: inherit;
}

.footer nav a:hover {
  text-decoration: underline;
}

.footer nav a:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.85);
  outline-offset: 3px;
}

/* toast */
.toast {
  position: fixed;
  left: 50%;
  bottom: 64px;
  transform: translate(-50%, 10px);
  background: rgba(14, 26, 40, 0.94);
  color: #fff;
  font-size: 12.5px;
  line-height: 1.5;
  padding: 10px 18px;
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(4, 14, 26, 0.4);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
  z-index: 20;
  max-width: calc(100vw - 36px);
  text-align: center;
}

.toast.is-on {
  opacity: 1;
  transform: translate(-50%, 0);
}

/* ===== 响应式 ===== */
@media (max-width: 1080px) {
  .hero-copy {
    position: static;
    transform: none;
    max-width: 340px;
    margin: 30px auto 0;
    text-align: center;
    font-size: 16px;
    white-space: normal;
    line-height: 1.55;
    text-shadow: 0 1px 10px rgba(4, 16, 28, 0.6);
  }

  .center {
    padding: 48px 22px 30px;
  }

  .hero-copy em {
    white-space: normal;
  }
}

@media (max-width: 520px) {
  .center {
    padding: 34px 16px 22px;
  }

  .card {
    max-width: 100%;
    padding: 28px 22px 20px;
  }

  .hero-copy {
    max-width: 100%;
  }

  .footer {
    width: 100%;
    box-sizing: border-box;
  }

  .footer .copy {
    word-break: break-word;
  }

  h1 {
    font-size: 24px;
  }

  .lead {
    font-size: 14.5px;
    line-height: 1.62;
  }

  .brand-mark {
    width: 42px;
    height: 42px;
  }

  .brand-name {
    font-size: 20px;
  }

  .help {
    min-height: 44px;
    font-size: 13px;
  }

  .hero-copy {
    font-size: 16px;
    margin-top: 22px;
    line-height: 1.45;
  }

  .footer {
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
    padding: 12px 16px 14px;
    font-size: 12px;
  }

  .footer .copy {
    max-width: 100%;
  }

  .footer nav {
    gap: 14px;
  }

  .footer nav a {
    font-size: 12px;
    padding: 10px 4px;
    min-height: 44px;
    min-width: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .toast {
    bottom: 80px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signin,
  .toast {
    transition: none;
  }
}
</style>
