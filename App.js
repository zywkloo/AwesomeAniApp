import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
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

export default function App() {
  const [data, setData] = useState([]);

  const handleResponse = (response) => response.json();
  const handleData = (data) => {
    console.log("handleData: \n" + JSON.stringify(data));
    setData(data.Page.media); // Assuming the data structure includes a Page object
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



  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((element, index) => <Text key={index}>{JSON.stringify(element)}</Text>)}
      </ScrollView>
      <TouchableOpacity style={styles.container} onPress={() => Alert.alert("TestHeader", "WannaBe")}>
        <Text>Add Count</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2, // This sets the thickness of the border
    borderColor: '#000', // Set to your desired border color
    borderRadius: 5, // Optional: if you want rounded corners
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }  
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
