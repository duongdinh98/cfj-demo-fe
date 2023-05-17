import React from "react"
import Router from "next/router"
import ReactMarkdown from "react-markdown"

export type RecipeProps = {
  id: string
  description: string
  creationDate: Date
  ingredients: [string]
  title: string
}

const Recipe: React.FC<{ recipe: RecipeProps }> = ({ recipe }) => {
  return (
    <div onClick={() => Router.push("/recipe/[id]", `/recipe/${recipe.id}`)}>
      <h2 className="text-3xl font-bold">Title: {recipe.title}</h2>
      <small>Description: {recipe.description}</small>
      <ReactMarkdown
        children={`Ingredients: ${recipe.ingredients.join(", ")}`}
      />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Recipe
