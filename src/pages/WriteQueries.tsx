import NavBar from "@/components/NavBar";
import LearnSQL from "@/components/LearnSQL";
import Footer from "@/components/Footer";

const WriteQueries = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-pdf-background">
      <NavBar />
      
      <div className="flex-1 p-4 md:p-8">
        <LearnSQL />
      </div>
      
      <Footer />
    </div>
  );
};

export default WriteQueries;
