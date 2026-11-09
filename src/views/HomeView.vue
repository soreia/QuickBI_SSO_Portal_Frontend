<script setup>
const stack = [
  { name: 'Vue', version: '3.5' },
  { name: 'Vue Router', version: '4.6' },
  { name: 'Vite', version: '7.3' },
  { name: 'ESLint', version: '10' },
  { name: 'Prettier', version: '3.9' },
]
</script>

<template>
  <main class="page">
    <div class="panel">
      <h1>QuickBI SSO Portal Frontend</h1>
      <p class="lead">前端空白工程已就绪，可直接在此骨架上开发业务页面。</p>

      <ul class="stack">
        <li v-for="item in stack" :key="item.name">
          <span class="name">{{ item.name }}</span>
          <span class="ver">{{ item.version }}</span>
        </li>
      </ul>

      <nav class="links">
        <router-link to="/MyReports">前往 MyReports</router-link>
        <router-link to="/AuditLogs">前往 Audit Logs</router-link>
        <router-link to="/UserAccessSync">前往 User Access Sync</router-link>
        <router-link to="/CommonError">前往 Common Error</router-link>
        <router-link to="/login">前往登录页</router-link>
      </nav>
    </div>
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

.panel {
  width: 100%;
  max-width: 560px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 34px 32px 30px;
  box-shadow: var(--shadow-sm);
}

h1 {
  margin: 0;
  font-size: 24px;
  letter-spacing: -0.01em;
  color: var(--color-text-strong);
}

.lead {
  margin: 10px 0 22px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.stack {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--color-border);
}

.stack li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 13px;
}

.name {
  color: var(--color-text-strong);
  font-weight: 600;
}

.ver {
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}

.links {
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.links a {
  font-size: 13px;
  color: var(--color-brand);
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style>
