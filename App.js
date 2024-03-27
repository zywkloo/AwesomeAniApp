import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react'; // Import useState from react

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
    perPage: 3
};

var url = 'https://graphql.anilist.co',
    options = {
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
    //   {
    //     "data":{
    //        "Page":{
    //           "pageInfo":{
    //              "total":5000,
    //              "currentPage":1,
    //              "lastPage":1666,
    //              "hasNextPage":true,
    //              "perPage":3
    //           },
    //           "media":[
    //              {
    //                 "id":55191,
    //                 "title":{
    //                    "romaji":"Fate/Zero"
    //                 }
    //              },
    //              {
    //                 "id":10087,
    //                 "title":{
    //                    "romaji":"Fate/Zero"
    //                 }
    //              },
    //              {
    //                 "id":33649,
    //                 "title":{
    //                    "romaji":"Fate/Zero"
    //                 }
    //              }
    //           ]
    //        }
    //     }
    //  }

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  


  const handleResponse = (response) => response.json();
  const handleData = (data) => {
    console.log("handleData: \n" + JSON.stringify(data));
    setData(data.Page.media);
    console.log("====")
    console.log(data)
    setPage(data.Page.pageInfo.currentPage);
  };
  const handleError = (err) => {
    console.log("handleError:" + JSON.stringify(err));
  };

  const fetchData = async () => {
    fetch(url, options).then(handleResponse)
                       .then(handleData)
                       .catch(handleError);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const [text,setText] = useState('')

  return (
    <SafeAreaView style={styles.container}>     
      <StatusBar style="auto" />
      <TextInput
        style={[
          styles.stretchWidth,
          styles.searchInput
        ]}
        placeholder="Type here to search latest Anime!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      {/* <ScrollView>
        {data.map((element, index) => (
          <Text key={element.id || index}>
            {element.title.romaji}
          </Text>
        ))}
      </ScrollView> */}
      <ScrollView
        style={[
          styles.stretchWidth
        ]}
      >
        {data.map((element, index) => <Text key={element?.id||index}>JSON.stringify(element?.title?.romaji)</Text>)}
      </ScrollView>
      <TouchableOpacity 
        style={[
          styles.stretchWidth,
          styles.button
        ]}
        onPress={() => Alert.alert("TestHeader", "WannaBe")}>
        <Text style={{ fontFamily: 'Arial', fontSize: 20 }}>Warning</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stretchWidth: { 
    width: '80%',
    margin: 15
  }, 
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', // This pushes the child views apart
  },
  searchInput: {
    borderWidth: 2,
    borderRadius: 10,
    width: '90%',
    borderColor: 'grey',
    padding: 5, 
    height: 40
  },
  button: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 20,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position the button absolutely
    bottom: 0 // Align it to the bottom of the container
  }
});