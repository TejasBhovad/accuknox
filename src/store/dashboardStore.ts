import { create } from 'zustand'
import seed from '../data/dashboard.json'
import type { Category, DashboardData, Widget } from '../types/dashboard'

const initialData = seed as DashboardData

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function visibilityMap(categories: Category[]): Record<string, boolean> {
  const map: Record<string, boolean> = {}
  for (const category of categories) {
    for (const widget of category.widgets) {
      map[widget.id] = true
    }
  }
  return map
}

interface DashboardState {
  categories: Category[]
  searchQuery: string
  drawerOpen: boolean
  activeTab: string
  pendingVisibility: Record<string, boolean>
  draftName: string
  draftText: string
  formError: string
  setSearchQuery: (query: string) => void
  openDrawer: (categoryId?: string) => void
  closeDrawer: () => void
  setActiveTab: (tabId: string) => void
  togglePending: (widgetId: string) => void
  setDraftName: (value: string) => void
  setDraftText: (value: string) => void
  confirmDrawer: () => void
  addWidget: (categoryId: string, name: string, text: string) => void
  removeWidget: (categoryId: string, widgetId: string) => void
  getFilteredCategories: () => Category[]
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  categories: structuredClone(initialData.categories),
  searchQuery: '',
  drawerOpen: false,
  activeTab: initialData.categories[0]?.id ?? 'cspm',
  pendingVisibility: visibilityMap(initialData.categories),
  draftName: '',
  draftText: '',
  formError: '',

  setSearchQuery: (query) => set({ searchQuery: query }),

  openDrawer: (categoryId) => {
    const { categories } = get()
    set({
      drawerOpen: true,
      activeTab: categoryId ?? categories[0]?.id ?? 'cspm',
      pendingVisibility: visibilityMap(categories),
      draftName: '',
      draftText: '',
      formError: '',
    })
  },

  closeDrawer: () =>
    set({
      drawerOpen: false,
      draftName: '',
      draftText: '',
      formError: '',
      pendingVisibility: visibilityMap(get().categories),
    }),

  setActiveTab: (tabId) => set({ activeTab: tabId, formError: '' }),

  togglePending: (widgetId) =>
    set((state) => ({
      pendingVisibility: {
        ...state.pendingVisibility,
        [widgetId]: !state.pendingVisibility[widgetId],
      },
    })),

  setDraftName: (value) => set({ draftName: value, formError: '' }),
  setDraftText: (value) => set({ draftText: value, formError: '' }),

  confirmDrawer: () => {
    const { categories, pendingVisibility, activeTab, draftName, draftText } =
      get()

    const name = draftName.trim()
    const text = draftText.trim()

    if (text && !name) {
      set({ formError: 'Enter a widget name before adding this widget.' })
      return
    }

    let nextCategories = categories.map((category) => ({
      ...category,
      widgets: category.widgets.filter(
        (widget) => pendingVisibility[widget.id] !== false,
      ),
    }))

    if (name) {
      const widget: Widget = {
        id: createId('widget'),
        name,
        type: 'text',
        text: text || 'Random sample widget text for this category.',
      }
      nextCategories = nextCategories.map((category) =>
        category.id === activeTab
          ? { ...category, widgets: [...category.widgets, widget] }
          : category,
      )
    }

    set({
      categories: nextCategories,
      drawerOpen: false,
      draftName: '',
      draftText: '',
      formError: '',
      pendingVisibility: visibilityMap(nextCategories),
    })
  },

  addWidget: (categoryId, name, text) => {
    const widget: Widget = {
      id: createId('widget'),
      name: name.trim(),
      type: 'text',
      text: text.trim() || 'Random sample widget text for this category.',
    }

    set((state) => {
      const categories = state.categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, widget] }
          : category,
      )
      return {
        categories,
        pendingVisibility: {
          ...state.pendingVisibility,
          [widget.id]: true,
        },
      }
    })
  },

  removeWidget: (categoryId, widgetId) =>
    set((state) => {
      const categories = state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter((w) => w.id !== widgetId),
            }
          : category,
      )
      const pendingVisibility = { ...state.pendingVisibility }
      delete pendingVisibility[widgetId]
      return { categories, pendingVisibility }
    }),

  getFilteredCategories: () => {
    const { categories, searchQuery } = get()
    const query = searchQuery.trim().toLowerCase()
    if (!query) return categories

    return categories
      .map((category) => ({
        ...category,
        widgets: category.widgets.filter((widget) =>
          widget.name.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.widgets.length > 0)
  },
}))
