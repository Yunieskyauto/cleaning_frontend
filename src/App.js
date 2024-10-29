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
  Outlet,
  useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [employee, setEmployee] = useState({ "firstName": "", "lastName": "", "accessToken": "", "accessLevel": "" })
  const [userName, setUserName] = useState('')
  
  
  const handleUser = (newUser) => {
    setEmployee(newUser)
  }
  const Layout = () => {
    useEffect(() => {
      if ( employee.accessToken !== "") {
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
    }, [employee])
    const navigate = useNavigate();
    return (
      <div className="main">
        
        <Navbar userName={userName} />
        <div className="container">
          <div className="menuContainer">
            <Menu onUser={handleUser}/>
          </div>
          <div className="contentContainer">
            <Outlet context={{
              employee
            }} />
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
          path: "/admin",
          element: <Admin />,
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
export default App;
