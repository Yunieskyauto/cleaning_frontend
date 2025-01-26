import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import custom components
import { Invited } from "./admin/Invited.tsx";
import { Employees } from "./employees/Employees.tsx";
import { Users } from "./users/Users.tsx";
import { Home } from "./home/Home.tsx";
import SidebarMenu from "./components/manu/SidebarManu.tsx";
import { User } from "./User/User.tsx";
import { UserEmailVerification } from "./users/UserEmailVerification.tsx";
import "./styles/global.scss";

function App() {
  // State for the logged-in employee details
  const [userRole, setUserRole] = useState({
    firstName: "",
    lastName: "",
    accessToken: "",
    accessLevel: "",
    id: 0,
  });

  // State for the username and user level
  const [userName, setUserName] = useState("");
  const [userLevel, setUserLevel] = useState(0);

  /**
   * Handles user login information.
   * Updates the employee state and displays toast notifications for success or failure.
   * @param {Object|undefined} newUser - The new user object or undefined on login failure.
   */
  const handleUser = (newUser) => {
    if (newUser) {
     // setEmployee(newUser);
      setUserLevel(newUser.accessLevel);
    } else {
      toast.error("Could not login", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        theme: "light",
      });
    }
  };

  /**
   * Layout component to structure the main layout of the app.
   * Handles navigation, displays toast notifications, and manages the sidebar and content.
   */
  const Layout = () => {
    const navigate = useNavigate();

    // Effect to handle post-login behavior
    useEffect(() => {
      console.log(userRole);
      /*
      if (employee.accessToken) {
        toast.success("Login success!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          theme: "light",
        });

        if (employee.accessLevel === 1) {
          setUserName(`${employee.firstName} ${employee.lastName}`);
          navigate("/");
        }
      }
      */
    }, [userRole, navigate]);

    return (
      <div className="main">
        <div className="container">
          <div className="menuContainer">
            <SidebarMenu onUserRole={(userRole) => setUserRole(userRole)}/>
          </div>
          <div className="contentContainer">
            <div className="cardContainer">
              {/* Pass the employee state to child components */}
           
            </div>
          </div>
        </div>
        <ToastContainer style={{ width: "100%" }} />
      </div>
    );
  };

  /**
   * Router configuration.
   * Defines all the routes and their corresponding components.
   */
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/customers", element: <Users /> },
        { path: "/employees", element: <Employees /> },
        { path: "/invite", element: <Invited /> },
        { path: "/user-email-verification", element: <UserEmailVerification /> },
        { path: "/user", element: <User /> },
      ],
    },
  ]);

  // Render the router
  return <RouterProvider router={router} />;
}

export default App;
