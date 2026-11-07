export type WidgetType = 'donut' | 'stackedBar' | 'empty' | 'text'

export interface ChartSlice {
  label: string
  value: number
  color: string
}

export interface Widget {
  id: string
  name: string
  type: WidgetType
  text?: string
  totalLabel?: string
  data?: ChartSlice[]
}

export interface Category {
  id: string
  name: string
  tabLabel: string
  widgets: Widget[]
}

export interface DashboardData {
  categories: Category[]
}
