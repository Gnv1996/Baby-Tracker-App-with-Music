import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  FlatList,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

// Portrait-oriented card sizing to display full edge-to-edge cover photos
const CARD_WIDTH = Math.min(width - 48, 330);
const CARD_HEIGHT = height > 800 ? 375 : height > 700 ? 340 : 290;

export const ONBOARDING_KEY = '@has_completed_onboarding';

const SLIDES = [
  {
    id: '1',
    badge: 'FAMILY & ETERNAL LOVE',
    badgeIcon: 'heart-pulse',
    title: 'My Papa & My Beloved Maa',
    subtitle:
      'A blessed world born from true love, warm prayers, and pure affection. Mammy & Papa, thank you for your unconditional love and devotion! 💕',
    image: require('../Assest/Mammy_Papa.jpeg'),
    accentColor: '#E11D48',
    accentLight: '#FFE4E6',
    gradient: ['#FFF1F2', '#FFF8F9', '#FFFFFF'],
    highlights: ['👨‍👩‍👦 Loving Family', '💖 Eternal Devotion', '🌸 Parents’ Blessings'],
  },
  {
    id: '2',
    badge: 'MOTHER’S SACRED LOVE',
    badgeIcon: 'mother-heart',
    title: 'My Sweet Maa’s Loving Embrace',
    subtitle:
      'A mother’s gentle lap, warm prayers, and soothing care. Every precious baby smile begins with Maa’s pure, selfless devotion! 💖',
    image: require('../Assest/meri_maa.jpeg'),
    accentColor: '#D97706',
    accentLight: '#FEF3C7',
    gradient: ['#FFFBEB', '#FEFAF1', '#FFFFFF'],
    highlights: ['🤱 Mother’s Warmth', '🍼 Growth & Care', '💉 Vaccine Schedules'],
  },
  {
    id: '3',
    badge: 'OUR LITTLE PRINCE',
    badgeIcon: 'crown',
    title: 'Our Precious Dhruv Gautam',
    subtitle:
      'The sparkling light of our home and the beat of our hearts! Sweet innocence, gentle lullabies, and endless joyful smiles. 💫',
    image: require('../Assest/Me.jpeg'),
    accentColor: '#7C3AED',
    accentLight: '#EDE9FE',
    gradient: ['#FAF5FF', '#F8F4FF', '#FFFFFF'],
    highlights: ['👶 Beloved Baby Boy', '🎵 Peaceful Lullabies', '🌙 Gentle Sleep Aid'],
  },
  {
    id: '4',
    badge: 'SUPERHERO PAPA',
    badgeIcon: 'shield-star',
    title: 'My Papa, My Real Superhero',
    subtitle:
      'Walking forward hand-in-hand with Papa! Monthly birthday milestones, joyous laughter, sweet celebrations, and endless loving care. 💖',
    image: require('../Assest/Papa.jpeg'),
    alignTop: true,
    accentColor: '#0284C7',
    accentLight: '#E0F2FE',
    gradient: ['#F0F9FF', '#EBF7FF', '#FFFFFF'],
    highlights: ['🦸‍♂️ Superhero Papa', '🎂 Monthly Celebrations', '🎈 Cherished Memories'],
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleFinish = async (targetScreen = 'MyBaby') => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch (e) {
      console.log('Error saving onboarding state:', e);
    }
    navigation.replace(targetScreen);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleFinish('MyBaby');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const currentSlide = SLIDES[currentIndex] || SLIDES[0];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Dynamic Background Multi-Stop Soft Gradient */}
      <LinearGradient
        colors={currentSlide.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Atmospheric Soft Light Aura (Subtle Top Accent Only) */}
      <View
        style={[
          styles.decorativeGlow,
          {
            top: -90,
            right: -70,
            backgroundColor: currentSlide.accentColor,
          },
        ]}
      />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={[styles.brandIconWrapper, { borderColor: currentSlide.accentColor }]}>
            <Image
              source={require('../Assest/Me.jpeg')}
              style={styles.brandAvatar}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={styles.brandName}>
              Baby<Text style={{ color: currentSlide.accentColor }}>Care</Text>
            </Text>
            <Text style={styles.brandTagline}>DHRUV'S FAMILY WORLD</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleFinish('MyBaby')}
          activeOpacity={0.7}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Skip</Text>
          <Ionicons name="chevron-forward" size={14} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Slides FlatList */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        renderItem={({ item }) => {
          return (
            <View style={styles.slide}>
              {/* Category Pill positioned cleanly above the photo */}
              <View
                style={[
                  styles.badgeContainer,
                  {
                    backgroundColor: '#FFFFFF',
                    borderColor: item.accentLight,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.badgeIcon}
                  size={14}
                  color={item.accentColor}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.badgeText, { color: item.accentColor }]}>
                  {item.badge}
                </Text>
              </View>

              {/* Premium Hero Visual Image Card with Full Uncropped Photo */}
              <View style={styles.imageWrapper}>
                {/* Glowing Aura Behind Card */}
                <View
                  style={[
                    styles.imageAura,
                    {
                      backgroundColor: item.accentColor,
                    },
                  ]}
                />

                <View
                  style={[
                    styles.imageContainer,
                    {
                      borderColor: '#FFFFFF',
                      shadowColor: item.accentColor,
                    },
                  ]}
                >
                  {/* Full Frame Cover Photo Display with Per-Slide Alignment */}
                  <Image
                    source={item.image}
                    style={[
                      styles.image,
                      item.alignTop && {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: CARD_WIDTH,
                        height: CARD_WIDTH * (1400 / 900),
                      },
                    ]}
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Text Information Section in Elegant English */}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>

                {/* Highlight Tags */}
                <View style={styles.highlightRow}>
                  {item.highlights.map((h, i) => (
                    <View
                      key={i}
                      style={[
                        styles.highlightChip,
                        { borderColor: item.accentLight, backgroundColor: '#FFFFFF' },
                      ]}
                    >
                      <View
                        style={[
                          styles.highlightDot,
                          { backgroundColor: item.accentColor },
                        ]}
                      />
                      <Text style={styles.highlightText}>{h}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* Bottom Controls Area */}
      <View style={styles.bottomControls}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 30, 8],
              extrapolate: 'clamp',
            });
            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.25, 1, 0.25],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity: dotOpacity,
                    backgroundColor: currentSlide.accentColor,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.88}
          style={styles.actionButtonContainer}
        >
          <LinearGradient
            colors={[currentSlide.accentColor, currentSlide.accentColor + 'E6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>
              {currentIndex === SLIDES.length - 1 ? 'Start Baby Journey ✨' : 'Continue →'}
            </Text>
            <Ionicons
              name={currentIndex === SLIDES.length - 1 ? 'sparkles' : 'arrow-forward'}
              size={18}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick Route Switch on Final Slide */}
        {currentIndex === SLIDES.length - 1 ? (
          <TouchableOpacity
            onPress={() => handleFinish('Home')}
            style={styles.alternateOption}
            activeOpacity={0.7}
          >
            <Text style={styles.alternateOptionText}>
              Expecting? <Text style={[styles.alternateOptionLink, { color: currentSlide.accentColor }]}>Switch to Pregnancy Mode</Text>
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ height: 26 }} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  decorativeGlow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight || 24) + 12,
    paddingBottom: 8,
    zIndex: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden',
    borderWidth: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  brandAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  brandName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  brandTagline: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.2,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginRight: 2,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 5.5,
    borderRadius: 20,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1.2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  imageAura: {
    position: 'absolute',
    width: CARD_WIDTH + 14,
    height: CARD_HEIGHT + 14,
    borderRadius: 30,
    opacity: 0.16,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    borderWidth: 2.5,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: height > 750 ? 24 : 21,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: height > 750 ? 31 : 27,
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 12.8,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  highlightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  highlightChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  highlightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  highlightText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  bottomControls: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 42 : 22,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  dot: {
    height: 7,
    borderRadius: 3.5,
    marginHorizontal: 4,
  },
  actionButtonContainer: {
    width: '100%',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14.5,
    borderRadius: 24,
  },
  actionButtonText: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  alternateOption: {
    marginTop: 10,
    paddingVertical: 4,
  },
  alternateOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  alternateOptionLink: {
    fontWeight: '700',
  },
});


