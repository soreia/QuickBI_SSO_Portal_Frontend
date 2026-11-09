<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

/**
 * User & Access Sync 静态 mock（Users 主界面）
 * 数据全部写死在组件内，不接接口，不做真实交互。
 */

const router = useRouter()

const user = { name: 'John Li', org: 'MSD China', initials: 'JL' }

const BASE_ROWS = [
  {
    id: 'LI123456',
    name: 'John Li',
    department: 'Commercial',
    msdStatus: 'Active',
    account: 'MSD_LI123456',
    userId: '7f5a9c12...',
    mapping: 'Mapped',
    sync: 'Success',
    reports: 5,
    date: 'Oct 24, 2026',
    time: '10:32',
  },
  {
    id: 'ZH987654',
    name: 'Mary Zhang',
    department: 'Finance',
    msdStatus: 'Active',
    account: 'MSD_ZH987654',
    userId: '3c8d7e44...',
    mapping: 'Mapped',
    sync: 'Success',
    reports: 3,
    date: 'Oct 24, 2026',
    time: '10:21',
  },
  {
    id: 'CH321789',
    name: 'Wei Chen',
    department: 'Operations',
    msdStatus: 'Active',
    account: 'MSD_CH321789',
    userId: 'a1d9f0c3...',
    mapping: 'Mapped',
    sync: 'Success',
    reports: 4,
    date: 'Oct 24, 2026',
    time: '09:55',
  },
  {
    id: 'WA456123',
    name: 'Lucy Wang',
    department: 'People & Org',
    msdStatus: 'Active',
    account: 'MSD_WA456123',
    userId: '9b2c4e55...',
    mapping: 'Pending',
    sync: 'Partial',
    reports: 2,
    date: 'Oct 23, 2026',
    time: '18:20',
  },
  {
    id: 'XU789321',
    name: 'David Xu',
    department: 'Commercial',
    msdStatus: 'Inactive',
    account: 'MSD_XU789321',
    userId: 'f4e7b9d1...',
    mapping: 'Not Mapped',
    sync: 'N/A',
    reports: 0,
    date: '-',
    time: '',
  },
  {
    id: 'LI998877',
    name: 'Emily Luo',
    department: 'Finance',
    msdStatus: 'Active',
    account: 'MSD_LI998877',
    userId: '6a9e2d11...',
    mapping: 'Mapped',
    sync: 'Success',
    reports: 6,
    date: 'Oct 24, 2026',
    time: '10:18',
  },
]

