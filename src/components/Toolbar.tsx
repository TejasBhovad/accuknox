import { useDashboardStore } from '../store/dashboardStore'
import { IconClock, IconMore, IconPlus, IconRefresh } from './icons'
import './Toolbar.css'

export function Toolbar() {
  const openDrawer = useDashboardStore((s) => s.openDrawer)

  return (
    <div className="toolbar">
      <div className="toolbar__heading">
        <h1 className="toolbar__title">CNAPP Dashboard</h1>
        <p className="toolbar__subtitle">
          Cloud-native posture across CSPM, CWPP, and registry scans
        </p>
      </div>
      <div className="toolbar__controls">
        <button
          type="button"
          className="toolbar__add"
          onClick={() => openDrawer()}
        >
          Add Widget
          <IconPlus width={16} height={16} />
        </button>
        <button type="button" className="toolbar__icon" aria-label="Refresh dashboard">
          <IconRefresh />
        </button>
        <button type="button" className="toolbar__icon" aria-label="More options">
          <IconMore />
        </button>
        <button type="button" className="toolbar__range" aria-haspopup="listbox">
          <IconClock width={15} height={15} />
          Last 2 days
        </button>
      </div>
    </div>
  )
}
