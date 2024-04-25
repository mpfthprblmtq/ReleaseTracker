import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSpotifyService} from "../hooks/spotify/useSpotifyHook.ts";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {setArtist} from "../redux/slices/artistSlice.ts";
import {SpotifyRelease} from "../model/spotify/SpotifyRelease.ts";

const TestComponent: FC = () => {

  const artist: string = useSelector((state: any) => state.artistStore.artist);
  const dispatch = useDispatch();

  const [releases, setReleases] = useState<SpotifyRelease[]>([]);

  const {getArtist, getAlbumsFromArtist} = useSpotifyService();

  useEffect(() => {
    getArtist(artist).then((artist) => {
      getAlbumsFromArtist(artist).then(releases => {
        setReleases(releases);
      });
    });
  }, [undefined]);

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Box sx={{ position: 'relative' }}>
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
      </Box>
      <Box sx={{ position: 'relative'}}>
        <pre>
          {JSON.stringify(releases, null, 2)}
        </pre>
      </Box>

      {/*<iframe src="https://open.spotify.com/embed/album/6hYghEDBr9iF7BU5xpiLkw" width="500" height="152" allow="encrypted-media" style={{border: '0px', marginTop: '20px'}}></iframe>*/}
    </Box>
  )
}

export default TestComponent;