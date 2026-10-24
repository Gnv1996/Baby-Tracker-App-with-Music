import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

/**
 * REFINED BOKEH ORBS
 * Simulates high-end camera bokeh with soft-focus movement
 */
const BokehOrb = ({ delay, duration, size, top, left, right, color = '#FFF' }) => {
  const moveAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.delay(delay),
      Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(moveAnim.y, { toValue: -40, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
            Animated.timing(moveAnim.y, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          ]),
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(moveAnim.x, { toValue: 20, duration: duration * 1.2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
            Animated.timing(moveAnim.x, { toValue: 0, duration: duration * 1.2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          ]),
        ),
      ]),
    ]);
    anim.start();

    return () => {
      anim.stop();
    };
  }, [delay, duration, fadeAnim, moveAnim.x, moveAnim.y]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top,
        left,
        right,
        opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.35] }),
        transform: [{ translateX: moveAnim.x }, { translateY: moveAnim.y }],
      }}
    >
      <View style={[styles.orbBase, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]} />
    </Animated.View>
  );
};

const SplashScreen = ({ navigation }) => {
  // Animation Refs
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(40)).current;
  const auraScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Aura Pulsing
    const auraLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(auraScale, { toValue: 1.15, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(auraScale, { toValue: 1, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    auraLoop.start();

    // 2. Entrance Sequence
    Animated.parallel([
      Animated.timing(logoOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
    ]).start();

    // 3. Staggered Text Reveal
    const textTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(textTranslateY, { toValue: 0, duration: 1200, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
      ]).start();
    }, 1000);

    // 4. Always navigate to Onboarding on start
    const navTimer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3500);

    return () => {
      auraLoop.stop();
      clearTimeout(textTimer);
      clearTimeout(navTimer);
    };
  }, [auraScale, logoOpacity, logoScale, navigation, textOpacity, textTranslateY]);

  const handleInstantSkip = () => {
    navigation.replace('Onboarding');
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Soft Multi-Tone Gradient */}
      <LinearGradient
        colors={['#FFFBFC', '#FFF0F5', '#F5FAFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Atmospheric Bokeh Orbs */}
      <BokehOrb size={180} top={-50} left={-30} color="#FFD1DC" delay={0} duration={4000} />
      <BokehOrb size={100} top={height * 0.75} right={-20} color="#81D4FA" delay={500} duration={5500} />
      <BokehOrb size={60} top={height * 0.4} left={width * 0.05} color="#FCE4EC" delay={1200} duration={3000} />

      <View style={styles.contentContainer}>
        {/* Triple Halo Glow System */}
        <Animated.View style={[styles.haloContainer, { transform: [{ scale: auraScale }] }]}>
          <View style={styles.auraOuter} />
          <View style={styles.auraMiddle} />
        </Animated.View>

        {/* Logo Container */}
        <Animated.View style={[styles.imageFrame, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
          <Image source={require('../Assest/borns.jpeg')} style={styles.babyLogo} />
        </Animated.View>

        {/* Typography Section */}
        <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textTranslateY }], alignItems: 'center' }}>
          <Text style={styles.brandTitle}>JOURNEY</Text>
          <View style={styles.styleLine} />

          <Text style={styles.welcomeText}>Welcome, Nici’s Baby Boy! 👶</Text>

          <View style={styles.loveLineContainer}>
            <Text style={styles.loveLineText}>— Papa & Mammy love you forever —</Text>
          </View>
        </Animated.View>
      </View>

      {/* Elegant Footer with Skip Action */}
      <Animated.View style={[styles.footer, { opacity: textOpacity }]}>
        <TouchableOpacity
          onPress={handleInstantSkip}
          activeOpacity={0.7}
          style={styles.skipPill}
        >
          <Text style={styles.skipPillText}>Enter App ✨</Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>CREATED WITH PURE LOVE</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  orbBase: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  contentContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },

  // Aura Styles
  haloContainer: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  auraOuter: { width: 320, height: 320, borderRadius: 160, backgroundColor: '#FF8AAB', opacity: 0.1 },
  auraMiddle: { position: 'absolute', width: 240, height: 240, borderRadius: 120, backgroundColor: '#FF8AAB', opacity: 0.15 },

  // Image Frame Styles
  imageFrame: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 110,
    marginBottom: 50,
    elevation: 20,
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
  },
  babyLogo: { width: 170, height: 170, borderRadius: 85, borderWidth: 5, borderColor: '#FFF' },

  // Typography
  brandTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FF6B8B',
    letterSpacing: 10,
    textTransform: 'uppercase',
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Black' : 'sans-serif-condensed',
  },
  styleLine: { width: 50, height: 4, backgroundColor: '#FFC1CF', borderRadius: 2, marginVertical: 20 },
  welcomeText: {
    fontSize: 19,
    color: '#333',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  loveLineContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 138, 171, 0.08)',
  },
  loveLineText: {
    fontSize: 14,
    color: '#FF8AAB',
    fontStyle: 'italic',
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Footer
  footer: { position: 'absolute', bottom: 48, alignSelf: 'center', alignItems: 'center' },
  skipPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: '#FFD1DC',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  skipPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF6B8B',
    letterSpacing: 0.5,
  },
  footerNote: {
    fontSize: 10,
    fontWeight: '900',
    color: '#AAA',
    letterSpacing: 4,
  },
});

export default SplashScreen;
