
var query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        romaji
      }
    }
  }
}
`;

var variables = {
    search: "Fate/Zero",
    page: 1,
    perPage: 10
};

export const url = 'https://graphql.anilist.co'
export const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };
   // Example Schema:
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