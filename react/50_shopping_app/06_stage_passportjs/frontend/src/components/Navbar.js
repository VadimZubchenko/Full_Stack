import { Link } from "react-router-dom";
import useAction from "../hooks/useAction";
import useAppState from "../hooks/useAppState";

const Navbar = (props) => {
  const { isLogged } = useAppState();
  const { logout } = useAction();

  let links = <ul className="navbar-nav"></ul>;
  if (isLogged) {
    links = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/">Shopping List</Link>
        </li>
        <li className="nav-item" style={{ marginLeft: 5 }}>
          <Link to="/form">Add new item</Link>
        </li>
        <li className="nav-item" style={{ marginLeft: 5 }}>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ paddingLeft: 20 }}
    >
      <p className="navbar-brand">Shopping App</p>
      {links}
    </nav>
  );
};

export default Navbar;
