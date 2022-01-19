import Swal from "sweetalert2";

const Alert = {
  loginSuccess: () => {
    Swal.fire({
      title: "Bienvenido",
      text: "Inicio de sesión exitoso",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      width: "fit-content",
    });
  },

  loginError: () => {
    Swal.fire({
      title: "Error",
      text: "Error de inicio de sesion",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
      width: "fit-content",
    });
  },
};

export default Alert;
