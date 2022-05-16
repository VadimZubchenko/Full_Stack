import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/#">
        Shopping App
      </a>
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/">Shopping List</Link>
        </li>
        <li className="nav-item" style={{ marginLeft: 5 }}>
          <Link to="/form">Add new item</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
