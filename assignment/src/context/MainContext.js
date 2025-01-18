import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API,
  cache: new InMemoryCache(),
});

export const GET_CHARACTERS = gql`
  query Characters {
    characters {
      results {
        name
        species
        status
        gender
        origin {
          name
        }
      }
    }
  }
`;

export default client;