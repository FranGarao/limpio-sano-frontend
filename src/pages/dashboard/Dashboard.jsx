import { useContext } from "react";
import { AuthContext } from "./components/AuthContext";
import CreateService from "./components/create/CreateService";

export default function Dashboard() {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    console.log("ta logueado");
  }

  return (
    <>
      <h1>Bienvenido al panel de control</h1>
      <CreateService />
    </>
  );
}
