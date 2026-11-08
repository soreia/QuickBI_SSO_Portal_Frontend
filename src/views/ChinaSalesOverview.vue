<script setup>
import { useRouter } from 'vue-router'

/**
 * China Sales Overview 静态 mock
 * 图表用内联 SVG / 纯 CSS 绘制，数据写死，无接口与交互逻辑。
 */

const router = useRouter()

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// 单位：百万
const trend = [2.4, 3.4, 4.6, 5.9, 7.1, 9.5, 12.8, 15.1, 14.9, 14.2, 12.8, 14.7]

const chart = { width: 480, height: 168, left: 34, right: 12, top: 10, bottom: 24 }
const plotW = chart.width - chart.left - chart.right
const plotH = chart.height - chart.top - chart.bottom

function xAt(i) {
  return chart.left + (plotW / (months.length - 1)) * i
}

function yAt(v) {
  return chart.top + plotH - (v / 20) * plotH
}

const points = trend.map((v, i) => ({ x: xAt(i), y: yAt(v), v }))
const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ')
const areaPath = `${linePath} L${points[points.length - 1].x} ${chart.top + plotH} L${points[0].x} ${chart.top + plotH} Z`

const kpis = [
  { label: 'Total Sales', value: '¥125M', yoy: '8.2%' },
  { label: 'Total Orders', value: '8,432', yoy: '6.1%' },
  { label: 'Active Customers', value: '1,246', yoy: '5.3%' },
  { label: 'Market Share', value: '28.6%', yoy: '2.9%' },
]

const products = [
  { name: 'Product A', share: '42%', color: '#56b4f5' },
  { name: 'Product B', share: '28%', color: '#1e7fe0' },
  { name: 'Product C', share: '18%', color: '#00b8d9' },
  { name: 'Product D', share: '12%', color: '#0b63f6' },
]

