import { Admin } from "./admin/Admin.tsx";
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
  Outlet
} from "react-router-dom";
import { useState } from "react";
function App() {
  const [user, setUser] = useState({"firstName": "", "lastName": "", "accessToken": "", "accessLevel": ""})
  const [userName, setUserName] = useState('')
  
  const handleUser = (user) => {
   setUserName(user.firstName + " " + user.lastName)
  }
  const Layout = () => {
    return (
      <div className="main">
        <Navbar userName={userName}/>
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet /> 
          </div>
        </div>
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
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/login",
          element: <Login onUser={handleUser}/>
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
export default App;
