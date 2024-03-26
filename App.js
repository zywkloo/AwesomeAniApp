import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'; // Import useState from react


export default function App() {
  const [count,setCount] = useState(0)
  // const [values,set] = useEffect([])
  return (
    <View style={styles.container}>
      <Text>{count}</Text>
      <TouchableOpacity onPress={()=>setCount(count+1)}>
        <Text>Add counts</Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
