import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-around items-center">
        <Link to="/panel-usuario" className="hover:underline">
          Usuario
        </Link>
        <Link to="/panel-veterinario" className="hover:underline">
          Veterinario
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
