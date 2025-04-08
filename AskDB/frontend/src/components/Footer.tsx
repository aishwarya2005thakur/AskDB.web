
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

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
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
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link to="/write-queries" className="text-gray-600 hover:text-gray-900 transition-colors">Learn SQL</Link>
              <Link to="/practice-sql" className="text-gray-600 hover:text-gray-900 transition-colors">Practice SQL</Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Upload DB</Link>
            </nav>
            
            <h3 className="text-lg font-medium mb-4">Contact / Feedback</h3>
            <p className="text-gray-600">
              Got questions or suggestions? <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScubHD0oWYiX-zEBjMWaAMsXuvoyEYpT-n3v41UzzowA91BNQ/viewform?usp=header" 
                className="text-blue-600 hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Send us feedback
              </a>
            </p>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Credits Section */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium mb-3">Tech Stack</h3>
          <p className="flex items-center justify-center flex-wrap gap-2 text-gray-600">
            Built using React, FastAPI, MySQL, OpenAI API, and a lot of <Coffee className="inline h-4 w-4" />
          </p>
        </div>
        
        {/* Open Source Note */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">💡 AskDB is a small experimental project</span> built with lots of love (and caffeine) 
            by a group of 2nd-year engineering students.
          </p>
          <p className="text-sm text-gray-600 mb-2">
            If you run into any bugs or hiccups, please be kind — we're still learning and building in public! 🛠️
          </p>
          <p className="text-sm text-gray-600 flex items-center justify-center">
            <span className="mr-1">🧑‍💻 Check out the open-source code on</span>
            <a 
              href="https://github.com/aishwarya2005thakur/AskDB" 
              className="text-blue-600 hover:underline flex items-center ml-1"
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub <Github className="inline h-4 w-4 ml-1" />
            </a>
            <span className="mx-1">— contributions, feedback, and good vibes are always welcome.</span>
            <Heart className="inline h-4 w-4 text-blue-500" />
          </p>
        </div>
        
        {/* Legal / Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 AskDB. For educational use only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
