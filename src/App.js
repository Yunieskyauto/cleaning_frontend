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
  const [employee, setEmployee] = useState({ "firstName": "", "lastName": "", "accessToken": "", "accessLevel": "" })
  const [userName, setUserName] = useState('')

  const [userRole, setUserRole] = useState({ "firstName": "", "lastName": "", "accessToken": "", "accessLevel": "", id: 0})
  
  const [userLevel, setUserLevel] = useState(0)
  const handleUser = (newUser) => {
    
    if (newUser !== undefined) {
      setEmployee(newUser)
      setUserLevel(newUser.accessLevel)
    } else {
      toast.error('Could not login', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        theme: "light",
        });
    }
  }
  const Layout = () => {
    
    useEffect(() => {
      console.log("User Role", userRole)
      /*
      if (employee.accessToken !== "") {
        toast.success('Login success!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          theme: "light",
          });
        if (employee.accessLevel === 1 ) {
          setUserName(employee.firstName + " " + employee.lastName)
          navigate("/")
        }
      }
      console.log(userLevel)
      */
    }, [employee, userRole])
    const navigate = useNavigate();
    return (
      <div className="main"> 
        <div className="container">
          <div className="menuContainer">
            <SidebarMenu 
            onUserRole={(userRole) => setUserRole(userRole)}
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
          element: <UserEmailVerification />
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
