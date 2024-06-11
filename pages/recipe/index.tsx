import { Header } from '@/components/organism/Header';
import { MainTemplate } from '@/components/templates/MainTemplate';
import { dammyRecipes } from '@/data/dammyRecipes';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';

const Recipe = () => {
  return (
    <MainTemplate
      headerElement={<Header />}
      mainElement={
        <Grid container spacing={2} component="ul">
          {dammyRecipes.map((dammyRecipe) => (
            <Grid item xs={4} component="li" key={dammyRecipe.id}>
              <Image
                src={dammyRecipe.imagePath}
                alt=""
                width={1000}
                height={1000}
              />
              <Typography variant="body1">{dammyRecipe.calorie}</Typography>
            </Grid>
          ))}
        </Grid>
      }
    />
  );
};

export default Recipe;
