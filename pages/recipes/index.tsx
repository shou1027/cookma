import { Header } from '@/components/organism/Header';
import { GridRecipes } from '@/components/organisms/GridRecipes';
import { MainTemplate } from '@/components/templates/MainTemplate';
import { dammyRecipes } from '@/data/dammyRecipes';

const Recipe = () => {
  return (
    <>
      <MainTemplate
        headerElement={<Header />}
        mainElement={<GridRecipes recipes={dammyRecipes} />}
      />
    </>
  );
};

export default Recipe;
