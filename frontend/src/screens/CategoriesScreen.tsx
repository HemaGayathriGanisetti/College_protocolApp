import React, {
  useEffect,
  useState,
  useContext,
} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';

export default function CategoriesScreen() {

  
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === 'ADMIN';

  
  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [categoryName, setCategoryName] =
    useState('');

  
  useEffect(() => {

    loadCategories();

  }, []);

  const loadCategories = async () => {

    try {

       
      const data = [
        {
          id: 1,
          name: 'CSE',
        },
        {
          id: 2,
          name: 'ECE',
        },
        {
          id: 3,
          name: 'EEE',
        },
      ];

      setCategories(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  
  const handleAddCategory = () => {

    if (!categoryName.trim()) {

      Alert.alert(
        'Enter category name'
      );

      return;
    }

    const newCategory = {
      id: Date.now(),
      name: categoryName,
    };

    setCategories([
      ...categories,
      newCategory,
    ]);

    setCategoryName('');
  };

   
  const handleDeleteCategory = (
    id: number
  ) => {

    const updatedCategories =
      categories.filter(
        (item) => item.id !== id
      );

    setCategories(updatedCategories);
  };

 
  if (loading) {

    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#38BDF8"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        📚 Categories
      </Text>

       
      {isAdmin && (

        <>
           
          <TextInput
            placeholder="Enter Category"
            placeholderTextColor="#94a3b8"
            value={categoryName}
            onChangeText={setCategoryName}
            style={styles.input}
          />

          
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCategory}
          >
            <Text style={styles.buttonText}>
              Add Category
            </Text>
          </TouchableOpacity>
        </>

      )}

       
      <FlatList
        data={categories}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.name}>
              📘 {item.name}
            </Text>

             
            {isAdmin && (

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  handleDeleteCategory(item.id)
                }
              >
                <Text style={styles.deleteText}>
                  Delete
                </Text>
              </TouchableOpacity>

            )}

          </View>

        )}
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

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },

  addButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 5,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#38bdf8',
  },

  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});