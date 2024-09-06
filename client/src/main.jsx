//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider,createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import React from "react"
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx';
import PostDisplay from './PostDisplay.jsx';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/Login.jsx';



// const router = createBrowserRouter([
//   {
//     path : '/',
//     element : <App/>,
//     children : [
//       {
//         path : "",
//         element : <Home/>
//       },
//       {
//         path : "About",
//         element : <About/>
//       },
//       {
//         path : "Contact",
//         element : <Contact/>
//       }
//     ] 
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element= {<App/>}>
    <Route path = '' element= {<Home/>}/>
    <Route path = 'About' element= {<About/>}/>
    <Route path = 'Contact' element= {<Contact/>}/>
    <Route path = 'PostDisplay' element= {<PostDisplay/>}/>
    <Route path = 'Login' element= {<Login/>}/>


    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
</React.StrictMode>
)
