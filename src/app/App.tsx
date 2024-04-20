import './App.css';
import {Button, Stack, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {FC} from "react";
import {setArtist} from "../redux/slices/artistSlice.ts";

const App: FC = () => {

  const artist: string = useSelector((state: any) => state.artistStore.artist);
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant={'h2'}>Release Tracker</Typography>
      <Stack direction={'row'} sx={{ marginTop: '20px' }}>
        <TextField
          label={'Artist ID'}
          sx={{width: '300px', marginRight: '20px'}}
          value={artist}
          onChange={(event) => dispatch(setArtist(event.target.value))}
        />
        <Button variant='contained' onClick={() => dispatch(setArtist('1ikID9RZZMvkuBGDWrqajq'))}>Default</Button>
      </Stack>
    </>
  )
}

export default App;
