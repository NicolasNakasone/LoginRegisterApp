export interface User {
  id: string
  email: string
  password: string
  full_name: string
}

/* Esto despues puede ser algo que tenga el code como un enum, cosa de
  copiar ese enum al front para no tener que manejar strings
*/
export interface Error {
  code: string
  message: string
}
