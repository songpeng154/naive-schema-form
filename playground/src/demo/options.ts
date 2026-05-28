export const cityOptions = [
  { label: '深圳', value: 'shenzhen' },
  { label: '广州', value: 'guangzhou' },
  { label: '杭州', value: 'hangzhou' },
  { label: '成都', value: 'chengdu' },
]

export const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'guest' },
]

export const tagOptions = [
  { label: '高优先级', value: 'important' },
  { label: '远程', value: 'remote' },
  { label: '可外包', value: 'outsourcing' },
]

export const departmentTree = [
  {
    label: '研发中心',
    key: 'rd',
    children: [
      { label: '前端组', key: 'frontend' },
      { label: '平台组', key: 'platform' },
    ],
  },
  {
    label: '销售中心',
    key: 'sales',
    children: [
      { label: '华南区', key: 'south' },
      { label: '华东区', key: 'east' },
    ],
  },
]

export const cascaderOptions = [
  {
    label: '华南',
    value: 'south',
    children: [
      { label: '深圳', value: 'shenzhen' },
      { label: '广州', value: 'guangzhou' },
    ],
  },
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '杭州', value: 'hangzhou' },
      { label: '上海', value: 'shanghai' },
    ],
  },
]

export const mentionOptions = [
  { label: 'Alice', value: 'alice' },
  { label: 'Bob', value: 'bob' },
  { label: 'Carol', value: 'carol' },
]

export const transferOptions = [
  { label: '读取权限', value: 'read' },
  { label: '写入权限', value: 'write' },
  { label: '发布权限', value: 'publish' },
  { label: '审计权限', value: 'audit' },
]
