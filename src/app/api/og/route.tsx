import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

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
          backgroundColor: '#2d2a26',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Декоративная спираль-аммонит */}
        <svg
          width="500"
          height="500"
          viewBox="0 0 200 200"
          style={{
            position: 'absolute',
            right: '-40px',
            bottom: '-60px',
            opacity: 0.08,
          }}
        >
          <path
            d="M100 10 C140 10 180 50 180 100 C180 150 140 180 100 180 C60 180 30 150 30 110 C30 70 60 50 90 50 C120 50 145 70 145 100 C145 130 120 148 95 148 C70 148 52 130 52 108 C52 86 70 72 90 72 C110 72 124 86 124 104 C124 122 110 132 94 132 C78 132 68 120 68 106 C68 92 78 84 92 84"
            fill="none"
            stroke="#e5e0d8"
            strokeWidth="2.5"
          />
        </svg>

        {/* Акцентная линия */}
        <div
          style={{
            width: '60px',
            height: '3px',
            backgroundColor: '#7a826e',
            marginBottom: '40px',
          }}
        />

        {/* Заголовок */}
        <div
          style={{
            fontSize: title.length > 40 ? '48px' : '64px',
            color: '#fdfaf5',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.15,
            maxWidth: '800px',
            marginBottom: '24px',
          }}
        >
          {title}
        </div>

        {/* Подзаголовок */}
        <div
          style={{
            fontSize: '24px',
            color: '#e5e0d8',
            fontWeight: 300,
            letterSpacing: '1px',
            maxWidth: '700px',
            opacity: 0.7,
          }}
        >
          {subtitle}
        </div>

        {/* Лого внизу */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              color: '#fdfaf5',
              fontStyle: 'italic',
              fontWeight: 300,
              letterSpacing: '3px',
            }}
          >
            Artidom
          </div>
          <div
            style={{
              width: '1px',
              height: '20px',
              backgroundColor: '#7a826e',
            }}
          />
          <div
            style={{
              fontSize: '13px',
              color: '#7a826e',
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
            }}
          >
            artidom.art
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
