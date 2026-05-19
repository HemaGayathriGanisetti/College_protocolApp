import React, {
  useEffect,
  useState,
  useContext,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  getTimetable,
  addTimetable,
  updateTimetable,
  deleteTimetable,
} from '../api/timetableApi';

import { AuthContext } from '../context/AuthContext';

export default function TimetableScreen() {

  

  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === 'ADMIN';

  

  const [data, setData] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [day, setDay] = useState('MONDAY');

  const [period, setPeriod] = useState('');

  const [subject, setSubject] = useState('');

  const [faculty, setFaculty] = useState('');

  const [room, setRoom] = useState('');

  const [editingId, setEditingId] =
    useState<number | null>(null);

  

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {

    try {

      const res = await getTimetable();

      setData(Array.isArray(res) ? res : []);

    } catch (error) {

      console.log(error);

      setData([]);

    } finally {

      setLoading(false);

    }
  };

  

  const handleSave = async () => {

    if (
      !period ||
      !subject ||
      !faculty ||
      !room
    ) {
      return;
    }

    const timetableData = {
      day,
      period: Number(period),
      subject,
      faculty,
      room,
    };

    try {

      if (editingId) {

        await updateTimetable(
          editingId,
          timetableData
        );

      } else {

        await addTimetable(
          timetableData
        );

      }

      clearForm();

      loadTimetable();

    } catch (error) {

      console.log(error);

    }
  };

  

  const handleDelete = async (
    id: number
  ) => {

    try {

      await deleteTimetable(id);

      loadTimetable();

    } catch (error) {

      console.log(error);

    }
  };

 

  const handleEdit = (item: any) => {

    setEditingId(item.id);

    setDay(item.day);

    setPeriod(
      item.period.toString()
    );

    setSubject(item.subject);

    setFaculty(item.faculty);

    setRoom(item.room);
  };

  

  const handleCellPress = (
    item: any
  ) => {

    if (!item) return;

    Alert.alert(

      item.subject,

      `Faculty: ${item.faculty}\nRoom: ${item.room}`,

      [
        {
          text: 'Close',
          style: 'cancel',
        },

        ...(isAdmin
          ? [
              {
                text: 'Edit',
                style: 'default' as const,
                onPress: () => handleEdit(item),
              },

              {
                text: 'Delete',
                style: 'destructive' as const,
                onPress: () => handleDelete(item.id),
              },
            ]
          : []),
      ]

    );
  };

  

  const clearForm = () => {

    setEditingId(null);

    setDay('MONDAY');

    setPeriod('');

    setSubject('');

    setFaculty('');

    setRoom('');
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

    <ScrollView style={styles.container}>

      

      <Text style={styles.title}>
        📅 Timetable
      </Text>

      

      {isAdmin && (

        <View style={styles.formContainer}>

          <TextInput
            style={styles.input}
            placeholder="Day (MONDAY)"
            placeholderTextColor="#94a3b8"
            value={day}
            onChangeText={setDay}
          />

          <TextInput
            style={styles.input}
            placeholder="Period (1-4)"
            placeholderTextColor="#94a3b8"
            value={period}
            onChangeText={setPeriod}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Subject"
            placeholderTextColor="#94a3b8"
            value={subject}
            onChangeText={setSubject}
          />

          <TextInput
            style={styles.input}
            placeholder="Faculty"
            placeholderTextColor="#94a3b8"
            value={faculty}
            onChangeText={setFaculty}
          />

          <TextInput
            style={styles.input}
            placeholder="Room"
            placeholderTextColor="#94a3b8"
            value={room}
            onChangeText={setRoom}
          />

         

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
          >

            <Text style={styles.btnText}>

              {editingId
                ? 'UPDATE TIMETABLE'
                : 'ADD TIMETABLE'}

            </Text>

          </TouchableOpacity>

          

          <TouchableOpacity
            style={styles.clearBtn}
            onPress={clearForm}
          >

            <Text style={styles.btnText}>
              CLEAR
            </Text>

          </TouchableOpacity>

        </View>

      )}

      

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
      >

        <View>
 

          <View
            style={[
              styles.tableRow,
              styles.tableHeader,
            ]}
          >

            <View style={styles.tableCell}>
              <Text style={styles.headerText}>
                DAY
              </Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.headerText}>
                P1
              </Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.headerText}>
                P2
              </Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.headerText}>
                P3
              </Text>
            </View>

            <View style={styles.tableCell}>
              <Text style={styles.headerText}>
                P4
              </Text>
            </View>

          </View>

           

          {[
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
          ].map((dayName) => {

            const p1 = data.find(
              (i) =>
                i.day === dayName &&
                i.period === 1
            );

            const p2 = data.find(
              (i) =>
                i.day === dayName &&
                i.period === 2
            );

            const p3 = data.find(
              (i) =>
                i.day === dayName &&
                i.period === 3
            );

            const p4 = data.find(
              (i) =>
                i.day === dayName &&
                i.period === 4
            );

            return (

              <View
                key={dayName}
                style={styles.tableRow}
              >

                

                <View
                  style={[
                    styles.tableCell,
                    styles.dayCell,
                  ]}
                >

                  <Text style={styles.dayText}>
                    {dayName}
                  </Text>

                </View>
 

                <TouchableOpacity
                  style={styles.tableCell}
                  onPress={() =>
                    handleCellPress(p1)
                  }
                >

                  <Text style={styles.subjectText}>
                    {p1?.subject || '-'}
                  </Text>

                </TouchableOpacity>

                

                <TouchableOpacity
                  style={styles.tableCell}
                  onPress={() =>
                    handleCellPress(p2)
                  }
                >

                  <Text style={styles.subjectText}>
                    {p2?.subject || '-'}
                  </Text>

                </TouchableOpacity>

                 

                <TouchableOpacity
                  style={styles.tableCell}
                  onPress={() =>
                    handleCellPress(p3)
                  }
                >

                  <Text style={styles.subjectText}>
                    {p3?.subject || '-'}
                  </Text>

                </TouchableOpacity>

               

                <TouchableOpacity
                  style={styles.tableCell}
                  onPress={() =>
                    handleCellPress(p4)
                  }
                >

                  <Text style={styles.subjectText}>
                    {p4?.subject || '-'}
                  </Text>

                </TouchableOpacity>

              </View>

            );

          })}

        </View>

      </ScrollView>

    </ScrollView>
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
    color: '#fff',
    marginBottom: 18,
  },

  formContainer: {
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 15,
  },

  saveBtn: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  clearBtn: {
    backgroundColor: '#475569',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },

   

  tableHeader: {
    backgroundColor: '#2563eb',
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#334155',
  },

  tableCell: {
    width: 135,
    minHeight: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRightWidth: 1,
    borderColor: '#334155',
    padding: 10,
  },

  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  subjectText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },

  dayCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

});