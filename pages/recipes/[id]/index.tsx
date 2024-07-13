import { Header } from '@/components/molecules/Header';
import { ImageSelector } from '@/components/molecules/ImageSelector';
import { RadarChartFormItem } from '@/components/molecules/RadarChartFormItem';
import { MainTemplate } from '@/components/templates/MainTemplate';
import { dammyIngredients } from '@/data/dammyIngredients';
import { dammyRecipes } from '@/data/dammyRecipes';
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
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

type RecipeDetail = {
  title: string;
  ingredients: {
    name: string;
    amount: number;
  }[];
  ways: {
    image: string;
    detail: string;
  }[];
  attention: string;
};

const MainElement = () => {
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
          initRefData={dammyIngredients.map((value) => ({
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
          name={{ parentName: 'ingredients', childNames: ['name', 'amount'] }}
          labels={['材料・調味料', '分量']}
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
  const recipe = dammyRecipes[0];

  return (
    <>
      <MainTemplate
        headerElement={<Header />}
        mainElement={
          <>
            <Typography variant="h4">{recipe.title}</Typography>
            <Box mt={4}>
              <Typography variant="h5">材料</Typography>
              <Stack direction="row">
                <Box flex={1}>
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

                      {recipe.ingredients.map((ingredient, index) => (
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          key={ingredient.name}
                        >
                          <Typography
                            variant="body1"
                            width="100%"
                            maxWidth={223}
                          >
                            {ingredient.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            width="100%"
                            maxWidth={100}
                          >
                            {ingredient.amount}g
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Box>
                <RadarChart
                  height={250}
                  width={500}
                  data={[
                    {
                      subject: '炭水化物',
                      A: recipe.nutrition.carbohydrate,
                      fullMark: 100,
                    },
                    {
                      subject: 'タンパク質',
                      A: recipe.nutrition.protein,
                      fullMark: 100,
                    },
                    {
                      subject: '脂質',
                      A: recipe.nutrition.lipid,
                      fullMark: 100,
                    },
                    {
                      subject: 'ビタミン',
                      A: recipe.nutrition.vitamin,
                      fullMark: 100,
                    },
                    {
                      subject: 'ミネラル',
                      A: recipe.nutrition.mineral,
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
              </Stack>
            </Box>

            <Box mt={4}>
              <Typography variant="h5">作り方</Typography>
              <List>
                {recipe.ways.map((way, index) => (
                  <ListItem key={index}>
                    <Stack
                      direction="row"
                      width="100%"
                      alignItems="center"
                      gap={3}
                    >
                      <Box width={200}>
                        <img src={way.image} />
                      </Box>
                      <Box flex="1">
                        <Typography variant="body1">{way.detail}</Typography>
                      </Box>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box mt={4}>
              <Typography variant="h5">コツ・注意点</Typography>
              <Typography variant="body1" mt={2}>
                {recipe.attention}
              </Typography>
            </Box>
          </>
        }
      />
    </>
  );
};

export default Recipe;
