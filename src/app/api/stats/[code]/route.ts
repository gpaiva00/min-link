import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getLinkByCode } from '@/lib/utils';

interface RouteParams {
  params: {
    code: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { code } = params;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Código não fornecido' },
        { status: 400 }
      );
    }
    
    // Get link from cache or database
    const link = await getLinkByCode(code);
    
    if (!link) {
      return NextResponse.json(
        { error: 'Link não encontrado' },
        { status: 404 }
      );
    }
    
    // Get click events for analytics
    const clickEvents = await prisma.clickEvent.findMany({
      where: {
        linkId: link.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Limit to last 100 clicks
    });
    
    // Aggregate statistics
    const stats = {
      totalClicks: link.clicks,
      uniqueClicks: new Set(clickEvents.map(event => event.ip)).size,
      clicksByDay: {} as Record<string, number>,
      clicksByCountry: {} as Record<string, number>,
      topReferrers: {} as Record<string, number>,
    };
    
    // Process click events
    clickEvents.forEach(event => {
      // Clicks by day
      const day = event.createdAt.toISOString().split('T')[0];
      stats.clicksByDay[day] = (stats.clicksByDay[day] || 0) + 1;
      
      // Clicks by country
      if (event.country) {
        stats.clicksByCountry[event.country] = (stats.clicksByCountry[event.country] || 0) + 1;
      }
      
      // Top referrers
      if (event.referer && event.referer !== 'direct') {
        try {
          const domain = new URL(event.referer).hostname;
          stats.topReferrers[domain] = (stats.topReferrers[domain] || 0) + 1;
        } catch {
          stats.topReferrers['unknown'] = (stats.topReferrers['unknown'] || 0) + 1;
        }
      } else {
        stats.topReferrers['direct'] = (stats.topReferrers['direct'] || 0) + 1;
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        link: {
          id: link.id,
          code: link.code,
          url: link.url,
          title: link.title,
          createdAt: link.createdAt,
          isActive: link.isActive,
        },
        stats,
        recentClicks: clickEvents.slice(0, 10).map(event => ({
          id: event.id,
          createdAt: event.createdAt,
          country: event.country,
          referer: event.referer,
        })),
      },
    });
    
  } catch (error) {
    console.error('Error getting link stats:', error);
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}