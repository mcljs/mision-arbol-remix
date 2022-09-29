import * as React from 'react'

function polarToCartesian(x, y, r , degrees ) {
  const radians = (degrees * Math.PI) / 180.0
  return [x + r * Math.cos(radians), y + r * Math.sin(radians)]
}

function getSegmentPath(
  {
    size,
    margin = 0.1,
    segments,
    radius = size / 2,
    width = 1,
  },
  segment,
  span = 1,
) {
  const center = size / 2
  const degrees = 360 / segments
  const shift = margin === 0 ? -90 : -90 + (degrees * margin) / 2
  const start = shift + degrees * segment
  const end =
    shift + degrees * (segment + span - margin) + (margin == 0 ? 1 : 0)
  const innerRadius = radius - width

  const arc = Math.abs(start - end) > 180 ? 1 : 0
  const point = (rad , deg ) =>
    polarToCartesian(center, center, rad, deg)
      .map(n => n.toPrecision(5))
      .join(',')

  return [
    `M${point(radius, start)}`,
    `A${radius},${radius},0,${arc},1,${point(radius, end)}`,
    `L${point(radius - width, end)}`,
    `A${innerRadius},${innerRadius},0,${arc},0,${point(innerRadius, start)}`,
    'Z',
  ].join('')
}

const colors = {
  PRIMARY400: 'text-primary-900',
  SECONDARY300: 'text-green-300',
  SECONDARY800: 'text-gray-800',
  UNKNOWN: 'text-green-900',
}

function Circle({
  size,
  width = 2,
  color,
}) {
  let options = {size, width, margin: 0.05, segments: 3}

  if (color === 'UNKNOWN') {
    return (
      <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <path
          d={getSegmentPath(options, 0)}
          className="text-primary-400"
          fill="currentColor"
        />
        <path
          d={getSegmentPath(options, 1)}
          className="text-secondary-300"
          fill="currentColor"
        />
        <path
          d={getSegmentPath(options, 2)}
          className="text-secondary-800"
          fill="currentColor"
        />
      </svg>
    )
  }

  const [colorOne, colorTwo] = Object.keys(colors).filter(x => x !== color) 
 
  const colorSpan = 3
  options = {...options, segments: 2 + 2 * colorSpan}

  return (
    <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
      <path
        d={getSegmentPath(options, 0, colorSpan)}
        className={colors[color]}
        fill="currentColor"
      />
      <path
        d={getSegmentPath(options, colorSpan)}
        className={colors[colorOne]}
        fill="currentColor"
      />
      <path
        d={getSegmentPath(options, colorSpan + 1, colorSpan)}
        className={colors[color]}
        fill="currentColor"
      />
      <path
        d={getSegmentPath(options, options.segments - 1)}
        className={colors[colorTwo]}
        fill="currentColor"
      />
    </svg>
  )
}

export {Circle}