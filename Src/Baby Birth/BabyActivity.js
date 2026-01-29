'use client';

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
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
    milestone: 'Babbling',
    emoji: '🗣️',
    description: "Produces repetitive sounds like 'ba-ba' and 'da-da'",
  },
  {
    month: 9,
    milestone: 'First words',
    emoji: '🗨️',
    description: "Says simple words like 'mama' or 'dada'",
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
  const cardBgLight = isDark ? '#1E293B' : '#FFFFFF';
  const textPrimary = isDark ? '#F1F5F9' : '#0F172A';
  const textSecondary = isDark ? '#CBD5E1' : '#64748B';

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.header}>
        <Text style={[styles.headerEmoji]}>👶</Text>
        <Text style={[styles.title, {color: textPrimary}]}>
          Milestone Journey
        </Text>
        <Text style={[styles.subtitle, {color: textSecondary}]}>
          Watch your baby grow
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.timelineContainer}>
          {BABY_MILESTONES.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
              activeOpacity={0.7}>
              <View style={styles.milestoneRow}>
                {/* Timeline Dot & Line */}
                <View style={styles.dotContainer}>
                  <LinearGradient
                    colors={['#EC4899', '#F43F5E']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.dot}>
                    <Text style={styles.dotText}>{index + 1}</Text>
                  </LinearGradient>
                  {index !== BABY_MILESTONES.length - 1 && (
                    <View
                      style={[
                        styles.line,
                        {backgroundColor: isDark ? '#475569' : '#E2E8F0'},
                      ]}
                    />
                  )}
                </View>

                {/* Milestone Card */}
                <LinearGradient
                  colors={
                    index % 2 === 0
                      ? ['#FFE8F0', '#FCE7F3']
                      : ['#FEF3C7', '#FEF08A']
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={[
                    styles.milestoneCard,
                    {marginBottom: expandedIndex === index ? 16 : 0},
                  ]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.emojiLarge}>{item.emoji}</Text>
                    <View style={styles.cardTitleContainer}>
                      <Text style={[styles.milestoneMonth, {color: '#991B1B'}]}>
                        {item.month} {item.month === 1 ? 'month' : 'months'}
                      </Text>
                      <Text
                        style={[styles.milestoneTitle, {color: textPrimary}]}>
                        {item.milestone}
                      </Text>
                    </View>
                  </View>

                  {expandedIndex === index && (
                    <View style={styles.expandedContent}>
                      <Text
                        style={[
                          styles.milestoneDescription,
                          {color: textSecondary},
                        ]}>
                        {item.description}
                      </Text>
                    </View>
                  )}
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, {color: textSecondary}]}>
            Every baby develops at their own pace. These are typical milestones
            for reference.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.5)',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  timelineContainer: {
    gap: 12,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dotContainer: {
    width: 60,
    alignItems: 'center',
    paddingRight: 12,
  },
  dot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#EC4899',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  dotText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  line: {
    width: 3,
    flex: 1,
    marginTop: 4,
  },
  milestoneCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  emojiLarge: {
    fontSize: 36,
    marginTop: 2,
  },
  cardTitleContainer: {
    flex: 1,
    gap: 4,
  },
  milestoneMonth: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  milestoneDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  footer: {
    marginTop: 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});
