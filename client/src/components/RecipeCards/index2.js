//Recipe Cards
import { Card, Button } from 'react-bootstrap';
import './styles.css'
export default function savedRecipeCard({ recipe, handleDelete }) {
  const {recipeId,label, url, image,dietLabels,mealType,} = recipe
  console.log(recipe)
  const qt = recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)
  // let cuisine = 
  console.log(qt)

  return (
    <>
   
    <div className="mt-3 col d-flex justify-content-center text-center">
    <Card data-recipeid={recipeId} className="recipeCard shadow card-body-custom border-dark border-2">
      <Card.Img src={image} alt={`${label} photo`} />
      <Card.Title className="card-title">{label}</Card.Title>
      <Card.Body >
        <div className='d-flex justify-content-around'>
           <p>{qt}</p>
        <p>{dietLabels}</p>
        <p>{mealType}</p>
        <p>Yield: {recipe.yield}</p>
        </div>
     


         <Button onClick={() => { handleDelete(recipeId) }} className="flat" size="xxl">Delete</Button>
        <Button href={url} target='_blank' className="flat" size="xxl"> Link</Button>
      </Card.Body>
     
    </Card>
    </div>
    </>
  )
}
