import Layout from "../../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import client from "../../../lib/apollo-client"
import { RecipeProps } from "../../../components/Recipe"
import { GetServerSideProps } from "next"
import React, { useState } from "react"

const UpdateMutation = gql`
  mutation updateRecipe(
    $id: ID!
    $title: String!
    $description: String
    $ingredients: [String!]!
  ) {
    updateRecipe(
      updateRecipeData: {
        id: $id
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

const Post: React.FC<{ data: { recipe: RecipeProps } }> = props => {
  const id = useRouter().query.id
  const [updateRecipe] = useMutation(UpdateMutation)
  const {
    title: titleData,
    description: descriptionData,
    ingredients: ingredientsData,
  } = props.data.recipe

  const [title, setTitle] = useState(titleData)
  const [description, setDescription] = useState(descriptionData)
  const [ingredients, setIngredients] = useState(ingredientsData.join(", "))

  return (
    <Layout>
      <div>
        <form
          onSubmit={async e => {
            e.preventDefault()

            await updateRecipe({
              variables: {
                id,
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
            value="Update"
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

export const getServerSideProps: GetServerSideProps = async context => {
  const id = Array.isArray(context.params?.id)
    ? context.params?.id[0]
    : context.params?.id

  const { data } = await client.query({
    query: gql`
      query recipe($id: String!) {
        recipe(id: $id) {
          id
          description
          creationDate
          ingredients
          title
        }
      }
    `,

    variables: { id },
  })

  return {
    props: {
      data,
    },
  }
}

export default Post
