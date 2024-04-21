import { useEffect, useState } from "react";
import "./Users.scss";
import Swal from "sweetalert2";
import useApiRequest from "../../../../hooks/useApiRequest";
import { DiAptana } from "react-icons/di";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(null);
  const { get, post, del, put } = useApiRequest();
  const [qr, setQr] = useState(null);
  const [faCode, setFaCode] = useState("");
  const [verified, setVerified] = useState(false);

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
  const submitFA = async () => {
    await post(`/users/verify`, { faCode })
      .then((res) => {
        setVerified(res);
        window.location.href("/dashboard");
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    console.log({ verified });
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

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleFaCode = (e) => {
    setFaCode(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (id) => {
    if (id) {
      setShowForm(false);
      setShowUpdateForm(true);
      setId(id);
    } else {
      setShowForm(true);
      setShowUpdateForm(false);
    }
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
            alert(
              "Servicio editado",
              "El servicio fue editado correctamente",
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
            alert(
              "Servicio eliminado",
              "El servicio fue eliminado correctamente",
              "success"
            );
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const createUser = async (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };
    await post("/users/register", user)
      .then((response) => {
        setUsers([...users, response.newUser]);
        getUsers();
      })
      .catch((error) => {
        console.log({ error });
        return error;
      });
  };

  const updateUser = async (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };
    await put(`/users/update/${id}`, user)
      .then((response) => {
        getUsers();
        return response;
      })
      .catch((error) => {
        console.log({ error });
        return error;
      });
  };
  return (
    <div>
      <h2>Users</h2>
      <form action="" className={showForm ? "user-form" : "hidden"}>
        <input
          type="text"
          onChange={handleUsername}
          value={username}
          name="username"
          id="username"
          placeholder="Username"
        />
        <input
          type="email"
          onChange={handleEmail}
          value={email}
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          type="password"
          onChange={handlePassword}
          value={password}
          name="password"
          id="password"
          placeholder="Password"
        />
        <button onClick={createUser}>Crear Usuario</button>
      </form>
      <form action="" className={showUpdateForm ? "user-form" : "hidden"}>
        <input
          type="text"
          onChange={handleUsername}
          value={username}
          name="username"
          id="username"
          placeholder="Username"
        />
        <input
          type="email"
          onChange={handleEmail}
          value={email}
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          type="password"
          onChange={handlePassword}
          value={password}
          name="password"
          id="password"
          placeholder="Password"
        />
        <button onClick={updateUser}>Editar Usuario</button>
      </form>
      <section className="table">
        <div className="headers">
          <p>Username</p>
          <p>Email</p>
          <p>Opciones</p>
        </div>
        {qr && (
          <div>
            <img src={qr} alt="" />
            <input
              type="text"
              onChange={handleFaCode}
              value={faCode}
              name="faCode"
              id="faCode"
              placeholder="faCode"
            />
            <button onClick={submitFA}>Ingresar Codigo</button>
          </div>
        )}
        {users?.map((user) => {
          return (
            <div className="row" key={user?.id}>
              <p>{user?.username}</p>
              <p>{user?.email}</p>
              <button onClick={() => openMenu(user?.id)}>
                <DiAptana className="config-icon" />
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

{
  /* <button onClick={() => getQr(18)}>D.A</button>
<button
  onClick={() => {
    showAlert(
      "Eliminar Usuario?",
      "Usuario Eliminado Correctamente!",
      user?.id
    );
  }}
>
  Eliminar
</button>
<button
  onClick={() => {
    showAlert("Deseas crear un usuario nuevo?", 0);
  }}
>
  crear
</button>
<button
  onClick={() => {
    showAlert("Deseas editar este usuario?", 1, user?.id);
  }}
>
  editar
</button> */
}
