import { Header } from '@/components/molecules/Header';
import { MainTemplate } from '@/components/templates/MainTemplate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  FormLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string()
    .required('入力必須の項目です。')
    .max(20, '最大20文字まで入力できます。'),
  ingredients: Yup.array()
    .of(
      Yup.object({
        name: Yup.string()
          .required('入力必須の項目です。')
          .max(15, '最大15文字まで入力できます。'),
        amount: Yup.number()
          .required('入力必須の項目です。')
          .min(0.1, '0より大きい数字を入力してください。'),
      }),
    )
    .min(1, '最低1つ以上の項目が必要です。'),
  ways: Yup.array()
    .of(
      Yup.object({
        detail: Yup.string()
          .required('入力必須の項目です。')
          .max(255, '最大255文字まで入力できます。'),
      }),
    )
    .min(1, '最低1つ以上の項目が必要です。'),
  attention: Yup.string().max(256, '最大256文字まで入力できます。'),
});

type FormDataType = Yup.InferType<typeof schema>;

const Recipe = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      ingredients: [
        { name: '', amount: 0 },
        { name: '', amount: 0 },
        { name: '', amount: 0 },
      ],
      ways: [{ detail: '' }],
      attention: '',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const {
    fields: ingreFields,
    append: ingreAppend,
    remove: ingreRemove,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const {
    fields: wayFields,
    append: wayAppend,
    remove: wayRemove,
  } = useFieldArray({
    control,
    name: 'ways',
  });

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    //入力したデータを使って任意の処理を実装する
    console.log(data);

    const formData = new FormData();

    for (const key in data) {
      if (key === 'file') {
        // formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
      console.log(formData);
    }

    const res = await fetch('http://tdegi-dev.lo/form.php', {
      method: 'POST',
      body: formData,
    }).then((res) => console.log(res));
  };

  return (
    <>
      <MainTemplate
        headerElement={<Header />}
        mainElement={
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="レシピタイトル"
              fullWidth
              {...register('title')}
              error={errors.title !== undefined}
              helperText={errors.title?.message}
            />
            <Box mt={4}>
              <Typography variant="h5">材料</Typography>
              {ingreFields && (
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
                    {ingreFields.map((field, index) => (
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        key={field.id}
                      >
                        <TextField
                          margin="none"
                          {...register(`ingredients.${index}.name`)}
                          error={
                            errors.ingredients?.[index]?.name !== undefined
                          }
                        />

                        <TextField
                          type="number"
                          margin="none"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">g</InputAdornment>
                            ),
                            inputProps: {
                              min: 0,
                              max: 10,
                              step: 0.1,
                            },
                          }}
                          sx={{ maxWidth: 100 }}
                          {...register(`ingredients.${index}.amount`)}
                          error={
                            errors.ingredients?.[index]?.amount !== undefined
                          }
                        />
                        <IconButton onClick={() => ingreRemove(index)}>
                          <Delete />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              <Chip
                label="材料を追加"
                icon={<Add />}
                color="primary"
                onClick={() => ingreAppend({ name: '', amount: 0 })}
                sx={{ mt: 2 }}
              />
            </Box>

            <Box mt={4}>
              <Typography variant="h5">作り方</Typography>
              <List>
                {wayFields.map((field, index) => (
                  <ListItem key={index}>
                    <Stack
                      direction="row"
                      width="100%"
                      alignItems="center"
                      gap={3}
                    >
                      <Box width={200}>
                        {/* <Image
                          src="/pasta.jpg"
                          width={200}
                          height={200}
                          alt=""
                        /> */}
                        {/* <MuiFileInput inputProps={{ accept: '.png, .jpeg' }} /> */}
                        <FormLabel>
                          <Button
                            variant="contained"
                            // disabled={props.images.length >= maxImagesUpload}
                            component="span"
                            sx={{ mt: 4 }}
                          >
                            画像アップロード
                          </Button>
                          <input
                            // id={inputId}
                            type="file"
                            multiple
                            accept="image/*,.png,.jpg,.jpeg,.gif"
                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            //   handleOnAddImage(e)
                            // }
                            {...register(`ways.${index}.image`)}
                            style={{ display: 'none' }}
                          />
                        </FormLabel>
                      </Box>
                      <Box flex="1">
                        <TextField
                          fullWidth
                          multiline
                          minRows={3}
                          {...register(`ways.${index}.detail`)}
                          error={errors.ways?.[index]?.detail !== undefined}
                          helperText={errors.ways?.[index]?.detail?.message}
                        />
                      </Box>
                      <IconButton onClick={() => wayRemove(index)}>
                        <Delete />
                      </IconButton>
                    </Stack>
                  </ListItem>
                ))}
              </List>
              <Chip
                label="作り方を追加"
                icon={<Add />}
                color="primary"
                onClick={() => wayAppend({ detail: '' })}
                sx={{ mt: 2 }}
              />
            </Box>

            <Box mt={4}>
              <TextField
                label="コツ・注意点"
                fullWidth
                multiline
                minRows={3}
                {...register('attention')}
                error={errors.attention !== undefined}
                helperText={errors.attention?.message}
              />
            </Box>

            <Box textAlign="center" mt={6}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ maxWidth: 200 }}
              >
                送信
              </Button>
            </Box>
          </Box>
        }
      />
    </>
  );
};

export default Recipe;