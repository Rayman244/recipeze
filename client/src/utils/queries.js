import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedRecipes {
        label
        image
        recipeId
        # source
        url
        # yield
        # dietLabels
        # healthLabel
        # cautions
        # calories
        # cuisineType
        # mealType
        # dishType
        # days
        # ingredients{
        #   text
        #   quantity
        #  measure
        #  weight
        # }
      }
    }
  }
`;
