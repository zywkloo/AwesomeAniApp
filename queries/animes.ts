export const testData = {
    "data": {
      "Page": {
        "pageInfo": {
          "total": 5000,
          "currentPage": 1,
          "lastPage": 1666,
          "hasNextPage": true,
          "perPage": 3
        },
        "media": [
          {
            "id": 55191,
            "title": {
              "romaji": "Fate/Zero"
            }
          },
          {
            "id": 10087,
            "title": {
              "romaji": "Fate/Zero"
            }
          },
          {
            "id": 33649,
            "title": {
              "romaji": "Fate/Zero"
            }
          }
        ]
      }
    }
  }
  
const getAnimeDetails = /* GraphQL */ `
  query GetAnimeDetails($id: Int, $page: Int, $perPage: Int, $search: String, $sortCharacter: [CharacterSort], $sortStaff: [StaffSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search) {
        id
        title {
          romaji
          english
          native
        }
        description
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        season
        episodes
        duration
        countryOfOrigin
        genres
        averageScore
        meanScore
        popularity
        trending
        tags {
          id
          name
          description
          category
        }
        relations {
          edges {
            node {
              id
              title {
                romaji
                english
              }
              type
            }
          }
        }
        characters(sort: $sortCharacter) {
          edges {
            node {
              id
              name {
                full
                native
              }
              image {
                large
                medium
              }
            }
            role
          }
        }
        staff(sort: $sortStaff) {
          edges {
            node {
              id
              name {
                full
                native
              }
              image {
                large
                medium
              }
            }
          }
        }
        studios {
          edges {
            node {
              id
              name
              isAnimationStudio
            }
          }
        }
        externalLinks {
          id
          url
          site
        }
        streamingEpisodes {
          title
          thumbnail
          url
          site
        }
      }
    }
  }
`;
// Define the URL of the GraphQL endpoint
const url = 'https://graphql.anilist.co';

// Function to fetch anime details using vanilla fetch
export async function fetchDetails({ id, page = 1, perPage = 10, search = "", sortCharacter = ["RELEVANCE"], sortStaff = ["RELEVANCE"] }) {
    const variables = { id, page, perPage, search, sortCharacter, sortStaff };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: getAnimeDetails, // Ensure getAnimeDetails is correctly defined as a string.
        variables: variables,
      }),
    };
  
    try {
      const response = await fetch(url, options);
      const detailsData = await response.json();
      console.log("Animes query: \n" + JSON.stringify(detailsData.data.Page.media[0]));
      return detailsData;
    } catch (error) {
      console.error('Error fetching anime details', error);
      throw error; 
    }
  }
  