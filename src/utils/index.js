/**
 * map遍历树形结构数据(自上向下)
 * @param {Object[]} tree
 * @param {Function} method
 */
export function mapTree(tree, method) {
  return tree.map(item => {
    item = method(item)
    if (item.children && item.children.length > 0) {
      item.children = mapTree(item.children, method)
    }
    return item
  })
}
