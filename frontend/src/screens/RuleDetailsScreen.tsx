import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import { AuthContext }
from '../context/AuthContext';

import {
  getRulesByCategory,
  createRule,
  updateRule,
  deleteRule,
} from '../api/rulesApi';

export default function
RuleDetailsScreen({
  route,
}: any) {

  const { category } =
    route.params;

  const { user } =
    useContext(AuthContext);

  const isAdmin =
    user?.role === 'ADMIN';

  const [rules, setRules] =
    useState<any[]>([]);

  const [ruleText,
    setRuleText] =
    useState('');

  const [editingRuleId,
    setEditingRuleId] =
    useState<number | null>(
      null
    );

  
  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules =
    async () => {

      try {

        const res =
          await getRulesByCategory(
            category.id
          );

        setRules(res);

      } catch (err) {

        console.log(
          'FETCH RULE ERROR:',
          err
        );
      }
    };

   
  const handleSaveRule =
    async () => {

      if (!ruleText.trim()) {

        Alert.alert(
          'Please enter rule'
        );

        return;
      }

      try {

         
        if (editingRuleId) {

          await updateRule(
            editingRuleId,
            {
              title: ruleText,
              description:
                ruleText,
            }
          );

          Alert.alert(
            'Rule Updated'
          );

          setEditingRuleId(
            null
          );

        } else {

           
          await createRule(
            category.id,
            {
              title: ruleText,
              description:
                ruleText,
            }
          );

          Alert.alert(
            'Rule Added'
          );
        }

        setRuleText('');

        fetchRules();

      } catch (err: any) {

        console.log(
          'SAVE RULE ERROR:',
          err?.response?.data ||
          err
        );

        Alert.alert(
          'Failed to save rule'
        );
      }
    };

   
  const handleDeleteRule =
    async (ruleId: number) => {

      try {

        await deleteRule(
          ruleId
        );

        fetchRules();

        Alert.alert(
          'Rule Deleted'
        );

      } catch (err) {

        console.log(
          'DELETE ERROR:',
          err
        );

        Alert.alert(
          'Delete Failed'
        );
      }
    };

  return (

    <View style={styles.container}>

       
      <Text style={styles.heading}>
        {category.name}
      </Text>
 
      {isAdmin && (

        <View style={styles.adminBox}>

          <TextInput
            placeholder="Enter Rule"
            placeholderTextColor="#94a3b8"
            value={ruleText}
            onChangeText={
              setRuleText
            }
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={
              handleSaveRule
            }
          >

            <Text
              style={styles.buttonText}
            >

              {editingRuleId
                ? 'Update Rule'
                : '+ Add Rule'}

            </Text>

          </TouchableOpacity>

        </View>
      )}
 
      <FlatList
        data={rules}

        keyExtractor={(
          item: any
        ) =>
          item.id.toString()
        }

        renderItem={({
          item,
          index,
        }: any) => (

          <View style={styles.ruleCard}>

            <View
              style={{ flex: 1 }}
            >

              <Text
                style={styles.ruleNumber}
              >
                Rule {index + 1}
              </Text>

              <Text
                style={styles.ruleText}
              >
                {item.title}
              </Text>

            </View>

             
            {isAdmin && (

              <View
                style={styles.actions}
              >

                 
                <TouchableOpacity
                  style={
                    styles.editButton
                  }

                  onPress={() => {

                    setEditingRuleId(
                      item.id
                    );

                    setRuleText(
                      item.title
                    );
                  }}
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
                    handleDeleteRule(
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

  ruleCard: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent:
      'space-between',
  },

  ruleNumber: {
    color: '#facc15',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  ruleText: {
    color: '#e2e8f0',
    fontSize: 16,
    lineHeight: 24,
  },

  actions: {
    justifyContent: 'center',
    marginLeft: 10,
  },

  editButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

});