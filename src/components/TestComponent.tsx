import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSpotifyService} from "../hooks/spotify/useSpotifyHook.ts";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {setArtist} from "../redux/slices/artistSlice.ts";

const TestComponent: FC = () => {

  const artist: string = useSelector((state: any) => state.artistStore.artist);
  const dispatch = useDispatch();

  const {getArtist, getAlbumsFromArtist} = useSpotifyService();

  useEffect(() => {
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
      <iframe src="https://open.spotify.com/embed/album/6hYghEDBr9iF7BU5xpiLkw" width="500" height="152" allow="encrypted-media" style={{border: '0px', marginTop: '20px'}}></iframe>
    </>
  )
}

export default TestComponent;