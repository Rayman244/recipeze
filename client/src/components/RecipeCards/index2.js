//Recipe Cards
import { Card, Button } from "react-bootstrap";
import "./styles.css";
export default function savedRecipeCard({handleDelete,recipe}) {
  const {
    recipeId,
    label,
    url,
    image,
  } = recipe
console.log(recipe)
  return (
    <>
      <div className="mt-3 col d-flex justify-content-center text-center">
        <Card
          data-recipeid={recipeId}
          className="recipeCard shadow card-body-custom border-dark border-2"
        >
          <Card.Img src={image} alt={`${label} photo`} />
          <Card.Title className="card-title">{label}</Card.Title>
          <Card.Body>
            <Button
              onClick={() => {
                handleDelete(recipeId);
              }}
              className="flat"
              size="xxl"
            >
              Delete
            </Button>
            <Button
              href={url}
              target="_blank"
              className="flat"
              size="xxl"
            >
              {" "}
              Link
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
