import Layout from "../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import client from "../../lib/apollo-client"
import { RecipeProps } from "../../components/Recipe"
import { GetServerSideProps } from "next"

const DeleteMutation = gql`
  mutation removeRecipe($id: String!) {
    removeRecipe(id: $id)
  }
`

const Post: React.FC<{ data: { recipe: RecipeProps } }> = props => {
  const id = useRouter().query.id
  const [deletePost] = useMutation(DeleteMutation)
  const description = props.data.recipe.description

  return (
    <Layout>
      <div>
        <h2>{props.data.recipe.title}</h2>
        <p>Description: {description}</p>
        <p>{`Ingredients: ${props.data.recipe.ingredients.join(", ")}`}</p>
        <button
          onClick={async e => {
            Router.push("/recipe/update/[id]", `/recipe/update/${id}`)
          }}
        >
          Update
        </button>
        <button
          onClick={async e => {
            await deletePost({
              variables: {
                id,
              },
            })
            Router.push("/")
          }}
        >
          Delete
        </button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
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
