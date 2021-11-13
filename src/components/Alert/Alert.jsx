import Swal from "sweetalert2";

const Alert = {
  loginSuccess: () => {
    Swal.fire({
      title: "Great",
      text: "Login Successful",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      width: "fit-content",
    });
  },

  loginError: () => {
    Swal.fire({
      title: "Error",
      text: "Login Failed",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
      width: "fit-content",
    });
  },
};

export default Alert;
