import { ReactComponent as ErrorSvg } from '../../assets/error.svg'

export const ErrorView = ({ error }: { error?: Error }) => (
  <div className="min-vh-100 d-flex flex-column">
    <div className="d-flex justify-content-center align-items-center flex-grow-1">
      <div className="d-flex flex-column align-items-start">
        <h2 className="fw-bold">Oh no, the app has crashed!</h2>
        <p className="figure-caption text-black-50" style={{ maxWidth: 400 }}>
          {error?.message}
        </p>
        <p>
          Try <a href="/">reloading</a> the page or contact our{' '}
          <a href="mailto:mendrik76@gmail.com">customer support</a>.
        </p>
        <div className="w-75 h-75">
          <ErrorSvg />
        </div>
        <a
          href="https://storyset.com"
          target="_blank"
          rel="noreferrer"
          className="d-block text-decoration-none fs-small ms-auto"
        >
          Illustration by Storyset
        </a>
      </div>
    </div>
  </div>
)
