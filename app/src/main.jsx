import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from "./Home.jsx";
import NavBar from "./NavBar.jsx";
import ProfilePage from "./ProfilePage.jsx";
import ProfileEdit from "./ProfileEdit.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <NavBar/>
      <Home />
      <ProfilePage/>
      <ProfileEdit/>
  </StrictMode>,
)
