<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Audit logs 静态 mock（Sync Logs 视图）
 * 数据全部写死在组件内，不接接口；仅 Time Range 做了原生日历选择交互。
 */

const router = useRouter()

const user = { name: 'John Li', org: 'MSD China', initials: 'JL' }

/** ISID → 用户姓名，mock 数据里复用，避免同一用户姓名不一致 */
const USERS = {
  LI123456: 'John Li',
  ZH987654: 'Mary Zhang',
  CH321789: 'Wei Chen',
  WA456123: 'Lucy Wang',
  XU789321: 'David Xu',
  LI998877: 'Emily Luo',
  '-': 'System',
}

/**
 * [时间, Event Type, 图标, ISID, Resource, Action, Status]
 * 2026-09 ~ 2026-10，整体按时间倒序，同一天内时间递减
 */
const RAW_LOGS = [
  [
    'Oct 31, 2026 17:29:46',
    'Report Access',
    'chart',
    'WA456123',
    'Expense Dashboard',
    'View Report',
    'Denied',
  ],
  ['Oct 31, 2026 13:55:12', 'Login', 'login', 'XU789321', '-', 'Login Failed', 'Failed'],
  [
    'Oct 30, 2026 09:21:04',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Success',
  ],
  [
    'Oct 29, 2026 16:03:37',
    'Report Access',
    'chart',
    'LI123456',
    'China Sales Overview',
    'View Report',
    'Success',
  ],
  [
    'Oct 29, 2026 11:48:19',
    'Ticket Issuance',
    'ticket',
    'ZH987654',
    'Works ID: aaa1204',
    'Create Ticket',
    'Success',
  ],
  [
    'Oct 28, 2026 14:26:51',
    'User Sync',
    'sync',
    'CH321789',
    'Quick BI User',
    'Sync User',
    'Success',
  ],
  [
    'Oct 26, 2026 15:36:22',
    'Report Access',
    'chart',
    'LI998877',
    'Market Share Analysis',
    'View Report',
    'Success',
  ],
  [
    'Oct 26, 2026 10:14:08',
    'Admin',
    'admin',
    'LI998877',
    'System Configuration',
    'Update Config',
    'Success',
  ],
  [
    'Oct 24, 2026 10:32:10',
    'Report Access',
    'chart',
    'LI123456',
    'China Sales Overview',
    'View Report',
    'Success',
  ],
  [
    'Oct 24, 2026 10:31:45',
    'Ticket Issuance',
    'ticket',
    'LI123456',
    'Works ID: ccd3428c',
    'Create Ticket',
    'Success',
  ],
  ['Oct 24, 2026 10:28:12', 'Login', 'login', 'ZH987654', '-', 'Login Success', 'Success'],
  [
    'Oct 24, 2026 09:50:07',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Success',
  ],
  [
    'Oct 24, 2026 08:26:41',
    'Ticket Issuance',
    'ticket',
    'WA456123',
    'Works ID: b1e7743',
    'Create Ticket',
    'Denied',
  ],
  [
    'Oct 23, 2026 17:05:38',
    'Report Access',
    'chart',
    'CH321789',
    'Expense Dashboard',
    'View Report',
    'Success',
  ],
  ['Oct 22, 2026 17:12:05', 'Login', 'login', 'LI998877', '-', 'Login Success', 'Success'],
  [
    'Oct 22, 2026 16:25:33',
    'Report Access',
    'chart',
    'WA456123',
    'Expense Dashboard',
    'View Report',
    'Denied',
  ],
  [
    'Oct 22, 2026 11:08:19',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Failed',
  ],
  [
    'Oct 21, 2026 10:02:51',
    'Ticket Issuance',
    'ticket',
    'LI123456',
    'Works ID: 9d5f210',
    'Create Ticket',
    'Success',
  ],
  [
    'Oct 20, 2026 15:21:08',
    'User Sync',
    'sync',
    'CH321789',
    'Quick BI User',
    'Sync User',
    'Success',
  ],
  [
    'Oct 20, 2026 14:47:22',
    'Report Access',
    'chart',
    'XU789321',
    'China Sales Overview',
    'View Report',
    'Denied',
  ],
  ['Oct 20, 2026 09:12:36', 'Login', 'login', 'WA456123', '-', 'Login Success', 'Success'],
  [
    'Oct 19, 2026 11:19:44',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Success',
  ],
  [
    'Oct 18, 2026 16:40:11',
    'Report Access',
    'chart',
    'ZH987654',
    'Market Share Analysis',
    'View Report',
    'Success',
  ],
  [
    'Oct 18, 2026 10:22:47',
    'Ticket Issuance',
    'ticket',
    'CH321789',
    'Works ID: e7a4521',
    'Create Ticket',
    'Success',
  ],
  [
    'Oct 16, 2026 09:33:12',
    'User Sync',
    'sync',
    'WA456123',
    'Quick BI User',
    'Sync User',
    'Success',
  ],
  [
    'Oct 15, 2026 13:05:29',
    'Report Access',
    'chart',
    'LI123456',
    'Expense Dashboard',
    'View Report',
    'Success',
  ],
  ['Oct 15, 2026 11:42:03', 'Login', 'login', 'ZH987654', '-', 'Login Success', 'Success'],
  [
    'Oct 15, 2026 08:57:14',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Success',
  ],
  [
    'Oct 14, 2026 12:21:56',
    'Ticket Issuance',
    'ticket',
    'XU789321',
    'Works ID: f2c8890',
    'Create Ticket',
    'Failed',
  ],
  [
    'Oct 12, 2026 17:33:48',
    'Report Access',
    'chart',
    'WA456123',
    'China Sales Overview',
    'View Report',
    'Success',
  ],
  [
    'Oct 12, 2026 15:10:26',
    'Admin',
    'admin',
    'LI123456',
    'System Configuration',
    'Update Role',
    'Success',
  ],
  ['Oct 12, 2026 10:05:17', 'Login', 'login', 'CH321789', '-', 'Login Success', 'Success'],
  [
    'Oct 10, 2026 16:58:32',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Success',
  ],
  [
    'Oct 10, 2026 14:03:09',
    'Report Access',
    'chart',
    'LI998877',
    'Market Share Analysis',
    'View Report',
    'Success',
  ],
  [
    'Oct 10, 2026 09:28:45',
    'Ticket Issuance',
    'ticket',
    'ZH987654',
    'Works ID: ***0786',
    'Create Ticket',
    'Failed',
  ],
  [
    'Oct 09, 2026 13:57:08',
    'User Sync',
    'sync',
    'LI998877',
    'Quick BI User',
    'Sync User',
    'Success',
  ],
  [
    'Oct 08, 2026 14:18:55',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Success',
  ],
  [
    'Oct 08, 2026 11:15:20',
    'Ticket Issuance',
    'ticket',
    'ZH987654',
    'Works ID: ***0786',
    'Create Ticket',
    'Failed',
  ],
  ['Oct 08, 2026 08:44:02', 'Login', 'login', 'LI123456', '-', 'Login Failed', 'Failed'],
  [
    'Oct 06, 2026 15:44:21',
    'Report Access',
    'chart',
    'XU789321',
    'Expense Dashboard',
    'View Report',
    'Denied',
  ],
  [
    'Oct 05, 2026 16:12:38',
    'Ticket Issuance',
    'ticket',
    'WA456123',
    'Works ID: 5b3c118',
    'Create Ticket',
    'Success',
  ],
  [
    'Oct 05, 2026 13:29:51',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Denied',
  ],
  [
    'Oct 05, 2026 10:58:41',
    'Admin',
    'admin',
    'LI998877',
    'System Configuration',
    'Update Config',
    'Success',
  ],
  [
    'Oct 03, 2026 15:20:07',
    'Report Access',
    'chart',
    'CH321789',
    'Market Share Analysis',
    'View Report',
    'Success',
  ],
  [
    'Oct 03, 2026 12:06:33',
    'User Sync',
    'sync',
    'XU789321',
    'Quick BI User',
    'Sync User',
    'Failed',
  ],
  ['Oct 03, 2026 09:45:32', 'Login', 'login', 'WA456123', '-', 'Login Failed', 'Failed'],
  [
    'Oct 02, 2026 16:18:05',
    'Ticket Issuance',
    'ticket',
    'LI998877',
    'Works ID: 4a2d905',
    'Create Ticket',
    'Success',
  ],
  [
    'Oct 02, 2026 10:33:40',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Success',
  ],
  ['Oct 01, 2026 17:41:19', 'Login', 'login', 'XU789321', '-', 'Login Success', 'Success'],
  [
    'Oct 01, 2026 14:52:26',
    'Report Access',
    'chart',
    'ZH987654',
    'China Sales Overview',
    'View Report',
    'Denied',
  ],
  [
    'Oct 01, 2026 11:30:14',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Success',
  ],
  [
    'Oct 01, 2026 08:32:11',
    'Report Access',
    'chart',
    'LI123456',
    'Market Share Analysis',
    'View Report',
    'Success',
  ],
  [
    'Sep 30, 2026 15:12:33',
    'Access Sync',
    'access',
    '-',
    'Authorized Works',
    'Scheduled Sync',
    'Denied',
  ],
  [
    'Sep 28, 2026 10:44:27',
    'Ticket Issuance',
    'ticket',
    'CH321789',
    'Works ID: 8e6b447',
    'Create Ticket',
    'Success',
  ],
  ['Sep 25, 2026 16:38:55', 'Login', 'login', 'LI998877', '-', 'Login Success', 'Success'],
  [
    'Sep 22, 2026 13:07:41',
    'Report Access',
    'chart',
    'WA456123',
    'Expense Dashboard',
    'View Report',
    'Success',
  ],
  [
    'Sep 18, 2026 09:56:12',
    'User Sync',
    'sync',
    'ZH987654',
    'Quick BI User',
    'Sync User',
    'Success',
  ],
  [
    'Sep 15, 2026 14:23:08',
    'Admin',
    'admin',
    'CH321789',
    'System Configuration',
    'Update Role',
    'Success',
  ],
  [
    'Sep 10, 2026 11:35:46',
    'Report Access',
    'chart',
    'LI123456',
    'China Sales Overview',
    'View Report',
    'Success',
  ],
  [
    'Sep 03, 2026 08:41:20',
    'Ticket Issuance',
    'ticket',
    'XU789321',
    'Works ID: 2f1a663',
    'Create Ticket',
    'Denied',
  ],
]

