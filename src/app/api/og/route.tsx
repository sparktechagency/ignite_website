import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'IGNITE Foundation';
    const description = searchParams.get('description') || 'Empowering Young Athletes';

    // Use system font as fallback
    const fontData = await fetch(
      new URL('../../../../public/fonts/Inter-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            backgroundImage: 'linear-gradient(to bottom, #1a1a1a, #000000)',
            padding: '0 80px',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 700, marginBottom: 20 }}>{title}</div>
          <div style={{ fontSize: 28, color: '#9ca3af', marginBottom: 40, maxWidth: '80%' }}>
            {description}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', marginBottom: 20 }}>
            <div style={{ fontSize: 24, color: '#9ca3af' }}>ignitefoundation.org</div>
            <div style={{ margin: '0 12px' }}>•</div>
            <div style={{ fontSize: 24, color: '#9ca3af' }}>Empowering Young Athletes</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch (e) {
    console.error('Failed to generate OG image', e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
