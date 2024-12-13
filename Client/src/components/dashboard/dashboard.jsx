import React, { useState } from 'react';
import left from "../../logo/upload.png";
import right from "../../logo/data-encryption.png"
const Dashboard = () => {
  const [rightImageVisible, setRightImageVisible] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRightImageVisible(true);
    }
  };

  const triggerFileUpload = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex-1 flex items-center justify-center border cursor-pointer">
        <div 
        className="w-52 h-52 hover:scale-110 transition-transform duration-300 "onClick={triggerFileUpload}>
      
        <img
          src={left}
          alt="Left Placeholder"
          className="max-w-1/2 max-h-1/2"
        />
        <input
          id="file-input"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
      </div>
      <div className="flex-1 flex items-center justify-center ">
        
        {rightImageVisible && (
          <img
            src={right}
            alt="Right Placeholder"
            className="max-w-1/2 max-h-1/2"
          />
      
        )}
      </div>
    </div>
  );
};

export default Dashboard;
