<script setup>
import { useRouter } from 'vue-router'

/**
 * My Reports 静态 mock
 * 数据全部写死在组件内，不接接口，不含真实交互逻辑。
 */

const router = useRouter()

const user = {
  name: 'John Li',
  org: 'MSD China',
  initials: 'JL',
}

const reports = [
  {
    id: 'china-sales',
    title: 'China Sales Overview',
    description: 'Sales performance and key trends',
    icon: 'bar',
    tone: 'blue',
  },
  {
    id: 'market-share',
    title: 'Market Share Analysis',
    description: 'Market share and competitive analysis',
    icon: 'line',
    tone: 'blue',
  },
  {
    id: 'product-performance',
    title: 'Product Performance',
    description: 'Performance by product and region',
    icon: 'pie',
    tone: 'blue',
  },
  {
    id: 'expense-dashboard',
    title: 'Expense Dashboard',
    description: 'Expense overview and breakdown',
    icon: 'doc',
    tone: 'orange',
  },
  {
    id: 'headcount-trend',
    title: 'Headcount Trend',
    description: 'Headcount, hiring and attrition trend',
    icon: 'people',
    tone: 'blue',
  },
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

    <div class="body">
      <!-- 左侧导航 -->
      <aside class="sidenav">
        <nav aria-label="主导航">
          <a class="nav-item" href="#" aria-current="page" @click.prevent>
            <svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-5v-5h-4v5H5a1 1 0 0 1-1-1Z"
                fill="currentColor"
              />
            </svg>
            <span>My Reports</span>
          </a>
        </nav>
      </aside>

      <!-- 内容区 -->
      <main class="main">
        <div class="page-head">
          <h1>My Reports</h1>
          <p class="subtitle">
            You can access the following reports based on your approved permissions.
          </p>
        </div>

        <div class="toolbar">
          <div class="search">
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6" />
              <path d="m15.4 15.4 4 4" fill="none" stroke="currentColor" stroke-width="1.6" />
            </svg>
            <input
              class="search-input"
              type="search"
              placeholder="Search reports..."
              aria-label="Search reports"
            />
            <button class="sort" type="button" aria-label="Sort reports">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8 5.5v13M8 5.5 5 9M8 5.5l3 3.5M16 18.5v-13M16 18.5 13 15M16 18.5l3-3.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <span class="count">{{ reports.length }} reports</span>
        </div>

        <!-- 报表列表（静态） -->
        <ul class="report-list">
          <li v-for="report in reports" :key="report.id" class="report-row">
            <span class="tile" :class="`tile-${report.tone}`" aria-hidden="true">
              <!-- 柱状图：三根等宽升序柱 -->
              <svg v-if="report.icon === 'bar'" viewBox="0 0 24 24">
                <g fill="currentColor">
                  <rect x="3.2" y="13" width="4.2" height="7" rx="1" />
                  <rect x="10.1" y="8.5" width="4.2" height="11.5" rx="1" />
                  <rect x="17" y="4" width="4.2" height="16" rx="1" />
                </g>
              </svg>
              <!-- 趋势线：折线 + 右上箭头 -->
              <svg v-else-if="report.icon === 'line'" viewBox="0 0 24 24">
                <path
                  d="M3.2 18.2 8.6 12.6l4.2 2.8L20.4 6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.4 6h-4.6M20.4 6v4.6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                />
              </svg>
              <!-- 饼图：整圆 + 一个浅色象限 -->
              <svg v-else-if="report.icon === 'pie'" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8.2" fill="currentColor" />
                <path d="M12 12V3.8A8.2 8.2 0 0 1 20.2 12Z" fill="#fff" opacity="0.45" />
                <path
                  d="M12 12V3.8M12 12h8.2"
                  fill="none"
                  stroke="#fff"
                  stroke-width="1.2"
                />
              </svg>
              <!-- 文档：圆角纸张 + 折角 + 三条文本线 -->
              <svg v-else-if="report.icon === 'doc'" viewBox="0 0 24 24">
                <path
                  d="M7 2.8h6.7l4.3 4.3V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3.8a1 1 0 0 1 1-1Z"
                  fill="currentColor"
                />
                <path
                  d="M13.7 2.8v4.3h4.3"
                  fill="none"
                  stroke="#fff"
                  stroke-width="1.3"
                  stroke-linecap="round"
                />
                <g fill="#fff">
                  <rect x="8.6" y="10.6" width="6.8" height="1.3" rx="0.65" />
                  <rect x="8.6" y="13.6" width="6.8" height="1.3" rx="0.65" />
                  <rect x="8.6" y="16.6" width="4.2" height="1.3" rx="0.65" />
                </g>
              </svg>
              <!-- 用户组：前后两个人形 -->
              <svg v-else viewBox="0 0 24 24">
                <g fill="currentColor">
                  <g opacity="0.85">
                    <circle cx="17.4" cy="8.4" r="2.6" />
                    <path
                      d="M17.4 12.4c2.4 0 4.2 1.5 4.2 3.9V20h-4.4v-3.4c0-1.6-.6-2.9-1.6-3.8.6-.2 1.1-.4 1.8-.4Z"
                    />
                  </g>
                  <circle cx="8.8" cy="7.2" r="3.3" />
                  <path d="M8.8 12.2c3 0 5.2 1.9 5.2 4.7V20H3.6v-3.1c0-2.8 2.2-4.7 5.2-4.7Z" />
                </g>
              </svg>
            </span>

            <h2 class="title">{{ report.title }}</h2>
            <p class="desc">{{ report.description }}</p>

            <router-link
              v-if="report.id === 'china-sales'"
              class="open"
              to="/MyReports/ChinaSalesOverview"
            >
              Open
            </router-link>
            <button v-else class="open" type="button">Open</button>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<style scoped>
.portal {
  --accent: #0b63f6;
  --accent-strong: #0952cc;
  --navy: #1b2559;
  --sub: #777f93;
  --line: #e8ecf3;
  --line-soft: #eef1f6;
  --sidebar-bg: #f7f9fc;
  --sidebar-active: #e8f1fe;
  --search-bg: #f4f6fa;
  --tile-blue: #eaf1fe;
  --tile-orange: #fff1e4;
  --orange: #f5851f;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-surface, #fff);
  color: var(--color-text, #3a4459);
}

/* ===== 顶部导航 ===== */
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

.logout:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 3px;
}

/* ===== 主体两栏 ===== */
.body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.sidenav {
  flex: none;
  width: 160px;
  padding: 10px 0;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--line);
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  margin: 0 8px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  background: var(--sidebar-active);
}