/** 追加 mock（44 条）：[ISID, 姓名, Department, MSD 状态, Mapping Status, User Sync Status, User ID, 报表数, 日期, 时间] */
const MORE_ROWS = [
  [
    'AN112233',
    'Anna Ng',
    'Commercial',
    'Active',
    'Mapped',
    'Success',
    '3c7f1a92...',
    4,
    'Oct 23, 2026',
    '16:05',
  ],
  [
    'KE445566',
    'Kevin Zhao',
    'Finance',
    'Active',
    'Mapped',
    'Success',
    '8d2b6e41...',
    7,
    'Oct 23, 2026',
    '14:52',
  ],
  [
    'SO778899',
    'Sophie Lin',
    'Operations',
    'Active',
    'Mapped',
    'Success',
    '1f9c3d55...',
    5,
    'Oct 23, 2026',
    '11:38',
  ],
  [
    'PM220011',
    'Peter Ma',
    'People & Org',
    'Inactive',
    'Pending',
    'Partial',
    '4a8e7c12...',
    2,
    'Oct 22, 2026',
    '17:20',
  ],
  [
    'GH334455',
    'Grace Hu',
    'Marketing',
    'Active',
    'Mapped',
    'Success',
    '9b5d2f68...',
    3,
    'Oct 22, 2026',
    '15:40',
  ],
  [
    'RT556677',
    'Ryan Tang',
    'Commercial',
    'Active',
    'Not Mapped',
    'N/A',
    '2e6a4b97...',
    0,
    'Oct 22, 2026',
    '13:15',
  ],
  [
    'NG668899',
    'Nina Gu',
    'Finance',
    'Active',
    'Mapped',
    'Success',
    '7c1f9a34...',
    6,
    'Oct 22, 2026',
    '10:02',
  ],
  [
    'ES770011',
    'Eric Shen',
    'Operations',
    'Inactive',
    'Pending',
    'Partial',
    '5d3b8e72...',
    1,
    'Oct 21, 2026',
    '16:48',
  ],
  [
    'IF881122',
    'Ivy Fang',
    'People & Org',
    'Active',
    'Mapped',
    'Success',
    'c4a7e913...',
    4,
    'Oct 21, 2026',
    '14:26',
  ],
  [
    'LD992233',
    'Leo Dai',
    'Marketing',
    'Active',
    'Mapped',
    'Partial',
    '3b9d1c65...',
    5,
    'Oct 21, 2026',
    '09:37',
  ],
  [
    'ZQ103344',
    'Zoe Qin',
    'Commercial',
    'Active',
    'Pending',
    'Partial',
    '6e2f7a18...',
    2,
    'Oct 20, 2026',
    '17:05',
  ],
  [
    'SB114455',
    'Sean Bao',
    'Finance',
    'Inactive',
    'Not Mapped',
    'N/A',
    'a8c3d529...',
    0,
    'Oct 20, 2026',
    '15:19',
  ],
  [
    'AP125566',
    'Amy Pan',
    'Operations',
    'Active',
    'Mapped',
    'Success',
    '1d6b4e83...',
    8,
    'Oct 20, 2026',
    '11:44',
  ],
  [
    'TY136677',
    'Tony Ye',
    'People & Org',
    'Active',
    'Mapped',
    'Success',
    '9e5a2f47...',
    3,
    'Oct 19, 2026',
    '16:31',
  ],
  [
    'CX147788',
    'Coco Xia',
    'Marketing',
    'Active',
    'Pending',
    'Partial',
    '4f8c1b96...',
    2,
    'Oct 19, 2026',
    '14:08',
  ],
  [
    'JL158899',
    'Jack Lou',
    'Commercial',
    'Active',
    'Mapped',
    'Success',
    '8a3d6c25...',
    6,
    'Oct 19, 2026',
    '10:53',
  ],
  [
    'BH169911',
    'Bella Han',
    'Finance',
    'Active',
    'Mapped',
    'Success',
    '2c7e9b54...',
    5,
    'Oct 18, 2026',
    '17:12',
  ],
  [
    'OL170022',
    'Owen Lu',
    'Operations',
    'Inactive',
    'Not Mapped',
    'N/A',
    '5b1f8d73...',
    0,
    'Oct 18, 2026',
    '15:05',
  ],
  [
    'KS181133',
    'Kira Su',
    'People & Org',
    'Active',
    'Mapped',
    'Partial',
    '7e4a2c19...',
    3,
    'Oct 18, 2026',
    '11:20',
  ],
  [
    'HW192244',
    'Hank Wei',
    'Marketing',
    'Active',
    'Mapped',
    'Success',
    '3a9c5e68...',
    7,
    'Oct 17, 2026',
    '16:02',
  ],
  [
    'LD203355',
    'Lily Deng',
    'Commercial',
    'Active',
    'Pending',
    'Partial',
    '6d1b7f42...',
    2,
    'Oct 17, 2026',
    '13:47',
  ],
  [
    'MF214466',
    'Mason Fang',
    'Finance',
    'Inactive',
    'Pending',
    'Partial',
    '9c8e3a51...',
    1,
    'Oct 17, 2026',
    '09:58',
  ],
  [
    'NC225577',
    'Nora Cai',
    'Operations',
    'Active',
    'Mapped',
    'Success',
    '4b6f9d28...',
    6,
    'Oct 16, 2026',
    '17:31',
  ],
  [
    'VH236688',
    'Victor Hou',
    'People & Org',
    'Active',
    'Mapped',
    'Success',
    '8f2c4a75...',
    4,
    'Oct 16, 2026',
    '14:15',
  ],
  [
    'ET247799',
    'Ella Tong',
    'Marketing',
    'Active',
    'Not Mapped',
    'N/A',
    '1a7d5c94...',
    0,
    'Oct 16, 2026',
    '10:40',
  ],
  [
    'SX258811',
    'Sam Xie',
    'Commercial',
    'Active',
    'Mapped',
    'Success',
    '5e9b1f36...',
    9,
    'Oct 15, 2026',
    '16:22',
  ],
  [
    'MK269922',
    'Mia Kong',
    'Finance',
    'Active',
    'Mapped',
    'Success',
    '2d4c8e71...',
    3,
    'Oct 15, 2026',
    '13:05',
  ],
  [
    'AR270033',
    'Adam Ren',
    'Operations',
    'Inactive',
    'Pending',
    'Partial',
    '7b3a6d58...',
    2,
    'Oct 15, 2026',
    '09:14',
  ],
  [
    'RJ281144',
    'Ruby Jin',
    'People & Org',
    'Active',
    'Mapped',
    'Success',
    'c9e5b2a4...',
    5,
    'Oct 14, 2026',
    '16:47',
  ],
  [
    'FG292255',
    'Felix Ge',
    'Marketing',
    'Active',
    'Mapped',
    'Success',
    '3f8d1c69...',
    4,
    'Oct 14, 2026',
    '14:33',
  ],
  [
    'TB303366',
    'Tina Bai',
    'Commercial',
    'Active',
    'Mapped',
    'Partial',
    '6a2e9b47...',
    3,
    'Oct 14, 2026',
    '10:11',
  ],
  [
    'HW314477',
    'Hugo Wan',
    'Finance',
    'Active',
    'Pending',
    'Partial',
    '8c5f3a92...',
    1,
    'Oct 13, 2026',
    '17:26',
  ],
  [
    'DY325588',
    'Daisy Yu',
    'Operations',
    'Active',
    'Mapped',
    'Success',
    '1e7b4c85...',
    7,
    'Oct 13, 2026',
    '15:09',
  ],
  [
    'AQ336699',
    'Alan Qi',
    'People & Org',
    'Inactive',
    'Not Mapped',
    'N/A',
    '4d9a6e13...',
    0,
    'Oct 13, 2026',
    '11:53',
  ],
  [
    'JK347711',
    'Juno Ke',
    'Marketing',
    'Active',
    'Mapped',
    'Success',
    '9b3c8f52...',
    6,
    'Oct 12, 2026',
    '16:35',
  ],
  [
    'EF358822',
    'Eva Fu',
    'Commercial',
    'Active',
    'Mapped',
    'Success',
    '2f6d1a94...',
    5,
    'Oct 12, 2026',
    '14:01',
  ],
  [
    'BM369933',
    'Bob Mi',
    'Finance',
    'Inactive',
    'Pending',
    'Partial',
    '7a8e4b25...',
    2,
    'Oct 12, 2026',
    '10:28',
  ],
  [
    'LS371044',
    'Lena Shi',
    'Operations',
    'Active',
    'Mapped',
    'Success',
    '5c1f7d68...',
    4,
    'Oct 11, 2026',
    '17:14',
  ],
  [
    'MN382155',
    'Max Niu',
    'People & Org',
    'Active',
    'Mapped',
    'Success',
    '8e4a2c97...',
    3,
    'Oct 11, 2026',
    '13:42',
  ],
  [
    'YP393266',
    'Yara Pu',
    'Marketing',
    'Active',
    'Pending',
    'Partial',
    '1b9d5e73...',
    1,
    'Oct 11, 2026',
    '09:56',
  ],
  [
    'NZ404377',
    'Neo Zhan',
    'Commercial',
    'Active',
    'Mapped',
    'Success',
    '6e3c8a15...',
    8,
    'Oct 10, 2026',
    '16:08',
  ],
  [
    'OR415488',
    'Oliva Rui',
    'Finance',
    'Active',
    'Mapped',
    'Success',
    '3a7b1f64...',
    4,
    'Oct 10, 2026',
    '14:39',
  ],
  [
    'KY426599',
    'Ken Yue',
    'Operations',
    'Inactive',
    'Not Mapped',
    'N/A',
    '9d5f2b87...',
    0,
    'Oct 10, 2026',
    '11:02',
  ],
  [
    'SM437711',
    'Sara Miao',
    'People & Org',
    'Active',
    'Mapped',
    'Partial',
    '4c8a6e31...',
    3,
    'Oct 09, 2026',
    '15:27',
  ],
]

