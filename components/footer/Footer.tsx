import Link from "next/link"
import { useUserContext } from "../../context/userContext";

export function Footer(): JSX.Element {
  const loginContext = useUserContext();
  return (
    <>
      <Link href='/'><a>Forsíða</a></Link>
      {
        loginContext.login.login ? <p>Skráður inn sem <b>{loginContext.login.user.user.username}</b></p> : <Link href='/users/login'>Innskráning</Link>
      }
    </>
  )
}