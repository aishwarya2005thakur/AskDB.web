
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { WalletProvider as AptosWalletProvider } from "@/components/providers/WalletProvider";
import { WalletProvider } from "@/hooks/useWallet";
import Index from "./pages/Index";
import WriteQueries from "./pages/WriteQueries";
import PracticeSQL from "./pages/PracticeSQL";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AptosWalletProvider>
        <WalletProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/write-queries" element={<WriteQueries />} />
                <Route path="/practice-sql" element={<PracticeSQL />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </WalletProvider>
      </AptosWalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