const rows = [
  ...BASE_ROWS,
  ...MORE_ROWS.map(
    ([id, name, department, msdStatus, mapping, sync, userId, reports, date, time]) => ({
      id,
      name,
      department,
      msdStatus,
      account: `MSD_${id}`,
      userId,
      mapping,
      sync,
      reports,
      date,
      time,
    }),
  ),
]

/** 部门下拉选项：从表格数据动态去重并按字母序排列（首项 All Departments 作为“全部”） */
const departmentOptions = computed(() =>
  [...new Set(rows.map((row) => row.department))].sort((a, b) => a.localeCompare(b)),
)

/** User Sync Status 下拉选项：同样从表格数据动态去重并按字母序排列 */
const syncStatusOptions = computed(() =>
  [...new Set(rows.map((row) => row.sync))].sort((a, b) => a.localeCompare(b)),
)

/** Mapping Status 下拉选项：同样从表格数据动态去重并按字母序排列 */
const mappingOptions = computed(() =>
  [...new Set(rows.map((row) => row.mapping))].sort((a, b) => a.localeCompare(b)),
)

/** 部门筛选：空字符串代表 All Departments（全部） */
const departmentFilter = ref('')

/** User Sync Status 筛选：空字符串代表 All User Sync Status（全部） */
const syncStatusFilter = ref('')

/** Mapping Status 筛选：空字符串代表 All Mapping Status（全部） */
const mappingFilter = ref('')

/** 搜索框输入：即时过滤（输入清空即恢复），与三个下拉一起取交集 */
const keyword = ref('')

/** 可搜索字段：表格里能展示的文本列（ISID / 姓名 / 部门 / 账号等） */
const SEARCH_FIELDS = [
  'id',
  'name',
  'department',
  'msdStatus',
  'account',
  'userId',
  'mapping',
  'sync',
  'date',
]

/** 单行包含匹配（大小写不敏感，沿用 AuditLogs 的 matchRow 写法） */
function matchRow(row, query) {
  return SEARCH_FIELDS.some((field) => String(row[field]).toLowerCase().includes(query))
}

/** 过滤后的结果驱动表格渲染：关键词、部门、User Sync Status、Mapping Status 组合生效（取交集） */
const filteredRows = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  return rows.filter(
    (row) =>
      (!departmentFilter.value || row.department === departmentFilter.value) &&
      (!syncStatusFilter.value || row.sync === syncStatusFilter.value) &&
      (!mappingFilter.value || row.mapping === mappingFilter.value) &&
      (!query || matchRow(row, query)),
  )
})

/** 分页：作用于当前过滤后的结果 */
const pageSize = ref(10)
const pageSizes = [5, 10, 20]
const currentPage = ref(1)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredRows.value.length / pageSize.value)),
)

const pageRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

/** 页码序列：≤7 页全列，>7 页首尾 + 当前位置±1 加省略号（与 AuditLogs 一致） */
const pageItems = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const items = [1]
  let start = current - 1
  let end = current + 1
  if (current <= 4) {
    start = 2
    end = 5
  }
  if (current >= total - 3) {
    start = total - 4
    end = total - 1
  }
  if (start > 2) items.push('start-dots')
  for (let page = start; page <= end; page += 1) items.push(page)
  if (end < total - 1) items.push('end-dots')
  items.push(total)
  return items
})

/** 计数文案：当前页区间 + 过滤后的真实条数（不再使用与分页矛盾的后端 512） */
const countText = computed(() => {
  const total = filteredRows.value.length
  if (!total) return 'Showing 0 of 0 users'
  const start = (currentPage.value - 1) * pageSize.value + 1
  const end = Math.min(currentPage.value * pageSize.value, total)
  return `Showing ${start}–${end} of ${total} users`
})

/** 右侧明细面板显隐；收起时表格占满整行 */
const sideOpen = ref(true)

/** 右侧详情面板固定展示 John Li（LI123456）那一行，该行不在当前页时面板转为空状态 */
const sideRowVisible = computed(() => pageRows.value.some((row) => row.id === 'LI123456'))

/** 多选：以 ISID 为 key，跨页保留 */
const selectedIds = ref(new Set())

const isSelected = (id) => selectedIds.value.has(id)

