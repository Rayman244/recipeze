const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedRecipes: [Recipe]
  }
  type Recipe {
    label: String!
    image: String
    recipeId: String!
    # source:String
    url: String
    # yield:Int
    # dietLabels:[String]
    # healthLabel:[String]
    # cautions:[String]
    # ingredients:[Ingredient]
    # calories:Int
    # cuisineType:[String]
    # mealType:[String]
    # dishType:[String]
    # days:[String]
  }
  # type Ingredient{
  #   text:String!
  #   quantity:Int,
  #   measure:String
  #   weight:Int
  # }

  type Auth {
    token: ID!
    user: User
  }
    input RecipeInput{
    label: String!
    image: String
    recipeId: String!
    # source:String
    url: String
    # yield:Int
    # dietLabels:[String]
    # healthLabel:[String]
    # cautions:[String]
    # ingredients:[Ingredient]
    # calories:Int
    # cuisineType:[String]
    # mealType:[String]
    # dishType:[String]
    # days:[String]
  }

  # input IngredientInput{
  #   text:String!
  #   quantity:Int,
  #   measure:String
  #   weight:Int
# 
  # }
  type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveRecipe(recipe: RecipeInput!):User
    removeRecipe(recipeId: String): User
  }

`;

module.exports = typeDefs;
