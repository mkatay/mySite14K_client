import "./App.css";
import React,{useState} from 'react';
import { MyNavbar } from "./components/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Products } from "./components/Products";
import { Product } from "./components/Product";
import { Contact } from "./components/Contact";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserProfile } from "./components/UserProfile";

const queryClient = new QueryClient()

function App() {
  const [loggedInUser,setLoggedInUser] =useState({})
  console.log('loggedIn:',loggedInUser)
  return (
    <QueryClientProvider client={queryClient}>
      <MyNavbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      <div className="holder">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="login" element={<Login setLoggedInUser={setLoggedInUser}/>} />
          <Route path="register" element={<Register />} />
          {loggedInUser?.username &&   <Route path="userprofile" element={<UserProfile loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}/>}
        </Routes>
      </div>
   </QueryClientProvider>
)}

export default App;
