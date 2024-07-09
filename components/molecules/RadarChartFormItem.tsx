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
import { WatchedRadarChart } from './WatchedRadarChart';

type Name = {
  parentName: string;
  childNames: [string, string];
};

type Props = {
  initRefData: any[];
  register: any;
  control: any;
  errors: any;
  getValues: (name: string) => any;
  name: Name;
};

export const RadarChartFormItem = ({
  initRefData,
  register,
  control,
  errors,
  getValues,
  name,
}: Props) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: name.parentName,
  });

  const [refData, setRefData] = useState(initRefData);
  const [selectedRef, setSelectedRef] = useState({});

  const handleIngredientNameBlur = () => {
    const refObj = {};
    refData.forEach((value, index) => {
      if (value.name != '') {
        refObj[value.name] = value.data;
      }
    });

    let _selectedRef = {};
    getValues(name.parentName)?.forEach((value, index) => {
      if (value.name in refObj) {
        _selectedRef[value.name] = refObj[value.name];
      }
    });

    setSelectedRef(_selectedRef);
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
                      options={refData.map((value) => value.name)}
                      size="small"
                      sx={{ width: 223 }}
                      freeSolo
                      defaultValue={field.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          {...register(
                            `${name.parentName}.${index}.${name.childNames[0]}`,
                          )}
                          onBlur={(e) => {
                            register(
                              `${name.parentName}.${index}.${name.childNames[0]}`,
                            ).onBlur(e);
                            handleIngredientNameBlur();
                          }}
                          error={
                            errors[name.parentName]?.[index]?.[
                              name.childNames[0]
                            ] !== undefined
                          }
                        />
                      )}
                    />

                    <TextField
                      type="number"
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
                      {...register(
                        `${name.parentName}.${index}.${name.childNames[1]}`,
                      )}
                      error={
                        errors[name.parentName]?.[index]?.[
                          name.childNames[1]
                        ] !== undefined
                      }
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
        <Box>
          <WatchedRadarChart
            watchName={name.parentName}
            watchDataKey={{ ref: name.childNames[0], data: name.childNames[1] }}
            refData={selectedRef}
            subjects={[
              '炭水化物',
              'タンパク質',
              '脂質',
              'ビタミン',
              'ミネラル',
            ]}
            control={control}
            getValues={getValues}
          />
        </Box>
      </Stack>

      <Chip
        label="材料を追加"
        icon={<Add />}
        color="primary"
        onClick={() =>
          append({ [name.childNames[0]]: '', [name.childNames[1]]: 0 })
        }
        sx={{ mt: 2 }}
      />
    </Box>
  );
};
