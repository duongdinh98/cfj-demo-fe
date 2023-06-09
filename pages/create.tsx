import React, { useState } from "react"
import Layout from "../components/Layout"
import Router from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

const CreateDraftMutation = gql`
  mutation addRecipe(
    $title: String!
    $description: String
    $ingredients: [String!]!
  ) {
    addRecipe(
      newRecipeData: {
        title: $title
        description: $description
        ingredients: $ingredients
      }
    ) {
      id
      description
      creationDate
      ingredients
      title
    }
  }
`

function Draft() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState("")
  console.log(
    "🚀DD10 ~ file: create.tsx:33 ~ Draft ~ ingredients:",
    ingredients
  )

  const [createDraft] = useMutation(CreateDraftMutation)

  return (
    <Layout>
      <div>
        <form
          onSubmit={async e => {
            e.preventDefault()

            await createDraft({
              variables: {
                title,
                ingredients: ingredients.split(","),
                description,
              },
            })
            Router.push("/")
          }}
        >
          <h1>Create Recipe</h1>
          <input
            autoFocus
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            type="text"
            value={description}
          />
          <textarea
            cols={50}
            onChange={e => setIngredients(e.target.value)}
            placeholder="Ingredient"
            rows={8}
            value={ingredients}
          />
          <input
            disabled={!ingredients || !title || !description}
            type="submit"
            value="Create"
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Draft