/** 单行勾选/取消 */
function toggleRow(id) {
  const next = new Set(selectedIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  selectedIds.value = next
}

/** 表头状态只反映当前页：当前页全选 / 部分选中 */
const pageAllSelected = computed(
  () => pageRows.value.length > 0 && pageRows.value.every((row) => selectedIds.value.has(row.id)),
)

const pageSomeSelected = computed(
  () => !pageAllSelected.value && pageRows.value.some((row) => selectedIds.value.has(row.id)),
)

/** 表头全选/取消：只作用于当前页可见行，其他页已选中的行保留 */
function togglePage() {
  const next = new Set(selectedIds.value)
  if (pageAllSelected.value) pageRows.value.forEach((row) => next.delete(row.id))
  else pageRows.value.forEach((row) => next.add(row.id))
  selectedIds.value = next
}

/** 原生 checkbox 的 indeterminate 是 DOM 属性，需要手动同步 */
const headCheckbox = ref(null)

watch(
  pageSomeSelected,
  (some) => {
    if (headCheckbox.value) headCheckbox.value.indeterminate = some
  },
  { immediate: true },
)

/** 筛选变化后，把已被筛掉的行从选中集合中移出 */
watch([departmentFilter, syncStatusFilter, mappingFilter, keyword], () => {
  const visible = new Set(filteredRows.value.map((row) => row.id))
  const kept = [...selectedIds.value].filter((id) => visible.has(id))
  if (kept.length !== selectedIds.value.size) selectedIds.value = new Set(kept)
})

/** 筛选条件或页大小变化时回到第 1 页 */
watch([departmentFilter, syncStatusFilter, mappingFilter, keyword, pageSize], () => {
  currentPage.value = 1
})

/** 总页数变小时把当前页收敛到合法范围 */
watch(totalPages, (total) => {
  if (currentPage.value > total) currentPage.value = total
})

/** Reset：三个下拉回默认项、搜索框清空，页码回到第 1 页（页大小作为展示偏好保持不变），勾选一并清空 */
function resetFilters() {
  departmentFilter.value = ''
  syncStatusFilter.value = ''
  mappingFilter.value = ''
  keyword.value = ''
  currentPage.value = 1
  selectedIds.value = new Set()
}

const tones = {
  Active: 'green',
  Inactive: 'red',
  Mapped: 'green',
  Pending: 'amber',
  'Not Mapped': 'gray',
  Success: 'green',
  Partial: 'amber',
  'N/A': 'gray',
  Published: 'green',
}
const toneOf = (value) => tones[value] || 'gray'

const reports = [
  { name: 'China Sales Overview', worksId: 'ccd3428c-d123...', type: 'Dashboard' },
  { name: 'Market Share Analysis', worksId: '07f65a0d-d786...', type: 'Dashboard' },
  { name: 'Product Performance', worksId: 'a8df3321-c98b...', type: 'Workbook' },
  { name: 'Expense Dashboard', worksId: 'b12e98d5-590a...', type: 'Dashboard' },
  { name: 'Headcount Trend', worksId: 'f90c4412-66aa...', type: 'Dashboard' },
]

function logout() {
  router.push('/')
}
</script>

<template>
  <div class="portal">
    <!-- 顶部导航（与 MyReports / CommonError 一致） -->
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
        <button class="logout" type="button" @click="logout">Logout</button>
      </div>
    </header>

    <main class="shell">
      <!-- 页头：标题 + 同步状态 + Sync Now -->
      <div class="head">
        <div class="title-block">
          <h1>User &amp; Access Sync</h1>
          <p class="subtitle">
            View MSD to Quick BI user mapping and synchronized report access from Quick BI.
          </p>
        </div>

        <div class="sync-card">
          <span class="sync-check" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#1f9d63" />
              <path
                d="M6.6 12.3l3.5 3.5 7-7.2"
                fill="none"
                stroke="#fff"
                stroke-width="2.2"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <div class="sync-text">
            <div class="sync-line">
              <span class="sync-strong">Last Full Sync: Oct 24, 2026 10:32</span>
              <span class="badge badge-green">Success</span>
            </div>
            <div class="sync-next">Next Scheduled Sync: Oct 25, 2026 02:00 (Daily)</div>
          </div>
        </div>

        <button class="sync-btn" type="button">
          <svg class="sync-btn-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M20 11a8 8 0 1 0-2.6 5.9M20 5v6h-6"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Sync Now</span>
          <span class="sync-btn-divider" aria-hidden="true"></span>
          <svg class="sync-btn-caret" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2.6 4.5 6 8l3.4-3.5" fill="none" stroke="#fff" stroke-width="1.6" />
          </svg>
        </button>
      </div>

      <div class="grid" :class="{ 'is-single': !sideOpen }">
        <section class="content">
          <!-- 标签页 -->
          <nav class="tabs" aria-label="Sync views">
            <button class="tab is-active" type="button" @click="router.push('/UserAccessSync')">
              Users
            </button>
            <button class="tab" type="button" @click="router.push('/AuditLogs')">Sync Logs</button>
          </nav>

          <!-- 筛选 -->
          <div class="toolbar">
            <label class="search">
              <svg class="search-icon" viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="8.8" cy="8.8" r="5.6" fill="none" stroke="#8b93a3" stroke-width="1.7" />
                <path d="M13.2 13.2 17 17" stroke="#8b93a3" stroke-width="1.7" />
              </svg>
              <input
                v-model="keyword"
                type="text"
                placeholder="Search by ISID, name or department..."
              />
            </label>

            <label class="select">
              <select v-model="departmentFilter" aria-label="All Departments">
                <option value="">All Departments</option>
                <option
                  v-for="department in departmentOptions"
                  :key="department"
                  :value="department"
                >
                  {{ department }}
                </option>
              </select>
              <svg class="caret" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.4 4.4 6 8l3.6-3.6" fill="none" stroke="#6b7488" stroke-width="1.5" />
              </svg>
            </label>

            <label class="select">
              <select v-model="mappingFilter" aria-label="All Mapping Status">
                <option value="">All Mapping Status</option>
                <option v-for="status in mappingOptions" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
              <svg class="caret" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.4 4.4 6 8l3.6-3.6" fill="none" stroke="#6b7488" stroke-width="1.5" />
              </svg>
            </label>

            <label class="select">
              <select v-model="syncStatusFilter" aria-label="All User Sync Status">
                <option value="">All User Sync Status</option>
                <option v-for="status in syncStatusOptions" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
              <svg class="caret" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.4 4.4 6 8l3.6-3.6" fill="none" stroke="#6b7488" stroke-width="1.5" />
              </svg>
            </label>

            <button class="reset" type="button" @click="resetFilters">Reset</button>
          </div>

          <!-- 用户表 -->
          <div class="table-wrap">
            <div class="row head">
              <span class="cell cb-cell">
                <input
                  ref="headCheckbox"
                  class="cb-input"
                  type="checkbox"
                  aria-label="Select all rows on this page"
                  :checked="pageAllSelected"
                  @change="togglePage"
                />
                <span
                  class="cb"
                  :class="{ on: pageAllSelected || pageSomeSelected }"
                  aria-hidden="true"
                >
                  <svg v-if="pageAllSelected" viewBox="0 0 12 12">
                    <path
                      d="M2.4 6.2 4.9 8.7 9.6 3.6"
                      fill="none"
                      stroke="#fff"
                      stroke-width="1.7"
                    />
                  </svg>
                  <svg v-else-if="pageSomeSelected" viewBox="0 0 12 12">
                    <path d="M2.6 6h6.8" fill="none" stroke="#fff" stroke-width="1.7" />
                  </svg>
                </span>
              </span>
              <span class="cell">
                ISID
                <svg class="sort" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M4.2 2.6v6.8m0 0-1.7-1.8m1.7 1.8 1.7-1.8M7.8 9.4V2.6m0 0L6.1 4.4m1.7-1.8L9.5 4.4"
                    fill="none"
                    stroke="#8b93a3"
                    stroke-width="1.2"
                  />
                </svg>
              </span>
              <span class="cell">Name</span>
              <span class="cell">Department</span>
              <span class="cell">MSD User Status</span>
              <span class="cell">
                Quick BI Account
                <svg class="info" viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.4" fill="none" stroke="#9aa3b5" stroke-width="1.2" />
                  <path d="M8 7.2v4" stroke="#9aa3b5" stroke-width="1.4" />
                  <circle cx="8" cy="4.9" r="0.9" fill="#9aa3b5" />
                </svg>
              </span>
              <span class="cell">Quick BI User ID</span>
              <span class="cell">Mapping Status</span>
              <span class="cell">User Sync Status</span>
              <span class="cell">Authorized Reports</span>
              <span class="cell">Last Sync Time</span>
              <span class="cell center">Action</span>
            </div>

            <div
              v-for="row in pageRows"
              :key="row.id"
              class="row"
              :class="{ selected: isSelected(row.id) }"
            >
              <span class="cell cb-cell">
                <input
                  class="cb-input"
                  type="checkbox"
                  :aria-label="`Select ${row.name}`"
                  :checked="isSelected(row.id)"
                  @change="toggleRow(row.id)"
                />
                <span class="cb" :class="{ on: isSelected(row.id) }" aria-hidden="true">
                  <svg v-if="isSelected(row.id)" viewBox="0 0 12 12">
                    <path
                      d="M2.4 6.2 4.9 8.7 9.6 3.6"
                      fill="none"
                      stroke="#fff"
                      stroke-width="1.7"
                    />
                  </svg>
                </span>
              </span>
              <span class="cell isid">{{ row.id }}</span>
              <span class="cell name">{{ row.name }}</span>
              <span class="cell">{{ row.department }}</span>
              <span class="cell">
                <span class="badge" :class="`badge-${toneOf(row.msdStatus)}`">{{
                  row.msdStatus
                }}</span>
              </span>
              <span class="cell">{{ row.account }}</span>
              <span class="cell muted">{{ row.userId }}</span>
              <span class="cell">
                <span class="badge" :class="`badge-${toneOf(row.mapping)}`">{{ row.mapping }}</span>
              </span>
              <span class="cell">
                <span class="badge" :class="`badge-${toneOf(row.sync)}`">{{ row.sync }}</span>
              </span>
              <span class="cell">{{ row.reports }}</span>
              <span class="cell time">
                <span>{{ row.date }}</span>
                <span v-if="row.time">{{ row.time }}</span>
              </span>
              <span class="cell center">
                <button class="more" type="button" aria-label="Row actions">
                  <svg viewBox="0 0 18 6" aria-hidden="true">
                    <circle cx="2.4" cy="3" r="1.5" fill="#8b93a3" />
                    <circle cx="9" cy="3" r="1.5" fill="#8b93a3" />
                    <circle cx="15.6" cy="3" r="1.5" fill="#8b93a3" />
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- 列表底部：计数 + 分页 -->
          <div class="list-foot">
            <span class="count">{{ countText }}</span>
            <div class="pager">
              <button
                class="page-arrow"
                type="button"
                aria-label="Previous page"
                :disabled="currentPage === 1"
                @click="currentPage -= 1"
              >
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M7.6 2.6 3.8 6l3.8 3.4"
                    fill="none"
                    stroke="#8b93a3"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
              <template v-for="item in pageItems" :key="item">
                <span v-if="typeof item === 'string'" class="page-dots">...</span>
                <button
                  v-else
                  class="page-num"
                  :class="{ 'is-active': item === currentPage }"
                  type="button"
                  :aria-current="item === currentPage ? 'page' : undefined"
                  @click="currentPage = item"
                >
                  {{ item }}
                </button>
              </template>
              <button
                class="page-arrow"
                type="button"
                aria-label="Next page"
                :disabled="currentPage === totalPages"
                @click="currentPage += 1"
              >
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M4.4 2.6 8.2 6l-3.8 3.4"
                    fill="none"
                    stroke="#8b93a3"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
              <label class="page-size">
                <select v-model.number="pageSize" aria-label="Rows per page">
                  <option v-for="size in pageSizes" :key="size" :value="size">
                    {{ size }} / page
                  </option>
                </select>
                <svg class="caret" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.4 4.4 6 8l3.6-3.6" fill="none" stroke="#6b7488" stroke-width="1.5" />
                </svg>
              </label>
            </div>
          </div>

          <!-- 统计卡片 -->
          <div class="stats">
            <article class="stat">
              <span class="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="9" cy="8.4" r="3.4" fill="#0b63f6" />
                  <path
                    d="M3.2 18.4c0-3 2.6-5 5.8-5s5.8 2 5.8 5"
                    fill="none"
                    stroke="#0b63f6"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <circle cx="17" cy="9.6" r="2.6" fill="#0b63f6" />
                  <path
                    d="M14.6 18.4c0-2.6 1.6-4.2 3.9-4.2 1.9 0 3.2 1.2 3.2 3"
                    fill="none"
                    stroke="#0b63f6"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              <div class="stat-body">
                <div class="stat-label">Total Users</div>
                <div class="stat-value">512</div>
                <div class="stat-lines">
                  <span class="stat-line"><i class="dot"></i>Active<span>485</span></span>
                  <span class="stat-line"><i class="dot dot-red"></i>Inactive<span>27</span></span>
                </div>
              </div>
            </article>

            <article class="stat">
              <span class="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M6.2 3.4h7.4l4.2 4.2v13H6.2z" fill="#0b63f6" />
                  <path d="M13.4 3.6v4.2h4.2" fill="none" stroke="#fff" stroke-width="1.6" />
                  <path
                    d="M9.2 12.4h5.6M9.2 15.4h5.6"
                    stroke="#fff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              <div class="stat-body">
                <div class="stat-label">Total Authorized Reports</div>
                <div class="stat-value">1,284</div>
                <div class="stat-lines">
                  <span class="note">Across all users</span>
                  <span class="note">(from Quick BI)</span>
                </div>
              </div>
            </article>

            <article class="stat">
              <span class="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M20 11a8 8 0 1 0-2.6 5.9M20 5v6h-6"
                    fill="none"
                    stroke="#0b63f6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <div class="stat-body">
                <div class="stat-label">Last Sync Status</div>
                <div class="stat-line sync-line">
                  <svg class="mini-check" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="11" fill="#1f9d63" />
                    <path
                      d="M7 12.4l3.4 3.4 6.6-6.8"
                      fill="none"
                      stroke="#fff"
                      stroke-width="2.1"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span class="badge badge-green">Success</span>
                </div>
                <div class="stat-lines">
                  <span class="note">Oct 24, 2026 10:32</span>
                </div>
                <router-link class="stat-link" to="/AuditLogs">
                  View Sync Logs
                  <svg viewBox="0 0 14 12" aria-hidden="true">
                    <path
                      d="M2 6h9m0 0-3.4-3.4M11 6l-3.4 3.4"
                      fill="none"
                      stroke="#0b63f6"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                </router-link>
              </div>
            </article>
          </div>
        </section>

        <!-- 详情面板收起后的轻量恢复入口：贴在表格卡片右缘的竖条 -->
        <button
          v-if="!sideOpen"
          class="side-restore"
          type="button"
          aria-label="Show user details"
          title="Show user details"
          @click="sideOpen = true"
        >
          <svg viewBox="0 0 8 12" aria-hidden="true">
            <path
              d="M6.4 1.6 2 6l4.4 4.4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <!-- 右侧用户详情 -->
        <aside v-if="sideOpen" class="side">
          <div class="side-head">
            <h2>{{ user.name }}</h2>
            <button
              class="close"
              type="button"
              aria-label="Close user details"
              @click="sideOpen = false"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="#5b6885"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <template v-if="sideRowVisible">
            <div class="side-user">
              <span class="side-avatar" aria-hidden="true">JL</span>
              <div class="side-info">
                <span class="badge badge-green side-status">Active</span>
                <dl class="kv">
                  <dt>ISID</dt>
                  <dd>LI123456</dd>
                  <dt>Department</dt>
                  <dd>Commercial</dd>
                  <dt>Email</dt>
                  <dd>john.li@msd.com</dd>
                  <dt>MSD User Status</dt>
                  <dd class="ok">Active</dd>
                </dl>
              </div>
            </div>

            <div class="divider"></div>

            <div class="section-head">
              <h3>Quick BI Mapping</h3>
              <button class="outline-btn" type="button">Edit Mapping</button>
            </div>

            <dl class="kv kv-wide">
              <dt>Quick BI Account</dt>
              <dd>MSD_LI123456</dd>
              <dt>Quick BI User ID</dt>
              <dd>7f5a9c12e-3ef4-4d2a-9f8c...</dd>
              <dt>Mapping Status</dt>
              <dd><span class="badge badge-green">Mapped</span></dd>
              <dt>User Sync Status</dt>
              <dd><span class="badge badge-green">Success</span></dd>
              <dt>Last Sync Time</dt>
              <dd>Oct 24, 2026 10:32</dd>
            </dl>

            <div class="divider"></div>

            <div class="section-head">
              <h3>Authorized Reports (5)</h3>
              <button class="outline-btn" type="button">
                <svg class="refresh-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20 11a8 8 0 1 0-2.6 5.9M20 5v6h-6"
                    fill="none"
                    stroke="#0b63f6"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Refresh
              </button>
            </div>

            <div class="mini">
              <div class="mini-row mini-head">
                <span>Report Name</span>
                <span>Works ID</span>
                <span>Type</span>
                <span>Status</span>
              </div>
              <div v-for="item in reports" :key="item.name" class="mini-row">
                <span class="mini-name">{{ item.name }}</span>
                <span class="mini-works">{{ item.worksId }}</span>
                <span class="mini-type">{{ item.type }}</span>
                <span><span class="badge badge-green">Published</span></span>
              </div>
            </div>
          </template>

          <div v-else class="side-empty">
            <p>
              John Li is outside the current filters. Adjust the filters or press Reset to view
              details.
            </p>
          </div>
        </aside>
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
  --line-soft: #eef1f6;
  --tiny: #8b93a3;
  --green: #13824c;
  --green-bg: #e2f6ea;
  --amber: #a9741a;
  --amber-bg: #fdf0d3;
  --red: #d24234;
  --red-bg: #fce4e1;
  --gray: #5b6885;
  --gray-bg: #eef1f6;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f9fafb;
  color: var(--color-text, #3a4459);
  font-family:
    'Segoe UI Variable Display',
    'Segoe UI',
    system-ui,
    -apple-system,
    'Helvetica Neue',
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
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

.logout:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 3px;
}

/* ===== 页面外壳 ===== */
.shell {
  flex: 1;
  padding: 18px 24px 28px;
}

.head {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  flex-wrap: wrap;
}

.title-block {
  flex: 1;
  min-width: 260px;
}

h1 {
  margin: 0;
  font-size: 25px;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--navy);
}

