import { useEffect, useState } from "react";
import "./Users.scss";
import Swal from "sweetalert2";
import useApiRequest from "../../../../hooks/useApiRequest";
import { DiAptana } from "react-icons/di";
import { RiAdminFill } from "react-icons/ri";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { get, post, del, put } = useApiRequest();
  const [qr, setQr] = useState(null);

  const getQr = async (userId) => {
    await get("/users/authenticate")
      .then((res) => {
        setQr(res?.qrSrc);
        // setToken(secret);
        (async () => {
          console.log(userId);
          await post("/users/code", { secret: res?.secret, userId })
            .then((res) => {
              console.log(userId);
              getUsers();

              return res;
            })
            .catch((error) => {
              console.log(error);
              return error;
            });
        })();

        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  const getUsers = async () => {
    await get("/users")
      .then((res) => {
        setUsers(res?.users);
        return users;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const openCreateMenu = () => {
    Swal.fire({
      title: "Crear usuario",
      html: `
    <input id="username" type="text" placeholder="Username" />
    <input id="email" type="text" placeholder="Email" />
    <input id="password" type="text" placeholder="Password"/>
    `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        console.log({ username, email, password });

        post(`/users/register`, {
          username,
          email,
          password,
        })
          .then((data) => {
            setUsers(data.users);
            getUsers();
            alert(
              "Servicio editado",
              "El usuario fue editado correctamente",
              "success"
            );
          })
          .catch((error) => console.log(error));
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const openMenu = (id) => {
    Swal.fire({
      title: "Opciones",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Editar`,
      confirmButtonColor: "#009d71",
      denyButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        openEdit(id);
      } else if (result.isDenied) {
        deleteUser(id);
      }
    });
  };
  const findUser = (id) => {
    return users.find((user) => user?.id === id);
  };

  const openEdit = (id) => {
    const userSelected = findUser(id);
    console.log(userSelected);
    Swal.fire({
      title: "Editar Servicio",
      html: `
      <input id="newUsername" type="text" placeholder="Nombre" value='${userSelected?.username}'/>
      <input id="newEmail" type="text" placeholder="Descripcion" value='${userSelected?.email}'/>
      <input id="newPassword" type="text" placeholder="URL de la imagen" value='${userSelected?.password}'/>
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const newUsername = document.getElementById("newUsername").value;
        const newEmail = document.getElementById("newEmail").value;
        const newPassword = document.getElementById("newPassword").value;
        console.log({ newUsername, newEmail, newPassword });

        put(`/users/update/${userSelected?.id}`, {
          newUsername,
          newEmail,
          newPassword,
        })
          .then((data) => {
            setUsers(data.users);
            getUsers();

            alert(
              "Servicio editado",
              "El usuario fue editado correctamente",
              "success"
            );
          })
          .catch((error) => console.log(error));
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  const deleteUser = (id) => {
    del(`/users/delete/${id}`)
      .then(() => {
        get("/users")
          .then((data) => {
            setUsers(data.users);
            getUsers();
            alert(
              "Servicio eliminado",
              "El usuario fue eliminado correctamente",
              "success"
            );
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  const alert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  };
  const openFAMenu = (id) => {
    Swal.fire({
      title: "Autenticación de dos factores",
      showCancelButton: true,
      confirmButtonText: `Activar`,
      confirmButtonColor: "#009d71",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        getQr(id);
      }
    });
  };
  return (
    <div>
      <h2>Usuarios</h2>
      <section className="table">
        <div className="headers">
          <p>Username</p>
          <p>Email</p>
          <p>Opciones</p>
        </div>
        {qr && (
          <div>
            <img src={qr} alt="" />
          </div>
        )}
        {users?.map((user) => {
          return (
            <div className="row" key={user?.id}>
              <p>{user?.username}</p>
              <p>{user?.email}</p>
              <div className="options-user">
                <RiAdminFill onClick={() => openFAMenu(user?.id)} />
                <p
                  onClick={() => openCreateMenu(user?.id)}
                  className="options-icon"
                >
                  +
                </p>
                <button onClick={() => openMenu(user?.id)}>
                  <DiAptana className="config-icon" />
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}