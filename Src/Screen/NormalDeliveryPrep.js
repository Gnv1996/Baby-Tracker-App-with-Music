import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const checklistItems = [
  '30 min Walking',
  '10 min Stretching (Butterfly / Cat-Cow)',
  '8 Glasses Water',
  '1 Iron-Rich Meal',
  'Kegel Exercise (5 mins)',
  'Avoid Long Sitting',
];

export const weeklyTips = {
  20: 'Start light yoga and Kegel exercises to prepare pelvic muscles for delivery.',
  21: 'Practice deep breathing for stress relief and labor support.',
  22: 'Stay hydrated and eat iron/calcium-rich foods for strength.',
  23: 'Try pelvic tilts and butterfly pose for flexibility.',
  24: "Monitor your posture – sit upright to support the baby's position.",
  25: 'Go for a daily brisk walk for at least 30 minutes.',
  26: 'Start sleeping on your left side for better blood flow.',
  27: "Eat protein-rich foods to support the baby's growth.",
  28: "Schedule an ultrasound to check the baby's position.",
  29: 'Encourage head-down position by sitting straight and walking.',
  30: 'Use a birthing ball (if available) for pelvic alignment.',
  31: 'Avoid reclining positions – use a straight-backed chair.',
  32: 'Practice deep squats and butterfly pose (if approved by your doctor).',
  33: "The baby's head may start to engage – stay active.",
  34: 'Discuss your birth plan and pain relief options with your doctor.',
  35: 'Stay calm and rest well – the baby is gaining weight rapidly.',
  36: 'Ensure the baby is in a cephalic (head-down) position.',
  37: 'Pack your hospital bag and finalize your support person.',
  38: 'Mild cramping is normal – prepare for early labor.',
  39: 'Monitor baby movements and report any decrease in activity.',
  40: "🎉 Congratulations! You're full term – labor may begin anytime!",
};


