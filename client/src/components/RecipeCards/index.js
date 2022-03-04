//Recipe Cards
import { Card, Button } from 'react-bootstrap';
import './styles.css'
export default function recipeCard({ recipeId, recipeName, recipeLink, photoLink, loggedIn, handleSave }) {

  return (
    <>
  
<div className="mt-3 col d-flex justify-content-center text-center">
    <Card key={recipeId} data-recipeid={recipeId} style={{width: '32rem'}} className="shadow card-body-custom border-dark border-2">
      <Card.Img varient="top" src={photoLink} alt={`${recipeName} photo`} />
      <Card.Title className="card-title">{recipeName}</Card.Title>
      <Card.Body>
        <Button
          onClick={() => { handleSave(recipeId, recipeName, photoLink, recipeLink) }}
          className={(!loggedIn) ? 'd-none' : 'flat' } size="xxl">Save</Button>
        <Button href={recipeLink} target='_blank' className="flat" size="xxl" >Link</Button>
      </Card.Body>
      <Card.Footer className="mt-2 card-footer"></Card.Footer>
    </Card>
    </div>

    </>
    
  )
}