.nav-item::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent);
}

.nav-icon {
  width: 17px;
  height: 17px;
  flex: none;
}

/* ===== 内容区 ===== */
.main {
  flex: 1;
  min-width: 0;
  padding: 26px 32px 40px;
}

.page-head h1 {
  margin: 0;
  font-size: 26px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--navy);
}

.subtitle {
  margin: 4px 0 0;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--sub);
}

/* 搜索栏 */
.toolbar {
  margin-top: 8px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.search {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 38px 0 34px;
  background: var(--search-bg);
  border: 1px solid #e9edf5;
  border-radius: 8px;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 15px;
  height: 15px;
  color: #8d96a8;
}

.search-input {
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0;
  background: none;
  font: inherit;
  font-size: 12.5px;
  color: var(--navy);
  outline: none;
}

.search-input::placeholder {
  color: #9aa3b2;
}

.search-input:focus-visible {
  outline: none;
}

.search:focus-within {
  border-color: #b9cef5;
  background: #f7f9fd;
}

.sort {
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 0;
  background: none;
  color: #6b7488;
  cursor: pointer;
}

.sort svg {
  width: 15px;
  height: 15px;
}

.count {
  flex: none;
  font-size: 11.5px;
  color: var(--color-text-faint, #8b93a3);
  white-space: nowrap;
}

/* ===== 报表列表 ===== */
.report-list {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  background: var(--color-surface, #fff);
  border: 1px solid var(--line);
  border-radius: 10px;
  box-shadow: var(--shadow-sm, 0 2px 10px rgba(20, 34, 58, 0.06));
  overflow: hidden;
}

.report-row {
  display: grid;
  grid-template-columns: 32px 180px minmax(0, 1fr) auto;
  grid-template-areas: 'tile title desc action';
  align-items: center;
  column-gap: 17px;
  min-height: 57px;
  padding: 0 12px 0 14px;
}

.report-row + .report-row {
  border-top: 1px solid var(--line-soft);
}

.tile {
  grid-area: tile;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tile svg {
  width: 19px;
  height: 19px;
}

.tile-blue {
  background: var(--tile-blue);
  color: var(--accent);
}

.tile-orange {
  background: var(--tile-orange);
  color: var(--orange);
}

.title {
  grid-area: title;
  margin: 0;
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--navy);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.desc {
  grid-area: desc;
  margin: 0;
  font-size: 12.5px;
  line-height: 1.4;
  color: var(--sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.open {
  grid-area: action;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 76px;
  height: 32px;
  padding: 0 18px;
  border: 0;
  border-radius: 6px;
  background: var(--accent);
  color: #fff;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.16s ease;
}

.open:hover {
  background: var(--accent-strong);
}

.open:active {
  transform: translateY(1px);
}

.open:focus-visible {
  outline: 2px solid #0a3fa8;
  outline-offset: 3px;
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .brand-title {
    margin-left: 14px;
    font-size: 13.5px;
  }

  .sidenav {
    width: 150px;
  }

  .main {
    padding: 24px 20px 32px;
  }

  .report-row {
    grid-template-columns: 32px 150px minmax(0, 1fr) auto;
    column-gap: 14px;
    padding: 0 14px;
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

  .body {
    flex-direction: column;
  }

  .sidenav {
    width: auto;
    padding: 8px 0;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .nav-item::before {
    left: 0;
  }

  .main {
    padding: 18px 16px 28px;
  }

  .page-head h1 {
    font-size: 21px;
  }

  .search {
    height: 34px;
  }

  .report-row {
    grid-template-columns: 32px minmax(0, 1fr) auto;
    grid-template-areas:
      'tile title action'
      'tile desc action';
    row-gap: 3px;
    padding: 12px 14px;
  }

  .title,
  .desc {
    white-space: normal;
  }

  .open {
    min-width: 64px;
    padding: 0 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .open {
    transition: none;
  }
}
</style>
