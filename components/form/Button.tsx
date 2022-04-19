
import s from './Button.module.scss'

type Props = {
  children: string;
}

export function Button({ children }: Props): JSX.Element {
  return (
    <button className={s.button}>{children}</button>
  )
}
