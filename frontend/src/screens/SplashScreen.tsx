 import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {

  const animation = Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }),

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }),
  ]);

  animation.start();

  const timer = setTimeout(() => {

    animation.stop();

    navigation.replace('Login');

  }, 2500);

  return () => {
    clearTimeout(timer);
    animation.stop();
  };

}, []);

  return (
    <LinearGradient
      colors={['#0f172a', '#1e3a8a', '#2563eb']}
      style={styles.container}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>College App</Text>
        <Text style={styles.text}>Secure • Smart • Simple</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  text: {
    color: '#cbd5e1',
    marginTop: 8,
    fontSize: 14,
  },
});