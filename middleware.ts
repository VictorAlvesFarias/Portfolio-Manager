import { NextResponse } from 'next/server'
import mongoose from 'mongoose';
import { uri } from './env';
import LoginService from './services/LoginService';


export async function middleware(request: any) {
  
  const cookie = request.cookies.get('auth')?.value
  const pathname = request.nextUrl.pathname
  const loginService = new LoginService()

  let auth: any

  await loginService.validate(cookie)
    .then(r => {
      auth = true
    })
    .catch((err) => {
      auth = false
      request.cookies.delete('auth')
    })

  if (pathname != '/login' && auth == false) {
    return NextResponse.redirect(
      new URL(`/login`, request.url),
    )
  }

  if (pathname == '/login' && auth == true) {
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