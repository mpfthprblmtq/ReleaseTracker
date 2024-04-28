import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {setArtist} from "../redux/slices/artistSlice.ts";

const TestComponent: FC = () => {

  const artist: string = useSelector((state: any) => state.artistStore.artist);
  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{position: 'relative'}}>
          <Typography variant={'h2'}>Release Tracker</Typography>
          <Stack direction={'row'} sx={{marginTop: '20px'}}>
            <TextField
              label={'Artist ID'}
              sx={{width: '300px', marginRight: '20px'}}
              value={artist}
              onChange={(event) => dispatch(setArtist(event.target.value))}
            />
            <Button variant='contained' onClick={() => dispatch(setArtist('1ikID9RZZMvkuBGDWrqajq'))}>Default</Button>
          </Stack>
          {/*<SpotifyPlayer id={'1OHv1Jg30gYtPpifU2kojg'} type={'track'} />*/}
          {/*<SoundCloudPlayer id={'1805414982'} type={'track'} />*/}
        </Box>
        <Box sx={{position: 'relative'}}>
          {/*<pre>*/}
          {/*  {JSON.stringify(releases, null, 2)}*/}
          {/*</pre>*/}
        </Box>
      </Box>
    </>
  )
}

export default TestComponent;