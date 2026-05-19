 import React, {
  useState,
} from 'react';

import {
  View,
 Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function SearchScreen({
  navigation,
}: any) {

  const [query, setQuery] =
    useState('');

  const [results, setResults] =
    useState<any[]>([]);

   
  const handleSearch = (
    text: string
  ) => {

    setQuery(text);

    if (!text.trim()) {

      setResults([]);

      return;
    }

    const searchText =
      text.toLowerCase();

    const data = [];

     
    if (
      searchText.includes(
        'rule'
      )
    ) {

      data.push({
        id: 1,
        title: 'College Rules',
        type: 'RULE',
      });
    }

    
    if (
      searchText.includes(
        'lab'
      )
    ) {

      data.push({
        id: 2,
        title: 'Labs',
        type: 'LAB',
      });
    }
 
    if (
      searchText.includes(
        'time'
      )
    ) {

      data.push({
        id: 3,
        title: 'Timetable',
        type: 'TIMETABLE',
      });
    }

    setResults(data);
  };

   
  const handlePress = (
    item: any
  ) => {

    
    if (
      item.type === 'RULE'
    ) {

      navigation.navigate(
        'Rules'
      );
    }

     
    else if (
      item.type === 'LAB'
    ) {

      navigation.navigate(
        'Labs'
      );
    }

     
    else if (
      item.type ===
      'TIMETABLE'
    ) {

      navigation.navigate(
        'Timetable'
      );
    }
  };

  return (

    <View style={styles.container}>

       
      <TextInput
        placeholder="Search rules, labs, timetable..."
        placeholderTextColor="#94a3b8"
        value={query}
        onChangeText={
          handleSearch
        }
        style={styles.input}
      />

       
      <FlatList
        data={results}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}

            onPress={() =>
              handlePress(item)
            }
          >

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.type}>
              {item.type}
            </Text>

          </TouchableOpacity>

        )}

        ListEmptyComponent={

          query ? (

            <Text style={styles.empty}>
              No results found
            </Text>

          ) : null
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },

  title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  type: {
    color: '#38bdf8',
    marginTop: 6,
    fontWeight: '600',
  },

  empty: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },

});