const logs = RAW_LOGS.map(([time, event, icon, isid, resource, action, status]) => ({
  time,
  event,
  icon,
  isid,
  name: USERS[isid] || isid,
  resource,
  action,
  status,
}))

const tones = { Success: 'green', Denied: 'red', Failed: 'red' }
const toneOf = (value) => tones[value] || 'gray'

/** 右侧 Log Details 面板显隐；收起时表格区自动占满整行 */
const detailsOpen = ref(false)

/** 表格行里没有的字段：保持静态展示，不随所选中行变化 */
const STATIC_DETAILS = {
  qbiUserId: 'MSD_LI123456',
  reportName: 'China Sales Overview',
  worksId: 'ccd3428c-d123-4d2a-9f8c-8a1e...',
  ip: '10.21.15.23',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; ...)',
  sessionId: 'a7f2c8e3-1b2d-4f7e-9c1d-2a1e...',
  ticketId: 'tkt_20261024_103210_ab12cd...',
  responseTime: '1.2 s',
}

/** 当前被点击查看的行；为空表示面板无内容（空状态） */
const selectedRow = ref(null)
const currentLog = computed(() => selectedRow.value)

/** 行标识与列表 key 保持一致，用于判断选中态 */
const rowKey = (row) => `${row.time}-${row.action}`
const selectedKey = computed(() => (selectedRow.value ? rowKey(selectedRow.value) : ''))

