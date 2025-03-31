
import { Link } from "react-router-dom";
import { FileText, Database, Home } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NavBar = () => {
  return (
    <div className="w-full py-4 bg-gradient-to-r from-pdf-primary to-pdf-secondary mb-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <NavigationMenu className="mx-auto md:mx-0">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/write-queries">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <FileText className="mr-2 h-4 w-4" />
                  Write Queries
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/practice-sql">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Database className="mr-2 h-4 w-4" />
                  Practice SQL
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavBar;