.subtitle {
  margin: 6px 0 0;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--sub);
}

.sync-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #f4f7fb;
  border: 1px solid var(--line);
  border-radius: 8px;
}

.sync-check {
  flex: none;
  width: 26px;
  height: 26px;
}

.sync-check svg {
  width: 26px;
  height: 26px;
  display: block;
}

.sync-text {
  min-width: 0;
}

.sync-line {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sync-strong {
  font-size: 13px;
  font-weight: 700;
  color: var(--navy);
  white-space: nowrap;
}

.sync-next {
  margin-top: 3px;
  font-size: 11.5px;
  color: var(--sub);
  white-space: nowrap;
}

.sync-btn {
  flex: none;
  height: 40px;
  padding: 0 12px 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  border-radius: 6px;
  background: var(--accent);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(11, 99, 246, 0.2);
}

.sync-btn:hover {
  background: var(--accent-strong);
}

.sync-btn-icon {
  width: 17px;
  height: 17px;
  display: block;
}

.sync-btn-divider {
  width: 1px;
  height: 18px;
  margin-left: 4px;
  background: rgba(255, 255, 255, 0.35);
}

.sync-btn-caret {
  width: 12px;
  height: 12px;
  display: block;
}

/* ===== 两栏 ===== */
.grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 436px;
  gap: 20px;
  align-items: start;
  margin-top: 18px;
}

