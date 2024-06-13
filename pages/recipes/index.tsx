import { Header } from '@/components/molecules/Header';
import { RecipeGrid } from '@/components/organisms/RecipeGrid';
import { MainTemplate } from '@/components/templates/MainTemplate';
import { dammyRecipes } from '@/data/dammyRecipes';

const Recipes = () => {
  return (
    <>
      <MainTemplate
        headerElement={<Header />}
        mainElement={<RecipeGrid recipes={dammyRecipes} />}
      />
    </>
  );
};

export default Recipes;
