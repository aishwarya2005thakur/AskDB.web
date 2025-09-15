
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { UserProfileModal } from "@/components/UserProfileModal";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWalletMock";

const NavBar = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { user } = useAuth();
  const { connected } = useWallet();

  const isAuthenticated = user || connected;

  return (
    <div className="w-full py-4 bg-gradient-to-r from-[#051525] to-[#0a2440] shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link to="/" className="text-white hover:text-[#0EA5E9] transition-colors">
                Home
              </Link>
              <Link to="/write-queries" className="text-white hover:text-[#0EA5E9] transition-colors">
                Learn SQL
              </Link>
              <Link to="/practice-sql" className="text-white hover:text-[#0EA5E9] transition-colors">
                Practice SQL
              </Link>
            </nav>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setProfileModalOpen(true)}
              className="text-white hover:text-[#0EA5E9] hover:bg-white/10 transition-colors"
            >
              <User className="h-4 w-4 mr-2" />
              {isAuthenticated ? 'Profile' : 'Sign In'}
            </Button>
          </div>
        </div>
      </div>
      
      <UserProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen} 
      />
    </div>
  );
};

export default NavBar;
