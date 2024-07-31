'use client'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase';
import { collection, query, getDocs, setDoc, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  gap: 3,
  display: 'flex',
};



export default function Home() {
  interface PantryItem { name: string, count: number }
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState('');

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList: PantryItem[] = []
    docs.forEach((doc) => {
      console.log(doc.id, 'data', doc.data().count)
      pantryList.push({ name: doc.id, count: doc.data().count})
    });
    console.log(pantryList)
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item: string) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    console.log(docSnap)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
    }else {
      await setDoc(docRef, { count: 1 })
    }
    await updatePantry()
  }

  const removeItem = async (item: string) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    console.log(docSnap)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      }else{
        await setDoc(docRef, { count: count - 1 })
      }
    } 
    await updatePantry()
  }
  return (

    <Box width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}

    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              id="outlined-basic"
              label="Outlined"
              variant="outlined" />
            <Button variant="contained"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>

        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>Add Item</Button>
      <Box border={'1px solid black'}>
        <Box width="800px"
          height="100px" bgcolor={'blue'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography variant={'h2'} textAlign={'center'}>
            Pantry Items
          </Typography>
        </Box>

        <Stack
          width="800px"
          height="300px"
          spacing={2}
          overflow={"auto"}
        >

          {pantry.map(({ name, count }) => (
              <Box
                key={name}
                width="100%"
                minHeight="100px"
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bgcolor={"gray"}
                paddingX={5}
              >
                <Typography
                  variant={'h5'}
                  color={'black'}
                  textAlign={'center'}
                >{name}
                </Typography>
                <Typography variant={'h5'} color={'black'} textAlign={'center'}>
                  Quantity: {count}
                  </Typography>

              <Button
                variant={'contained'}
                onClick={() => removeItem(name)}
              >Remove
              </Button>
            </Box>
          ))}

        </Stack>
      </Box>
    </Box>
  )
}
