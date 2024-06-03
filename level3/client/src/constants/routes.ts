enum RoutesEnum {
  login = 'login',
  register = 'register',
  home = 'home',
}

type Routes = {
  [route in RoutesEnum]: string
}

export const routes: Routes = {
  login: '/iniciar-sesion',
  register: '/registro',
  home: '/',
}
