'use client'
import { Box, Stack, Typography, Button, Modal, TextField, Autocomplete, Fab } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { firestore } from '@/firebase';
import { collection, query, getDocs, setDoc, getDoc, deleteDoc, doc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
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
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async (searchItem: string) => {
    setSearchInput(searchItem)
    console.log(searchItem)
    if(searchItem == ''){
      updatePantry();
      return;
    }
    const q = query(collection(firestore, 'pantry'), where('name', '>=', searchItem), where('name', '<=', searchItem + '\uf8ff'))
    const querySnap = await getDocs(q);
    const pantryList: PantryItem[] = []
    querySnap.forEach((doc) => {
      console.log('found', doc.id, doc.data())
      pantryList.push({ name: doc.id, count: doc.data().count })
    })
    setPantry(pantryList);
  }

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList: PantryItem[] = []
    docs.forEach((doc) => {
      console.log(doc.id, 'data', doc.data().count)
      pantryList.push({ name: doc.id, count: doc.data().count })
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
    console.log('docsnap')
    console.log(docSnap)
    if (docSnap.exists()) {
      const { count } = docSnap.data()
      await setDoc(docRef, { count: count + 1 })
    } else {
      await setDoc(docRef, { name: item, count: 1 })
    }
    await updatePantry()
  }

  const removeItem = async (item: string) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    console.log(docSnap)
    if (docSnap.exists()) {
      const { count } = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      } else {
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
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" spacing={2} display={"flex"} flexDirection={"row"}>
            <TextField
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              id="add-item"
              label="i.e. milk"
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
      <Typography variant={'h2'} textAlign={'center'}>
        Pantry Items
      </Typography>
      <Box border={'1px solid white'} borderRadius={'10px'}>
        <Box width="800px"
          borderRadius={'10px'}
          height="15%" 
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Stack direction="row" justify-content={"space-between"} alignContent={'center'} spacing={2} width="70%">
              <Autocomplete
                sx={{color: 'white'}}
                inputValue={searchInput}
                clearOnEscape
                //onInputChange={(e, newInputValue) => {setSearchInput(newInputValue) }}
                onInputChange={(e, newInput) => { handleSearch(newInput) }}
                id="search"
                freeSolo
                fullWidth
                options={pantry.map(({ name, count }) => name)}
                renderInput={(params) => <TextField {...params} label={<SearchIcon></SearchIcon> }  />}
              />
            <Fab color="primary" aria-label="add" onClick={handleOpen}>
              <AddIcon />
            </Fab>
            {/* <Button variant="contained" onClick={handleOpen}>Add Item</Button> */}
          </Stack>
        </Box>
        <Box width="800px"
          height="8%"
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ 'bgcolor': 'red' }}>
          <Stack direction='row' width="100%"
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
            paddingX={5}>
            <Typography width={'43%'}>
              Name
            </Typography>
            <Typography>
              Quantity
            </Typography>
          </Stack>
        </Box>

        <Stack
          width="800px"
          height="500px"
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
              paddingX={5}
              border={'1px solid white'}
              borderRadius={'10px'}
            >
              <Typography
                variant={'h5'}
                textAlign={'left'}
                whiteSpace={'normal'}
                width={'8%'}
              >{name}
              </Typography>
              <Typography variant={'h5'} flex={'0 0 auto'}>
                {count}
              </Typography>
              <Button
                variant={'contained'}
                onClick={() => removeItem(name)}
              ><ClearIcon></ClearIcon>
              </Button>
            </Box>
          ))}

        </Stack>
      </Box>
    </Box>
  )
}
