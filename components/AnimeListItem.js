import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

const AnimeListItem = ({ item }) => {
  const thumbnailUri = item.image?.large || item.image?.medium;

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };
   // Function to replace <br><br> with \n for newline and limit to first 3 lines
   const formatDescription = (description) => {
    const maxLines = 3;
    const newDescription = description.replace(/<br><br>/g, '\n').split('\n');
    return newDescription.slice(0, maxLines).join('\n');
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        {thumbnailUri && (
          <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title.romaji || 'No Title Available'}</Text>
          {item.description && (
            <Text style={styles.description} numberOfLines={3}>
              {formatDescription(item.description)}
            </Text>
          )}
          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>Start Date: {item.startDate.year}-{item.startDate.month}-{item.startDate.day}</Text>
            <Text style={styles.metaText}>Score: {item.meanScore || 'N/A'}</Text>
            <Text style={styles.metaText}>Genres: {item.genres.join(', ')}</Text>
          </View>
          {item.externalLinks && item.externalLinks.length > 0 && (
            <TouchableOpacity onPress={() => openLink(item.externalLinks[0].url)}>
              <Text style={styles.link}>More Info</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'lightblue',
    borderRadius: 8,
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.23, // Shadow opacity for iOS
    shadowRadius: 2.62, // Shadow radius for iOS
    marginVertical: 6,
  },
  container: {
    flexDirection: 'row',
    padding: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 5,
  },
  metaText: {
    marginRight: 15,
    fontSize: 12,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default AnimeListItem;
