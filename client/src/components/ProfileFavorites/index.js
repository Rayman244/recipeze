//Favorites
import React, { useState, useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import { getMe, deleteRecipe } from '../utils/API';
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';

const SavedRecipes = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the Recipe's mongo _id value as param and deletes the book from the database
  const handleDeleteRecipe = async (recipeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteRecipe(recipeId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove Recipe's id from localStorage
      removeRecipeId(recipeId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }


function favoritesCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className="d-block w-100" src={image} alt="First slide" />
        <Carousel.Caption>
          <h3>{label}</h3>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
              View Recipe
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image} alt="Second slide" />
        <Carousel.Caption>
          <h3>{label}</h3>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
              View Recipe
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image} alt="Third slide" />
        <Carousel.Caption>
          <h3>{label}</h3>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
              View Recipe
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default favoritesCarousel;
