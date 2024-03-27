import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { url, options, testData } from './queries/animes'


export default function App() {
  console.log(testData)
  const [items, setItems] = useState(testData.data.Page.media);
  const [page, setPage] = useState(0);
  const [text,setText] = useState('')

  const handleResponse = (response) => response.json();
  const handleData = (data) => {
    console.log("handleData: \n" + Date().toString() + JSON.stringify(data.Page));

    setItems(data.Page.media);
    console.log("====")
    console.log("set: \n" + Date().toString() + JSON.stringify(items));
    setPage(data.Page.pageInfo.currentPage);
  };
  const handleError = (err) => {
    console.log("handleError:" + JSON.stringify(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch(url, options).then(handleResponse)
                         .then(handleData)
                         .catch(handleError);
    };
    if (items.length == 0) {
      fetchData();
    }
  }, [items])

  if (items.length == 0) {
    return(
      <SafeAreaView style={styles.container}>     
        <StatusBar style="auto" />
        <Text> Loading... </Text>
      </SafeAreaView>
    )
  }

  console.log("Now : + " + JSON.stringify(items))

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
      <ScrollView
        style={[
          styles.stretchWidth
        ]}
      >
        {items.map((element, index) => <Text key={element?.id||index}>{JSON.stringify(element?.title?.romaji)}</Text>)}
      </ScrollView>
      <TouchableOpacity 
        style={[
          styles.stretchWidth,
          styles.button
        ]}
        onPress={() => Alert.alert("TestHeader", "WannaBe")}>
        <Text style={styles.buttonText}>Warning</Text>
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