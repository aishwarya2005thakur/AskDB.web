
import { Link } from "react-router-dom";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <div className="w-full py-4 bg-gradient-to-r from-[#051525] to-[#0a2440] shadow-md">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          <nav className="flex space-x-6">
            <Link to="/" className="text-white hover:text-[#0EA5E9] transition-colors">
              Home
            </Link>
            <Link to="/write-queries" className="text-white hover:text-[#0EA5E9] transition-colors">
              Write Queries
            </Link>
            <Link to="/practice-sql" className="text-white hover:text-[#0EA5E9] transition-colors">
              Practice SQL
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
