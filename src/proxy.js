import { NextResponse } from 'next/server'
import { auth } from './lib/auth'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: request.headers
    })
     if(!session){
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}

export const config = {
  matcher: ["/all-client/all-properties/:path"],
}