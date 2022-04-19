
import s from './Input.module.scss';

type Props = {
  label:string;
  name: string;
}

export function Input({ label, name }:Props): JSX.Element {

  return (
    <div className={s.input}>
      <label htmlFor={name}>{label}:</label>
      <input type="text" name={name} id={name} />
    </div>
  )
}