/** 点击 View：展开面板（复用 detailsOpen）并把该行数据填进详情 */
function selectRow(row) {
  selectedRow.value = row
  detailsOpen.value = true
}

/** 详情条目：行数据跟着所选行切换，其余字段保持静态；无选中行时为空 */
const details = computed(() => {
  const row = currentLog.value
  if (!row) return []
  return [
    { label: 'Time', value: row.time },
    { label: 'Event Type', value: row.event },
    { label: 'User (ISID)', value: row.isid },
    { label: 'User Name', value: row.name },
    { label: 'Quick BI User ID', value: STATIC_DETAILS.qbiUserId },
    { label: 'Resource', value: row.resource },
    { label: 'Report Name', value: STATIC_DETAILS.reportName },
    { label: 'Works ID', value: STATIC_DETAILS.worksId },
    { label: 'Action', value: row.action },
    { label: 'IP Address', value: STATIC_DETAILS.ip },
    { label: 'User Agent', value: STATIC_DETAILS.userAgent },
    { label: 'Session ID', value: STATIC_DETAILS.sessionId },
    { label: 'Ticket ID', value: STATIC_DETAILS.ticketId },
    { label: 'Response Time', value: STATIC_DETAILS.responseTime },
  ]
})

/* ===== Keyword 搜索 ===== */
const keywordInput = ref('')
const activeKeyword = ref('')

/** User (ISID) 条件：输入后点 Search / 回车才提交 */
const isidInput = ref('')
const activeIsid = ref('')

/** 可筛选列：取表格里有实际文本的列（Details 列只有 View 链接，无可匹配文本，不列入） */
const SEARCH_COLUMNS = [
  { value: 'all', label: 'All columns' },
  { value: 'time', label: 'Time' },
  { value: 'event', label: 'Event Type' },
  { value: 'isid', label: 'User (ISID)' },
  { value: 'name', label: 'User Name' },
  { value: 'resource', label: 'Resource' },
  { value: 'action', label: 'Action' },
  { value: 'status', label: 'Status' },
]
const searchColumn = ref('all')
const activeColumn = ref('all')

const LOG_MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
}

/** 把 "Oct 24, 2026 10:32:10" 解析成本地 Date（真实日期，便于与时间区间比较）；解析失败返回 null */
function parseLogTime(text) {
  const matched = /^(\w{3}) (\d{2}), (\d{4}) (\d{2}):(\d{2}):(\d{2})$/.exec(text)
  if (!matched) return null
  const [, monthName, day, year, hour, minute, second] = matched
  const month = LOG_MONTHS[monthName]
  if (month === undefined) return null
  return new Date(Number(year), month, Number(day), Number(hour), Number(minute), Number(second))
}

function rowText(row, column) {
  if (column === 'all') {
    return [row.time, row.event, row.isid, row.name, row.resource, row.action, row.status].join(' ')
  }
  return String(row[column] ?? '')
}

/** 子串匹配，忽略大小写；column 为 all 时匹配全列 */
function matchRow(row, keyword, column) {
  return rowText(row, column).toLowerCase().includes(keyword)
}

/** Event Type 下拉：选项来自 logs 实际值，去重后按字母序排列；空串表示不过滤 */
const eventType = ref('')
const eventTypeOptions = computed(() =>
  [...new Set(logs.map((row) => row.event))].sort((a, b) => a.localeCompare(b)),
)

/** Status 下拉：同样从 logs 动态去重排序；空串表示不过滤 */
const statusFilter = ref('')
const statusOptions = computed(() =>
  [...new Set(logs.map((row) => row.status))].sort((a, b) => a.localeCompare(b)),
)

/** 时间区间（含首尾整天）与事件类型、状态、ISID、关键词/列条件取交集；区间改动即时生效 */
const visibleLogs = computed(() => {
  const keyword = activeKeyword.value.trim().toLowerCase()
  const from = dayStamp(rangeStart.value)
  const to = dayStamp(rangeEnd.value)

  return logs.filter((row) => {
    const time = parseLogTime(row.time)
    if (!time) return false
    const stamp = dayStamp(time)
    if (stamp < from || stamp > to) return false
    if (eventType.value && row.event !== eventType.value) return false
    if (statusFilter.value && row.status !== statusFilter.value) return false
    if (activeIsid.value && !String(row.isid).toLowerCase().includes(activeIsid.value)) return false
    if (!keyword) return true
    return matchRow(row, keyword, activeColumn.value)
  })
})

/* ===== 分页 ===== */
const pageSize = ref(10)
const pageSizes = [5, 10, 20]
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(visibleLogs.value.length / pageSize.value)))

const pageRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return visibleLogs.value.slice(start, start + pageSize.value)
})

/** 页码序列：超过 7 页时用省略号收起中间段 */
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

const countText = computed(() => {
  const total = visibleLogs.value.length
  if (!total) return 'Showing 0 of 0 records'
  const start = (currentPage.value - 1) * pageSize.value + 1
  const end = Math.min(currentPage.value * pageSize.value, total)
  return `Showing ${start}–${end} of ${total} records`
})

function runSearch() {
  activeKeyword.value = keywordInput.value.trim()
  activeIsid.value = isidInput.value.trim().toLowerCase()
  activeColumn.value = searchColumn.value
}

function logout() {
  router.push('/')
}

/* ===== Time Range 日期范围选择（原生实现，无第三方日期库） ===== */
const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const MONTH_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const DEFAULT_START = new Date(2026, 9, 1)
const DEFAULT_END = new Date(2026, 9, 24)

