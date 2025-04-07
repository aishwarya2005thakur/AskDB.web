
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Github, Mail, Coffee, Database, Code, Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 pt-10 pb-4 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* FAQ Section */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">What is AskDB?</AccordionTrigger>
                <AccordionContent>
                  AskDB is an AI-powered platform where you can upload your database and query it in plain English.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Do I need to know SQL to use AskDB?</AccordionTrigger>
                <AccordionContent>
                  Not at all! You can write queries in natural language, and there's a page to help you learn SQL too.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Is AskDB free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes! It's a completely free and open-source project.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Where can I report bugs or give suggestions?</AccordionTrigger>
                <AccordionContent>
                  You can open an issue or contribute via our GitHub repo linked below.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Quick Links and Contact */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-[#0EA5E9] transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/write-queries" className="text-gray-600 hover:text-[#0EA5E9] transition-colors">Learn SQL</Link>
                </li>
                <li>
                  <Link to="/practice-sql" className="text-gray-600 hover:text-[#0EA5E9] transition-colors">Practice SQL</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact / Feedback</h3>
              <p className="text-gray-600 mb-2">
                Got questions or suggestions?
              </p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScubHD0oWYiX-zEBjMWaAMsXuvoyEYpT-n3v41UzzowA91BNQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#0EA5E9] hover:underline"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send us feedback
              </a>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
            <span>Built using</span>
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-1" />
              <span>React</span>
            </div>
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-1" />
              <span>MySQL</span>
            </div>
            <div className="flex items-center">
              <Brain className="h-4 w-4 mr-1" />
              <span>OpenAI API</span>
            </div>
            <div className="flex items-center">
              <Coffee className="h-4 w-4 mr-1" />
              <span>and a lot of ☕</span>
            </div>
          </div>
        </div>

        {/* Open Source Note */}
        <div className="mt-4 text-center md:text-left text-gray-600 text-sm">
          <p className="mb-2">
            💡 <em>AskDB is a small experimental project built with lots of love (and caffeine) by a group of 2nd-year engineering students.</em>
          </p>
          <p className="mb-2">
            If you run into any bugs or hiccups, please be kind — we're still learning and building in public! 🛠️
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            🧑‍💻 Check out the open-source code on 
            <a 
              href="https://github.com/aishwarya2005thakur/AskDB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#0EA5E9] hover:underline"
            >
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </a>
            — contributions, feedback, and good vibes are always welcome. 💙
          </p>
        </div>

        {/* Legal / Copyright */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          © 2025 AskDB. For educational use only.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
