

// components for the webcam integration
import React, {useRef} from "react";
import Webcam from "react-webcam";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
// Really focus on these two lines and understand how these are used in projects. 
import { useState,useEffect } from "react";
import axios from "axios";

const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
  
    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc); // Save the captured image
    };

    const retake = () => {
        setImage(null);
    };

    const processImage = async () => {
      if (image) {
        try {
          console.log("Sending image for processing...");
          const response = await axios.post('/api/process-image', { image })
          const {data} = response.data;
          console.log("Processed data: ", data)
        } catch (error) {
          console.error("Error processing image: ", error);
        }
      }
    };
  
    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center">
          <Box width="100%" height="auto">
            {image === null && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                height="auto"
              />
            )}
            {image !== null && (
              <img src={image} alt="Captured" style={{ width: '100%', height: 'auto' }} />
            )}
          </Box>
          <Stack width="100%" spacing={2} direction="row" justifyContent="center" mt={2}>
            {image === null && (
              <Button variant="contained" color="primary" onClick={capture}>Capture</Button>
            )}
            {image !== null && (
              <Button variant="contained" color="primary" onClick={retake}>Retake</Button>
            )}
            <Button variant="contained" color="primary" onClick = {processImage}>Process</Button>
          </Stack>
        </Box>
      );
    };
    
  
  export default WebcamCapture;