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

export default function StudentsScreen() {
 
  const { user } =
    useContext(AuthContext);
 
  const isAdmin =
    user?.role === 'ADMIN';

 
  const [students, setStudents] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [studentName, setStudentName] =
    useState('');

  const [studentEmail, setStudentEmail] =
    useState('');
 
  useEffect(() => {

    loadStudents();

  }, []);

  const loadStudents = async () => {

    try {

       
      const allStudents = [

        {
          id: 1,
          name: 'Keshav',
          email:
            'keshav@gmail.com',
          role: 'STUDENT',
        },

        {
          id: 2,
          name: 'Ravi',
          email:
            'ravi@gmail.com',
          role: 'STUDENT',
        },

        {
          id: 3,
          name: 'Gayathri',
          email:
            'gayathri@gmail.com',
          role: 'STUDENT',
        },

      ];

       
      if (isAdmin) {

        setStudents(allStudents);
      }

       
      else {

        const currentStudent =
          allStudents.filter(
            (student) =>

              student.email ===
              user?.email
          );

        setStudents(
          currentStudent
        );
      }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };
 
  const handleAddStudent = () => {

    if (
      !studentName.trim() ||
      !studentEmail.trim()
    ) {

      Alert.alert(
        'Please enter all fields'
      );

      return;
    }

    const newStudent = {

      id: Date.now(),

      name: studentName,

      email: studentEmail,

      role: 'STUDENT',
    };

    setStudents([
      ...students,
      newStudent,
    ]);

    setStudentName('');

    setStudentEmail('');
  };

   
  const handleDeleteStudent = (
    id: number
  ) => {

    Alert.alert(
      'Delete Student',
      'Are you sure?',
      [

        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Delete',

          style: 'destructive',

          onPress: () => {

            const updated =
              students.filter(
                (student) =>
                  student.id !== id
              );

            setStudents(updated);
          },
        },
      ]
    );
  };

   
  const handleEditStudent = (
    id: number
  ) => {

    Alert.prompt(
      'Edit Student',
      'Enter new student name',

      (text) => {

        if (!text) return;

        const updated =
          students.map(
            (student) => {

              if (
                student.id === id
              ) {

                return {

                  ...student,

                  name: text,
                };
              }

              return student;
            }
          );

        setStudents(updated);
      }
    );
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

      {/* TITLE */}
      <Text style={styles.title}>

        {isAdmin
          ? '🎓 Manage Students'
          : '🎓 My Profile'}

      </Text>

       
      {isAdmin && (

        <View style={styles.adminBox}>

         
          <TextInput
            placeholder="Enter Student Name"
            placeholderTextColor="#94a3b8"
            value={studentName}
            onChangeText={
              setStudentName
            }
            style={styles.input}
          />

           
          <TextInput
            placeholder="Enter Student Email"
            placeholderTextColor="#94a3b8"
            value={studentEmail}
            onChangeText={
              setStudentEmail
            }
            style={styles.input}
          />

           
          <TouchableOpacity
            style={styles.addButton}
            onPress={
              handleAddStudent
            }
          >

            <Text style={styles.buttonText}>
              + Add Student
            </Text>

          </TouchableOpacity>

        </View>

      )}

       
      <FlatList
        data={students}

        keyExtractor={(item) =>
          item.id.toString()
        }

        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (

          <View style={styles.card}>

            
            <View style={{ flex: 1 }}>

              <Text style={styles.name}>
                🎓 {item.name}
              </Text>

              <Text style={styles.email}>
                📧 {item.email}
              </Text>

              <Text style={styles.role}>
                {item.role}
              </Text>

            </View>

             
            {isAdmin && (

              <View style={styles.actions}>

                 
                <TouchableOpacity
                  style={
                    styles.editButton
                  }

                  onPress={() =>
                    handleEditStudent(
                      item.id
                    )
                  }
                >

                  <Text
                    style={
                      styles.actionText
                    }
                  >
                    Edit
                  </Text>

                </TouchableOpacity>

                 
                <TouchableOpacity
                  style={
                    styles.deleteButton
                  }

                  onPress={() =>
                    handleDeleteStudent(
                      item.id
                    )
                  }
                >

                  <Text
                    style={
                      styles.actionText
                    }
                  >
                    Delete
                  </Text>

                </TouchableOpacity>

              </View>

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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
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
    fontSize: 15,
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
    fontSize: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,

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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 6,
  },

  email: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 5,
  },

  role: {
    color: '#facc15',
    fontWeight: '600',
    fontSize: 13,
  },

  actions: {
    justifyContent: 'center',
    marginLeft: 12,
  },

  editButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  deleteButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});