/* 详情面板收起后表格占满整行 */
.grid.is-single {
  grid-template-columns: minmax(0, 1fr);
}

/* 恢复入口：表格卡片右缘的轻量竖条 */
.side-restore {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 16px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid var(--line);
  border-right: 0;
  border-radius: 6px 0 0 6px;
  background: #fff;
  color: #8b93a3;
  cursor: pointer;
  z-index: 5;
}

.side-restore:hover,
.side-restore:focus-visible {
  color: var(--accent);
  border-color: #cfe0ff;
}

.side-restore svg {
  width: 8px;
  height: 12px;
  display: block;
}

.content {
  min-width: 0;
}

/* 标签页 */
.tabs {
  display: flex;
  gap: 28px;
  border-bottom: 1px solid var(--line);
}

.tab {
  position: relative;
  height: 38px;
  padding: 0 2px;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--sub);
  cursor: pointer;
}

.tab.is-active {
  color: var(--accent);
}

.tab.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 3px;
  border-radius: 2px;
  background: var(--accent);
}

/* ===== 筛选 ===== */
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.search {
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 330px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 12px;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 6px;
}

.search-icon {
  width: 16px;
  height: 16px;
  flex: none;
  display: block;
}

.search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: 12.5px;
  color: var(--color-text, #3a4459);
}

