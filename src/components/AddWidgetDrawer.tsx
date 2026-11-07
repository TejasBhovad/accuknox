import { useEffect, useId, useRef } from 'react'
import { useDashboardStore } from '../store/dashboardStore'
import { IconClose } from './icons'
import './AddWidgetDrawer.css'

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function AddWidgetDrawer() {
  const titleId = useId()
  const panelId = useId()
  const formErrorId = useId()
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const drawerOpen = useDashboardStore((s) => s.drawerOpen)
  const categories = useDashboardStore((s) => s.categories)
  const activeTab = useDashboardStore((s) => s.activeTab)
  const pendingVisibility = useDashboardStore((s) => s.pendingVisibility)
  const draftName = useDashboardStore((s) => s.draftName)
  const draftText = useDashboardStore((s) => s.draftText)
  const formError = useDashboardStore((s) => s.formError)
  const setActiveTab = useDashboardStore((s) => s.setActiveTab)
  const togglePending = useDashboardStore((s) => s.togglePending)
  const setDraftName = useDashboardStore((s) => s.setDraftName)
  const setDraftText = useDashboardStore((s) => s.setDraftText)
  const closeDrawer = useDashboardStore((s) => s.closeDrawer)
  const confirmDrawer = useDashboardStore((s) => s.confirmDrawer)

  useEffect(() => {
    if (!drawerOpen) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus()
    })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDrawer()
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) return

      const focusables = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused.current?.focus?.()
    }
  }, [drawerOpen, closeDrawer])

  if (!drawerOpen) return null

  const activeCategory =
    categories.find((category) => category.id === activeTab) ?? categories[0]
  const nameInvalid = Boolean(formError)

  return (
    <div className="drawer-root" role="presentation">
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close add widget panel"
        tabIndex={-1}
        onClick={closeDrawer}
      />
      <div
        ref={drawerRef}
        id={panelId}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="drawer__header">
          <h2 id={titleId}>Add Widget</h2>
          <button
            ref={closeRef}
            type="button"
            className="drawer__close"
            aria-label="Close add widget panel"
            onClick={closeDrawer}
          >
            <IconClose />
          </button>
        </div>

        <div className="drawer__body">
          <p className="drawer__intro">
            Personalise your dashboard by adding the following widget
          </p>

          <div className="drawer__tabs" role="tablist" aria-label="Widget categories">
            {categories.map((category) => {
              const selected = category.id === activeTab
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${category.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={
                    selected ? 'drawer__tab drawer__tab--active' : 'drawer__tab'
                  }
                  onClick={() => setActiveTab(category.id)}
                  onKeyDown={(event) => {
                    const index = categories.findIndex((c) => c.id === category.id)
                    if (event.key === 'ArrowRight') {
                      event.preventDefault()
                      const next = categories[(index + 1) % categories.length]
                      setActiveTab(next.id)
                    }
                    if (event.key === 'ArrowLeft') {
                      event.preventDefault()
                      const prev =
                        categories[(index - 1 + categories.length) % categories.length]
                      setActiveTab(prev.id)
                    }
                  }}
                >
                  {category.tabLabel}
                </button>
              )
            })}
          </div>

          <div
            className="drawer__list"
            role="tabpanel"
            id={`panel-${activeCategory?.id}`}
            aria-labelledby={`tab-${activeCategory?.id}`}
          >
            {activeCategory?.widgets.length ? (
              activeCategory.widgets.map((widget) => {
                const checked = pendingVisibility[widget.id] !== false
                return (
                  <label key={widget.id} className="drawer__item">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePending(widget.id)}
                    />
                    <span>{widget.name}</span>
                  </label>
                )
              })
            ) : (
              <p className="drawer__empty">
                No widgets in this category yet. Create one below.
              </p>
            )}
          </div>

          <form
            className="drawer__form"
            onSubmit={(e) => {
              e.preventDefault()
              confirmDrawer()
            }}
            noValidate
          >
            <h3>Create a widget</h3>
            <p className="drawer__form-hint">
              Adds a text widget to the <strong>{activeCategory?.tabLabel}</strong>{' '}
              category when you confirm.
            </p>
            <label htmlFor="widget-name">
              Widget name
              <input
                id="widget-name"
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="e.g. Compliance Summary"
                aria-invalid={nameInvalid || undefined}
                aria-describedby={nameInvalid ? formErrorId : undefined}
                autoComplete="off"
              />
            </label>
            <label htmlFor="widget-text">
              Widget text
              <textarea
                id="widget-text"
                rows={3}
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                placeholder="Notes or random text for this widget"
              />
            </label>
            {formError ? (
              <p id={formErrorId} className="drawer__error" role="alert">
                {formError}
              </p>
            ) : null}
          </form>
        </div>

        <div className="drawer__footer">
          <button type="button" className="drawer__cancel" onClick={closeDrawer}>
            Cancel
          </button>
          <button
            type="button"
            className="drawer__confirm"
            onClick={confirmDrawer}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
