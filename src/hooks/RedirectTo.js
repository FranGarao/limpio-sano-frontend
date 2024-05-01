import { useNavigate } from "react-router-dom";

// Proposito: Redirigir a una nueva pagina
export default function RedirectTo(url) {
  const navigate = useNavigate();
  navigate(url);
}
