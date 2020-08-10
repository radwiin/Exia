const getters = {
  token: state => state.app.token,
  account: state => state.app.account,
  roles: state => state.app.roles,
  routes: state => state.app.routes
}
export default getters
