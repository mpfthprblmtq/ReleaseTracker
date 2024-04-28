import {FC, memo} from "react";
import {Box} from "@mui/material";

interface SoundCloudPlayerProps {
  id: string;
  type: 'track' | 'playlist';
}

const SoundCloudPlayer: FC<SoundCloudPlayerProps> = ({id, type}) => {
  return (
    <Box sx={{width: '600px', height: type === 'playlist' ? '300px' : '125px', border: '0px', marginTop: '20px'}}>
      <iframe
        style={{borderWidth: '0px'}}
        width="100%"
        height="100%"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${type}s/${id}&color=%23ff5500&show_comments=false`}>
      </iframe>
    </Box>
  );
};

export default memo(SoundCloudPlayer);