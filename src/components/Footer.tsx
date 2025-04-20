
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Coffee, Database, Github, Heart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  customClass?: string;
}

const Footer = ({ customClass }: FooterProps = {}) => {
  return (
    <footer className={cn("bg-white border-t mt-12", customClass)}>
      <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
        {/* FAQ Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="text-left">What is AskDB?</AccordionTrigger>
                <AccordionContent>
                  AskDB is an AI-powered platform where you can upload your database and query it in plain English.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger className="text-left">Do I need to know SQL to use AskDB?</AccordionTrigger>
                <AccordionContent>
                  Not at all! You can write queries in natural language, and there's a page to help you learn SQL too.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger className="text-left">Is AskDB free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes! It's a completely free and open-source project.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger className="text-left">Where can I report bugs or give suggestions?</AccordionTrigger>
                <AccordionContent>
                  You can open an issue or contribute via our GitHub repo linked below.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Quick Links & Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2 mb-8">
              <Link to="/" className={cn("hover:text-gray-300 transition-colors", customClass ? "text-white" : "text-gray-600 hover:text-gray-900")}>Home</Link>
              <Link to="/write-queries" className={cn("hover:text-gray-300 transition-colors", customClass ? "text-white" : "text-gray-600 hover:text-gray-900")}>Learn SQL</Link>
              <Link to="/practice-sql" className={cn("hover:text-gray-300 transition-colors", customClass ? "text-white" : "text-gray-600 hover:text-gray-900")}>Practice SQL</Link>
              <Link to="/" className={cn("hover:text-gray-300 transition-colors", customClass ? "text-white" : "text-gray-600 hover:text-gray-900")}>Upload DB</Link>
            </nav>
            
            <h3 className="text-lg font-medium mb-4">Contact / Feedback</h3>
            <p className={cn(customClass ? "text-gray-300" : "text-gray-600")}>
              Got questions or suggestions? <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScubHD0oWYiX-zEBjMWaAMsXuvoyEYpT-n3v41UzzowA91BNQ/viewform?usp=header" 
                className={cn("hover:underline", customClass ? "text-blue-300" : "text-blue-600")}
                target="_blank" 
                rel="noopener noreferrer"
              >
                Send us feedback
              </a>
            </p>
          </div>
        </div>
        
        <Separator className={cn("my-8", customClass ? "bg-gray-700" : "")} />
        
        {/* Credits Section */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium mb-3">Tech Stack</h3>
          <p className={cn("flex items-center justify-center flex-wrap gap-2", customClass ? "text-gray-300" : "text-gray-600")}>
            Built using React, FastAPI, MySQL, OpenAI API, and a lot of <Coffee className="inline h-4 w-4" />
          </p>
        </div>
        
        {/* Open Source Note */}
        <div className={cn("p-4 rounded-lg mb-6 text-center", customClass ? "bg-[#0c2d4d]" : "bg-gray-50")}>
          <p className={cn("text-sm mb-2", customClass ? "text-gray-300" : "text-gray-600")}>
            <span className="font-medium">💡 AskDB is a small experimental project</span> built with lots of love (and caffeine) 
            by a group of 2nd-year engineering students.
          </p>
          <p className={cn("text-sm mb-2", customClass ? "text-gray-300" : "text-gray-600")}>
            If you run into any bugs or hiccups, please be kind — we're still learning and building in public! 🛠️
          </p>
          <p className={cn("text-sm flex items-center justify-center", customClass ? "text-gray-300" : "text-gray-600")}>
            <span className="mr-1">🧑‍💻 Check out the open-source code on</span>
            <a 
              href="https://github.com/aishwarya2005thakur/AskDB" 
              className={cn("hover:underline flex items-center ml-1", customClass ? "text-blue-300" : "text-blue-600")}
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub <Github className="inline h-4 w-4 ml-1" />
            </a>
            <span className="mx-1">— contributions, feedback, and good vibes are always welcome.</span>
            <Heart className={cn("inline h-4 w-4", customClass ? "text-blue-300" : "text-blue-500")} />
          </p>
        </div>
        
        {/* Legal / Copyright */}
        <div className={cn("text-center text-sm", customClass ? "text-gray-400" : "text-gray-500")}>
          <p>© 2025 AskDB. For educational use only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
