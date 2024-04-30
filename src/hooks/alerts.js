import Swal from "sweetalert2";
import RedirectTo from "./RedirectTo";
export default function Alert(
  title,
  text,
  icon,
  confirmButtonText,
  cancelButtonText
) {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton: true,
    cancelButtonText,
    cancelButtonColor: "#009d71",
    confirmButtonColor: "#1d30ad",
  })
    .then((result) => {
      if (result.isConfirmed) {
        RedirectTo("/contact")
      } else {
        RedirectTo("/contact")
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
