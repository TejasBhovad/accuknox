import type { ChartSlice } from '../../types/dashboard'
import './charts.css'

interface DonutChartProps {
  data: ChartSlice[]
  totalLabel?: string
}

function polar(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function arcPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  start: number,
  end: number,
) {
  const large = end - start > 180 ? 1 : 0
  const o1 = polar(cx, cy, rOuter, start)
  const o2 = polar(cx, cy, rOuter, end)
  const i1 = polar(cx, cy, rInner, end)
  const i2 = polar(cx, cy, rInner, start)
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${i2.x} ${i2.y}`,
    'Z',
  ].join(' ')
}

export function DonutChart({ data, totalLabel }: DonutChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1
  const summary = [
    totalLabel,
    ...data.map((slice) => `${slice.label} ${slice.value}`),
  ]
    .filter(Boolean)
    .join(', ')

  let angle = 0
  const slices = data.map((slice) => {
    const sweep = (slice.value / total) * 360
    const start = angle
    const end = angle + Math.max(sweep, 0.01)
    angle = end
    return { ...slice, start, end }
  })

  return (
    <div className="chart-row">
      <p className="visually-hidden">{summary}</p>
      <div className="donut-wrap" aria-hidden="true">
        <svg viewBox="0 0 140 140" width="140" height="140" focusable="false">
          {slices.map((slice) => (
            <path
              key={slice.label}
              d={arcPath(70, 70, 62, 42, slice.start, slice.end)}
              fill={slice.color}
            />
          ))}
        </svg>
        {totalLabel ? (
          <div className="donut-center">
            <strong>{totalLabel.split(' ')[0]}</strong>
            <span>{totalLabel.split(' ').slice(1).join(' ') || 'Total'}</span>
          </div>
        ) : null}
      </div>
      <ul className="chart-legend" aria-hidden="true">
        {data.map((slice) => (
          <li key={slice.label}>
            <span className="chart-dot" style={{ background: slice.color }} />
            <span>
              {slice.label} ({slice.value})
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
