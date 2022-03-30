//Recipe Cards
import { Card, Button } from "react-bootstrap";
import "./styles.css";
export default function recipeCard({ recipe, loggedIn, handleSave }) {
  const { recipeId, label, url, image,dietLabels,mealType,ingredients } = recipe;
  const qt = recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)
  // const upper= () =>{
  //   cosnt 
  // }
  return (
    <Card
      key={recipeId}
      data-recipeid={recipeId}
      className="recipeCard shadow card-body-custom border-dark border-2 m-2"
    >
      {console.log(recipe)}
      <Card.Img varient="top" src={image} alt={`${label} photo`} />
      <Card.Title className="card-title">{label}</Card.Title>
      <Card.Body>
        <div className="d-flex flex-wrap justify-content-around">
        <p>{qt}</p>
        {/* {recipe.dietLabels.length > 0 ? recipe.dietLabels.forEach(label => {
          <p>{label}</p>
        }): <p></p>} */}
        <p className={recipe.dietLabels.length > 0 ? "flat" :"d-none" }>{dietLabels.join(', ')}</p>
        <p>{mealType}</p>
        <p>{console.log(ingredients)}</p>
        </div>
        <Button
          onClick={() => {
            handleSave(recipe);
          }}
          className={!loggedIn ? "d-none" : "flat"}
          size="xxl"
        >
          Save
        </Button>
        <Button href={url} target="_blank" className="flat" size="xxl">
          Link
        </Button></Card.Body>
      <Card.Footer className="mt-2 card-footer">
      </Card.Footer>
    </Card>
  );
}
