import { FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput } from "@mui/material";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ClearIcon from '@mui/icons-material/Clear';

function RegexField({text}) {
  
  return (
    <FormControl sx={{ width: '100%' }} variant="outlined">
      <InputLabel         sx={{
          overflow: 'hidden',  // Скрываем переполнение
          whiteSpace: 'nowrap', // Не переносим текст на новую строку
          textOverflow: 'ellipsis', // Добавляем многоточие при переполнении
          width: '50%'
        }}>{text}</InputLabel>
      <OutlinedInput
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <FileDownloadDoneIcon color="success" fontSize="large" />
            </IconButton>
            <IconButton>
              <ClearIcon color="error" fontSize="large" />
            </IconButton>
          </InputAdornment>
        }
        label={text}

      />
    </FormControl>
  );
}

export default RegexField;
