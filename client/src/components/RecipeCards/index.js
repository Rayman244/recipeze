//Recipe Cards
import { Card, Button } from "react-bootstrap";
import "./styles.css";
export default function recipeCard({ recipe, loggedIn, handleSave }) {
  const { recipeId, label, url, image } = recipe;

  return (
    <Card
      key={recipeId}
      data-recipeid={recipeId}
      className="recipeCard shadow card-body-custom border-dark border-2 m-2"
    >
      <Card.Img varient="top" src={image} alt={`${label} photo`} />
      <Card.Title className="card-title">{label}</Card.Title>
      <Card.Body>
        <p>{recipe.cuisineType[0]}</p>
        <p>{recipe.dietLabels[0]}</p>
        
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
