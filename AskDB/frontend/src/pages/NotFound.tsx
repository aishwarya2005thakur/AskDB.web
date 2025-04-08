import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pdf-background">
      <NavBar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
          <p className="text-lg text-gray-600">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
