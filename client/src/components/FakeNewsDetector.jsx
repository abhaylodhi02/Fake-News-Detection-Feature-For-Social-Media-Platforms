import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import imageIcon from '../assets/GifStorage/imageIcon.gif';

const FakeNewsDetector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    const link = "https://fake-news-detection-feature-for-social.onrender.com/upload";
    try {
      const response = await fetch(link, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.result[0]);
      setText(data.result[1]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="fake-news-detector">
      <h1 className="fake-news-heading">Fake News Detector</h1>
      
      <div className="container">
        <div className="display-area">
          <div className="field">
            <h2>Text</h2>
            <p id="text-content">{text}</p>
          </div>

          <div className="field">
            <h2>Prediction</h2>
            <p id="prediction-content">{prediction}</p>
          </div>
        </div>
      </div>

      <div className="flex-container">
        <label htmlFor="file-input">
          <img
            src={imageIcon}
            alt="Click to upload"
            style={{ cursor: 'pointer', width: '100px', height: '100px' }}
          />
        </label>
       
        <input className='input-image'
          id="file-input"
          type="file"
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
        
        <button
          onClick={onFileUpload}
          className="btn btn-outline-secondary orange-active"
          style={{ width: "80px" }}
          type="button"
          id="inputGroupFileAddon04"
          disabled={!selectedFile}
        >
          Upload
        </button>
      </div>
      <h3 className='message'><i>(Click on the icon to upload the image or visit the Github link mentioned below to understand the working.)</i><br>
      <i>Note: Due to slow servers prediction may take some time.</i></h3>
    </div>
  );
};

export default FakeNewsDetector;
