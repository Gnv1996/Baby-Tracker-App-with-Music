import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Dimensions,
  Platform,StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';



const { width, height } = Dimensions.get('window');

const FloatingElement = ({ delay, duration, size, top, left, right }) => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.8,
        duration: 800,
        delay,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(position.y, {
              toValue: 15,
              duration: duration,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(position.y, {
              toValue: -15,
              duration: duration,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(position.x, {
              toValue: 10,
              duration: duration * 1.3,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(position.x, {
              toValue: -10,
              duration: duration * 1.3,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        ),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top,
        left,
        right,
        opacity,
        transform: [
          { translateX: position.x },
          { translateY: position.y },
        ],
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'white',
          shadowColor: '#FFC0CB',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
          elevation: 5,
        }}
      />
    </Animated.View>
  );
};

const SplashScreen = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textPosition = useRef(new Animated.Value(20)).current;
  const subtitlePosition = useRef(new Animated.Value(20)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.8)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1500,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(600),
          Animated.timing(glowOpacity, {
            toValue: 0.8,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.loop(
            Animated.sequence([
              Animated.timing(glowScale, {
                toValue: 1.2,
                duration: 2000,
                easing: Easing.inOut(Easing.sin),
                useNativeDriver: true,
              }),
              Animated.timing(glowScale, {
                toValue: 0.9,
                duration: 2000,
                easing: Easing.inOut(Easing.sin),
                useNativeDriver: true,
              }),
            ])
          ),
        ]),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(textPosition, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(subtitlePosition, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('MyBaby');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
    backgroundColor="#FF6B8B"  // Darker pink/red background
        barStyle="light-content"    // Light icons & text for status bar
        translucent={false}         // Non-translucent for better visibility
      />
      
      <Animated.View style={[styles.backgroundContainer, { opacity: backgroundOpacity }]}>
        <LinearGradient
          colors={['#FFF5F7', '#FFE0EB', '#FFD6F3', '#E6F0FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>

      <FloatingElement delay={1500} duration={3000} size={15} top={height * 0.2} left={width * 0.2} />
      <FloatingElement delay={1700} duration={4000} size={10} top={height * 0.3} right={width * 0.25} />
      <FloatingElement delay={1900} duration={3500} size={12} top={height * 0.6} left={width * 0.15} />
      <FloatingElement delay={2100} duration={3200} size={8} top={height * 0.7} right={width * 0.2} />
      <FloatingElement delay={2300} duration={3800} size={14} top={height * 0.4} left={width * 0.7} />

      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require('../Assest/borns.jpeg')}
          style={styles.logo}
          resizeMode="cover"
        />
        {Platform.OS === 'ios' && (
          <BlurView
            style={styles.logoBlur}
            blurType="light"
            blurAmount={20}
          />
        )}
      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: textOpacity,
            transform: [{ translateY: textPosition }],
          },
        ]}
      >
        Journey
      </Animated.Text>

      <Animated.View
        style={[
          styles.subtitleContainer,
          {
            opacity: textOpacity,
            transform: [{ translateY: subtitlePosition }],
          },
        ]}
      >
        {/* <Text style={styles.subtitle}>
          Nici ka Baby Coming Soon...
        </Text> */}
        <View style={styles.heartContainer}>
          <View style={styles.heart} />
          <View style={[styles.heart, styles.leftHeart]} />
          <View style={[styles.heart, styles.rightHeart]} />
        </View>
      </Animated.View>
      <Text style={styles.subtitle}>
      Welcome, Nici’s Baby Boy! 👶💫
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    marginBottom: 30,
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: 'white',
  },
  logoBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 90,
    overflow: 'hidden',
    opacity: 0.3,
  },
  glow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FFC0CB',
    opacity: 0.5,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FF6B8B',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'sans-serif-condensed',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 107, 139, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitleContainer: {
    position: 'absolute',
    bottom: 50, // or adjust as needed
    alignItems: 'center',
    width: '100%',
  },
  
  subtitle: {
    fontSize: 20,
    color:'black',
   
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Medium' : 'sans-serif-medium',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(138, 107, 190, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  heartContainer: {
    marginTop: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#FF6B8B',
    borderRadius: 5,
  },
  leftHeart: {
    left: -5,
    transform: [{ rotate: '45deg' }],
  },
  rightHeart: {
    right: -5,
    transform: [{ rotate: '-45deg' }],
  },
});

export default SplashScreen;
