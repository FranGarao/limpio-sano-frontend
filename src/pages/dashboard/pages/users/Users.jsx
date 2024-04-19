import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import "./Users.scss";
import Swal from "sweetalert2";
import useApiRequest from "../../../../hooks/useApiRequest";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(null);
  const { get, post, del, update } = useApiRequest();
  const [qr, setQr] = useState(null);
  const [faCode, setFaCode] = useState("");

  const getQr = async () => {
    await get("/users/authenticate")
      .then((res) => {
        setQr(res?.qrSrc);
        // setToken(secret);
        submitQrCode(res?.secret?.ascii);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
  const submitQrCode = async (secret) => {
    console.log({ secretito: secret });
    await post("/users/code", secret)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
  const submitFA = async () => {
    await post(`/users/verify`)
      .then((res) => {
        console.log(res);
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

  const deleteUser = async (id) => {
    await del(`/users/delete/${id}`)
      .then((response) => {
        getUsers();
        return response;
      })
      .catch((error) => {
        console.log({ error });
        return error;
      });
  };

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
  const showAlert = (message, res, id) => {
    Swal.fire({
      title: message,
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        switch (res) {
          case 0:
            handleSubmit();
            break;
          case 1:
            handleSubmit(id);
            break;
          default:
            deleteUser(id);
            break;
        }
      }
    });
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
    console.log({ user, id });
    await update(`/users/update/${id}`, user)
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
              <div>
                <button onClick={getQr}>D.A</button>
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
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
