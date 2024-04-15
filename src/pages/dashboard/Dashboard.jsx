import { useContext } from 'react';
import { AuthContext } from './components/AuthContext';


export default function Dashboard () {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    console.log('ta logueado');
  }

  return <div>Bienvenido al panel de control</div>;
}
