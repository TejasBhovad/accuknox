import { useDashboardStore } from '../store/dashboardStore'
import { IconBell, IconChevron, IconSearch, IconUser } from './icons'
import './Header.css'

export function Header() {
  const searchQuery = useDashboardStore((s) => s.searchQuery)
  const setSearchQuery = useDashboardStore((s) => s.setSearchQuery)

  return (
    <header className="header">
      <div className="header__brand">
        <a className="header__logo" href="#main-content">
          <span className="header__mark" aria-hidden="true" />
          <span className="header__wordmark">AccuKnox</span>
        </a>
        <nav className="header__breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="#main-content">Home</a>
            </li>
            <li>
              <IconChevron className="header__crumb-sep" />
              <span aria-current="page">Dashboard V2</span>
            </li>
          </ol>
        </nav>
      </div>

      <label className="header__search">
        <IconSearch className="header__search-icon" />
        <span className="visually-hidden">Search widgets</span>
        <input
          type="search"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
      </label>

      <div className="header__actions">
        <button type="button" className="header__icon-btn" aria-label="Notifications">
          <IconBell />
        </button>
        <button type="button" className="header__icon-btn" aria-label="Account menu">
          <IconUser />
        </button>
      </div>
    </header>
  )
}
