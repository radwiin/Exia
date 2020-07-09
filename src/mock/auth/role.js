import Mock from 'mockjs'
import roles from '@/mock/data/roles'

Mock.mock('/role/query', 'post', () => {
  return {
    code: 200,
    msg: '操作成功',
    data: {
      records: roles,
      currentPage: 1,
      pageSize: 10,
      total: 1
    }
  }
})

Mock.mock('/role/add', 'post', () => {
  return {
    code: -1,
    msg: '演示环境暂时无法操作！'
  }
})

Mock.mock('/role/update', 'post', () => {
  return {
    code: -1,
    msg: '演示环境暂时无法操作！'
  }
})

Mock.mock('/role/remove', 'post', () => {
  return {
    code: -1,
    msg: '演示环境暂时无法操作！'
  }
})

Mock.mock('/role/setAuthority', 'post', () => {
  return {
    code: -1,
    msg: '演示环境暂时无法操作！'
  }
})
