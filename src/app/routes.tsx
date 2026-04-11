import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/layout/Root";
import { Overview } from "./components/pages/Overview";
import { Login } from "./components/pages/Login";
import { SignUp } from "./components/pages/SignUp";
import { Dashboard } from "./components/pages/Dashboard";
import { Roadmap } from "./components/pages/Roadmap";
import { Resources } from "./components/pages/Resources";
import { Upload } from "./components/pages/Upload";
import { Moderator } from "./components/pages/Moderator";
import { Admin } from "./components/pages/Admin";
import { NotFound } from "./components/pages/NotFound";
import { Profile } from "./components/pages/Profile";

// --- ROLE-BASED PROTECTION COMPONENT ---
interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: ("student" | "admin" | "moderator")[];
}

function RoleRoute({ children, allowedRoles }: RoleRouteProps) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole") as "student" | "admin" | "moderator" | null;

  // 1. If not logged in, go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. SAFETY CHECK: If logged in but role is missing (prevents the crash)
  if (!userRole) {
    localStorage.clear(); // Clear messy state
    return <Navigate to="/login" replace />;
  }

  // 3. If the user's role isn't in the "allowed" list for this page
  if (!allowedRoles.includes(userRole)) {
    // Redirect them to their own home base
    const homePath = userRole === "admin" ? "/app/admin" : 
                     userRole === "moderator" ? "/app/moderator" : 
                     "/app/dashboard";
    return <Navigate to={homePath} replace />;
  }

  // 4. Everything is fine, show the page
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Overview,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/app",
    element: (
      // The Layout (Root) is allowed for everyone who is logged in
      <RoleRoute allowedRoles={["student", "admin", "moderator"]}>
        <Root />
      </RoleRoute>
    ),
    children: [
      { 
        index: true, 
        element: <Navigate to="/app/dashboard" replace /> 
      },
      
      // --- STUDENT ROUTES ---
      { 
        path: "dashboard", 
        element: <RoleRoute allowedRoles={["student"]}><Dashboard /></RoleRoute> 
      },
      { 
        path: "roadmap", 
        element: <RoleRoute allowedRoles={["student"]}><Roadmap /></RoleRoute> 
      },
      { 
        path: "resources", 
        element: <RoleRoute allowedRoles={["student"]}><Resources /></RoleRoute> 
      },
      { 
        path: "upload", 
        element: <RoleRoute allowedRoles={["student"]}><Upload /></RoleRoute> 
      },

      // --- MODERATOR ROUTE ---
      { 
        path: "moderator", 
        element: <RoleRoute allowedRoles={["moderator"]}><Moderator /></RoleRoute> 
      },

      // --- ADMIN ROUTE ---
      { 
        path: "admin", 
        element: <RoleRoute allowedRoles={["admin"]}><Admin /></RoleRoute> 
      },

      // --- SHARED ROUTES ---
      { 
        path: "profile", 
        element: <RoleRoute allowedRoles={["student", "admin", "moderator"]}><Profile /></RoleRoute> 
      },
      { path: "*", Component: NotFound },
    ],
  },
]);