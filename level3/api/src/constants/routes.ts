enum RouteKeys {
  home = 'home',
  login = 'login',
  register = 'register',
}

type Routes = {
  [route in RouteKeys]: string
}

export const routes: Routes = {
  home: '/',
  login: '/login',
  register: '/register',
}
