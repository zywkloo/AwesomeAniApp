import { API, graphqlOperation } from 'aws-amplify';

const getAnimeCharacters = /* GraphQL */ `
  query GetAnimeCharacters($id: Int) {
    Media(id: $id, type: ANIME) {
      characters {
        edges {
          node {
            id
            name {
              first
              last
            }
          }
          role
          voiceActors(language: JAPANESE) {
            id
            name {
              first
              last
            }
          }
        }
      }
    }
  }
`;

// Fetch characters by anime ID
async function fetchCharacters(animeId) {
  try {
    const characterData = await API.graphql(graphqlOperation(getAnimeCharacters, { id: animeId }));
    console.log(characterData.data.Media.characters.edges);
  } catch (error) {
    console.error('Error fetching characters', error);
  }
}

// Example usage with Fate/Zero's ID
fetchCharacters(12345); // Replace 12345 with the actual anime ID
