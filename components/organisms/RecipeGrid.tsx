import { Recipe } from '@/types/Recipe';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Link } from '../atoms/Link';
import { LiquidText } from '../molecules/LiquidText';
import { OpacityLink } from '../molecules/OpacityLink';

type Props = {
  recipes: Recipe[];
};

export const RecipeGrid = ({ recipes }: Props) => {
  return (
    <Grid container columnSpacing={3} rowSpacing={5} component="ul">
      {recipes.map((recipe) => (
        <Grid item xs={4} component="li" key={recipe.id}>
          <OpacityLink href={`/recipes/${recipe.id}`}>
            <Image src={recipe.imagePath} alt="" width={500} height={500} />
          </OpacityLink>
          <Typography variant="subtitle1" mt={0.5}>
            <Link
              href={`/recipes/${recipe.id}`}
              underline="hover"
              display="block"
            >
              {recipe.title}
            </Link>
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="body1">{recipe.calorie}kcal</Typography>
            </Box>
            <Box>
              <LiquidText
                variableText="炭水化物:"
                fixText={`${recipe.carbohydrate}g`}
                textWidth="3em"
                direction="right"
              />
              <LiquidText
                variableText="タンパク質:"
                fixText={`${recipe.protein}g`}
                textWidth="3em"
                direction="right"
              />
              <LiquidText
                variableText="脂質:"
                fixText={`${recipe.lipid}g`}
                textWidth="3em"
                direction="right"
              />
            </Box>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};
