
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/91feb324-c62e-49ae-9152-5ac824e19bf3.png" 
        alt="AskDB Logo" 
        className="h-14 w-auto" // Increased from h-10 to h-14 to make the logo bigger
      />
    </Link>
  );
};

export default Logo;
