import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API,
  cache: new InMemoryCache(),
});

export const GET_CHARACTERS = gql`
  query Characters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: {status: $status, species: $species}) {
      results {
        name
        species
        status
        gender
        origin {
          name
        }
      }
      info {
        next
        prev
      }
    }
  }
`;



export default client;