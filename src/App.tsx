import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ComparisonProvider } from "@/context/ComparisonContext";
import { DietProvider } from "@/context/DietContext";

import Auth from "./pages/Auth";
import SearchPage from "./pages/SearchPage";
import FoodDetail from "./pages/FoodDetail";
import Dashboard from "./pages/Dashboard";
import BrandComparisonSimple from "./pages/BrandComparisonSimple";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <SearchPage />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RootRedirect />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/food/:id" element={<FoodDetail />} />
    <Route path="/compare" element={<BrandComparisonSimple />} />
    <Route path="/comparison" element={<BrandComparisonSimple />} />

    {/* Protected Routes */}
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ComparisonProvider>
            <DietProvider>
              <AppRoutes />
            </DietProvider>
          </ComparisonProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