.search input::placeholder {
  color: #9aa3b5;
}

.select {
  position: relative;
  flex: none;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 28px 0 12px;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 6px;
}

.select select {
  appearance: none;
  border: 0;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: 12.5px;
  color: var(--color-text, #3a4459);
  cursor: pointer;
  padding: 0;
}

.caret {
  position: absolute;
  right: 10px;
  width: 12px;
  height: 12px;
  pointer-events: none;
}

.reset {
  flex: none;
  border: 0;
  padding: 0 2px;
  background: none;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
}

.reset:hover {
  text-decoration: underline;
}

/* ===== 用户表 ===== */
.table-wrap {
  margin-top: 12px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow-x: auto;
}

.row {
  display: grid;
  grid-template-columns:
    30px minmax(0, 0.85fr) minmax(0, 0.85fr) minmax(0, 1fr)
    minmax(0, 0.9fr) minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 0.92fr)
    minmax(0, 1fr) minmax(0, 0.72fr) minmax(0, 0.9fr) 44px;
  align-items: center;
  column-gap: 6px;
  padding: 0 8px;
  border-top: 1px solid var(--line-soft);
  font-size: 12px;
  color: var(--color-text, #3a4459);
}

.row.head {
  min-height: 44px;
  border-top: 0;
  background: #eff2f9;
  border-radius: 8px 8px 0 0;
  font-size: 11.5px;
  font-weight: 600;
  color: #4b5872;
}

.row:not(.head) {
  min-height: 46px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.row.selected {
  background: #edf4ff;
}

.cell {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.row.head .cell {
  white-space: normal;
  line-height: 1.3;
}

.cell.center {
  justify-content: flex-end;
}

.cell.isid {
  color: #2b3752;
}

.cell.name {
  font-weight: 600;
  color: var(--navy);
}

.cell.muted {
  color: var(--sub);
}

.cell.time {
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  line-height: 1.35;
  color: #2b3752;
}

.sort,
.info {
  flex: none;
  width: 12px;
  height: 12px;
  display: block;
}

/* 首列复选框：原生 input 透明覆盖在自绘方框上，保留键盘可达性 */
.cb-cell {
  position: relative;
}

.cb-input {
  position: absolute;
  left: 0;
  width: 15px;
  height: 15px;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

.cb-input:focus-visible + .cb {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(11, 99, 246, 0.15);
}

.cb {
  width: 15px;
  height: 15px;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d5dbe7;
  border-radius: 3px;
  background: #fff;
}

.cb.on {
  border-color: var(--accent);
  background: var(--accent);
}

.cb svg {
  width: 11px;
  height: 11px;
  display: block;
}

.badge {
  display: inline-flex;
  align-items: center;
  height: 19px;
  padding: 0 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.badge-green {
  background: var(--green-bg);
  color: var(--green);
}

.badge-amber {
  background: var(--amber-bg);
  color: var(--amber);
}

.badge-red {
  background: var(--red-bg);
  color: var(--red);
}

.badge-gray {
  background: var(--gray-bg);
  color: var(--gray);
}

.more {
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 5px;
  background: none;
  cursor: pointer;
}

.more svg {
  width: 16px;
  height: 6px;
  display: block;
}

.more:hover {
  background: #e9effa;
}

/* ===== 分页 ===== */
.list-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.count {
  font-size: 12px;
  color: var(--sub);
}

.pager {
  display: flex;
  align-items: center;
  gap: 6px;
}

.page-arrow,
.page-num {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfe4ee;
  border-radius: 6px;
  background: #fff;
  font-family: inherit;
  font-size: 12px;
  color: #2b3752;
  cursor: pointer;
}

.page-arrow svg {
  width: 12px;
  height: 12px;
  display: block;
}

.page-num.is-active {
  border-color: var(--accent);
  background: #eef4ff;
  color: var(--accent);
  font-weight: 600;
}

.page-dots {
  padding: 0 2px;
  font-size: 12px;
  color: var(--tiny);
}

/* 边界页码按钮置灰 */
.page-arrow:disabled {
  border-color: #eef1f6;
  background: #f7f9fd;
  cursor: not-allowed;
}

.page-arrow:disabled svg path {
  stroke: #c4cbd8;
}

.page-size {
  position: relative;
  display: flex;
  align-items: center;
  height: 30px;
  margin-left: 6px;
  padding: 0 28px 0 10px;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 6px;
}

.page-size select {
  appearance: none;
  border: 0;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: 12px;
  color: #2b3752;
  cursor: pointer;
}

.page-size .caret {
  position: absolute;
  right: 9px;
  width: 10px;
  height: 10px;
  pointer-events: none;
}

/* ===== 统计卡片 ===== */
.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.stat {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
}

.stat-icon {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eaf1fe;
  display: grid;
  place-items: center;
}

.stat-icon svg {
  width: 21px;
  height: 21px;
  display: block;
}

.stat-body {
  min-width: 0;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: #4b5872;
  line-height: 1.3;
}

.stat-value {
  margin-top: 3px;
  font-size: 21px;
  font-weight: 800;
  line-height: 1.15;
  color: var(--navy);
  letter-spacing: -0.01em;
}

.stat-lines {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 11.5px;
  color: var(--sub);
}

.stat-line {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11.5px;
  color: var(--sub);
}

.stat-line span {
  color: #2b3752;
  font-weight: 600;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22a06b;
  flex: none;
}

.dot-red {
  background: #e05545;
}

.note {
  font-size: 11.5px;
  color: var(--sub);
}

.sync-line {
  margin-top: 5px;
}

.mini-check {
  width: 17px;
  height: 17px;
  display: block;
  flex: none;
}

.stat-link {
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}

.stat-link svg {
  width: 13px;
  height: 11px;
  display: block;
}

.stat-link:hover {
  text-decoration: underline;
}

/* ===== 右侧详情 ===== */
.side {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 16px 18px 18px;
  min-width: 0;
}

.side-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.side-head h2 {
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--navy);
}

.close {
  width: 26px;
  height: 26px;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 5px;
  background: none;
  cursor: pointer;
}

.close svg {
  width: 17px;
  height: 17px;
  display: block;
}

.close:hover {
  background: #f2f5fa;
}

.side-user {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 12px;
}

.side-avatar {
  flex: none;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #eaf1fe;
  color: #1b5cd6;
  font-size: 21px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.side-info {
  flex: 1;
  min-width: 0;
}

.side-status {
  margin-bottom: 8px;
}

/* 详情行被部门过滤掉时的空状态 */
.side-empty {
  margin-top: 14px;
  padding: 26px 16px;
  border: 1px dashed var(--line);
  border-radius: 8px;
  background: #fafbfe;
  text-align: center;
}

.side-empty p {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
  color: var(--tiny);
}

.kv {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  column-gap: 10px;
  row-gap: 7px;
  margin: 0;
  font-size: 12.5px;
}

.kv dt {
  color: #6b7488;
}

.kv dd {
  margin: 0;
  min-width: 0;
  color: #1e2a47;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.kv dd.ok {
  color: var(--green);
  font-weight: 600;
}

.kv-wide {
  margin-top: 10px;
  grid-template-columns: 118px minmax(0, 1fr);
  row-gap: 9px;
}

.divider {
  height: 1px;
  margin: 15px 0 14px;
  background: var(--line-soft);
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.section-head h3 {
  margin: 0;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--navy);
}

.outline-btn {
  height: 30px;
  padding: 0 11px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1.5px solid var(--accent);
  border-radius: 6px;
  background: #fff;
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
}

.outline-btn:hover {
  background: #f4f8ff;
}

.refresh-icon {
  width: 14px;
  height: 14px;
  display: block;
}

/* 迷你报表列表 */
.mini {
  margin-top: 10px;
  border: 1px solid var(--line-soft);
  border-radius: 6px;
  overflow: hidden;
}

.mini-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 78px 64px 56px;
  align-items: center;
  column-gap: 8px;
  padding: 7px 9px;
  font-size: 11.5px;
  border-top: 1px solid var(--line-soft);
}

.mini-head {
  background: #eff2f9;
  border-top: 0;
  font-weight: 600;
  color: #4b5872;
  padding-top: 6px;
  padding-bottom: 6px;
}

.mini-name {
  color: var(--accent);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-works,
.mini-type {
  color: var(--sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-type {
  color: #2b3752;
}

.mini-row .badge {
  height: 18px;
  padding: 0 6px;
  font-size: 10.5px;
}

/* ===== 响应式 ===== */
@media (max-width: 1180px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .row {
    min-width: 900px;
  }

  .side {
    max-width: 520px;
  }
}

@media (max-width: 860px) {
  .head {
    gap: 12px;
  }

  .sync-card {
    order: 3;
  }

  .sync-btn {
    margin-left: auto;
  }

  .stats {
    grid-template-columns: minmax(0, 1fr);
  }

  .side {
    max-width: none;
  }
}

@media (max-width: 640px) {
  .shell {
    padding: 14px 14px 24px;
  }

  h1 {
    font-size: 21px;
  }

  .sync-card {
    width: 100%;
  }

  .sync-strong,
  .sync-next {
    white-space: normal;
  }

  .sync-btn {
    margin-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sync-btn {
    transition: none;
  }
}
</style>
