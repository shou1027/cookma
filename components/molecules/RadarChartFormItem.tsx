import { Add, Delete } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

type Props = {
  refData: any[];
  register: any;
  control: any;
  errors: any;
  getValues: (name: string) => any;
};

export const RadarChartFormItem = ({
  refData,
  register,
  control,
  errors,
  getValues,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const [foundIngredients, setFoundIngredients] = useState([]);

  const handleIngredientNameBlur = () => {
    // const ingredientNames = getValues('ingredients')?.map((value, index) => {
    //   return value.name;
    // });
    // setFoundIngredients(
    //   refData.filter((value, index) => {
    //     return ingredientNames?.includes(value.name);
    //   }),
    // );
  };

  return (
    <Box>
      <Stack>
        <Box>
          {fields.length > 0 && (
            <Box mt={2}>
              <Stack gap={1}>
                <Stack direction="row" gap={1}>
                  <Stack
                    maxWidth="223px"
                    width="100%"
                    bgcolor="#ccc"
                    justifyContent="center"
                    alignItems="center"
                    py={0.5}
                  >
                    材料・調味料
                  </Stack>
                  <Stack
                    maxWidth="100px"
                    width="100%"
                    bgcolor="#ccc"
                    justifyContent="center"
                    alignItems="center"
                    py={0.5}
                  >
                    分量
                  </Stack>
                </Stack>
                {fields.map((field, index) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    key={field.id}
                  >
                    <Autocomplete
                      size="small"
                      sx={{ width: 223 }}
                      options={refData.map((value) => ({
                        label: value.name,
                      }))}
                      // onBlur={handleIngredientNameBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...register(`ingredients.${index}.name`)}
                          error={
                            errors.ingredients?.[index]?.name !== undefined
                          }
                        />
                      )}
                    />

                    <TextField
                      type="number"
                      // margin="none"

                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">g</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 10000,
                          step: 0.1,
                        },
                      }}
                      sx={{ maxWidth: 100 }}
                      {...register(`ingredients.${index}.amount`)}
                      error={errors.ingredients?.[index]?.amount !== undefined}
                    />
                    <IconButton onClick={() => remove(index)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
        {/* <Box>
          <WatchedRadarChart
            watchName="ingredients"
            watchDataKey={{ ref: '', data: '' }}
            refData={foundIngredients}
            subjects={[
              '炭水化物',
              'タンパク質',
              '脂質',
              'ビタミン',
              'ミネラル',
            ]}
            control={control}
          />
        </Box> */}
      </Stack>

      <Chip
        label="材料を追加"
        icon={<Add />}
        color="primary"
        onClick={() => append({ name: '', amount: 0 })}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};
