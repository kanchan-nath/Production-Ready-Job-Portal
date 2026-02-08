import React from 'react'
import AppRoutes from "../src/routes/AppRoutes.jsx";
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import { Auth0Provider } from '@auth0/auth0-react';
const App = () => {
  return (
    <div>
      <Header/>
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
