import Mock from 'mockjs'
import menus from '@/mock/data/menus'

Mock.mock('/menu/query', 'post', () => {
  return {
    code: 200,
    msg: '操作成功',
    data: menus
  }
})

Mock.mock('/menu/add', 'post', () => {
  return {
    code: -1,
    msg: '演示环境暂时无法操作！'
  }
})

Mock.mock('/menu/update', 'post', () => {
  return {
    code: -1,
    msg: '演示环境暂时无法操作！'
  }
})

Mock.mock('/menu/remove', 'post', () => {
  return {
    code: -1,
    msg: '演示环境暂时无法操作！'
  }
})
