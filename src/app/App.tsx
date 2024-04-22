import './App.css';
import {Button, Stack, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {FC, useEffect} from "react";
import {setArtist} from "../redux/slices/artistSlice.ts";
import {useSpotifyService} from "../hooks/useSpotifyHook.ts";

const App: FC = () => {

  const artist: string = useSelector((state: any) => state.artistStore.artist);
  const dispatch = useDispatch();

  const {getArtist, getAlbumsFromArtist} = useSpotifyService();

  useEffect(() => {
    // searchArtist('Yoe Mase').then((artists) => {
    //   console.log(artists);
    // });
    getArtist(artist).then((artist) => {
      getAlbumsFromArtist(artist).then(releases => {
        console.log(releases);
      });
    });

  }, []);

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
      <iframe src="https://open.spotify.com/embed/album/6hYghEDBr9iF7BU5xpiLkw" width="600" height="200" allow="encrypted-media"></iframe>
    </>
  )
}

export default App;
