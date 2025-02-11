import { Invited } from "./admin/Invited.tsx";
import { Menu } from "./components/manu/Menu.tsx";
import { Employees } from "./employees/Employees.tsx";
import { Users } from "./users/Users.tsx"
import { Login } from "./login/Login.tsx"
import { Navbar } from "./components/navbar/Navbar.tsx"
import { Footer } from "./components/footer/Footer.tsx"
import { Home } from "./home/Home.tsx"
import './styles/global.scss'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarMenu from "./components/manu/SidebarManu.tsx";
import { User } from "./User/User.tsx";
import { UserEmailVerification } from "./users/UserEmailVerification.tsx";

function App() {
  const [userRole, setUserRole] = useState({ "firstName": "", "lastName": "", "accessToken": "", "accessLevel": "", "id": 0})
  
  const hadleLoggedUser = (data) => {
     setUserRole((prevState) => ({
      ...prevState,
      id: data.id,
      accessLevel: data.access_level,
      firstName: data.first_name,
      lastName: data.last_name,
      accessToken: data.access_token,
     }));
  }

  const Layout = () => {
    return (
      <div className="main"> 
        <div className="container">
          <div className="menuContainer">
            <SidebarMenu 
            onUserRole={(userRole) => setUserRole(userRole)}
            user={userRole} 
            />
          </div>
          <div className="contentContainer">
            <div className="cardContainer">
                <Outlet context={{
                 userRole
                }} />
            </div>
          </div>
        </div>
        <ToastContainer style={{width: "100%" }}/>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/customers",
          element: <Users />,
        },
        {
          path: "/employees",
          element: <Employees />,
        },
        {
          path: "/invite",
          element: <Invited/>,
        },
        {
          path: "/user-email-verification",
          element: <UserEmailVerification 
          onLoggedUser={hadleLoggedUser} 
          onError={(message) => console.log(message)}
          />
        },
        {
          path: "/user",
          element: <User/>,
        },
        {
          path: "/cleaner",
          element: <User/>,
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
export default App;
