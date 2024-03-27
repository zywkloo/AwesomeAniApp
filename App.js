import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchDetails, testData } from './queries/animes';

const handleResponse = (response) => response.json();
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

  const handleSearch = () => {
    fetchDetails({ search: text })
      .then(handleResponse)
      .then((data) => {
        console.log("handleData: \n" + Date().toString() + JSON.stringify(data.Page));
        setItems(data.Page.media);
        setPage(data.Page.pageInfo.currentPage);
      })
      .catch(handleError);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text> Loading... </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={[styles.stretchWidth, styles.searchInput]}
        placeholder="Type here to search latest Anime!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <FlatList style={styles.stretchWidth}>
        {items.map((element, index) => (
          <Text key={element?.id || index}>{JSON.stringify(element?.title?.romaji)}</Text>
        ))}
      </FlatList>
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