import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from "./Home.jsx";
import ProfilePage from "./ProfilePage.jsx";
import ProfileEdit from "./ProfileEdit.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./NoPage.jsx";
import Layout from "./Layout.jsx";
import NewPost from "./NewPost.jsx";
import LoginPage from "./LoginPage.jsx";
import SignUpPage from "./SignUpPage.jsx";
import SearchResults from './SearchResults.jsx';
import PostPage from "./PostPage.jsx";
import EditPostPage from "./EditPostPage.jsx";
import './App.css';
import Feed from './Feed.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="post/:postId" element={<PostPage />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/post/:postId/edit" element={<EditPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>,
)
