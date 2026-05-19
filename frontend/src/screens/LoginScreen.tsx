  import React, { useState } from 'react';

import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { useAuth } from '../context/AuthContext';

import {
  loginUser,
  registerUser,
} from '../api/auth';

export default function LoginScreen({
  navigation,
}: any) {

  const { login } = useAuth();

  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] =
    useState('');
  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const handleSubmit = async () => {

    setError('');

    const isInvalid = isRegister
      ? !name || !email || !password
      : !email || !password;

    if (isInvalid) {

      setError('Enter all fields');
      return;
    }

    try {

      setLoading(true);

       

      if (isRegister) {

        const res =
          await registerUser(
            name,
            email,
            password
          );

        Alert.alert(
          'Success',
          res?.message ||
          'Registered Successfully'
        );

        setIsRegister(false);

        setName('');
        setEmail('');
        setPassword('');

        return;
      }

       

      const res =
        await loginUser(
          email,
          password
        );

      console.log(
        'LOGIN RESPONSE:',
        JSON.stringify(
          res,
          null,
          2
        )
      );

      const token =
        res?.token ||
        res?.data?.token;

      const userRole =
        res?.role ||
        res?.data?.role;

      if (!token) {

        throw new Error(
          'Token missing'
        );
      }

      if (!userRole) {

        throw new Error(
          'Role missing'
        );
      }
 

      await login({

        accessToken: token,

        user: {
          email,
          role: userRole,
        },
      });
 

      const roleValue =
        String(userRole)
          .toUpperCase();

      if (
        roleValue === 'ADMIN'
      ) {

        navigation.replace(
          'Admindashboard'
        );

      } else {

        navigation.replace(
          'Home'
        );
      }

    } catch (err: any) {

      console.log(
        'LOGIN ERROR:',
        err
      );

      setError(

        err?.response?.data?.message ||

        err?.message ||

        'Something went wrong'
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <View style={styles.container}>

      <View style={styles.card}>

      

        <Text style={styles.title}>

          {isRegister
            ? 'Register'
            : 'Login'}

        </Text>

        

        <Text style={styles.subtitle}>

          {isRegister
            ? 'Create your student account'
            : 'Welcome back'}

        </Text>

        

        {isRegister && (

          <TextInput
            placeholder="Name"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        )}

        

        <TextInput
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

         

        <TextInput
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

       

        {error ? (

          <Text style={styles.error}>
            {error}
          </Text>

        ) : null}

        

        <TouchableOpacity
          style={styles.btn}
          onPress={handleSubmit}
          disabled={loading}
        >

          {loading ? (

            <ActivityIndicator
              color="#fff"
            />

          ) : (

            <Text style={styles.btnText}>

              {isRegister
                ? 'Register'
                : 'Login'}

            </Text>
          )}

        </TouchableOpacity>

        

        <TouchableOpacity

          onPress={() => {

            setIsRegister(
              !isRegister
            );

            setError('');
          }}
        >

          <Text style={styles.toggle}>

            {isRegister

              ? 'Already have an account? Login'

              : "Don't have an account? Register"}

          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 24,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 25,
    fontSize: 14,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 14,
    fontSize: 15,
  },

  btn: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  toggle: {
    marginTop: 20,
    textAlign: 'center',
    color: '#38bdf8',
    fontSize: 14,
  },

  error: {
    color: '#ef4444',
    marginBottom: 10,
    textAlign: 'center',
  },
});