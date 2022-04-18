//Recipe Cards
import { Card, Button,Popover,OverlayTrigger } from "react-bootstrap";
import "./styles.css";
export default function recipeCard({
  loggedIn,handleSave,recipe
}) {
  const{ recipeId,
    label,
    url,
    image,cuisineType,mealType,dishType, ingredients} = recipe
    let types = []
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header className='text-center' as="h3">Ingredients</Popover.Header>
        <Popover.Body><ul>
          {ingredients.map((ing)=><li>{ing.text}</li>)}</ul>
        </Popover.Body>
      </Popover>
    );
    
    const IngPopOver = () => (
      <OverlayTrigger placement="top" overlay={popover}>
        <p size="xxl">Ingredients</p>
      </OverlayTrigger>
    );



  return (
    <>
      <div className="mt-3 col d-flex justify-content-center text-center">
        <Card
          key={recipeId}
          data-recipeid={recipeId}
          className="recipeCard shadow card-body-custom border-dark border-2"
        >
          <Card.Img varient="top" src={image} alt={`${label} photo`} />
          <Card.Title className="card-title">{label}</Card.Title>
          <Card.Body>
            <div className="d-flex flex-wrap justify-content-around">
              {cuisineType?.map((type)=>{
              const ct = type.split(' ')
              const uct = ct.map((type2)=>type2.charAt(0).toUpperCase()+ type2.slice(1))
              return(<p><strong>Cuisine:</strong> {uct.join(' ')}</p>)})} 
              <p> <strong>Meal:</strong> {mealType}</p>
              <p><strong>Dish:</strong> {dishType?.map((type)=>{
                // console.log(type);
              const ct = type.split(' ')
              // console.log(ct);
              const uct = ct.map((type2)=>type2.charAt(0).toUpperCase()+ type2.slice(1))
              // console.log(uct);
              const p2 = uct.join(' ')
              types.push(p2)
              // console.log({types});
              return types.join("/")
             })} </p>
              <p><strong>Yield:</strong> {recipe.yield}</p>
            </div>
            <IngPopOver/>
            <Button
              onClick={() => {
                handleSave(recipe);
              }}
              className={!loggedIn ? "d-none" : "flat"}
              size="xxl"
            >
              Save
            </Button>
            <Button
              href={url}
              target="_blank"
              className="flat"
              size="xxl"
            >
              Link
            </Button>
          </Card.Body>
          <Card.Footer className="mt-2 card-footer"></Card.Footer>
        </Card>
      </div>
    </>
  );
}
