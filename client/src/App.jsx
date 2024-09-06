import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css"
import "./index.css"
import { Outlet } from "react-router-dom";

function App() {
  

  return (
     
     <>
     {/* <FakeNewsDetector 
      text={text}
      prediction={prediction}
      onFileChange={onFileChange}
      onFileUpload={onFileUpload}
     /> */}
     
     <Header  />
     <Outlet  />
     <Footer />
    
     </>

    
  );
}

export default App;
