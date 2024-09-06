// import Header from './components/Header';
// import Footer from './components/Footer';
// import Sidebar from './components/Sidebar';
import CreatePost from './components/CreatePost'
import PostList from './components/PostList.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';


import PostListProvider from './store/post-list-store.jsx';
import FakeNewsDetector from './components/FakeNewsDetector.jsx';

function PostDisplay() {

  const [selectedTab, setSelectedTab] = useState("All Posts");



  return (
    
    <PostListProvider>
      <div className ="app-container" >
      <Sidebar selectedTab = {selectedTab} setSelectedTab = {setSelectedTab}></Sidebar>
      <div className= "content">

      {selectedTab === "All Posts" ? (<PostList></PostList>) : 
      (selectedTab === "Create Post" ?(<CreatePost></CreatePost>) : (<FakeNewsDetector/>))}
    

      </div>
      </div>
    </PostListProvider>
  );
}

export default PostDisplay;

