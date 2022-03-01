import React from "react";
// import ProfileFavorites from "../components/ProfileFavorites";
// import ProfileWeek from "../components/ProfileWeek";
import Auth from "../utils/auth";
import { useQuery } from '@apollo/client';
import { Container } from 'react-bootstrap';
import { removeRecipeId } from '../utils/localStorage';
import SavedRecipeCards from "../components/RecipeCards/index2";
import { REMOVE_RECIPE } from '../utils/mutations';
import{GET_ME} from '../utils/queries'
import { useMutation } from '@apollo/client';

const SavedRecipes = () => {
  const {loading,data} = useQuery(GET_ME);
  // console.log(data);
  const [removeRecipe] = useMutation(REMOVE_RECIPE);

  const userData = data?.me || [];
// console.log(userData);
  const handleDeleteRecipe = async (recipeId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
console.log(recipeId);
    try {
      const {data} = await removeRecipe({
        variables: { recipeId }

      });
      console.log({data});
      if(!data){
        throw new Error('something went wrong!');
      }
      // upon success, remove recipe's id from localStorage
      removeRecipeId(recipeId);
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
    // window.location.reload()
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div>
      <Container>
        <h2>
          {userData.savedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
        <div>
          {userData.savedRecipes.map((recipe) => {
            return (
              <SavedRecipeCards
                key={recipe.recipeId}
                recipeId={recipe.recipeId}
                recipeName={recipe.label}
                recipeLink={recipe.url}
                photoLink={recipe.image}
                handleDelete={handleDeleteRecipe}
              />
            );
          })}
        </div>
      </Container>
      {/* <ProfileFavorites onDeleteRecipe={handleDeleteRecipe} />
      <ProfileWeek /> */}
    </div>
  );
};

export default SavedRecipes;
