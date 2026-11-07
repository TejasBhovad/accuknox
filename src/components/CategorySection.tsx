import type { Category } from '../types/dashboard'
import { useDashboardStore } from '../store/dashboardStore'
import { AddWidgetPlaceholder, WidgetCard } from './WidgetCard'
import './CategorySection.css'

interface CategorySectionProps {
  category: Category
}

export function CategorySection({ category }: CategorySectionProps) {
  const removeWidget = useDashboardStore((s) => s.removeWidget)
  const openDrawer = useDashboardStore((s) => s.openDrawer)

  return (
    <section className="category">
      <h2 className="category__title">{category.name}</h2>
      <div className="category__grid">
        {category.widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            onRemove={removeWidget}
          />
        ))}
        <AddWidgetPlaceholder onClick={() => openDrawer(category.id)} />
      </div>
    </section>
  )
}
