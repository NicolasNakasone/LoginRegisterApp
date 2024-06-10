enum RouteKeys {
  home = 'home',
  login = 'login',
  register = 'register',
  users = 'users',
  refreshToken = 'refreshToken',
}

type Routes = {
  [route in RouteKeys]: string
}

export const routes: Routes = {
  home: '/',
  login: '/login',
  register: '/register',
  users: '/users',
  refreshToken: '/refresh-token',
}
