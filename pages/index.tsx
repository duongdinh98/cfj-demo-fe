import Layout from "../components/Layout"
import gql from "graphql-tag"
import client from "../lib/apollo-client"
import Recipe, { RecipeProps } from "../components/Recipe"

const Blog: React.FC<{ data: { recipes: RecipeProps[] } }> = props => {
  return (
    <Layout>
      <div className="page">
        <h1>My Recipe</h1>
        <main>
          {props.data.recipes.map(recipe => (
            <div key={recipe.id} className="post">
              <Recipe recipe={recipe} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        recipes(skip: 0, take: 20) {
          id
          description
          creationDate
          ingredients
          title
        }
      }
    `,
  })

  return {
    props: {
      data,
      revalidate: 0,
    },
  }
}

export default Blog
