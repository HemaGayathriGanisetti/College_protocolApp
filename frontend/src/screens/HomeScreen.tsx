 import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { getLabs } from '../api/labs';
import { DrawerActions } from '@react-navigation/native';

export default function HomeScreen({ navigation }: any) {
  const [labs, setLabs] = useState([]);

  const previewLabs = useMemo(() => (labs || []).slice(0, 2), [labs]);

  useEffect(() => {
    fetchLabs();

    navigation.setOptions({
      title: 'Home',

     headerLeft: () => (
  <TouchableOpacity
    onPress={() =>
      navigation.dispatch(
        DrawerActions.openDrawer()
      )
    }
    style={{ marginLeft: 15 }}
  >
    <Text
      style={{
        fontSize: 22,
        color: '#fff',  
      }}
    >
      ☰
    </Text>
  </TouchableOpacity>
),

      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{ marginRight: 15 }}
        >
          <Text style={{ fontSize: 20 }}>🔍</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const fetchLabs = async () => {
    try {
      const res = await getLabs();
      setLabs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎓 College Dashboard</Text>
 <View style={styles.grid}>
      
   

   
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Labs')}
  >
    <Text style={styles.icon}>🧪</Text>
    <Text style={styles.cardText}>Labs</Text>
  </TouchableOpacity>

  
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Rules')}
  >
    <Text style={styles.icon}>📘</Text>
    <Text style={styles.cardText}>Rules</Text>
  </TouchableOpacity>

 
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Timetable')}
  >
    <Text style={styles.icon}>📅</Text>
    <Text style={styles.cardText}>Timetable</Text>
  </TouchableOpacity>

</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: 'center',
  },

  icon: {
    fontSize: 30,
    marginBottom: 10,
  },

  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});