'use client';

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

const BABY_MILESTONES = [
  {
    month: 1,
    milestone: 'Hearing sounds',
    emoji: '👂',
    description: 'Baby begins to respond to sounds and voices',
  },
  {
    month: 2,
    milestone: 'Social smiling',
    emoji: '😊',
    description: 'First smiles in response to faces and voices',
  },
  {
    month: 3,
    milestone: 'Neck Control & Head Turning',
    emoji: '🧠',
    description:
      'Baby starts holding the head steady and turns the head left and right to look at sounds and faces',
  },
  {
    month: 4,
    milestone: 'Rolling over',
    emoji: '🤸',
    description: 'Baby can roll from back to side or front',
  },

  {
    month: 6,
    milestone: 'Sitting with support',
    emoji: '🪑',
    description:
      'Baby starts sitting with support. Back and neck muscles become stronger.',
  },

  {
    month: 7,
    milestone: 'Sitting without support',
    emoji: '🧸',
    description:
      'Baby can sit without support and play with toys while sitting.',
  },

  {
    month: 6,
    milestone: 'Babbling',
    emoji: '🗣️',
    description: "Produces repetitive sounds like 'ba-ba' and 'da-da'",
  },
  {
    month: 9,
    milestone: 'Crawling',
    emoji: '🐾',
    description:
      'Baby starts crawling or moving on knees to explore surroundings.',
  },
  {
    month: 12,
    milestone: 'Walking',
    emoji: '🚶',
    description: 'May take first steps or cruise along furniture',
  },
  {
    month: 18,
    milestone: 'Word combinations',
    emoji: '💭',
    description: 'Combines two words to form simple phrases',
  },
  {
    month: 24,
    milestone: 'Simple sentences',
    emoji: '💬',
    description: 'Can form and understand simple sentences',
  },
];

const {width} = Dimensions.get('window');

export default function BabyMilestonesScreen() {
  const colorScheme = useColorScheme();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#0F172A' : '#F8FAFC';
  const textPrimary = isDark ? '#F1F5F9' : '#1E293B';
  const textSecondary = isDark ? '#94A3B8' : '#64748B';
  const lineColor = isDark ? '#334155' : '#E2E8F0';

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerIconBg}>
           <Text style={styles.headerEmoji}>👶</Text>
        </View>
        <Text style={[styles.title, {color: textPrimary}]}>
          Milestone Journey
        </Text>
        <Text style={[styles.subtitle, {color: textSecondary}]}>
          A guide to your baby's growth
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.timelineWrapper}>
          {BABY_MILESTONES.map((item, index) => {
            const isExpanded = expandedIndex === index;
            const isLast = index === BABY_MILESTONES.length - 1;

            return (
              <View key={index} style={styles.milestoneRow}>
                
                {/* Timeline Visual System */}
                <View style={styles.timelineLeftColumn}>
                  <LinearGradient
                    colors={['#EC4899', '#F43F5E']}
                    style={styles.outerDot}>
                    <View style={styles.innerDot}>
                        <Text style={styles.dotText}>{index + 1}</Text>
                    </View>
                  </LinearGradient>
                  {!isLast && <View style={[styles.line, {backgroundColor: lineColor}]} />}
                </View>

                {/* Interactive Milestone Card */}
                <TouchableOpacity
                  onPress={() => setExpandedIndex(isExpanded ? null : index)}
                  activeOpacity={0.9}
                  style={styles.cardTouchArea}>
                  
                  <LinearGradient
                    colors={
                      index % 2 === 0
                        ? (isDark ? ['#312E81', '#1E1B4B'] : ['#FFF1F2', '#FFE4E6'])
                        : (isDark ? ['#1E3A8A', '#172554'] : ['#F0F9FF', '#E0F2FE'])
                    }
                    style={[
                      styles.milestoneCard,
                      isExpanded && styles.expandedCardShadow,
                      { borderColor: index % 2 === 0 ? '#FDA4AF' : '#7DD3FC' }
                    ]}>
                    
                    <View style={styles.cardMainContent}>
                      <View style={[styles.emojiBubble, {backgroundColor: index % 2 === 0 ? '#FFE4E6' : '#E0F2FE'}]}>
                        <Text style={styles.emojiText}>{item.emoji}</Text>
                      </View>
                      
                      <View style={styles.cardTextContainer}>
                        <View style={[styles.monthBadge, {backgroundColor: index % 2 === 0 ? '#F43F5E' : '#0EA5E9'}]}>
                           <Text style={styles.monthBadgeText}>
                              {item.month} {item.month === 1 ? 'MONTH' : 'MONTHS'}
                           </Text>
                        </View>
                        <Text style={[styles.milestoneTitle, {color: textPrimary}]}>
                          {item.milestone}
                        </Text>
                      </View>
                    </View>

                    {isExpanded && (
                      <View style={styles.expandableArea}>
                        <View style={[styles.divider, {backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}]} />
                        <Text style={[styles.descriptionText, {color: textSecondary}]}>
                          {item.description}
                        </Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

              </View>
            );
          })}
        </View>

        {/* Informational Footer */}
        <LinearGradient
          colors={isDark ? ['#1E293B', '#0F172A'] : ['#FDF2F8', '#FCE7F3']}
          style={styles.footer}>
          <Text style={styles.footerIcon}>💡</Text>
          <Text style={[styles.footerText, {color: textSecondary}]}>
            Every baby develops at their own pace. These milestones are 
            general guidelines based on pediatric standards.
          </Text>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 25,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#F43F5E',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  timelineWrapper: {
    marginTop: 10,
  },
  milestoneRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timelineLeftColumn: {
    width: 50,
    alignItems: 'center',
  },
  outerDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    padding: 3,
    elevation: 5,
    shadowColor: '#EC4899',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  innerDot: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F43F5E',
  },
  line: {
    width: 3,
    flex: 1,
    marginVertical: 5,
    borderRadius: 1.5,
  },
  cardTouchArea: {
    flex: 1,
    marginLeft: 10,
  },
  milestoneCard: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.5,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },
  expandedCardShadow: {
    elevation: 8,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    transform: [{ scale: 1.02 }],
  },
  cardMainContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiBubble: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  emojiText: {
    fontSize: 28,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  monthBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  monthBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  milestoneTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  expandableArea: {
    marginTop: 15,
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  footer: {
    marginTop: 40,
    padding: 24,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});