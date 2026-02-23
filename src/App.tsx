import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Temples from "./pages/Temples";
import TempleDetails from "./pages/TempleDetails";
import Confirmation from "./pages/Confirmation";
import TatkalBooking from "./pages/TatkalBooking";
import InQueueOrder from "./pages/InQueueOrder";
import MyOrders from "./pages/MyOrders";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/temples" element={<Temples />} />
          <Route path="/temple/:id" element={<TempleDetails />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/tatkal" element={<TatkalBooking />} />
          <Route path="/in-queue" element={<InQueueOrder />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/help" element={<HelpSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
