export type Recipe = {
  id: number;
  title: string;
  imagePath: string;
  calorie: number;
  ingredients: {
    name: string;
    amount: number;
  }[];
  nutrition: {
    protein: number;
    carbohydrate: number;
    lipid: number;
    vitamin: number;
    mineral: number;
  };
  ways: {
    image: string;
    detail: string;
  }[];
  attention: string;
};
