'use client';

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const FOOD_DATA = [
  {
    title: 'Cereals & Grains',
    emoji: '🥣',
    foods: ['Rice Porridge', 'Dal Rice Mash', 'Suji Kheer', 'Oats Porridge', 'Ragi Porridge'],
    colors: ['#FFF8F0', '#FFF0E0'],
    accentColor: '#FFB347',
  },
  {
    title: 'Fruits',
    emoji: '🍎',
    foods: ['Banana Mash', 'Apple Puree', 'Papaya Mash', 'Pear Puree', 'Avocado Mash'],
    colors: ['#FFF0F5', '#FFE4E1'],
    accentColor: '#FF6B8B',
  },
  {
    title: 'Vegetables',
    emoji: '🥕',
    foods: ['Carrot Mash', 'Potato Mash', 'Sweet Potato', 'Pumpkin Mash', 'Lauki Mash', 'Palak Puree'],
    colors: ['#F0FFF0', '#E6FFE6'],
    accentColor: '#52C41A',
  },
  {
    title: 'Protein Foods',
    emoji: '🧀',
    foods: ['Moong Dal Soup', 'Dal Rice Mash', 'Paneer Mash', 'Fresh Curd'],
    colors: ['#F0F8FF', '#E6F3FF'],
    accentColor: '#1890FF',
  },
];

function AnimatedCard({ children, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{
      opacity: fadeAnim,
      transform: [{ translateY: slideAnim }],
    }}>
      {children}
    </Animated.View>
  );
}

