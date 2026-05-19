 import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/categoryApi';

export default function RulesScreen({
  navigation,
}: any) {

  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'ADMIN';

  const [categoryText, setCategoryText] = useState('');
  const [categories, setCategories] = useState([]);

   
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res);
    } catch (err) {
      console.log('FETCH ERROR:', err);
    }
  };

   
  const handleAddCategory = async () => {

    if (!categoryText.trim()) {
      Alert.alert('Enter category name');
      return;
    }

    try {
      await createCategory({
        name: categoryText,
      });

      setCategoryText('');
      fetchCategories();

    } catch (err) {
      console.log('ADD ERROR:', err);
      Alert.alert('Failed to add category');
    }
  };

   
  const handleDeleteCategory = async (id: number) => {

    try {
      await deleteCategory(id);
      fetchCategories();
      Alert.alert('Deleted');
    } catch (err) {
      console.log('DELETE ERROR:', err);
      Alert.alert('Delete failed');
    }
  };

   
  const handleEditCategory = (id: number) => {

    Alert.prompt(
      'Edit Category',
      'Enter new name',

      async (text) => {

        if (!text) return;

        try {
          await updateCategory(id, {
            name: text,
          });

          fetchCategories();

        } catch (err) {
          console.log('UPDATE ERROR:', err);
        }
      }
    );
  };

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        📘 College Rules
      </Text>

       
      {isAdmin && (
        <View style={styles.adminBox}>

          <TextInput
            placeholder="Enter category name"
            placeholderTextColor="#94a3b8"
            value={categoryText}
            onChangeText={setCategoryText}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCategory}
          >
            <Text style={styles.buttonText}>
              + Add Category
            </Text>
          </TouchableOpacity>

        </View>
      )}
 
      <FlatList
        data={categories}
        keyExtractor={(item: any) => item.id.toString()}

        renderItem={({ item }: any) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('RuleDetails', {
                category: item,
              })
            }
          >

            <View style={{ flex: 1 }}>

              <Text style={styles.title}>
                {item.name}
              </Text>

              <Text style={styles.count}>
                View Rules
              </Text>

            </View>

             
            {isAdmin && (
              <View style={styles.actions}>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditCategory(item.id)}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteCategory(item.id)}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>

              </View>
            )}

          </TouchableOpacity>

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

  heading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  adminBox: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
  },

  addButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: 'bold',
  },

  count: {
    color: '#94a3b8',
    fontSize: 13,
  },

  actions: {
    justifyContent: 'center',
  },

  editButton: {
    backgroundColor: '#f59e0b',
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },

  deleteButton: {
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 8,
  },

  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});