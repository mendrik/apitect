import { Fn, Jsx } from '~shared/types/generic'

type OwnProps = {
  action: Fn<any>
}

export const LinkButton = ({ action, children }: Jsx<OwnProps>) => (
  <button className="btn btn-link p-0 btn-sm align-baseline" onClick={action}>
    {children}
  </button>
)
