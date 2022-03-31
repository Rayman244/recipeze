//Recipe Cards
import { Card, Button } from 'react-bootstrap';
import './styles.css'
export default function savedRecipeCard({ recipeId, recipeName, recipeLink, photoLink, handleDelete }) {
  return (
    <>
   
    <div className="mt-3 col d-flex justify-content-center text-center">
    <Card data-recipeid={recipeId} style={{width: '32rem'}} className="shadow card-body-custom border-dark border-2">
      <Card.Img src={photoLink} alt={`${recipeName} photo`} />
      <Card.Title className="card-title">{recipeName}</Card.Title>
      <Card.Body>
        <Button onClick={() => { handleDelete(recipeId) }} className="flat" size="xxl">Delete</Button>
        <Button href={recipeLink} target='_blank' className="flat" size="xxl"> Link</Button>
      </Card.Body>
    </Card>
    </div>
    </>
  )
}
