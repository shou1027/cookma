import { Header } from '@/components/molecules/Header';
import { RecipeGrid } from '@/components/organisms/RecipeGrid';
import { MainTemplate } from '@/components/templates/MainTemplate';
import { dammyRecipes } from '@/data/dammyRecipes';
import { useRouter } from 'next/router';

const Recipe = () => {
  const router = useRouter();

  return (
    <>
      <MainTemplate
        headerElement={<Header />}
        mainElement={
          <RecipeGrid
            recipes={dammyRecipes.filter(
              ({ id }) => id == Number(router.query.id),
            )}
          />
        }
      />
    </>
  );
};

export default Recipe;
