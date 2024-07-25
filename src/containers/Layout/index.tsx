import { ReactNode, FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './layout.css'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <>
      <div className="button-container">
        <button className={`button-nav ${location.pathname === '/' ? 'button-selected' : ''}`} onClick={() => handleNavigation('/')}>
          Home
        </button>
        <button className={`button-nav ${location.pathname === '/bookstore' ? 'button-selected' : ''}`} onClick={() => handleNavigation('/bookstore')}>
          Bookstore
        </button>
      </div>
      {children}
    </>
  )
}

export default Layout
