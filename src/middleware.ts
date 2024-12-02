import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ''

interface DecodedToken {
  role: string
  originalUrl?: string
}

export function middleware(request: NextRequest) {
    const authHeaders = request.headers.get('authorization')
    const token = authHeaders?.split(" ")[1]
    
    // Check if trying to access login route while already authenticated
    if (request.nextUrl.pathname === '/login' && token) {
        try {
            const decoded = verify(token, JWT_SECRET) as DecodedToken
            
            // If token is valid, redirect based on role
            if (decoded.role === 'admin') {
                // Remove the 'from' parameter and redirect directly to admin dashboard
                return NextResponse.redirect(new URL('/admin-dashboard', request.url))
            }
            // If not admin, redirect to home
            return NextResponse.redirect(new URL('/', request.url))
        } catch (error:any) {
            // If token is invalid, allow access to login page
            return NextResponse.next()
        }
    }

    // Handle protected admin routes
    if (request.nextUrl.pathname.startsWith('/admin-dashboard')) {
        if (!token) {
            // If no token, redirect to login
            return NextResponse.redirect(new URL('/login', request.url))
        }

        try {
            const decoded = verify(token, JWT_SECRET) as DecodedToken
            
            if (decoded.role !== 'admin') {
                // Redirect non-admin users to home page
                return NextResponse.redirect(new URL('/', request.url))
            }
            
            // Allow admin users to access admin dashboard
            return NextResponse.next()
        } catch (error) {
            // If token verification fails, redirect to login
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Allow access to all other routes
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/login',
        '/admin-dashboard/'
    ]
}