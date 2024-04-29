import Swal from "sweetalert2";

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
        Swal.fire("Redireccionando...");
        window.location.href =
          "https://wa.me/573225292067?text=¡Hola!%20Queria%20mas%20informacion%20sobre%20los servicios%20que%20ofrecen";
      } else {
        window.location.href = "/contact";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
