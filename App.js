import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchDetails, testData } from './queries/animes';
import AnimeListItem from './components/AnimeListItem'

const handleResponse = (response) => {
  detailsData = response.json();
  console.log("Animes query: \n" + JSON.stringify(detailsData.Page.media[0]));

  return detailsData
}
const handleError = (err) => {
  console.log("handleError:" + JSON.stringify(err));
};

export default function App() {
  const [items, setItems] = useState(testData.data.Page.media);
  const [page, setPage] = useState(0);
  const [text, setText] = useState('Fate/Zero'); // Initialize with 'Fate/Zero'

  useEffect(() => {
    const fetchData = async (searchText) => {
      fetchDetails({ search: searchText })
        .then(handleResponse)
        .then((data) => {
          console.log("handleData: \n" + Date().toString() + JSON.stringify(data.Page));
          setItems(data.Page.media);
          setPage(data.Page.pageInfo.currentPage);
        })
        .catch(handleError);
    };
    // Fetch Placeholder 'Fate/Zero' on mount
    fetchData(text);
  }, []); //Run only on mount

  const handleSearch = async () => {
    try {
      const data = await fetchDetails({ search: text });
      console.log("handleData: \n" + Date().toString() + JSON.stringify(data.data.Page.media[0]));
      setItems(data.data.Page.media);
      setPage(data.data.Page.pageInfo.currentPage);
    } catch (error) {
      handleError(error);
    }
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text> Loading... </Text>
      </SafeAreaView>
    );
  }

  // console.log("items:" + JSON.stringify(items.map(element=>element.title?.romaji)))
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={[styles.stretchWidth, styles.searchInput]}
        placeholder="Type here to search latest Anime!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <FlatList
        style={styles.stretchWidth}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AnimeListItem item={item} />}
      />
      <TouchableOpacity
        style={[styles.stretchWidth, styles.button]}
        onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
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
    bottom: 0 // Align it to the bottom
  },
  buttonText: {
    fontFamily: 'Arial', 
    fontSize: 20
  }
});