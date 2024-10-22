import { FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput } from "@mui/material";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ClearIcon from '@mui/icons-material/Clear';

function FiledWithIcons({ text, value, onChange, handleAdd, clear }) {
  return (
    <FormControl sx={{ width: '100%' }} variant="outlined">
      <InputLabel 
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: '50%'
        }}
      >
        {text}
      </InputLabel>
      <OutlinedInput
        type="text"
        value={value} 
        onChange={onChange} 
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={(e) => { e.stopPropagation(); handleAdd(); }}>
              <FileDownloadDoneIcon color="success" fontSize="large" />
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); clear(); }}>
              <ClearIcon color="error" fontSize="large" />
            </IconButton>
          </InputAdornment>
        }
        label={text}
      />
    </FormControl>
  );
}

export default FiledWithIcons;