const user = { name: 'John Li', org: 'MSD China', initials: 'JL' }
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

    <main class="main">
      <!-- 面包屑 -->
      <nav class="crumbs" aria-label="面包屑">
        <router-link to="/MyReports" class="crumb-link">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M14.5 6.5 9 12l5.5 5.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          My Reports
        </router-link>
        <span class="crumb-sep">/</span>
        <span class="crumb-current">China Sales Overview</span>
      </nav>

      <div class="page-head">
        <h1>China Sales Overview</h1>
        <button class="fullscreen" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
          Full Screen
        </button>
      </div>

      <!-- 报表区（模拟嵌入的 QuickBI 仪表板） -->
      <section class="dashboard" aria-label="China Sales Overview dashboard">
        <div class="qb-bar">
          <div class="qb-brand">
            <svg class="qb-logo" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="#fff" />
              <path
                d="M12 6.4a5.6 5.6 0 0 1 0 11.2c-2 0-3.4-1-4.2-2.5 1.3.5 3.2.2 4-1.3.6-1.2.4-2.8-.6-3.8a3.2 3.2 0 0 0-4.4-.2A5.6 5.6 0 0 1 12 6.4Z"
                fill="#0b2b47"
              />
            </svg>
            <span class="qb-name">Quick BI</span>
          </div>

          <nav class="qb-nav" aria-label="QuickBI 导航">
            <span class="qb-tab qb-tab-active">Analyze</span>
            <span class="qb-tab">Design</span>
            <span class="qb-tab">Auto Data</span>
            <span class="qb-tab">View</span>
          </nav>

          <div class="qb-actions">
            <span class="qb-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="1.8" />
                <path d="m15 15 4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" />
              </svg>
            </span>
            <span class="qb-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.6" />
                <path
                  d="M9.4 9.3a2.7 2.7 0 1 1 3.4 3.6c-.6.3-.8.7-.8 1.3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
                <circle cx="12" cy="17" r="1.1" fill="currentColor" />
              </svg>
            </span>
            <span class="qb-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.6" />
                <path
                  d="M12 3.6v2.2M12 18.2v2.2M3.6 12h2.2M18.2 12h2.2M5.9 5.9l1.6 1.6M16.5 16.5l1.6 1.6M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
              </svg>
            </span>
            <span class="qb-avatar" aria-hidden="true">JL</span>
          </div>
        </div>

        <div class="canvas">
          <!-- KPI 卡片 -->
          <div class="kpi-grid">
            <div v-for="kpi in kpis" :key="kpi.label" class="kpi-card">
              <div class="kpi-main">
                <span class="kpi-label">{{ kpi.label }}</span>
                <strong class="kpi-value">{{ kpi.value }}</strong>
                <span class="kpi-yoy">↑ {{ kpi.yoy }} YoY</span>
              </div>
              <div v-if="kpi.label === 'Market Share'" class="kpi-tools">
                <span class="kpi-tool" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M19 12a7 7 0 1 1-2.4-5.3M19 4.6v3.6h-3.6"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                <span class="kpi-tool" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                <span class="kpi-tool" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="6" cy="12" r="1.4" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.4" fill="currentColor" />
                    <circle cx="18" cy="12" r="1.4" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <!-- 图表卡片 -->
          <div class="chart-grid">
            <div class="panel">
              <h2 class="panel-title">Sales Trend (Monthly)</h2>
              <svg class="line-chart" :viewBox="`0 0 ${chart.width} ${chart.height}`" role="img" aria-label="Sales trend by month">
                <g stroke="#e6ecf5" stroke-width="1">
                  <line
                    v-for="tick in [0, 5, 10, 15, 20]"
                    :key="tick"
                    :x1="chart.left"
                    :x2="chart.width - chart.right"
                    :y1="yAt(tick)"
                    :y2="yAt(tick)"
                  />
                </g>
                <path :d="areaPath" fill="#2f80ed" opacity="0.06" />
                <path :d="linePath" fill="none" stroke="#2f80ed" stroke-width="2" stroke-linejoin="round" />
                <circle
                  v-for="(p, i) in points"
                  :key="i"
                  :cx="p.x"
                  :cy="p.y"
                  r="3.2"
                  fill="#2f80ed"
                />
                <g fill="#8a96aa" font-size="9">
                  <text
                    v-for="tick in [20, 15, 10, 5, 0]"
                    :key="tick"
                    :x="chart.left - 8"
                    :y="yAt(tick) + 3"
                    text-anchor="end"
                  >
                    {{ tick }}M
                  </text>
                  <text
                    v-for="(m, i) in months"
                    :key="m"
                    :x="xAt(i)"
                    :y="chart.height - 7"
                    text-anchor="middle"
                  >
                    {{ m }}
                  </text>
                </g>
              </svg>
            </div>

            <div class="panel">
              <h2 class="panel-title">Sales by Product</h2>
              <div class="donut-wrap">
                <div class="donut" aria-hidden="true"></div>
                <ul class="legend">
                  <li v-for="p in products" :key="p.name">
                    <span class="legend-dot" :style="{ background: p.color }"></span>
                    <span class="legend-name">{{ p.name }}</span>
                    <span class="legend-value">{{ p.share }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.portal {
  --accent: #0b63f6;
  --navy: #1b2559;
  --page-ink: #0f1e45;
  --sub: #777f93;
  --line: #e8ecf3;
  --line-soft: #eef1f6;
  --canvas-bg: #f4f7fb;
  --card-line: #e3e9f2;
  --green: #1fc16b;

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
  color: var(--color-text-faint, #8b93a3);
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

/* ===== 页面 ===== */
.main {
  flex: 1;
  min-width: 0;
  padding: 18px 24px 32px;
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
}

.crumb-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #5b9bf8;
  text-decoration: none;
}

.crumb-link svg {
  width: 14px;
  height: 14px;
}

.crumb-link:hover {
  text-decoration: underline;
}

.crumb-sep {
  color: #b4bdcc;
}

.crumb-current {
  color: #6b7789;
}

.page-head {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.page-head h1 {
  margin: 0;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--page-ink);
}

.fullscreen {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 0;
  padding: 0;
  background: none;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  color: #4c5f7d;
  cursor: pointer;
  white-space: nowrap;
}

.fullscreen svg {
  width: 14px;
  height: 14px;
}

.fullscreen:hover {
  color: var(--accent);
}

/* ===== 仪表板外壳 ===== */
.dashboard {
  margin: 14px 16px 0 64px;
  border: 1px solid #e1e8f2;
  border-radius: 8px;
  background: var(--canvas-bg);
  box-shadow: 0 2px 10px rgba(20, 34, 58, 0.05);
  overflow: hidden;
}

/* QuickBI 深色栏 */
.qb-bar {
  height: 40px;
  padding: 0 14px 0 12px;
  display: flex;
  align-items: center;
  background: #0b2b47;
  color: #fff;
}

.qb-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
}

.qb-logo {
  width: 20px;
  height: 20px;
}

.qb-name {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

.qb-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-left: 28px;
  height: 100%;
}

.qb-tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
  font-size: 11.5px;
  color: #c3d0e0;
  white-space: nowrap;
}

