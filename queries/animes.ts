// import { API, graphqlOperation } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';

export const testData = 
    {
    "data":{
        "Page":{
            "pageInfo":{
                "total":5000,
                "currentPage":1,
                "lastPage":1666,
                "hasNextPage":true,
                "perPage":3
            },
            "media":[
                {
                "id":55191,
                "title":{
                    "romaji":"Fate/Zero"
                }
                },
                {
                "id":10087,
                "title":{
                    "romaji":"Fate/Zero"
                }
                },
                {
                "id":33649,
                "title":{
                    "romaji":"Fate/Zero"
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
        officialSiteUrl
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
              role
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

const client = generateClient();

// Export the query function
export async function fetchDetails({ id, page = 1, perPage = 10, search = "", sortCharacter = ["RELEVANCE"], sortStaff = ["RELEVANCE"] }: { id?: number; page?: number; perPage?: number; search?: string; sortCharacter?: [string]; sortStaff?: [string]; }) {
    try {
      const variables: any = { page, perPage, search, sortCharacter, sortStaff };
      if (id !== undefined) {
        variables.id = id;
      }
      const detailsData = await client.graphql({
            query: getAnimeDetails,
            variables: variables
          });
      console.log("Animes query: \n" + JSON.stringify(detailsData));
    } catch (error) {
      console.error('Error fetching anime details', error);
    }
  }
