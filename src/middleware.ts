import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = [process.env.NEXT_PUBLIC_APP_URL!];

const corsMiddleware = (request: NextRequest) => {
	const isProtectedRouteWithCors =
		request.nextUrl.pathname.startsWith('/auth') ||
		request.nextUrl.pathname.startsWith('/cms');

	if (!isProtectedRouteWithCors) return;

	const origin = request.headers.get('origin');

	if (origin && !allowedOrigins.includes(origin)) {
		return NextResponse.json({ error: 'Não autorizado' }, { status: 403 });
	}

	const response = NextResponse.next();

	response.headers.set('Access-Control-Allow-Origin', origin!);

	response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');

	response.headers.set(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);

	return response;
};

const tokenValidateMiddleware = async (request: NextRequest) => {
	const isAuthenticatedRoute =
		request.nextUrl.pathname.startsWith('/cms') ||
		request.nextUrl.pathname.startsWith('/auth');

	if (!isAuthenticatedRoute) return;

	const token = request.cookies.get('token')?.value;
	const isAuthenticated = Boolean(token);
	const isCmsRoute = request.nextUrl.pathname.startsWith('/cms');
	const isLoginRoute = request.nextUrl.pathname.startsWith('/auth/login');

	if (!isAuthenticated && isCmsRoute) {
		return NextResponse.redirect(new URL('/auth/login', request.url));
	}

	if (isAuthenticated && isLoginRoute) {
		return NextResponse.redirect(new URL('/cms', request.url));
	}

	return NextResponse.next();
};

export async function middleware(request: NextRequest) {
	corsMiddleware(request);

	if (request.nextUrl.pathname === '/auth/ativarConta') {
		const token = request.nextUrl.searchParams.get('token');
		if (!token) {
			return NextResponse.redirect(new URL('/auth/login', request.url));
		}
	}

	await tokenValidateMiddleware(request);

	return NextResponse.next();
}

export const config = {
	matcher: ['/auth/:path*', '/cms/:path*'],
};
