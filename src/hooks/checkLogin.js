import Cookie from "js-cookie";

const checkLogin = () => {
  let login = false;
  const session = Cookie.get("token");

  if (session) {
    login = true;
    return login;
  } else {
    return false;
  }
};

export default checkLogin;
