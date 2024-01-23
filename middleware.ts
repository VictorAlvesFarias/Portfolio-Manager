import { NextResponse } from 'next/server'
import LoginService from './services/LoginService';


export async function middleware(request: any) {

  const cookie = request.cookies.get('auth')?.value
  const pathname = request.nextUrl.pathname
  const loginService = new LoginService()
  let auth: any

  await loginService.validate(cookie)
  .then(r => {
    auth = r.data.authorized? true : false  
    !r.data.authorized&&request.cookies.delete('auth')  
  })
  .catch((err) => {
    auth = false
  })

  if (pathname != '/login' && auth == false) {
    return NextResponse.redirect(
      new URL(`/login`, request.url),
    )
  }

  else if ((pathname == '/login'||pathname == '/') && auth == true) {
    return NextResponse.redirect(
      new URL(`/home`, request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/',
  ],
};