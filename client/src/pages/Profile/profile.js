import React from "react";
// import ProfileFavorites from "../components/ProfileFavorites";
// import ProfileWeek from "../components/ProfileWeek";
import Auth from "../../utils/auth";
import { useQuery } from '@apollo/client';
import { removeRecipeId } from '../../utils/localStorage';
import SavedRecipeCards from "../../components/RecipeCards/index2";
import { REMOVE_RECIPE } from '../../utils/mutations';
import{GET_ME} from '../../utils/queries'
import { useMutation } from '@apollo/client';
import './styles.css'
const SavedRecipes = () => {
  const {loading,data} = useQuery(GET_ME);
  const [removeRecipe] = useMutation(REMOVE_RECIPE);
console.log(data);
  const userData = data?.me || [];
  const handleDeleteRecipe = async (recipeId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removeRecipe({
        variables: { recipeId }

      });

      if(!data){
        throw new Error('something went wrong!');
      }
      // upon success, remove recipe's id from localStorage
      removeRecipeId(recipeId);
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
  
  <div>
        <h2 className="text-center">
          {userData.savedRecipes?.length
            ? `You have ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
        <div className="d-flex flex-wrap">
          {userData.savedRecipes?.map((recipe) => {
            return (
              <SavedRecipeCards
                key={recipe.recipeId}
                handleDelete={handleDeleteRecipe}
                recipe={recipe}
              />
            );
          })}
        </div>
     
      {/* <ProfileFavorites onDeleteRecipe={handleDeleteRecipe} />
      <ProfileWeek /> */}
    </div>
    </>
    
  );
};

export default SavedRecipes;
