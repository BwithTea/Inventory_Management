
'use client'
import Image from "next/image";
import { useState,useEffect } from "react";
import { firestore } from "@/firebase"
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, query, getDocs, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

// import the webcam capture file
import WebcamCapture from "./WebcamCapture";




export default function Home() {
  // Goal is to comment out each line to understand what each line does
  const [inventory, setInventory] = useState([])
  const [open, setopen] = useState(false)
  const [open2, setopen2] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  console.log("This is the inventory: ", inventory)
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      // If number is equal to 1 then delete 
      if (quantity === 1) {
        await deleteDoc(docRef)
      // Otherwise subtract the quantity
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
      
    }
    await updateInventory()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
        await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }


// Update the Page
  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setopen(true)
  const handleClose = () => setopen(false)
  
  const handleOpen2 = () => setopen2(true)
  const handleClose2 = () => setopen2(false)

  return (
    // This is the whole page
  <Box 
    width = "100vw" 
    height= "100vh"
    display = "flex" 
    flexDirection = "column"
    alignItems="center"
    gap={2}
    bgcolor= "lightgray"
    padding={5}
  >
    {/* Modal for Scan Items Button */}
    <Modal open = {open2} onClose = {handleClose2}>
      <Box
        position = "absolute"
        top = "50%"
        left = "50%"
        width = {1000}
        bgcolor = "white"
        border = "2px solid #000"
        boxShadow = {24}
        display = "flex"
        flexDirection = "column"
        p = {10}
        sx = {{
          transform : "translate(-50%,-50%)"
        }}
      >
        <WebcamCapture/>

      </Box>
    </Modal>
      
    {/* Modal for Add Item Button */}
    <Modal open = {open} onClose = {handleClose}>
    
      <Box
         position = "absolute"
         top = "50%"
         left = "50%"
         width = {400}
         bgcolor = "white"
         border = "2px solid #000"
         boxShadow = {24}
         p = {4}
         display = "flex"
         flexDirection = "column"
         gap={2}
         sx = {{
           transform : "translate(-50%,-50%)"
         }}>

        <Typography variant = "h6" display = "flex" justifyContent="center">Add Item</Typography>
        
        <Stack width = "100%" spacing = {2} direction = "row">
          <TextField 
            variant="outlined"
            fullWidth
            value = {itemName}
            onChange={(event) => {
              setItemName(event.target.value.toLowerCase())
            }}
          /> 
          <Button
          variant = "outlined" 
          onClick ={() => {
            addItem(itemName)
            setItemName("")
            handleClose()
          }}
          >Add</Button>
        </Stack>
      </Box>
    </Modal>


    {/* --------------------------------------------------------- */}
    
    {/* This is the box that holds everything */}
    <Box
      border = "2px solid #333"
      boxShadow = {24}
      
    >
      {/* This is the header of the inventory */}
      <Box
        width = "1200px"
        height = "50px"
        bgcolor= "lightgray"
        display = "flex"
        alignItems = "center"
        justifyContent= "center"
      >
        
        
        <Stack direction = "row" spacing = {40}>

          <Box>
          <Typography variant = "h4"> Inventory Items </Typography> 
          </Box>
          
          <Stack direction = "row" spacing = {1}>

            <Button variant = "contained" onClick={() => handleOpen()}>Add Item </Button>
            <Button variant = "contained" onClick={() => handleOpen2()}>Scan Items</Button>

          </Stack>
        </Stack>

      </Box>
      
      {/* Sub-Header of the inventory Item,Quantity,Actions */}
      <Box
          width = "1200px"
          height = "25px"
          bgcolor = "blue"
          border = "1px solid #333"
        >
          <Stack width = "1200px" direction = "row">
            <Box width = "550px" height ="25px" border = "2px solid" display = "flex" alignItems= "center" justifyContent= "center" >
              <Typography variant = "h6" alignItems= "center" color= "white">Item</Typography>
            </Box>
            <Box width = "400px" height ="25px" border = "2px solid" display = "flex" alignItems= "center" justifyContent= "center">
              <Typography variant = "h6" alignItems= "center" color= "white">Quantity</Typography>
            </Box>
            <Box width = "250px" height ="25px" border = "2px solid" display = "flex" alignItems= "center" justifyContent= "center">
              <Typography variant = "h6" alignItems= "center" color= "white">Actions</Typography>
            </Box>

          </Stack>
        </Box>
      
      {/* Contents of the Inventory like Item, Quantity and Actions */}
      <Stack width = "1200px" height = "700px"  overflow="auto" bgcolor= "lightblue"> 
        {
          inventory.map(({name, quantity}) => (
            <Box
              key = {name}
              width = "100%"
              minHeight= "100px"
              display = "flex"
              alignItems = "center"
              justifyContent = "space-between"
              bgcolor= "white"
              border = "1px solid #333"
              p = {3}
          >
            <Box textAlign="center" flex="1">
              <Typography variant="h3" color="#333">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
            </Box>
            <Box textAlign="center" flex="1">
              <Typography variant="h3" color="#333">
                {quantity}
              </Typography>
            </Box>
            <Stack direction = "row" spacing = {2}>
              <Button variant = "contained" onClick={() => addItem(name)}>Add</Button>
              <Button variant = "contained" onClick={() => removeItem(name)}>Remove </Button>
            </Stack>
          </Box>
          ))}
        
      </Stack>

    </Box>

  </Box>
  )
}