.qb-tab-active {
  color: #fff;
  font-weight: 600;
}

.qb-tab-active::after {
  content: '';
  position: absolute;
  left: -4px;
  right: -4px;
  bottom: 0;
  height: 2px;
  background: #7fb2ff;
}

.qb-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 14px;
}

.qb-icon {
  display: inline-flex;
  color: #dbe4ef;
}

.qb-icon svg {
  width: 15px;
  height: 15px;
}

.qb-avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #1b5cd6;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 画布 */
.canvas {
  padding: 12px 14px 14px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.kpi-card {
  position: relative;
  min-height: 82px;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid var(--card-line);
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
}

.kpi-main {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.kpi-label {
  font-size: 11px;
  color: #5a6884;
  white-space: nowrap;
}

.kpi-value {
  font-size: 20px;
  line-height: 1.15;
  font-weight: 700;
  color: var(--page-ink);
}

.kpi-yoy {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--green);
}

.kpi-tools {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.kpi-tool {
  width: 19px;
  height: 19px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e4eaf3;
  border-radius: 3px;
  background: #fbfcfe;
  color: #97a3b8;
}

.kpi-tool svg {
  width: 11px;
  height: 11px;
}

/* 图表 */
.chart-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);
  gap: 12px;
}

.panel {
  background: #fff;
  border: 1px solid var(--card-line);
  border-radius: 5px;
  padding: 12px 14px 10px;
  min-width: 0;
}

.panel-title {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--page-ink);
}

.line-chart {
  display: block;
  width: 100%;
  height: auto;
}

.donut-wrap {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 8px 18px;
}

.donut {
  flex: none;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: conic-gradient(
    #56b4f5 0 41.5%,
    #fff 41.5% 42.5%,
    #1e7fe0 42.5% 69.5%,
    #fff 69.5% 70.5%,
    #00b8d9 70.5% 87.5%,
    #fff 87.5% 88.5%,
    #0b63f6 88.5% 100%
  );
  position: relative;
}

.donut::after {
  content: '';
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  background: #fff;
}

.legend {
  margin: 0;
  padding: 0;
  list-style: none;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.legend li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #4a5875;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex: none;
}

.legend-name {
  white-space: nowrap;
}

.legend-value {
  margin-left: auto;
  color: #6b7a90;
}

/* ===== 响应式 ===== */
@media (max-width: 960px) {
  .dashboard {
    margin-left: 0;
    margin-right: 0;
  }
}

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
    padding: 16px 16px 24px;
  }

  .page-head h1 {
    font-size: 19px;
  }

  .qb-nav {
    display: none;
  }

  .kpi-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .chart-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .donut-wrap {
    gap: 16px;
    padding: 8px 4px 12px;
  }

  .donut {
    width: 88px;
    height: 88px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fullscreen {
    transition: none;
  }
}
</style>
