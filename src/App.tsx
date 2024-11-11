import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import ChatInterface from "./components/ChatInterface";

// Configure QueryClient with better defaults for 2024
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Toaster position="bottom-right" />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">
                <Routes>
                  {navItems.map(({ to, page, title }) => (
                    <Route key={to} path={to} element={page} />
                  ))}
                </Routes>
              </main>
              <ChatInterface />
            </div>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;