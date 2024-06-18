import { CameraAlt, Cancel } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

type Props = {
  register: UseFormRegisterReturn<string>;
  setValue: UseFormSetValue<any>;
};

export const ImageSelector = ({ register, setValue }: Props) => {
  const [textImage, setTextImage] = useState('');
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // const _images = getValues('ways').map((value) => value.image);

    if (e.target.files !== null && typeof e.target.files[0] !== 'undefined') {
      const result = await readAsDataURL(e.target.files[0]);

      setTextImage(result);
    } else {
      setTextImage('');
    }
  };

  return (
    <Box>
      {!textImage && (
        <Stack
          justifyContent="center"
          alignItems="center"
          width="auto"
          height="120px"
          bgcolor="#ddd"
          sx={{ cursor: 'pointer' }}
          onClick={() => imageRef.current.click()}
        >
          <CameraAlt />
        </Stack>
      )}

      {textImage && (
        <Box position="relative" onClick={() => imageRef.current.click()}>
          <img src={textImage} />
          <IconButton
            sx={{ p: 0, position: 'absolute', top: 2, right: 2 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              setValue(register.name, undefined);
              setTextImage('');
            }}
          >
            <Cancel fontSize="large" />
          </IconButton>
        </Box>
      )}

      <input
        type="file"
        capture="environment"
        accept="image/*,.png,.jpg,.jpeg,.gif"
        {...register}
        ref={(e) => {
          register.ref(e);
          imageRef.current = e;
        }}
        onChange={(e) => {
          register.onChange(e);
          handleImageChange(e);
        }}
        style={{ display: 'none' }}
      />
    </Box>
  );
};
