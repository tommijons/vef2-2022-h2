import Link from "next/link"
import { useUserContext } from "../../context/userContext";

export function Footer(): JSX.Element {
  const loginContext = useUserContext();
  return (
    <>
      {
        loginContext.login.login ? <p>Skráður inn sem <b>{loginContext.login.user.user.username}</b></p>  : <Link href='/admin/login'>Innskráning</Link>
      }
      {
        loginContext.login.login ? <button onClick={loginContext.logOut}>Útskrá</button> : <div></div>
      }
    </>
  )
}