import type { Widget } from '../types/dashboard'
import { DonutChart } from './charts/DonutChart'
import { StackedBarChart } from './charts/StackedBarChart'
import { IconClose, IconPlus } from './icons'
import './WidgetCard.css'

interface WidgetCardProps {
  widget: Widget
  categoryId: string
  onRemove: (categoryId: string, widgetId: string) => void
}

function EmptyGraph({ text }: { text?: string }) {
  return (
    <div className="empty-state">
      <svg
        className="empty-state__icon"
        viewBox="0 0 48 36"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2" y="20" width="8" height="14" rx="1" fill="#9CA3AF" />
        <rect x="14" y="12" width="8" height="22" rx="1" fill="#9CA3AF" />
        <rect x="26" y="6" width="8" height="28" rx="1" fill="#9CA3AF" />
        <rect x="38" y="16" width="8" height="18" rx="1" fill="#9CA3AF" />
      </svg>
      <p>{text || 'No Graph data available!'}</p>
    </div>
  )
}

export function WidgetCard({ widget, categoryId, onRemove }: WidgetCardProps) {
  return (
    <article className="widget-card">
      <header className="widget-card__header">
        <h3>{widget.name}</h3>
        <button
          type="button"
          className="widget-card__remove"
          aria-label={`Remove ${widget.name}`}
          onClick={() => onRemove(categoryId, widget.id)}
        >
          <IconClose width={16} height={16} />
        </button>
      </header>
      <div className="widget-card__body">
        {widget.type === 'donut' && widget.data ? (
          <DonutChart data={widget.data} totalLabel={widget.totalLabel} />
        ) : null}
        {widget.type === 'stackedBar' && widget.data ? (
          <StackedBarChart data={widget.data} totalLabel={widget.totalLabel} />
        ) : null}
        {widget.type === 'empty' ? <EmptyGraph text={widget.text} /> : null}
        {widget.type === 'text' ? (
          <p className="text-body">{widget.text}</p>
        ) : null}
      </div>
    </article>
  )
}

interface AddWidgetPlaceholderProps {
  onClick: () => void
}

export function AddWidgetPlaceholder({ onClick }: AddWidgetPlaceholderProps) {
  return (
    <button type="button" className="widget-card widget-card--add" onClick={onClick}>
      <IconPlus width={16} height={16} />
      <span>Add Widget</span>
    </button>
  )
}