const fmt = (date) =>
  `${MONTH_SHORT[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const dayStamp = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

const rangeStart = ref(DEFAULT_START)
const rangeEnd = ref(DEFAULT_END)

const pickerOpen = ref(false)
const viewYear = ref(DEFAULT_START.getFullYear())
const viewMonth = ref(DEFAULT_START.getMonth())
/** 弹层当前面板：日期网格 / 月份选择 / 年份选择 */
const panel = ref('day')
/** 年份面板的起始年，一屏 12 年 */
const yearBase = ref(0)
/** 当前日历要修改的区间端点 */
const activeEndpoint = ref('start')
const selectionError = ref('')

const rangeWrap = ref(null)

/** 任一筛选条件或页大小变化，回到第 1 页 */
watch(
  [
    activeKeyword,
    activeIsid,
    activeColumn,
    eventType,
    statusFilter,
    rangeStart,
    rangeEnd,
    pageSize,
  ],
  () => {
    currentPage.value = 1
  },
)

/** 总页数变少时收敛当前页，避免停在空白页 */
watch(totalPages, (total) => {
  if (currentPage.value > total) currentPage.value = total
})

/** 选中的行被翻页 / 筛选 / 页大小变化挤出当前结果时，清空选中与详情（面板显示空状态） */
watch(pageRows, (rows) => {
  if (selectedRow.value && !rows.some((row) => rowKey(row) === selectedKey.value)) {
    selectedRow.value = null
  }
})

const tipText = computed(() => selectionError.value || `Select ${activeEndpoint.value} date`)
const yearLabel = computed(() =>
  panel.value === 'year' ? `${yearBase.value} – ${yearBase.value + 11}` : String(viewYear.value),
)
const yearOptions = computed(() => Array.from({ length: 12 }, (_, i) => yearBase.value + i))

/** 6 × 7 = 42 格，月初按星期补位，保证月份切换时高度不跳 */
const cells = computed(() => {
  const offset = new Date(viewYear.value, viewMonth.value, 1).getDay()
  const list = []
  for (let i = 0; i < 42; i += 1) {
    const date = new Date(viewYear.value, viewMonth.value, 1 - offset + i)
    list.push({
      key: i,
      date,
      day: date.getDate(),
      outside: date.getMonth() !== viewMonth.value,
    })
  }
  return list
})

function dayClass(date) {
  const stamp = dayStamp(date)
  return {
    'is-start': sameDay(date, rangeStart.value),
    'is-end': sameDay(date, rangeEnd.value),
    'in-range': stamp > dayStamp(rangeStart.value) && stamp < dayStamp(rangeEnd.value),
  }
}

function togglePicker(endpoint) {
  if (pickerOpen.value && activeEndpoint.value === endpoint) {
    pickerOpen.value = false
    selectionError.value = ''
    return
  }
  activeEndpoint.value = endpoint
  selectionError.value = ''
  panel.value = 'day'
  const selectedDate = endpoint === 'start' ? rangeStart.value : rangeEnd.value
  viewYear.value = selectedDate.getFullYear()
  viewMonth.value = selectedDate.getMonth()
  pickerOpen.value = true
}

/** 头部月份/年份按钮：再次点击同一项则回到日期网格 */
function togglePanel(which) {
  if (panel.value === which) {
    panel.value = 'day'
    return
  }
  if (which === 'year') {
    yearBase.value = Math.floor(viewYear.value / 12) * 12
  }
  panel.value = which
}

/** 头部 ‹ ›：日期面板按月上/下翻，月份面板按年翻，年份面板翻 12 年一屏 */
function shiftView(step) {
  if (panel.value === 'year') {
    yearBase.value += step * 12
    return
  }
  if (panel.value === 'month') {
    viewYear.value += step
    return
  }
  const next = new Date(viewYear.value, viewMonth.value + step, 1)
  viewYear.value = next.getFullYear()
  viewMonth.value = next.getMonth()
}

function pickMonth(month) {
  viewMonth.value = month
  panel.value = 'day'
}

function pickYear(year) {
  viewYear.value = year
  panel.value = 'day'
}

/** 选择日期只更新当前端点，并确保开始日期不晚于结束日期。 */
function pickDay(date) {
  const picked = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  if (activeEndpoint.value === 'start') {
    if (dayStamp(picked) > dayStamp(rangeEnd.value)) {
      selectionError.value = 'Start date cannot be after end date'
      return
    }
    rangeStart.value = picked
  } else {
    if (dayStamp(picked) < dayStamp(rangeStart.value)) {
      selectionError.value = 'End date cannot be before start date'
      return
    }
    rangeEnd.value = picked
  }
  selectionError.value = ''
  pickerOpen.value = false
}

/** 恢复到默认区间并收起弹层 */
function clearRange() {
  rangeStart.value = DEFAULT_START
  rangeEnd.value = DEFAULT_END
  selectionError.value = ''
  pickerOpen.value = false
}

/** Reset：关键词、ISID、列、事件类型、状态、日期区间一起复位，并清空详情选中 */
function resetSearch() {
  keywordInput.value = ''
  activeKeyword.value = ''
  isidInput.value = ''
  activeIsid.value = ''
  searchColumn.value = 'all'
  activeColumn.value = 'all'
  eventType.value = ''
  statusFilter.value = ''
  selectedRow.value = null
  panel.value = 'day'
  currentPage.value = 1
  clearRange()
}

function onDocMouseDown(event) {
  if (!pickerOpen.value) return
  if (rangeWrap.value && !rangeWrap.value.contains(event.target)) {
    pickerOpen.value = false
  }
}

function onDocKeyDown(event) {
  if (event.key === 'Escape' && pickerOpen.value) {
    pickerOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onDocMouseDown)
  document.addEventListener('keydown', onDocKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocMouseDown)
  document.removeEventListener('keydown', onDocKeyDown)
})
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
          <h1>Audit logs</h1>
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

      <div class="grid" :class="{ 'is-single': !detailsOpen }">
        <section class="content">
          <!-- 标签页 -->
          <nav class="tabs" aria-label="Sync views">
            <button class="tab" type="button" @click="router.push('/UserAccessSync')">Users</button>
            <button class="tab is-active" type="button" @click="router.push('/AuditLogs')">
              Sync Logs
            </button>
          </nav>

          <!-- 筛选 -->
          <div class="filters">
            <div class="field">
              <span class="field-label">Time Range</span>
              <div ref="rangeWrap" class="range-wrap">
                <div class="range">
                  <svg class="range-icon" viewBox="0 0 20 20" aria-hidden="true">
                    <rect
                      x="3"
                      y="4.4"
                      width="14"
                      height="12.4"
                      rx="2"
                      fill="none"
                      stroke="#0b63f6"
                      stroke-width="1.5"
                    />
                    <path
                      d="M3 8.4h14M6.8 3v2.8M13.2 3v2.8"
                      stroke="#0b63f6"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <button
                    class="range-date"
                    type="button"
                    aria-label="Select start date"
                    aria-haspopup="dialog"
                    :aria-expanded="pickerOpen && activeEndpoint === 'start'"
                    @click="togglePicker('start')"
                  >
                    {{ fmt(rangeStart) }}
                  </button>
                  <svg class="range-arrow" viewBox="0 0 16 12" aria-hidden="true">
                    <path
                      d="M2 6h11m0 0-3.4-3.4M13 6l-3.4 3.4"
                      fill="none"
                      stroke="#6b7488"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <button
                    class="range-date"
                    type="button"
                    aria-label="Select end date"
                    aria-haspopup="dialog"
                    :aria-expanded="pickerOpen && activeEndpoint === 'end'"
                    @click="togglePicker('end')"
                  >
                    {{ fmt(rangeEnd) }}
                  </button>
                </div>

                <div
                  v-if="pickerOpen"
                  class="calendar"
                  role="dialog"
                  aria-label="Select time range"
                >
                  <div class="cal-head">
                    <button
                      class="cal-nav"
                      type="button"
                      :aria-label="panel === 'year' ? 'Previous 12 years' : 'Previous month'"
                      @click="shiftView(-1)"
                    >
                      <svg viewBox="0 0 10 10" aria-hidden="true">
                        <path
                          d="M6.6 2 3.4 5l3.2 3"
                          fill="none"
                          stroke="#4b5872"
                          stroke-width="1.4"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>

                    <div class="cal-selectors">
                      <button
                        class="cal-sel"
                        :class="{ 'is-open': panel === 'month' }"
                        type="button"
                        aria-label="Select month"
                        @click="togglePanel('month')"
                      >
                        {{ MONTH_FULL[viewMonth] }}
                      </button>
                      <button
                        class="cal-sel cal-sel-year"
                        :class="{ 'is-open': panel === 'year' }"
                        type="button"
                        aria-label="Select year"
                        @click="togglePanel('year')"
                      >
                        {{ yearLabel }}
                      </button>
                    </div>

                    <button
                      class="cal-nav"
                      type="button"
                      :aria-label="panel === 'year' ? 'Next 12 years' : 'Next month'"
                      @click="shiftView(1)"
                    >
                      <svg viewBox="0 0 10 10" aria-hidden="true">
                        <path
                          d="M3.4 2 6.6 5l-3.2 3"
                          fill="none"
                          stroke="#4b5872"
                          stroke-width="1.4"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div v-if="panel === 'month'" class="cal-months">
                    <button
                      v-for="(name, index) in MONTH_FULL"
                      :key="name"
                      class="cal-opt"
                      :class="{ 'is-selected': index === viewMonth }"
                      type="button"
                      @click="pickMonth(index)"
                    >
                      {{ name }}
                    </button>
                  </div>

                  <div v-else-if="panel === 'year'" class="cal-years">
                    <button
                      v-for="year in yearOptions"
                      :key="year"
                      class="cal-opt"
                      :class="{ 'is-selected': year === viewYear }"
                      type="button"
                      @click="pickYear(year)"
                    >
                      {{ year }}
                    </button>
                  </div>

                  <template v-else>
                    <div class="cal-week">
                      <span v-for="weekday in WEEKDAYS" :key="weekday">{{ weekday }}</span>
                    </div>

                    <div class="cal-grid">
                      <button
                        v-for="cell in cells"
                        :key="cell.key"
                        class="cal-day"
                        :class="[{ outside: cell.outside }, dayClass(cell.date)]"
                        type="button"
                        @click="pickDay(cell.date)"
                      >
                        {{ cell.day }}
                      </button>
                    </div>
                  </template>

                  <div class="cal-foot">
                    <span
                      class="cal-tip"
                      :class="{ 'is-error': selectionError }"
                      aria-live="polite"
                    >
                      {{ tipText }}
                    </span>
                    <button class="cal-clear" type="button" @click="clearRange">Clear</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <span class="field-label">Event Type</span>
              <label class="select">
                <select v-model="eventType" aria-label="Event Type">
                  <option value="">All Event Types</option>
                  <option v-for="type in eventTypeOptions" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
                <svg class="caret" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.4 4.4 6 8l3.6-3.6" fill="none" stroke="#6b7488" stroke-width="1.5" />
                </svg>
              </label>
            </div>

            <div class="field">
              <span class="field-label">User (ISID)</span>
              <input
                v-model="isidInput"
                class="text-input"
                type="text"
                placeholder="Enter ISID, name or email"
                @keydown.enter.prevent="runSearch"
              />
            </div>

            <div class="field">
              <span class="field-label">Status</span>
              <label class="select">
                <select v-model="statusFilter" aria-label="Status">
                  <option value="">All Statuses</option>
                  <option v-for="status in statusOptions" :key="status" :value="status">
                    {{ status }}
                  </option>
                </select>
                <svg class="caret" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.4 4.4 6 8l3.6-3.6" fill="none" stroke="#6b7488" stroke-width="1.5" />
                </svg>
              </label>
            </div>
          </div>

          <div class="filters-row2">
            <div class="search-fields">
              <div class="field keyword-field">
                <span class="field-label">Keyword (optional)</span>
                <input
                  v-model="keywordInput"
                  class="text-input"
                  type="text"
                  placeholder="Search by report name, Works ID, action or details"
                  @keydown.enter.prevent="runSearch"
                />
              </div>

              <div class="field column-field">
                <span class="field-label">Column</span>
                <label class="select">
                  <select v-model="searchColumn" aria-label="Search column">
                    <option
                      v-for="column in SEARCH_COLUMNS"
                      :key="column.value"
                      :value="column.value"
                    >
                      {{ column.label }}
                    </option>
                  </select>
                  <svg class="caret" viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M2.4 4.4 6 8l3.6-3.6"
                      fill="none"
                      stroke="#6b7488"
                      stroke-width="1.5"
                    />
                  </svg>
                </label>
              </div>
            </div>

            <div class="filter-actions">
              <button class="search-btn" type="button" @click="runSearch">Search</button>
              <button class="reset-btn" type="button" @click="resetSearch">Reset</button>
            </div>
          </div>

          <!-- 日志表 -->
          <div class="table-wrap">
            <div class="log-row head">
              <span class="cell">
                Time
                <svg class="sort" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M4.2 2.6v6.8m0 0-1.7-1.8m1.7 1.8 1.7-1.8M7.8 9.4V2.6m0 0L6.1 4.4m1.7-1.8L9.5 4.4"
                    fill="none"
                    stroke="#8b93a3"
                    stroke-width="1.2"
                  />
                </svg>
              </span>
              <span class="cell">Event Type</span>
              <span class="cell">User (ISID)</span>
              <span class="cell">User Name</span>
              <span class="cell">Resource</span>
              <span class="cell">Action</span>
              <span class="cell">Status</span>
              <span class="cell">Details</span>
            </div>

            <div
              v-for="row in pageRows"
              :key="rowKey(row)"
              class="log-row"
              :class="{ 'is-selected': selectedKey === rowKey(row) }"
            >
              <span class="cell time">{{ row.time }}</span>
              <span class="cell event">
                <span class="event-icon" aria-hidden="true">
                  <svg v-if="row.icon === 'chart'" viewBox="0 0 20 20">
                    <rect x="2.4" y="9" width="4" height="8.4" rx="1" fill="#0b63f6" />
                    <rect x="8" y="4.6" width="4" height="12.8" rx="1" fill="#0b63f6" />
                    <rect x="13.6" y="1.8" width="4" height="15.6" rx="1" fill="#0b63f6" />
                  </svg>
                  <svg v-else-if="row.icon === 'ticket'" viewBox="0 0 20 20">
                    <path
                      d="M2.6 7.2 12.8 2.4a2 2 0 0 1 2.7 1l2.2 5a2 2 0 0 1-1 2.6L6.5 15.8a2 2 0 0 1-2.7-1L1.6 9.8a2 2 0 0 1 1-2.6z"
                      fill="none"
                      stroke="#0b63f6"
                      stroke-width="1.5"
                    />
                    <circle
                      cx="11.6"
                      cy="8.6"
                      r="1.6"
                      fill="none"
                      stroke="#0b63f6"
                      stroke-width="1.3"
                    />
                  </svg>
                  <svg v-else-if="row.icon === 'login'" viewBox="0 0 20 20">
                    <circle cx="10" cy="6.2" r="3.6" fill="#0b63f6" />
                    <path d="M3.4 17.6c0-3.5 2.9-5.8 6.6-5.8s6.6 2.3 6.6 5.8z" fill="#0b63f6" />
                  </svg>
                  <svg v-else-if="row.icon === 'sync'" viewBox="0 0 20 20">
                    <path
                      d="M17 8.4A7.2 7.2 0 1 0 15 14.9M17 4v4.4h-4.4"
                      fill="none"
                      stroke="#0b63f6"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg v-else-if="row.icon === 'access'" viewBox="0 0 20 20">
                    <ellipse cx="10" cy="4.4" rx="6.4" ry="2.4" fill="#0b63f6" />
                    <path
                      d="M3.6 4.4v5.2c0 1.3 2.9 2.4 6.4 2.4s6.4-1.1 6.4-2.4V4.4"
                      fill="none"
                      stroke="#0b63f6"
                      stroke-width="1.5"
                    />
                    <path
                      d="M3.6 9.6v5.2c0 1.3 2.9 2.4 6.4 2.4s6.4-1.1 6.4-2.4V9.6"
                      fill="none"
                      stroke="#0b63f6"
                      stroke-width="1.5"
                    />
                  </svg>
                  <svg v-else viewBox="0 0 20 20">
                    <path
                      d="M10 2.2l1.6 2.5 2.9-.7.7 2.9 2.5 1.6-1.4 2.5 1.4 2.5-2.5 1.6-.7 2.9-2.9-.7L10 19.8l-1.6-2.5-2.9.7-.7-2.9-2.5-1.6L3.7 10 2.3 7.5l2.5-1.6.7-2.9 2.9.7z"
                      fill="#0b63f6"
                    />
                    <circle cx="10" cy="10" r="2.6" fill="#fff" />
                  </svg>
                </span>
                {{ row.event }}
              </span>
              <span class="cell">{{ row.isid }}</span>
              <span class="cell">{{ row.name }}</span>
              <span class="cell resource">{{ row.resource }}</span>
              <span class="cell">{{ row.action }}</span>
              <span class="cell">
                <span class="badge" :class="`badge-${toneOf(row.status)}`">{{ row.status }}</span>
              </span>
              <span class="cell">
                <a class="view" href="#log-details" @click.prevent="selectRow(row)">View</a>
              </span>
            </div>

            <div v-if="!visibleLogs.length" class="empty">
              <span class="empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle
                    cx="10.5"
                    cy="10.5"
                    r="6.5"
                    fill="none"
                    stroke="#b9c0cf"
                    stroke-width="1.8"
                  />
                  <path
                    d="M15.4 15.4 20 20"
                    stroke="#b9c0cf"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              <span class="empty-title">No matching records</span>
              <span class="empty-sub">
                No records match the current time range, keyword and column filters. Adjust the
                filters or click Reset to show all logs.
              </span>
            </div>
          </div>

          <!-- 分页 -->
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
        </section>

        <!-- 详情面板收起后的轻量恢复入口：贴在表格卡片右缘的竖条 -->
        <button
          v-if="!detailsOpen"
          class="details-restore"
          type="button"
          aria-label="Show log details"
          title="Show log details"
          @click="detailsOpen = true"
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

        <!-- 右侧日志详情 -->
        <aside v-if="detailsOpen" class="side">
          <div class="side-head">
            <h2>Log Details</h2>
            <button
              class="close"
              type="button"
              aria-label="Close log details"
              @click="detailsOpen = false"
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

          <template v-if="currentLog">
            <div class="log-banner">
              <span class="banner-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20">
                  <rect x="2.4" y="9" width="4" height="8.4" rx="1" fill="#0b63f6" />
                  <rect x="8" y="4.6" width="4" height="12.8" rx="1" fill="#0b63f6" />
                  <rect x="13.6" y="1.8" width="4" height="15.6" rx="1" fill="#0b63f6" />
                </svg>
              </span>
              <span class="banner-title">{{ currentLog.event }}</span>
              <span class="badge" :class="`badge-${toneOf(currentLog.status)}`">{{
                currentLog.status
              }}</span>
            </div>

            <dl class="kv">
              <template v-for="item in details" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd :class="{ ok: item.label === 'Status' }">{{ item.value }}</dd>
              </template>
              <dt>Status</dt>
              <dd :class="currentLog.status === 'Success' ? 'ok' : 'bad'">
                {{ currentLog.status }}
              </dd>
            </dl>

            <div class="divider"></div>

            <h3>Additional Information</h3>
            <div class="note-box">
              <p>Accessed via QuickBI SSO Portal.</p>
              <p>Ticket issued successfully and reported and opened in browser.</p>
            </div>
          </template>

          <div v-else class="details-empty">
            <p>
              No log selected. Click <span class="details-empty-link">View</span> on a row to see
              its details.
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

/* 同步状态卡 */
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

/* Sync Now */
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

/* ===== 两栏布局 ===== */
.grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 404px;
  gap: 20px;
  align-items: start;
  margin-top: 18px;
}

/* 详情面板收起后变成单列，表格占满整行 */
.grid.is-single {
  grid-template-columns: minmax(0, 1fr);
}

.content {
  min-width: 0;
}

/* 详情面板恢复入口：贴表格卡片右缘的细竖条 */
.details-restore {
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

.details-restore:hover,
.details-restore:focus-visible {
  color: var(--accent);
  border-color: #cfe0ff;
}

.details-restore svg {
  width: 8px;
  height: 12px;
  display: block;
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
.filters {
  display: grid;
  grid-template-columns: 1.15fr 1fr 1.5fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: #4b5872;
}

.range {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 38px;
  padding: 0 12px;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 6px;
  font-family: inherit;
  font-size: 12.5px;
  color: #2b3752;
  cursor: pointer;
  white-space: nowrap;
}

.range-icon {
  width: 17px;
  height: 17px;
  flex: none;
  display: block;
}

.range-arrow {
  width: 15px;
  height: 11px;
  flex: none;
  display: block;
}

.range-date {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.range-date:focus-visible {
  outline: 2px solid #0b63f6;
  outline-offset: 3px;
  border-radius: 2px;
}

/* ===== Time Range 日历弹层 ===== */
.range-wrap {
  position: relative;
}

.calendar {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 30;
  width: 268px;
  padding: 12px;
  background: #fff;
  border: 1px solid #e1e7f2;
  border-radius: 10px;
  box-shadow: 0 12px 28px rgba(20, 35, 70, 0.12);
}

.cal-head {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) 24px;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.cal-selectors {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 0;
}

.cal-sel {
  padding: 3px 5px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: none;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--navy);
  cursor: pointer;
  white-space: nowrap;
}

.cal-sel-year {
  font-size: 11.5px;
}

.cal-sel:hover {
  background: #eff4fd;
  color: var(--accent);
}

.cal-sel.is-open {
  border-color: #cfe0fd;
  background: #eff4fd;
  color: var(--accent);
}

.cal-sel:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.cal-months,
.cal-years {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  align-content: center;
  min-height: 200px;
}

.cal-opt {
  height: 32px;
  border: 1px solid #e1e7f2;
  border-radius: 6px;
  background: #fff;
  font-family: inherit;
  font-size: 12px;
  color: #2b3752;
  cursor: pointer;
}

.cal-opt:hover {
  border-color: var(--accent);
  background: #eff4fd;
  color: var(--accent);
}

.cal-opt.is-selected {
  border-color: var(--accent);
  background: var(--accent);
  color: #fff;
  font-weight: 600;
}

.cal-opt:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.cal-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: #fff;
  border: 1px solid #e1e7f2;
  border-radius: 6px;
  cursor: pointer;
}

.cal-nav svg {
  width: 10px;
  height: 10px;
  display: block;
}

.cal-nav:hover {
  border-color: var(--accent);
}

.cal-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;
}

.cal-week span {
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: var(--tiny);
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.cal-day {
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: none;
  font-family: inherit;
  font-size: 12px;
  color: #2b3752;
  cursor: pointer;
}

.cal-day:hover {
  background: #eff4fd;
}

.cal-day.outside {
  color: #b9c0cf;
}

.cal-day.in-range {
  background: #e8f1fe;
  color: var(--accent);
}

.cal-day.is-start,
.cal-day.is-end {
  background: var(--accent);
  color: #fff;
  font-weight: 600;
}

.cal-day.is-start:hover,
.cal-day.is-end:hover {
  background: var(--accent-strong);
}

.cal-day:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.cal-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--line-soft);
}

.cal-tip {
  font-size: 11px;
  color: var(--tiny);
}

.cal-tip.is-error {
  color: #c2413b;
}

.cal-clear {
  padding: 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
}

.cal-clear:hover {
  color: var(--accent-strong);
}

.select {
  position: relative;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 30px 0 12px;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 6px;
  min-width: 0;
}

.select select {
  appearance: none;
  border: 0;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: 12.5px;
  color: #2b3752;
  cursor: pointer;
  padding: 0;
  width: 100%;
}

.caret {
  position: absolute;
  right: 11px;
  width: 12px;
  height: 12px;
  pointer-events: none;
}

.text-input {
  height: 38px;
  padding: 0 12px;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 6px;
  font-family: inherit;
  font-size: 12.5px;
  color: #2b3752;
  outline: none;
  min-width: 0;
}

.text-input::placeholder {
  color: #9aa3b5;
}

.text-input:focus {
  border-color: #9dbcff;
}

.filters-row2 {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: end;
  margin-top: 14px;
}

/* 关键词输入 + 列选择同一行，窄屏自动换行 */
.search-fields {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 16px;
  min-width: 0;
}

.keyword-field {
  flex: 1 1 240px;
  min-width: 0;
}

.column-field {
  flex: 0 0 168px;
}

.filter-actions {
  display: flex;
  gap: 12px;
}

.search-btn,
.reset-btn {
  height: 38px;
  min-width: 90px;
  padding: 0 18px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.search-btn {
  border: 0;
  background: var(--accent);
  color: #fff;
}

.search-btn:hover {
  background: var(--accent-strong);
}

.reset-btn {
  border: 1.5px solid var(--accent);
  background: #fff;
  color: var(--accent);
}

.reset-btn:hover {
  background: #f4f8ff;
}

/* ===== 日志表 ===== */
.table-wrap {
  margin-top: 16px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow-x: auto;
}

.log-row {
  display: grid;
  grid-template-columns:
    minmax(0, 1.9fr) minmax(0, 1.5fr) minmax(0, 1.3fr) minmax(0, 1.3fr)
    minmax(0, 1.9fr) minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 0.78fr);
  align-items: center;
  column-gap: 8px;
  padding: 0 12px;
  border-top: 1px solid var(--line-soft);
  font-size: 12px;
  color: var(--color-text, #3a4459);
}

.log-row.head {
  min-height: 42px;
  border-top: 0;
  background: #eff2f9;
  border-radius: 8px 8px 0 0;
  font-size: 11.5px;
  font-weight: 600;
  color: #4b5872;
}

.log-row:not(.head) {
  min-height: 47px;
}

/* 被 View 查看的行：浅色底 + 左侧细色条，作为轻量选中态 */
.log-row.is-selected {
  background: #edf4ff;
  box-shadow: inset 3px 0 0 var(--accent);
}

/* 搜索无结果的空状态 */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 38px 16px 42px;
  border-top: 1px solid var(--line-soft);
}

.empty-icon svg {
  width: 26px;
  height: 26px;
  display: block;
}

.empty-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--navy);
}

.empty-sub {
  max-width: 420px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--sub);
  text-align: center;
}

.cell {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cell.time {
  color: #2b3752;
}

.cell.resource {
  color: #2b3752;
}

.cell.event {
  color: var(--navy);
  font-weight: 600;
}

.row .cell.event {
  font-weight: 500;
}

.event-icon {
  flex: none;
  width: 18px;
  height: 18px;
  display: block;
}

.event-icon svg {
  width: 18px;
  height: 18px;
  display: block;
}

.sort {
  flex: none;
  width: 12px;
  height: 12px;
  display: block;
}

.view {
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
}

.view:hover {
  text-decoration: underline;
}

/* 徽标 */
.badge {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 9px;
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

.badge-red {
  background: var(--red-bg);
  color: var(--red);
}

.badge-gray {
  background: var(--gray-bg);
  color: var(--gray);
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

.page-arrow:disabled {
  border-color: #eef1f6;
  background: #f7f9fd;
  cursor: not-allowed;
}

.page-arrow:disabled svg path {
  stroke: #c4cbd8;
}

.page-num.is-active {
  border-color: var(--accent);
  background: var(--accent);
  color: #fff;
  font-weight: 600;
}

.page-dots {
  padding: 0 2px;
  font-size: 12px;
  color: var(--tiny);
}

.page-size {
  position: relative;
  display: flex;
  align-items: center;
  height: 34px;
  margin-left: 8px;
  padding: 0 30px 0 12px;
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

/* ===== 右侧日志详情 ===== */
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
  font-size: 20px;
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

.log-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  padding: 12px 14px;
  background: #f1f5fd;
  border-radius: 6px;
}

.banner-icon {
  flex: none;
  width: 20px;
  height: 20px;
}

.banner-icon svg {
  width: 20px;
  height: 20px;
  display: block;
}

.banner-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--navy);
}

.log-banner .badge {
  margin-left: auto;
}

/* 未选中任何记录时的面板空状态 */
.details-empty {
  margin-top: 14px;
  padding: 26px 16px;
  border: 1px dashed var(--line);
  border-radius: 8px;
  background: #fafbfe;
  text-align: center;
}

.details-empty p {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
  color: var(--tiny);
}

.details-empty-link {
  color: var(--accent);
  font-weight: 600;
}

.kv {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  column-gap: 10px;
  row-gap: 11px;
  margin: 14px 0 0;
  font-size: 12.5px;
}

.kv dt {
  color: #5b6885;
  white-space: nowrap;
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

.kv dd.bad {
  color: var(--red);
  font-weight: 600;
}

.divider {
  height: 1px;
  margin: 16px 0 14px;
  background: var(--line-soft);
}

.side h3 {
  margin: 0;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--navy);
}

.note-box {
  margin-top: 9px;
  padding: 12px 14px;
  background: #f7f9fc;
  border: 1px solid #e9eef6;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.7;
  color: #3a4459;
}

.note-box p {
  margin: 0;
}

/* ===== 响应式 ===== */
@media (max-width: 1180px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .log-row {
    min-width: 900px;
  }

  .side {
    max-width: 560px;
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

  .filters {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
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

  .filters {
    grid-template-columns: minmax(0, 1fr);
  }

  .filters-row2 {
    grid-template-columns: minmax(0, 1fr);
  }

  .filter-actions {
    justify-content: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sync-btn {
    transition: none;
  }
}
</style>