const NormalDeliveryPrep = ({
  nextAppointment = '09 October',
  babyPosition = null,
}) => {
  const getPregnancyWeek = () => {
    const lmpDate = new Date(2025, 1, 18); // 18 Feb 2025
    const today = new Date();
    const deliveryDate = new Date(2025, 10, 2); // 2 Nov 2025

const babyBorn = today >= deliveryDate;

    const diffInMs = today - lmpDate;
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    return Math.min(Math.max(diffInWeeks, 1), 40);
  };

  const currentWeek = getPregnancyWeek();
  const [checked, setChecked] = useState([]);

  const toggleCheck = (index) => {
    setChecked((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const renderBabyPosition = () => {
    if (currentWeek < 28) 
      return '🤰 Baby Position will be visible after 28 weeks.';

    if (babyPosition) 
      return `👶 Baby Position: ${babyPosition}`;

    if (currentWeek >= 28 && currentWeek <= 31) 
      return '👶 Baby position may start shifting. Get a scan soon!';

    if (currentWeek >= 32 && currentWeek <= 35) 
      return '👶 Baby is settling into final position. Monitor with scan.';

    if (currentWeek >= 36) 
      return '👶 Baby is in final position — ready for delivery scan!';

    return '👶 Baby Position not updated — get a scan after 28 weeks.';
  };

  const progressPercent = Math.min((currentWeek / 36) * 100, 100).toFixed(0);
  const completedTasks = checked.length;
  const totalTasks = checklistItems.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#FF9E9E" barStyle="dark-content" />
      {/* Enhanced Header with Gradient Effect */}
      <View style={styles.headerContainer}>
        <View style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>🌱🤰 Pregnancy Journey</Text>
            <Text style={styles.subtitle}>Normal Delivery Prep Tracker</Text>
            
            {/* Week Badge */}
            <View style={styles.weekBadge}>
              <Text style={styles.weekBadgeText}>Baby Born</Text>

            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Enhanced Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardHeader}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>🎯 Pregnancy Progress</Text>
              <Text style={styles.remainingText}> Baby Born</Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>{progressPercent}%</Text>
            </View>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]}>
                <View style={styles.progressBarGlow} />
              </View>
            </View>
          </View>
          
          <View style={styles.milestonesContainer}>
            <View style={styles.milestone}>
              <Text style={styles.milestoneNumber}>{currentWeek}</Text>
              <Text style={styles.milestoneLabel}>Current Week</Text>
            </View>
            <View style={styles.milestone}>
              <Text style={styles.milestoneNumber}>40</Text>
              <Text style={styles.milestoneLabel}>Full Term</Text>
            </View>
            <View style={styles.milestone}>
            <Text style={styles.milestoneNumber}>{Math.ceil((currentWeek / 40) * 9)}</Text>

              <Text style={styles.milestoneLabel}>Months</Text>
            </View>
          </View>
        </View>

        {/* Enhanced Daily Checklist */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>💪 Daily Wellness Checklist</Text>
              <Text style={styles.sectionSubtitle}>Stay healthy for you and baby</Text>
            </View>
            <View style={styles.taskCounterContainer}>
              <View style={styles.taskCounter}>
                <Text style={styles.taskCounterText}>{completedTasks}/{totalTasks}</Text>
              </View>
              <Text style={styles.completionRate}>{completionRate}% Done</Text>
            </View>
          </View>

          <View style={styles.checklistContainer}>
            {checklistItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.checkItem,
                  checked.includes(index) && styles.checkedItem,
                ]}
                onPress={() => toggleCheck(index)}
                activeOpacity={0.7}
              >
                <View style={styles.checkItemContent}>
                  <View style={[
                    styles.checkbox,
                    checked.includes(index) && styles.checkedBox,
                  ]}>
                    {checked.includes(index) && (
                      <Ionicons name="checkmark" size={18} color="#fff" />
                    )}
                  </View>
                  <View style={styles.checkTextContainer}>
                    <Text style={[
                      styles.checkText,
                      checked.includes(index) && styles.checkedText,
                    ]}>
                      {item}
                    </Text>
                    {checked.includes(index) && (
                      <Text style={styles.completedLabel}>✨ Completed</Text>
                    )}
                  </View>
                </View>
                {checked.includes(index) && (
                  <View style={styles.checkmarkGlow} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Enhanced Weekly Tip */}
        <View style={[styles.sectionCard, styles.tipCard]}>
          <View style={styles.tipHeader}>
            <Text style={styles.sectionTitle}>🧘‍♀️ This Week's Tip</Text>
            <View style={styles.tipBadge}>
              <Text style={styles.tipBadgeText}>Week {currentWeek}</Text>
            </View>
          </View>
          <View style={styles.tipContainer}>
            <View style={styles.tipIconContainer}>
              <Text style={styles.tipIcon}>💡</Text>
            </View>
            <Text style={styles.tipText}>
              {weeklyTips[currentWeek] || 'Stay healthy and active for a smoother delivery journey!'}
            </Text>
          </View>
        </View>

        {/* Enhanced Appointment Card */}
        <View style={[styles.sectionCard, styles.appointmentCard]}>
          <Text style={styles.sectionTitle}>📅 Next Appointment</Text>
          <View style={styles.appointmentContainer}>
            <View style={styles.appointmentIconContainer}>
              <View style={styles.appointmentIcon}>
                <Text style={styles.appointmentEmoji}>🩺</Text>
              </View>
              <View style={styles.appointmentIconGlow} />
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.appointmentDate}>{nextAppointment}</Text>
              <Text style={styles.appointmentSubtext}>
                Don't forget to prepare your questions!
              </Text>
              <View style={styles.appointmentActions}>
                <View style={styles.reminderBadge}>
                  <Text style={styles.reminderText}>🔔 Reminder Set</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Enhanced Baby Position Card */}
        <View style={[styles.sectionCard, styles.babyCard]}>
          <View style={styles.babyHeader}>
            <Text style={styles.sectionTitle}>👶 Baby's Position</Text>
            <View style={styles.positionBadge}>
              <Text style={styles.positionBadgeText}>
                {currentWeek >= 28 ? 'Trackable' : 'Coming Soon'}
              </Text>
            </View>
          </View>
          <View style={styles.babyPositionContainer}>
            <View style={styles.babyIconContainer}>
              <Text style={styles.babyIcon}>
                {currentWeek >= 36 ? '👶' : currentWeek >= 28 ? '🤱' : '🤰'}
              </Text>
            </View>
            <View style={styles.babyPositionDetails}>
              <Text style={styles.babyPositionText}>{renderBabyPosition()}</Text>
              {currentWeek >= 28 && (
                <Text style={styles.babyPositionNote}>
                  Regular checkups help monitor baby's position
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Motivational Footer */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>🌟 You're Doing Great!</Text>
          <Text style={styles.motivationText}>
            Every day brings you closer to meeting your little one. Keep up the amazing work! 💕
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F8',
  },
  headerContainer: {
    overflow: 'hidden',
  
  },
  headerGradient: {
    backgroundColor: '#FF9E9E',
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    // marginTop:23
  },
  headerContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop:20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FCE7F3',
    fontWeight: '500',
    marginBottom: 20,
  },
  weekBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  weekBadgeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F91',
  },
  weekBadgeAccent: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -10,
    width: 20,
    height: 3,
    backgroundColor: '#EC4899',
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6F91',
    marginBottom: 4,
  },
  remainingText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FCE7F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF6F91',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6F91',
  },
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: '#FCE7F3',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF6F91',
    borderRadius: 6,
    position: 'relative',
  },
  progressBarGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
    borderRadius: 6,
  },
  milestonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  milestone: {
    alignItems: 'center',
  },
  milestoneNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F91',
  },
  milestoneLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  taskCounterContainer: {
    alignItems: 'center',
  },
  taskCounter: {
    backgroundColor: '#10B981',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  taskCounterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  completionRate: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 4,
  },
  checklistContainer: {
    gap: 12,
  },
  checkItem: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  checkedItem: {
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#BBF7D0',
  },
  checkItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkedBox: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  checkTextContainer: {
    flex: 1,
  },
  checkText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  checkedText: {
    color: '#059669',
    fontWeight: '600',
  },
  completedLabel: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 2,
  },
  checkmarkGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#10B981',
    opacity: 0.1,
    borderRadius: 15,
  },
  tipCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tipBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tipBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  tipIconContainer: {
    marginRight: 12,
  },
  tipIcon: {
    fontSize: 24,
  },
  tipText: {
    fontSize: 15,
    color: '#92400E',
    fontStyle: 'italic',
    flex: 1,
    lineHeight: 22,
  },
  appointmentCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 2,
  },
  appointmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  appointmentIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  appointmentIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#3B82F6',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  appointmentIconGlow: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    backgroundColor: '#3B82F6',
    opacity: 0.2,
    borderRadius: 35,
  },
  appointmentEmoji: {
    fontSize: 28,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentDate: {
    fontSize: 20,
    color: '#1E40AF',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appointmentSubtext: {
    fontSize: 14,
    color: '#3B82F6',
    marginBottom: 8,
  },
  appointmentActions: {
    flexDirection: 'row',
  },
  reminderBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  reminderText: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '600',
  },
  babyCard: {
    backgroundColor: '#FDF2F8',
    borderColor: '#FBCFE8',
    borderWidth: 2,
  },
  babyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  positionBadge: {
    backgroundColor: '#EC4899',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  positionBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  babyPositionContainer: {
    flexDirection: 'row',
    backgroundColor: '#FCE7F3',
    padding: 16,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#EC4899',
  },
  babyIconContainer: {
    marginRight: 12,
  },
  babyIcon: {
    fontSize: 32,
  },
  babyPositionDetails: {
    flex: 1,
  },
  babyPositionText: {
    fontSize: 15,
    color: '#BE185D',
    fontWeight: '600',
    marginBottom: 4,
  },
  babyPositionNote: {
    fontSize: 13,
    color: '#EC4899',
    fontStyle: 'italic',
  },
  motivationCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#BBF7D0',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  motivationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
    textAlign: 'center',
  },
  motivationText: {
    fontSize: 16,
    color: '#065F46',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
});

export default NormalDeliveryPrep;