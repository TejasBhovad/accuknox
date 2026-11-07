import { AddWidgetDrawer } from './components/AddWidgetDrawer'
import { CategorySection } from './components/CategorySection'
import { Header } from './components/Header'
import { Toolbar } from './components/Toolbar'
import { useDashboardStore } from './store/dashboardStore'

export default function App() {
  const categories = useDashboardStore((s) => s.categories)
  const searchQuery = useDashboardStore((s) => s.searchQuery)

  const query = searchQuery.trim().toLowerCase()
  const filteredCategories = query
    ? categories
        .map((category) => ({
          ...category,
          widgets: category.widgets.filter((widget) =>
            widget.name.toLowerCase().includes(query),
          ),
        }))
        .filter((category) => category.widgets.length > 0)
    : categories

  const visibleWidgetCount = filteredCategories.reduce(
    (sum, category) => sum + category.widgets.length,
    0,
  )

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="main" tabIndex={-1}>
        <Toolbar />
        <div className="visually-hidden" aria-live="polite" aria-atomic="true">
          {query
            ? `${visibleWidgetCount} widget${visibleWidgetCount === 1 ? '' : 's'} match “${searchQuery.trim()}”.`
            : ''}
        </div>
        {filteredCategories.length === 0 ? (
          <p className="empty-search" role="status">
            No widgets match “{searchQuery.trim()}”. Try another search term.
          </p>
        ) : (
          filteredCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))
        )}
      </main>
      <AddWidgetDrawer />
    </div>
  )
}
