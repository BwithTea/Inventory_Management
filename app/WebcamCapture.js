

// components for the webcam integration
import React, {useRef} from "react";
import Webcam from "react-webcam";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState,useEffect } from "react";

const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
  
    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc); // Save the captured image
    };

    const retake = () => {
        setImage(null);
    }
  
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
            <Button variant="contained" color="primary">Process</Button>
          </Stack>
        </Box>
      );
    };
    
  
  export default WebcamCapture;