import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:5360/v1/api/graphql",
  cache: new InMemoryCache(),
})

export default client
