import {FC, memo} from "react";
import {Box} from "@mui/material";

interface SpotifyPlayerProps {
  id: string;
  type: 'album' | 'track';
}

// TODO if an album is only one track, show the track instead of the album, since it looks better
const SpotifyPlayer: FC<SpotifyPlayerProps> = ({id, type}) => {
  return (
    <Box sx={{width: '600px', height: '152px', border: '0px', marginTop: '20px'}}>
      <iframe src={`https://open.spotify.com/embed/${type}/${id}`} width="100%" height="100%" allow="encrypted-media"
              style={{border: '0px'}}></iframe>
    </Box>
  );
};

export default memo(SpotifyPlayer);