import { FC } from 'react'

const Nav: FC = () => {
  return (
    <nav className="autohide navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Brand
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main_nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="main_nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                {' '}
                Menu item{' '}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {' '}
                Menu item{' '}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {' '}
                Menu item{' '}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Nav
