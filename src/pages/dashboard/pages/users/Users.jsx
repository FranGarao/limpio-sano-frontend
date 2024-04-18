import useFetch from "../../../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
// import DataTable from "react-data-table-component";
import './Users.scss';
import Swal from "sweetalert2";
import del from "../../../../hooks/adminFetchs";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const users = async () => {
            await axios.get("http://localhost:4567/api/users", { 
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
             })
            .then((response) => {
                console.log({response: response.data.users});
                  if (response?.data?.users?.length) {
                    setUsers(response.data.users);
                } else {
                    throw new Error('User fetch failed');
                }
            })
            .catch((error) => {
                console.log({error});
            });
        } 
        users();
    }, []);
    console.log({users});
    const columns = [
        {
            name: "Username",
            selector: "username",
            sortable: true,
        },
        {
            name: "Email",
            selector: "email",
            sortable: true,
        },
    ];
    const deleteUser = async () => {

          await axios.delete("http://localhost:4567/api/users/delete/${user.id}", {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log({response});

            if (response?.data) {
            console.log({response1: response});
                setUsers([...users, response.data.user]);
            } else {
                throw new Error('User fetch failed');
            }
        })
        .catch((error) => {
            console.log({error});
        });
    }


    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleCreateForm = () => {
        console.log("Crear Usuario");
        setShowForm(true);
    }
    const showAlert = (message, res) => {
        Swal.fire({
            title: message,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                switch (res) {
                    case 0:
                        handleCreateForm();
                        break;
                    case 1:
                        alert("Crear Usuario");
                        break;
                    default:
                        deleteUser();
                        break;
                }
            } else if (result.isDenied) {
                Swal.fire("No se guardaron los cambios.", "", "info");
            }
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username,
            email,
            password,
        }
        console.log({user});
        await axios.post("http://localhost:4567/api/users/register", user, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log({response});

            if (response?.data) {
            console.log({response1: response});
                setUsers([...users, response.data.user]);
            } else {
                throw new Error('User fetch failed');
            }
        })
        .catch((error) => {
            console.log({error});
        });
}
    return (
    <div>
      <h2>Users</h2>
        <form action="" className={showForm ? 'user-form' : 'hidden'}>
            <input type="text" onChange={handleUsername} value={username} name="username" id="username" placeholder="Username"/>
            <input type="email" onChange={handleEmail} value={email} name="email" id="email" placeholder="Email"/>
            <input type="password" onChange={handlePassword} value={password} name="password" id="password" placeholder="Password"/>
            <button onClick={handleSubmit}>Crear Usuario</button>
        </form>
        <section className="table">
        <div className="headers">
            <p>Username</p>
            <p>Email</p>
            <p>Opciones</p>
        </div>

        {
            users?.map((user) => {
                return (
                    <div className="row" key={user?.id}>
                        <p>{user?.username}</p>
                        <p>{user?.email}</p>
                        <button onClick={() => {showAlert("Eliminar Usuario?", "Usuario Eliminado Correctamente!")}}>Eliminar</button>
                        <button onClick={() => {showAlert("Deseas crear un usuario nuevo?", 0)}}>crear</button>
                        <button onClick={() => {showAlert("Deseas editar este usuario?", 1)}}>editar</button>
                    </div>
                );
            })
        }

        </section>
    </div>
  );
}