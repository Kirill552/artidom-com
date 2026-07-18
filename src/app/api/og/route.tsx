import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Night Showroom OG card (2026-07 redesign): warm graphite, amber light line, no italics.
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'ARTIDOM'
  const subtitle = searchParams.get('subtitle') || 'Custom Kitchens & Furniture in Montenegro'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#26221e',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Amber accent line */}
        <div
          style={{
            width: '60px',
            height: '3px',
            backgroundColor: '#d9a04f',
            marginBottom: '40px',
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? '46px' : '62px',
            color: '#f2ede3',
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: '840px',
            marginBottom: '24px',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#b8b0a2',
            fontWeight: 400,
            letterSpacing: '0.5px',
            maxWidth: '720px',
          }}
        >
          {subtitle}
        </div>

        {/* Footer row */}
        <div
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '26px',
              color: '#f2ede3',
              fontWeight: 600,
              letterSpacing: '2px',
            }}
          >
            Artidom
          </div>
          <div
            style={{
              width: '1px',
              height: '20px',
              backgroundColor: '#d9a04f',
            }}
          />
          <div
            style={{
              fontSize: '13px',
              color: '#d9a04f',
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
            }}
          >
            artidom.art
          </div>
        </div>

        {/* Underlighting bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, transparent 0%, #d9a04f 35%, #d9a04f 65%, transparent 100%)',
            opacity: 0.55,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
