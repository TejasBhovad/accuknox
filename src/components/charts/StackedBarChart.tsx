import type { ChartSlice } from '../../types/dashboard'
import './charts.css'

interface StackedBarChartProps {
  data: ChartSlice[]
  totalLabel?: string
}

export function StackedBarChart({ data, totalLabel }: StackedBarChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1
  const summary = [
    totalLabel,
    ...data.map((slice) => `${slice.label} ${slice.value}`),
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <div className="stacked">
      <p className="visually-hidden">{summary}</p>
      {totalLabel ? (
        <p className="stacked__total" aria-hidden="true">
          {totalLabel}
        </p>
      ) : null}
      <div className="stacked__bar" aria-hidden="true">
        {data.map((slice) => (
          <div
            key={slice.label}
            className="stacked__segment"
            style={{
              width: `${(slice.value / total) * 100}%`,
              background: slice.color,
            }}
            title={`${slice.label}: ${slice.value}`}
          />
        ))}
      </div>
      <ul className="chart-legend chart-legend--grid" aria-hidden="true">
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