export default function BabyFoodPlannerScreen() {
    const BABY_DOB = new Date('2025-11-02'); // Baby birth date

const getSolidFoodStartDate = () => {
  const startDate = new Date(BABY_DOB);
  startDate.setMonth(startDate.getMonth() + 6);

  return startDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const solidFoodDate = getSolidFoodStartDate();



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <LinearGradient 
          colors={['#FF6B9D', '#FFA502']} 
          start={{x: 0, y: 0}} 
          end={{x: 1, y: 1}}
          style={styles.headerGradient}>
          <View style={styles.headerContainer}>
            <View style={styles.titleBadge}>
              <Text style={styles.titleBadgeText}>HEALTHY START</Text>
            </View>
            <Text style={styles.title}>Baby Food Planner</Text>
            <Text style={styles.subtitle}>
              Nutritional milestones for your little one
            </Text>
          </View>
        </LinearGradient>

        <AnimatedCard index={0}>
          <LinearGradient 
            colors={['#2ECC71', '#27AE60']} 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 1}}
            style={styles.startCard}>
            <View style={styles.startCardContent}>
              <Text style={styles.startTitle}>Solid Food Start Date</Text>
              <Text style={styles.startDate}>{solidFoodDate}</Text>
              <Text style={styles.startDesc}>
                Your baby completes 6 months on this date
              </Text>
            </View>
          </LinearGradient>
        </AnimatedCard>

        {/* Food Categories Grid/List */}
        {FOOD_DATA.map((section, index) => (
          <AnimatedCard key={index} index={index + 1}>
            <View style={styles.categoryCardWrapper}>
              <LinearGradient
                colors={section.colors}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.card}>

                <View style={styles.cardHeader}>
                  <View style={[styles.emojiBubble, { borderColor: section.accentColor, borderWidth: 2 }]}>
                    <Text style={styles.foodEmoji}>{section.emoji}</Text>
                  </View>
                  <View style={styles.headerTextGroup}>
                    <Text style={[styles.cardTitle, { color: section.accentColor }]}>
                      {section.title}
                    </Text>
                    <View style={[styles.accentBar, { backgroundColor: section.accentColor }]} />
                  </View>
                </View>

                <View style={styles.foodGrid}>
                  {section.foods.map((food, i) => (
                    <View key={i} style={[styles.foodChip, { borderColor: section.accentColor }]}>
                      <View style={[styles.chipIndicator, { backgroundColor: section.accentColor }]} />
                      <Text style={styles.foodItemText}>{food}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </View>
          </AnimatedCard>
        ))}

        {/* Actionable Insight Cards */}
        <View style={styles.insightSection}>
          
          {/* Warning Card */}
          <AnimatedCard index={5}>
            <LinearGradient colors={['#FF6B6B', '#FF5252']} style={styles.warningCard}>
              <View style={styles.cardIconHeader}>
                <Text style={styles.warningTitle}>Foods to Avoid</Text>
                <View style={styles.urgentBadge}><Text style={styles.urgentText}>CRITICAL</Text></View>
              </View>
              <View style={styles.warningGrid}>
                 {['Honey (pre 1yr)', 'Salt & Sugar', 'Whole Nuts', 'Cow Milk'].map((item, idx) => (
                   <View key={idx} style={styles.warningItemWrapper}>
                     <View style={styles.warningDot} />
                     <Text style={styles.warningItem}>{item}</Text>
                   </View>
                 ))}
              </View>
            </LinearGradient>
          </AnimatedCard>

          {/* Water Guide Card */}
          <AnimatedCard index={6}>
            <LinearGradient colors={['#0984E3', '#0770D9']} style={styles.tipCard}>
              <Text style={styles.tipTitleWhite}>Water Intake Guide</Text>
              <View style={styles.guideRow}>
                 <View style={styles.guideStep}>
                   <Text style={styles.stepMonth}>0-6m</Text>
                   <Text style={styles.stepInfoWhite}>None</Text>
                 </View>
                 <View style={styles.stepDivider} />
                 <View style={styles.guideStep}>
                   <Text style={styles.stepMonth}>6-8m</Text>
                   <Text style={styles.stepInfoWhite}>2-3 Sips</Text>
                 </View>
                 <View style={styles.stepDivider} />
                 <View style={styles.guideStep}>
                   <Text style={styles.stepMonth}>8-12m</Text>
                   <Text style={styles.stepInfoWhite}>50-100ml</Text>
                 </View>
              </View>
            </LinearGradient>
          </AnimatedCard>

          {/* Smart Tips Card */}
          <AnimatedCard index={7}>
            <LinearGradient colors={['#F4D03F', '#F9E79F']} style={styles.tipsBox}>
              <Text style={styles.tipTitleDark}>Pro-Tips</Text>
              <View style={styles.tipsContent}>
                <View style={styles.tipRow}>
                  <View style={styles.tipBullet} />
                  <Text style={styles.smallTip}>Introduce one food at a time (3-day rule)</Text>
                </View>
                <View style={styles.tipRow}>
                  <View style={styles.tipBullet} />
                  <Text style={styles.smallTip}>Mash properly to avoid choking</Text>
                </View>
                <View style={styles.tipRow}>
                  <View style={styles.tipBullet} />
                  <Text style={styles.smallTip}>Always serve boiled & cooled water</Text>
                </View>
              </View>
            </LinearGradient>
          </AnimatedCard>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Always consult your pediatrician for specific needs.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scrollContent: { paddingBottom: 40 },

  // Header
  headerGradient: {
    paddingTop: 30,
    paddingBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  headerContainer: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  titleBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  titleBadgeText: { fontSize: 11, fontWeight: '900', color: '#FFFFFF', letterSpacing: 1.2 },
  title: { fontSize: 36, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 8, textAlign: 'center', fontWeight: '500' },

  // Cards
  categoryCardWrapper: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  card: { padding: 24, borderRadius: 28 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  emojiBubble: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  foodEmoji: { fontSize: 30 },
  headerTextGroup: { flex: 1 },
  cardTitle: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  accentBar: { width: 40, height: 5, borderRadius: 2.5, marginTop: 2 },

  // Food Items
  foodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  foodChip: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  chipIndicator: { width: 6, height: 6, borderRadius: 3, marginRight: 10 },
  foodItemText: { fontSize: 14, fontWeight: '700', color: '#333' },

  // Insight Cards
  insightSection: { marginTop: 16, paddingHorizontal: 16 },
  warningCard: { padding: 22, borderRadius: 24, marginBottom: 16, elevation: 5, shadowColor: '#FF5252', shadowOpacity: 0.15, shadowRadius: 12 },
  cardIconHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  urgentBadge: { backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  urgentText: { color: '#FFF', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  warningTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  warningGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  warningItemWrapper: { flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 12 },
  warningDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#FFFFFF', marginRight: 10 },
  warningItem: { fontSize: 13, fontWeight: '600', color: '#FFFFFF', flex: 1 },

  tipCard: { padding: 22, borderRadius: 24, marginBottom: 16, elevation: 5, shadowColor: '#0984E3', shadowOpacity: 0.15, shadowRadius: 12 },
  tipTitleWhite: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 16 },
  tipTitleDark: { fontSize: 20, fontWeight: '800', color: '#333', marginBottom: 16 },
  guideRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  stepDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.3)' },
  guideStep: { alignItems: 'center', flex: 1 },
  stepMonth: { fontSize: 11, fontWeight: '800', color: 'rgba(255,255,255,0.8)' },
  stepInfoWhite: { fontSize: 15, fontWeight: '900', color: '#FFFFFF', marginTop: 4 },

  tipsBox: { padding: 22, borderRadius: 24, elevation: 5, shadowColor: '#F4D03F', shadowOpacity: 0.15, shadowRadius: 12 },
  tipsContent: { gap: 12 },
  tipRow: { flexDirection: 'row', alignItems: 'center' },
  tipBullet: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#D4A50F', marginRight: 12 },
  smallTip: { fontSize: 13, color: '#333', fontWeight: '500', flex: 1, lineHeight: 18 },

  footer: { paddingVertical: 40, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#999', fontWeight: '700', textAlign: 'center' },
  
  startCard:{
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    padding: 24,
    borderRadius: 22,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#2ECC71',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
  },

  startCardContent: {
    alignItems: 'center',
    width: '100%',
  },

  startTitle:{
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#FFFFFF',
  },

  startDate:{
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  startDesc:{
    fontSize: 13,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '500',
  },
});
