import { NextRequest, NextResponse } from 'next/server';
import { getLinkByCode, incrementClickCount } from '@/lib/utils';
import { headers } from 'next/headers';

interface RouteParams {
  params: {
    code: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { code } = params;
  
  try {
    // Get link data
    const link = await getLinkByCode(code);
    
    if (!link) {
      return NextResponse.redirect(new URL('/?error=not-found', request.url), 307);
    }

    // Get client information for analytics
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || 'Unknown';
    const referer = headersList.get('referer') || '';
    const forwarded = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const clientIp = forwarded?.split(',')[0] || realIp || request.ip || 'Unknown';
    
    // Get country from Vercel headers (if available)
    const country = headersList.get('x-vercel-ip-country') || 'Unknown';
    const city = headersList.get('x-vercel-ip-city') || 'Unknown';

    // Increment click count asynchronously (don't wait for it)
    incrementClickCount(link.id, {
      ip: clientIp,
      userAgent,
      referer,
      country,
      city,
    }).catch(error => {
      console.error('Failed to increment click count:', error);
    });

    // Redirect to the target URL
    return NextResponse.redirect(link.url, 307);
    
  } catch (error) {
    console.error('Error in redirect route:', error);
    return NextResponse.redirect(new URL('/?error=server-error', request.url), 307);
  }
}

// Handle other HTTP methods
export async function POST() {
  return new NextResponse('Method not allowed', { status: 405 });
}

export async function PUT() {
  return new NextResponse('Method not allowed', { status: 405 });
}

export async function DELETE() {
  return new NextResponse('Method not allowed', { status: 405 });
}