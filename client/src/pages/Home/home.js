import React, { useState} from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import RecipeCards from "../../components/RecipeCards";
import Auth from "../../utils/auth";
import { searchRecipes } from "../../utils/api";
// import { saveRecipeIds, getSavedRecipeIds } from "../../utils/localStorage";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from '@apollo/client';
import './styles.css'

import { SAVE_RECIPE } from "../../utils/mutations";
const SearchRecipes = () => {
  const [addSavedRecipe] = useMutation(SAVE_RECIPE);
  // create state for holding returned google api data
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create method to search for Recipes and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchRecipes(searchInput);
      const data = response.hits;

      const recipeData = data.map(({ recipe }) => ({
        recipeId: uuidv4(),
        label: recipe.label,
        url: recipe.url,
        image: recipe.image,
        yield:recipe.yield,
        dietLabels:recipe.dietLabels,
        healthLabels:recipe.healthLabels,
        cautions:recipe.cautions,
        ingredients:recipe.ingredients,
        // calories:recipe.calories,
        cuisineType:recipe.cuisineType,
        mealType:recipe.mealType,
        dishType:recipe.dishType,

      }));

      setSearchedRecipes(recipeData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a recipe to our database
  const handleSaveRecipe = async (recipe) => {
    const recipeToSave = {
      recipeId:recipe.recipeId,
      label: recipe.label,
      url: recipe.url,
      image: recipe.image,
      yield:recipe.yield,
      dietLabels:recipe.dietLabels,
      healthLabels:recipe.healthLabels,
      cautions:recipe.cautions,
      ingredients:recipe.ingredients,
      calories:recipe.calories,
      cuisineType:recipe.cuisineType,
      mealType:recipe.mealType,
      dishType:recipe.dishType,
    }
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await addSavedRecipe({
        variables: {
          recipe:recipeToSave
        }
      });

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      // if recipe successfully saves to user's account, save recipe id to state
      // setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)))
    }
  };

  return (
    <div>
    <>      
      <div className="col d-flex justify-content-center text-center custom-border">
      <Form className="d-flex justify-content-center w-75 mb-1" onSubmit={handleFormSubmit}>
        <FormControl
          type="search"
          name="queryField"
          placeholder="Recipe Search..."
          className="me-2"
          aria-label="Search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="flat" size="xxl" type="submit">
          Go!
        </Button>
      </Form>
      </div>
      <div className="mt-3 d-flex flex-wrap justify-content-around">
      {searchedRecipes.map(data => {
        // console.log({data})
        return (
         
  <RecipeCards
          key={data.recipeId}
          recipe={data}
          loggedIn={Auth.loggedIn()}
          handleSave={handleSaveRecipe}
        />
        
      )
})}
      </div>
      
      </>
    </div>
    
      
  );
};

export default SearchRecipes;
