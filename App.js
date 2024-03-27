import { StatusBar } from 'expo-status-bar';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchDetails } from './queries/animes';
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
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [text, setText] = useState('Fate/Zero'); // Initialize with 'Fate/Zero'

  useEffect(() => {
    const fetchData = async (searchText) => {
      fetchDetails({ search: 'Fate/Zero' })
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
      const data = await fetchDetails({ search: text, page: 1 });
      console.log("handleData: \n" + Date().toString() + JSON.stringify(data.data.Page.media[0]));
      setItems(data.data.Page.media);
      setPage(data.data.Page.pageInfo.currentPage);
    } catch (error) {
      handleError(error);
    }
  };

  const handleNextPage = async () => {
    try {
      const data = await fetchDetails({ search: text, page: page + 1 });
      console.log("handleNext: \n" + Date().toString() + data.data.Page.pageInfo.currentPage);
      setItems(data.data.Page.media);
      setPage(data.data.Page.pageInfo.currentPage);
    } catch (error) {
      handleError(error);
    }
    console.log('Prev Page');
  };

  const handlePrevPage = async () => {
    newP = Math.max(page - 1, 1)
    try {
      const data = await fetchDetails({ search: text, page: newP });
      console.log("handlePrev: \n" + Date().toString() + data.data.Page.pageInfo.currentPage);
      setItems(data.data.Page.media);
      setPage(data.data.Page.pageInfo.currentPage);
    } catch (error) {
      handleError(error);
    }
    console.log('Next Page');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={[styles.stretchWidth, styles.searchInput]}
        placeholder="Type here to search latest Anime!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      {items.length == 0 ? 
      <Text> Loading... </Text>
      :<FlatList
          style={styles.stretchWidth}
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AnimeListItem item={item} />}
        />
      }
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button, 
            styles.prevNextButton,
            page <= 1 && styles.disabledButton
          ]}
          disabled={page<=1}
          onPress={handlePrevPage}>
          <Text style={[styles.buttonText, page <= 1 && styles.disabledText]}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.prevNextButton]}
          onPress={handleNextPage}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    margin: 5,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 20,
    flex: 2,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Adjust the padding as needed
  },
  disabledButton: {
    borderColor: 'gray',
    backgroundColor: '#e0e0e0', // Example grey background color
  },
  disabledText: {
    color: 'gray', // Example grey text color
  },
  buttonText: {
    fontFamily: 'Arial', 
    fontSize: 20
  },
  footer: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-evenly', // Evenly distribute space around items
    width: '90%', // Footer should span the width of the screen
    paddingBottom: 20, // Add padding at the bottom to prevent overlap with other UI elements
  },
  prevNextButton: {
    borderColor: 'lightblue',
    flex: 1
  }
});