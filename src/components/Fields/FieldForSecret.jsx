import { useState } from "react";

import { FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, FormHelperText } from "@mui/material";

function FieldForSecret({ register, error, helperText, visabilityOn, visabilityOff, type }) {
    const [show, setShow] = useState(false);

    const handleClickShow = () => setShow((show) => !show);

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    const handleMouseUp = (event) => {
        event.preventDefault();
    };

  return (
    <FormControl sx={{ mb: 3, width: '100%' }} variant="outlined" error={!!error}>
          <InputLabel>{type}</InputLabel>
          <OutlinedInput
            type={show ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShow}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  edge="end"
                >
                  {show ? visabilityOff : visabilityOn}
                </IconButton>
              </InputAdornment>
            }
            label={type}
            {...register(type, {
              required: 'required to fill out',
              minLength: {
                  value: 6,
                  message: 'Minimum 6 characters',
              },
          })}
          />
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
  )
}

export default FieldForSecret;