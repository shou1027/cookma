import { Header } from '@/components/molecules/Header';
import { RadarChartFormItem } from '@/components/molecules/RadarChartFormItem';
import { MainTemplate } from '@/components/templates/MainTemplate';
import { dammyIngredients } from '@/data/dammyIngredients';
import { Ingredient } from '@/types/Ingredient';
import { objToFormData } from '@/utils/objToFormData';
import { yupResolver } from '@hookform/resolvers/yup';
import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import * as Yup from 'yup';
import { ImageSelector } from '../../../components/molecules/ImageSelector';

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
        image: Yup.mixed<FileList>(),

        // .test(
        //   'is-valid-size',
        //   `ファイル合計サイズが1MBを超えています`,
        //   (files: FileList) => {
        //     if (files.length > 0) {
        //       return files[0].size < 1024 * 1024;
        //     }

        //     return true;
        //   },
        // ),
        detail: Yup.string()
          .required('入力必須の項目です。')
          .max(255, '最大255文字まで入力できます。'),
      }),
    )
    .min(1, '最低1つ以上の項目が必要です。'),
  attention: Yup.string().max(256, '最大256文字まで入力できます。'),
});

type FormDataType = Yup.InferType<typeof schema>;

const IngredientsRadarChart = ({ name, control, foundIngredients }) => {
  const ingredients = useWatch({ name, control });

  let ingredientsObj = {};
  ingredients?.forEach((value) => {
    ingredientsObj[value.name] = value;
  });

  return (
    <RadarChart
      height={250}
      width={500}
      data={[
        {
          subject: '炭水化物',
          A: foundIngredients.reduce(
            (prevValue, currValue) =>
              prevValue +
              currValue.carbohydrate *
                Number(
                  currValue.name in ingredientsObj
                    ? ingredientsObj[currValue.name].amount
                    : 0,
                ) *
                0.01,
            0,
          ),
          fullMark: 100,
        },
        {
          subject: 'タンパク質',
          A: foundIngredients.reduce(
            (prevValue, currValue) =>
              prevValue +
              currValue.protein *
                Number(
                  currValue.name in ingredientsObj
                    ? ingredientsObj[currValue.name].amount
                    : 0,
                ) *
                0.01,
            0,
          ),
          fullMark: 100,
        },
        {
          subject: '脂質',
          A: foundIngredients.reduce(
            (prevValue, currValue) =>
              prevValue +
              currValue.lipid *
                Number(
                  currValue.name in ingredientsObj
                    ? ingredientsObj[currValue.name].amount
                    : 0,
                ) *
                0.01,
            0,
          ),
          fullMark: 100,
        },
        {
          subject: 'ビタミン',
          A: foundIngredients.reduce(
            (prevValue, currValue) =>
              prevValue +
              currValue.vitamin *
                Number(
                  currValue.name in ingredientsObj
                    ? ingredientsObj[currValue.name].amount
                    : 0,
                ) *
                0.01,
            0,
          ),
          fullMark: 100,
        },
        {
          subject: 'ミネラル',
          A: foundIngredients.reduce(
            (prevValue, currValue) =>
              prevValue +
              currValue.mineral *
                Number(
                  currValue.name in ingredientsObj
                    ? ingredientsObj[currValue.name].amount
                    : 0,
                ) *
                0.01,
            0,
          ),
          fullMark: 100,
        },
      ]}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      {/* <PolarRadiusAxis angle={30} domain={[0, 100]} /> */}
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.5}
      />
    </RadarChart>
  );
};

const MainElement = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    watch,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      title: 'aaaaa',
      ingredients: [
        { name: 'bbbbb', amount: 2 },
        // { name: '', amount: 0 },
        // { name: '', amount: 0 },
      ],
      ways: [{ detail: 'ccccc' }],
      attention: 'ddddd',
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

  const [textImages, setTextImages] = useState<string[]>([]);

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    //入力したデータを使って任意の処理を実装する

    const formData = objToFormData(data);

    const res = await fetch('http://api.localhost/form.php', {
      method: 'POST',
      body: formData,
    });

    // console.log(await res.json());
    console.log(await res.text());
  };

  const [foundIngredients, setFoundIngredients] = useState<Ingredient[]>([]);

  const handleIngredientNameBlur = () => {
    const ingredientNames = getValues('ingredients')?.map((value, index) => {
      return value.name;
    });

    setFoundIngredients(
      dammyIngredients.filter((value, index) => {
        return ingredientNames?.includes(value.name);
      }),
    );
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="レシピタイトル"
        fullWidth
        {...register('title')}
        error={errors.title !== undefined}
        helperText={errors.title?.message}
      />
      <Box mt={4}>
        <Typography variant="h5">材料</Typography>
        <RadarChartFormItem
          refData={dammyIngredients.map((value) => ({
            name: value.name,
            data: [
              value.protein,
              value.carbohydrate,
              value.lipid,
              value.vitamin,
              value.mineral,
            ],
          }))}
          register={register}
          control={control}
          errors={errors}
          getValues={getValues}
        />
      </Box>

      <Box mt={4}>
        <Typography variant="h5">作り方</Typography>
        <List>
          {wayFields.map((field, index) => (
            <ListItem key={index}>
              <Stack direction="row" width="100%" alignItems="center" gap={3}>
                <Box width={200}>
                  <ImageSelector
                    register={register(`ways.${index}.image`)}
                    setValue={setValue}
                  />
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
  );
};

const Recipe = () => {
  return (
    <>
      <MainTemplate headerElement={<Header />} mainElement={<MainElement />} />
    </>
  );
};

export default Recipe;
