'use client';

import {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfettiCannon from 'react-native-confetti-cannon';

const {width, height} = Dimensions.get('window');

// --- CONSTANTS & LOGIC (UNTOUCHED) ---
const BABY_NAME = 'Dhruv Gautam';
const BABY_BIRTHDATE = new Date('2025-11-02');
const PREGNANCY_DUE_DATE = new Date('2025-12-15');

const COLORS = {
  primary: '#06B6D4',
  primaryLight: '#22D3EE',
  primaryBg: '#ECFDF5',
  accent: '#F43F5E',
  accentLight: '#FFE4E6',
  success: '#10B981',
  warning: '#F59E0B',
  background: '#F0F9FF',
  surface: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#DBEAFE',
  purple: '#A855F7',
  blue: '#0EA5E9',
  pink: '#EC4899',
};

function calculateAge(birthDate) {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return {years, months, days};
}

function calculatePregnancyProgress(dueDate) {
  const today = new Date();
  const startDate = new Date(dueDate);
  startDate.setDate(startDate.getDate() - 280);
  const totalDays = 280;
  const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const weeksElapsed = Math.floor(daysElapsed / 7);
  const daysRemaining = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
  return {
    weeksElapsed,
    daysRemaining,
    progress: (daysElapsed / totalDays) * 100,
  };
}

// --- COMPONENTS ---

function AgeCard() {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const age = calculateAge(BABY_BIRTHDATE);

  const units = [
    {key: 'years', label: 'Years', emoji: '🎂'},
    {key: 'months', label: 'Months', emoji: '🍼'},
    {key: 'days', label: 'Days', emoji: '✨'},
  ];

  // 🥣 Annaprashan Day → 2 May 2026
  const isAnnaprasanDay =
    today.getDate() === 2 &&
    today.getMonth() === 4 &&
    today.getFullYear() === 2026;

  // 🎂 Every Month 2nd Date
  const isMonthlyBirthday = today.getDate() === 2;

  return (
    <View style={styles.ageCardContainer}>
      
      {isAnnaprasanDay ? (
        /* ---------------- ANNAPRASHAN VIEW ---------------- */
        <LinearGradient
          colors={['#FF9933', '#FFCC33']}
          style={[styles.ageCard, styles.celebrationShadow]}>
          
          <View style={styles.ceremonyContainer}>
            <Text style={styles.annaprasanTitle}>
              🥣 Annaprasan Sanskar 🥣
            </Text>

            <View style={styles.goldDivider} />

            <Text style={styles.ceremonyMainText}>
              Dhruv's First Solid Meal!
            </Text>

            <Text style={styles.ceremonySubText}>
              "May this first morsel of food bring health,
              strength, and sweetness of life." ✨
            </Text>

            <View style={styles.ceremonyIconRow}>
              <View style={styles.ceremonyItem}>
                <Text style={styles.ceremonyEmoji}>🍚</Text>
                <Text style={styles.ceremonyLabel}>Rice</Text>
              </View>

              <View style={styles.ceremonyItem}>
                <Text style={styles.ceremonyEmoji}>🥄</Text>
                <Text style={styles.ceremonyLabel}>First Spoon</Text>
              </View>

              <View style={styles.ceremonyItem}>
                <Text style={styles.ceremonyEmoji}>🙏</Text>
                <Text style={styles.ceremonyLabel}>Blessings</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      ) : isMonthlyBirthday ? (
        /* ---------------- MONTHLY BIRTHDAY VIEW ---------------- */
        <LinearGradient
        colors={['#FF9A8B', '#FF6A88', '#FFB347']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          styles.ageCard,
          styles.celebrationShadow,
          {
            overflow: 'hidden',
            paddingVertical: 30,
          },
        ]}>
      
        {/* Floating Decorations */}
        <Text
          style={{
            position: 'absolute',
            top: 15,
            left: 20,
            fontSize: 26,
            opacity: 0.25,
          }}>
          ✨
        </Text>
      
        <Text
          style={{
            position: 'absolute',
            top: 20,
            right: 25,
            fontSize: 24,
            opacity: 0.25,
          }}>
          🎈
        </Text>
      
        <Text
          style={{
            position: 'absolute',
            bottom: 18,
            left: 25,
            fontSize: 24,
            opacity: 0.2,
          }}>
          🎉
        </Text>
      
        <View style={{alignItems: 'center'}}>
      
          {/* Crown Icon */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(255,255,255,0.18)',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 18,
              borderWidth: 2,
              borderColor: 'rgba(255,255,255,0.3)',
            }}>
            <Text style={{fontSize: 42}}>👑</Text>
          </View>
      
          {/* Main Heading */}
          <Text
            style={{
              fontSize: 28,
              fontWeight: '900',
              color: '#FFF',
              marginBottom: 8,
              letterSpacing: 0.8,
              textAlign: 'center',
            }}>
            🎂 Happy Monthly Birthday 🎂
          </Text>
      
          {/* Baby Name */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: '#FFF8DC',
              marginBottom: 10,
            }}>
            Dhruv Gautam
          </Text>
      
          {/* Subtitle */}
          <Text
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.92)',
              textAlign: 'center',
              lineHeight: 22,
              paddingHorizontal: 18,
              marginBottom: 25,
            }}>
            🌟 Our little prince is growing with love, joy,
            and endless blessings every month ✨
          </Text>
      
          {/* Age Cards */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            {units.map(({key, label, emoji}) => (
              <View
                key={key}
                style={{
                  alignItems: 'center',
                  flex: 1,
                }}>
      
                {/* Emoji Bubble */}
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 28,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={{fontSize: 26}}>{emoji}</Text>
                </View>
      
                {/* Number Box */}
                <LinearGradient
                  colors={['#FFFFFF', '#FFF7ED']}
                  style={{
                    minWidth: 80,
                    paddingVertical: 14,
                    borderRadius: 22,
                    alignItems: 'center',
                    elevation: 6,
                    shadowColor: '#000',
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    marginBottom: 8,
                  }}>
      
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: '900',
                      color: '#FF6A88',
                    }}>
                    {age[key]}
                  </Text>
                </LinearGradient>
      
                {/* Label */}
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: '#FFF',
                    letterSpacing: 0.5,
                  }}>
                  {label}
                </Text>
              </View>
            ))}
          </View>
      
          {/* Bottom Blessing */}
          <View
            style={{
              marginTop: 28,
              backgroundColor: 'rgba(255,255,255,0.15)',
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 13,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              💖 Stay Healthy • Happy • Blessed 💖
            </Text>
          </View>
        </View>
      </LinearGradient>
      ) : (
        /* ---------------- NORMAL VIEW ---------------- */
        <View style={styles.ageCard}>
          <View style={styles.ageCardHeaderRow}>
            <Text style={styles.ageCardTitle}>
              {BABY_NAME}'s Age
            </Text>

            <Text style={styles.ageCardPulse}>
              ● Live
            </Text>
          </View>

          <View style={styles.ageGrid}>
            {units.map(({key, label, emoji}) => (
              <View style={styles.ageItem} key={key}>
                <Text style={styles.ageEmoji}>{emoji}</Text>

                <View style={styles.ageValueBox}>
                  <Text style={styles.ageValue}>
                    {age[key]}
                  </Text>
                </View>

                <Text style={styles.ageLabel}>
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

function UpcomingInjectionCard({vaccine, scheduledDate}) {
  const formattedDate = vaccine.dueDate.toLocaleDateString(
    'en-US',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  );
  return (
    <View style={styles.upcomingInjectionContainer}>
      <LinearGradient
        colors={['#FFAD85', '#FF7F7F']} // High Impact Warm Gradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.upcomingInjectionGradient}>
        {/* Floating Glass Badge */}
        <View style={styles.floatingBadgeGlass}>
          <Text style={styles.nextUpText}>NEXT UPCOMING VACCINATION</Text>
        </View>

        <View style={styles.cardHeaderRow}>
          {/* Enhanced Icon Bubble */}
          <View style={styles.iconBubbleWhite}>
            <Text style={styles.vaccineLargeIcon}>{vaccine.emoji}</Text>
          </View>

          {/* Core Info */}
          <View style={styles.mainInfoSection}>
            <Text style={styles.vaxNameText} numberOfLines={1}>
              {vaccine.name}
            </Text>
            <Text style={styles.vaxCategoryText}>
              {vaccine.category} Protection
            </Text>
          </View>

          {/* Glass Date Box */}
          <View style={styles.glassDateBox}>
  <Text style={styles.dueLabel}>DUE ON</Text>

  <Text style={styles.dueDateValue}>
  {formattedDate.split(' ')[0]}
</Text>

<Text style={styles.dueYearValue}>
  {formattedDate.split(' ').slice(1).join(' ')}
</Text>
</View>
        </View>

        {/* Improved Footer */}
        <View style={styles.careFooter}>
          <View style={styles.heartCircle}>
            <Text style={{fontSize: 8}}>❤️</Text>
          </View>
          <Text style={styles.footerCareText}>
            Ensure Dhruv's immunity with timely shots.
          </Text>
          <TouchableOpacity style={styles.bellButton}>
            <Text style={{fontSize: 16}}>🔔</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

function MilkFeedingCard({feeding}) {
  const formatTime = date =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  const getTypeIcon = type => (type === 'breast' ? '🍼' : '👶');
  const getTypeColor = type =>
    type === 'breast'
      ? {bg: COLORS.accentLight, border: COLORS.accent}
      : {bg: COLORS.primaryBg, border: COLORS.primaryLight};

  const colors = getTypeColor(feeding.type);
  return (
    <View
      style={[
        styles.feedingCard,
        {borderLeftColor: colors.border, backgroundColor: colors.bg},
      ]}>
      <View style={styles.feedingHeader}>
        <View style={styles.feedingIconBox}>
          <Text style={styles.feedingIcon}>{getTypeIcon(feeding.type)}</Text>
        </View>
        <View style={styles.feedingInfo}>
          <Text style={styles.feedingType}>
            {feeding.type === 'breast'
              ? '🍼 Breast Feeding'
              : '👶 Formula Feeding'}
          </Text>
          <Text style={styles.feedingTime}>{formatTime(feeding.time)}</Text>
        </View>
        <View style={styles.feedingAmount}>
          <View style={styles.feedingBadge}>
            <Text style={styles.feedingDuration}>
              ⏱️ {feeding.duration} min
            </Text>
          </View>
          {feeding.type === 'formula' && (
            <View style={styles.feedingBadge}>
              <Text style={styles.feedingVolume}>💧 {feeding.volume} ml</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

// --- SCREENS ---



function PregnancyTrackerScreen() {
  const pregnancyData = calculatePregnancyProgress(PREGNANCY_DUE_DATE);
  const [checkups] = useState([
    {
      id: 1,
      week: 8,
      type: 'Ultrasound',
      date: '2025-09-01',
      status: 'Completed',
    },
    {
      id: 2,
      week: 12,
      type: 'Nuchal Scan',
      date: '2025-09-15',
      status: 'Completed',
    },
    {
      id: 3,
      week: 20,
      type: 'Anatomy Scan',
      date: '2025-11-03',
      status: 'Upcoming',
    },
    {
      id: 4,
      week: 28,
      type: 'Glucose Test',
      date: '2025-12-01',
      status: 'Upcoming',
    },
  ]);

  const tips = [
    {emoji: '💊', title: 'Take Vitamins', desc: 'Prenatal vitamins daily'},
    {emoji: '🥗', title: 'Eat Healthy', desc: 'Balanced nutrition'},
    {emoji: '💧', title: 'Stay Hydrated', desc: 'Drink plenty of water'},
    {emoji: '🧘', title: 'Rest & Relax', desc: 'Get enough sleep'},
  ];

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.pregnancyHeader}>
          <View style={styles.pregnancyHeaderContent}>
            <Text style={styles.pregnancyHeaderEmoji}>🤰</Text>
            <Text style={styles.pregnancyHeaderTitle}>
              Your Pregnancy Journey
            </Text>
            <Text style={styles.pregnancyWeek}>
              Week {pregnancyData.weeksElapsed}
            </Text>
            <Text style={styles.pregnancyDays}>
              {pregnancyData.daysRemaining} days until due date
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>Pregnancy Progress</Text>
            <Text style={styles.progressPercent}>
              {Math.round(pregnancyData.progress)}%
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={[COLORS.primaryLight, COLORS.primary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[
                styles.progressBar,
                {width: `${pregnancyData.progress}%`},
              ]}
            />
          </View>
        </View>

        <View style={styles.checkupsSection}>
          <Text style={styles.sectionTitle}>Medical Checkups</Text>
          {checkups.map(checkup => (
            <View
              key={checkup.id}
              style={[
                styles.checkupCard,
                {
                  backgroundColor:
                    checkup.status === 'Completed'
                      ? COLORS.primaryBg
                      : COLORS.accentLight,
                  borderLeftColor:
                    checkup.status === 'Completed'
                      ? COLORS.success
                      : COLORS.warning,
                },
              ]}>
              <View style={styles.checkupLeft}>
                <View
                  style={[
                    styles.checkupWeek,
                    {
                      backgroundColor:
                        checkup.status === 'Completed'
                          ? COLORS.success
                          : COLORS.warning,
                    },
                  ]}>
                  <Text style={styles.checkupWeekText}>W{checkup.week}</Text>
                </View>
                <View style={styles.checkupInfo}>
                  <Text style={styles.checkupType}>{checkup.type}</Text>
                  <Text style={styles.checkupDate}>{checkup.date}</Text>
                </View>
              </View>
              <View style={styles.checkupStatus}>
                <Text style={styles.checkupStatusText}>
                  {checkup.status === 'Completed' ? '✅' : '⏳'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Wellness Tips</Text>
          <View style={styles.tipsGrid}>
            {tips.map((tip, index) => (
              <View
                key={index}
                style={[
                  styles.tipCard,
                  {
                    backgroundColor:
                      index % 4 === 0
                        ? COLORS.accentLight
                        : index % 4 === 1
                        ? COLORS.primaryBg
                        : index % 4 === 2
                        ? '#FEF3E0'
                        : '#E8F5E9',
                  },
                ]}>
                <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDesc}>{tip.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function VaccineTrackerScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [blastKey, setBlastKey] = useState(0);



  const today = new Date();
  const isCelebrationDay = today.getDate() === 2;

  useEffect(() => {
    if (!isCelebrationDay) return;
  
    const interval = setInterval(() => {
      setBlastKey(prev => prev + 1); // 🔥 re-render cannon
    }, 4000); // 👉 2 second
  
    return () => clearInterval(interval);
  }, [isCelebrationDay]);

  useEffect(() => {
    checkBlessingStatus();
  }, []);

  const checkBlessingStatus = async () => {
    try {
      const today = new Date().toDateString();
      const lastBlessed = await AsyncStorage.getItem('lastBlessedDate');
      if (lastBlessed !== today) setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlessed = async () => {
    try {
      const today = new Date().toDateString();
      await AsyncStorage.setItem('lastBlessedDate', today);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const vaccines = [
    /* ------------------ BIRTH ------------------ */
    {
      name: 'BCG',
      weeks: 0,
      emoji: '💉',
      category: 'Birth',
      description: 'Protection against Tuberculosis',
      givenDate: '3 Nov 2025',
    },
    {
      name: 'OPV 0',
      weeks: 0,
      emoji: '👅',
      category: 'Birth',
      description: 'Oral Polio Vaccine at birth',
      givenDate: '3 Nov 2025',
    },
    {
      name: 'Hepatitis B – Birth Dose',
      weeks: 0,
      emoji: '🛡️',
      category: 'Birth',
      description: 'Hep B (BD)',
      givenDate: '3 Nov 2025',
    },

    /* ------------------ 6 WEEKS ------------------ */
    {
      name: 'DTwP 1 / DTaP 1',
      weeks: 6,
      emoji: '💪',
      category: '6 Weeks',
      givenDate: '18 Dec 2025',
    },
    {
      name: 'IPV 1',
      weeks: 6,
      emoji: '🧠',
      category: '6 Weeks',
      givenDate: '18 Dec 2025',
    },
    {
      name: 'Hib 1',
      weeks: 6,
      emoji: '🧬',
      category: '6 Weeks',
      givenDate: '18 Dec 2025',
    },
    {
      name: 'Hepatitis B – 2',
      weeks: 6,
      emoji: '🛡️',
      category: '6 Weeks',
      givenDate: '18 Dec 2025',
    },
    {
      name: 'Rotavirus 1',
      weeks: 6,
      emoji: '🌀',
      category: '6 Weeks',
      givenDate: '18 Dec 2025',
    },
    {
      name: 'PCV 1',
      weeks: 6,
      emoji: '🫁',
      category: '6 Weeks',
      givenDate: '18 Dec 2025',
    },

    /* ------------------ 10 WEEKS ------------------ */
    {
      name: 'DTwP 2 / DTaP 2',
      weeks: 10,
      emoji: '💪',
      category: '10 Weeks',
      givenDate: '19 Jan 2026',
    },
    {
      name: 'IPV 2',
      weeks: 10,
      emoji: '🧠',
      category: '10 Weeks',
      givenDate: '19 Jan 2026',
    },
    {
      name: 'Hib 2',
      weeks: 10,
      emoji: '🧬',
      category: '10 Weeks',
      givenDate: '19 Jan 2026',
    },
    {
      name: 'Hepatitis B – 3',
      weeks: 10,
      emoji: '🛡️',
      category: '10 Weeks',
      givenDate: '19 Jan 2026',
    },
    {
      name: 'Rotavirus 2',
      weeks: 10,
      emoji: '🌀',
      category: '10 Weeks',
      givenDate: '19 Jan 2026',
    },
    {
      name: 'PCV 2',
      weeks: 10,
      emoji: '🫁',
      category: '10 Weeks',
      givenDate: '19 Jan 2026',
    },

    /* ------------------ 14 WEEKS ------------------ */
    {
      name: 'DTwP 3 / DTaP 3',
      weeks: 14,
      emoji: '💪',
      category: '14 Weeks',
      givenDate: '27 Feb 2026',
    },
    {
      name: 'IPV 3',
      weeks: 14,
      emoji: '🧠',
      category: '14 Weeks',
      givenDate: '27 Feb 2026',
    },
    {
      name: 'Hib 3',
      weeks: 14,
      emoji: '🧬',
      category: '14 Weeks',
      givenDate: '27 Feb 2026',
    },
    {
      name: 'Hepatitis B – 4',
      weeks: 14,
      emoji: '🛡️',
      category: '14 Weeks',
      givenDate: '27 Feb 2026',
    },
    {
      name: 'Rotavirus 3',
      weeks: 14,
      emoji: '🌀',
      category: '14 Weeks',
      givenDate: '27 Feb 2026',
    },
    {
      name: 'PCV 3',
      weeks: 14,
      emoji: '🫁',
      category: '14 Weeks',
      givenDate: '27 Feb 2026',
    },

    /* ------------------ 6 MONTHS ------------------ */
    {name: 'Influenza (IIV) – 1', weeks: 24, emoji: '🤧', category: '6 Months',
    givenDate: '13 May 2026',
    },

    /* ------------------ 7 MONTHS ------------------ */
    {
      name: 'Influenza (IIV) – 2',
      weeks: 32,
      emoji: '🤧',
      category: '7 Months',
    },

    /* ------------------ 6–9 MONTHS ------------------ */
    {
      name: 'Typhoid Conjugate Vaccine',
      weeks: 37,
      emoji: '🥼',
      category: '9 Months',
    },

    /* ------------------ 9 MONTHS ------------------ */
    {name: 'MMR – 1', weeks: 37, emoji: '😷', category: '9 Months'},

    /* ------------------ 12 MONTHS ------------------ */
    {name: 'Hepatitis A (Live)', weeks: 52, emoji: '🍽️', category: '12 Months'},

    /* ------------------ 15 MONTHS ------------------ */
    {name: 'MMR – 2', weeks: 64, emoji: '😷', category: '15 Months'},
    {name: 'Varicella – 1', weeks: 64, emoji: '🐔', category: '15 Months'},
    {name: 'PCV Booster', weeks: 64, emoji: '🫁', category: '15 Months'},

    /* ------------------ 16–18 MONTHS ------------------ */
    {
      name: 'DTwP Booster 1 / DTaP B1',
      weeks: 72,
      emoji: '💪',
      category: '18 Months',
    },
    {name: 'Hib Booster', weeks: 72, emoji: '🧬', category: '18 Months'},
    {name: 'IPV Booster', weeks: 72, emoji: '🧠', category: '18 Months'},

    /* ------------------ 18–19 MONTHS ------------------ */
    {
      name: 'Hepatitis A – 2 (Inactivated)',
      weeks: 78,
      emoji: '🍽️',
      category: '18 Months',
    },
    {name: 'Varicella – 2', weeks: 78, emoji: '🐔', category: '18 Months'},

    /* ------------------ 4–6 YEARS ------------------ */
    {
      name: 'DTwP Booster 2 / DTaP B2',
      weeks: 260,
      emoji: '💪',
      category: '4–6 Years',
    },
    {name: 'IPV Booster 2', weeks: 260, emoji: '🧠', category: '4–6 Years'},
    {name: 'MMR – 3', weeks: 260, emoji: '😷', category: '4–6 Years'},

    /* ------------------ 10–12 YEARS ------------------ */
    {name: 'Tdap', weeks: 520, emoji: '💪', category: '10–12 Years'},
    {name: 'HPV', weeks: 520, emoji: '🛡️', category: '10–12 Years'},
  ];

  const categories = [
    'All',
    'Birth',
    '6 Weeks',
    '10 Weeks',
    '14 Weeks',
    '6 Months',
    '7 Months',
    '9 Months',
    '12 Months',
    '15 Months',
    '18 Months',
    '4–6 Years',
    '10–12 Years',
  ];
  const getStatus = (sd, givenDate) => (givenDate ? 'Completed' : 'Upcoming');
  const filteredVaccines =
    selectedCategory === 'All'
      ? vaccines
      : vaccines.filter(v => v.category === selectedCategory);
  const babyBirthdateString = BABY_BIRTHDATE.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  const nextUpcomingVaccine = useMemo(() => {
    const today = new Date();
  
    const upcomingVaccines = vaccines
      .filter(v => !v.givenDate)
      .map(v => {
        const dueDate = new Date(BABY_BIRTHDATE);
  
        dueDate.setDate(
          dueDate.getDate() + v.weeks * 7,
        );
  
        return {
          ...v,
          dueDate,
        };
      })
      .sort((a, b) => a.dueDate - b.dueDate);
  
    const next = upcomingVaccines.find(
      v => v.dueDate >= today,
    );
  
    return next || upcomingVaccines[0];
  }, []);

  return (
    <View style={styles.screenContainer}>

{isCelebrationDay && (
  <View style={styles.flowerRainOverlay} pointerEvents="none">
    <ConfettiCannon
      key={blastKey}
      count={30}
      origin={{ x: width / 2, y: 0 }}
      autoStart
      fadeOut
      fallSpeed={4000}
      explosionSpeed={250}
      customElements={[
        <Text key="1" style={{ fontSize: 30 }}>🌸</Text>,
        <Text key="2" style={{ fontSize: 28 }}>🌹</Text>,
        <Text key="3" style={{ fontSize: 30 }}>🌻</Text>,
        <Text key="4" style={{ fontSize: 26 }}>🌼</Text>,
        <Text key="5" style={{ fontSize: 28 }}>🌺</Text>,
      ]}
    />
  </View>
)}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <ImageBackground
          source={require('../Assest/beta.jpeg')}
          style={styles.headerGradient}
          imageStyle={{
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
            style={styles.headerOverlay}>
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>
                🌸 Welcome — mera bachcha 🌸
              </Text>
              <Text style={styles.babyName}>{BABY_NAME}</Text>
              <Text style={styles.babyBirthdate}>
                👶 Born {babyBirthdateString}
              </Text>
              <Text style={styles.babyBlessing}>
                Healthy • Happy • Loved 💫
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        <AgeCard />

        {nextUpcomingVaccine && (
         <UpcomingInjectionCard
         vaccine={nextUpcomingVaccine}
    
       />
        )}

<Modal transparent visible={modalVisible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.cardContainer, { backgroundColor: COLORS.surface }]}>
          
          {/* Top Decorative Icon/Image Area */}
          <View style={styles.iconCircle}>
            <LinearGradient
              colors={['#E0F2FE', '#BAE6FD']} // Soft Blue Gradients
              style={styles.innerCircle}
            >
              <Icon name="baby-face-outline" size={50} color="#0284C7" />
            </LinearGradient>
          </View>

         
<Icon 
  name="star-four-points" 
  size={24} 
  color="#F59E0B" 
  style={styles.sparkleLeft} 
/>

<Icon 
  name="star-four-points-outline" 
  size={20} 
  color="#F59E0B" 
  style={styles.sparkleRight} 
/>

          <View style={styles.content}>
            <Text style={styles.titleText}>New Prince Arrived!</Text>
            <Text style={styles.modalSubText}>
              Your blessings will fill his life with joy and prosperity.
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleBlessed}
              style={styles.buttonWrapper}
            >
              <LinearGradient
                colors={['#0EA5E9', '#0284C7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Give Blessings 🙏</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
               onPress={() => {/* Close Logic */}} 
               style={styles.closeTextBtn}
            >
              <Text style={styles.maybeLater}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
 

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.filterButton,
                  selectedCategory === category && {
                    backgroundColor: COLORS.primary,
                  },
                ]}>
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedCategory === category &&
                      styles.filterButtonTextActive,
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.vaccineList}>
          {filteredVaccines.map((vaccine, index) => {
            const status = getStatus(new Date(), vaccine.givenDate);
            return (
              <View
                key={index}
                style={[
                  styles.vaccineCard,
                  {
                    backgroundColor:
                      status === 'Completed'
                        ? COLORS.primaryBg
                        : COLORS.accentLight,
                    borderLeftColor:
                      status === 'Completed' ? COLORS.success : COLORS.warning,
                  },
                ]}>
                <View style={styles.vaccineCardContent}>
                  <Text style={styles.vaccineIcon}>{vaccine.emoji}</Text>
                  <View style={styles.vaccineDetails}>
                    <Text style={styles.vaccineName}>{vaccine.name}</Text>
                    <Text style={styles.vaccineCategory}>
                      {vaccine.category}
                    </Text>
                    <Text style={styles.vaccineGivenDate}>
                      {vaccine.givenDate
                        ? `✅ Given on ${vaccine.givenDate}`
                        : '⏳ Upcoming'}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          status === 'Completed'
                            ? COLORS.success
                            : COLORS.warning,
                      },
                    ]}>
                    <Text style={styles.statusBadgeText}>{status}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

// --- MAIN ENTRY ---

export default function BabyHealthApp() {
  const [activeTab, setActiveTab] = useState('vaccines');
  const navigation = useNavigation();

  const handleTabPress = tabId => {
    if (tabId === 'pregnancy') navigation.navigate('Home');
    else if (tabId === 'activity') navigation.navigate('Activity');
    else if (tabId === 'feeding') navigation.navigate('Babyfood');
    else setActiveTab(tabId);
  };

  const tabs = [
    {id: 'vaccines', label: 'Vaccines', emoji: '💉'},
    {id: 'feeding', label: 'Food', emoji: '🍚'},
    {id: 'activity', label: 'Activity', emoji: '🤸'},
    {id: 'pregnancy', label: 'Pregnancy', emoji: '🤰'},
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: COLORS.background}]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.container}>
        {activeTab === 'vaccines' && <VaccineTrackerScreen />}
        {activeTab === 'feeding' && <MilkTrackerScreen />}
        {activeTab === 'pregnancy' && <PregnancyTrackerScreen />}
        {activeTab === 'activity' && <PregnancyTrackerScreen />}

        <View style={[styles.footer, {bottom: 90}]}>
          <TouchableOpacity
            style={styles.playMusicButton}
            onPress={() => navigation.navigate('Play')}>
            <LinearGradient
              colors={[COLORS.accent, COLORS.primaryLight]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.musicButtonGradient}>
              <Text style={styles.playMusicText}>🎵</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={[styles.tabNavigation, {backgroundColor: COLORS.surface}]}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => handleTabPress(tab.id)}
              style={[
                styles.tabButton,
                activeTab === tab.id && styles.tabButtonActive,
              ]}>
              <LinearGradient
                colors={
                  activeTab === tab.id
                    ? [COLORS.primary, COLORS.primaryLight]
                    : [COLORS.background, COLORS.background]
                }
                style={styles.tabButtonGradient}>
                <Text style={styles.tabButtonEmoji}>{tab.emoji}</Text>
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === tab.id && styles.tabButtonTextActive,
                  ]}>
                  {tab.label}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- STYLES ---

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: COLORS.background},
  screenContainer: {flex: 1, backgroundColor: COLORS.background},
  container: {flex: 1, paddingBottom: 75},
  scrollView: {flex: 1, paddingHorizontal: 0},
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  ageCardContainer: {marginHorizontal: 12, marginVertical: 14},
  ageCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    padding: 28,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: '#E0F2FE',
  },
  ageCardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ageCardpulse: {fontSize: 10, color: '#FF4D4D', fontWeight: '800'},
  ageCardPulse: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 10,
    color: '#EF4444',
    fontWeight: 'bold',
  },
  ageCardTitle: {fontSize: 18, fontWeight: '700', color: COLORS.text},
  ageGrid: {flexDirection: 'row', justifyContent: 'space-around'},
  ageItem: {alignItems: 'center', gap: 8},
  ageEmoji: {fontSize: 32},
  ageValueBox: {
    backgroundColor: 'linear-gradient(135deg, #ECFDF5 0%, #E0F2FE 100%)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    minWidth: 72,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  ageValue: {fontSize: 28, fontWeight: '900', color: COLORS.primary, letterSpacing: -0.5},
  ageLabel: {fontSize: 12, color: COLORS.textSecondary, fontWeight: '600'},
  // NEXT UP CARD STYLES (NEW)
  upcomingInjectionContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#F43F5E',
    shadowOpacity: 0.25,
    shadowRadius: 18,
  },
  upcomingInjectionGradient: {padding: 24, paddingTop: 18},
  floatingBadgeGlass: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  nextUpText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  cardHeaderRow: {flexDirection: 'row', alignItems: 'center'},
  iconBubbleWhite: {
    width: 65,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowOpacity: 0.1,
  },
  vaccineLargeIcon: {fontSize: 32},
  mainInfoSection: {flex: 1, paddingHorizontal: 15},
  vaxNameText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowRadius: 2,
  },
  vaxCategoryText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    fontWeight: '600',
  },
  glassDateBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 18,
    alignItems: 'center',
    minWidth: 70,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  dueLabel: {fontSize: 8, fontWeight: '900', color: '#FFFFFF', opacity: 0.9},
  dueDateValue: {fontSize: 18, fontWeight: '900', color: '#FFFFFF'},
  dueYearValue: {fontSize: 9, fontWeight: 'bold', color: '#FFFFFF'},
  careFooter: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  footerCareText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    flex: 1,
  },
  bellButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 6,
    borderRadius: 10,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  statCard: {
    flex: 1,
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  statEmoji: {fontSize: 32},
  statValue: {fontSize: 22, fontWeight: '800', color: COLORS.text, letterSpacing: -0.3},
  statLabel: {fontSize: 13, color: COLORS.textSecondary, fontWeight: '700'},
  addButton: {
    marginHorizontal: 16,
    marginVertical: 14,
    overflow: 'hidden',
    borderRadius: 20,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  addButtonGradient: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {fontSize: 17, fontWeight: '900', color: COLORS.surface, letterSpacing: -0.3},
  historySection: {paddingHorizontal: 16, paddingBottom: 18},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 14,
    letterSpacing: -0.4,
  },
  emptyState: {alignItems: 'center', paddingVertical: 40},
  emptyStateEmoji: {fontSize: 48, marginBottom: 12},
  emptyStateText: {fontSize: 14, color: COLORS.textSecondary},
  feedingCard: {
    borderLeftWidth: 6,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: COLORS.surface,
  },
  feedingHeader: {flexDirection: 'row', alignItems: 'center', gap: 14},
  feedingIconBox: {
    backgroundColor: COLORS.background,
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  feedingIcon: {fontSize: 28},
  feedingInfo: {flex: 1},
  feedingType: {fontSize: 15, fontWeight: '800', color: COLORS.text, letterSpacing: -0.2},
  feedingTime: {fontSize: 13, color: COLORS.textSecondary, marginTop: 4, fontWeight: '500'},
  feedingAmount: {gap: 6},
  feedingBadge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  feedingDuration: {fontSize: 11, fontWeight: '600', color: COLORS.text},
  feedingVolume: {fontSize: 11, fontWeight: '600', color: COLORS.text},
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 28,
    paddingBottom: 44,
    shadowOpacity: 0.15,
    shadowRadius: 24,
    backgroundColor: COLORS.surface,
  },
  modalDragHandle: {
    width: 48,
    height: 5,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    borderRadius: 3,
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  modalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
    marginTop: 14,
  },
  typeSelector: {flexDirection: 'row', gap: 12, marginBottom: 4},
  typeButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    elevation: 2,
  },
  typeButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: -0.2,
  },
  typeButtonTextActive: {color: COLORS.surface},
  input: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: '#F0F9FF',
    marginBottom: 4,
    elevation: 2,
    fontWeight: '500',
  },
  modalButtons: {flexDirection: 'row', gap: 14, marginTop: 28},
  modalButton: {flex: 1, overflow: 'hidden', borderRadius: 16},
  cancelButton: {backgroundColor: COLORS.background, borderWidth: 2, borderColor: COLORS.border},
  cancelButtonText: {
    paddingVertical: 18,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  saveButton: {overflow: 'hidden', borderRadius: 16},
  saveButtonGradient: {paddingVertical: 18, alignItems: 'center'},
  saveButtonText: {fontSize: 15, fontWeight: '900', color: COLORS.surface, letterSpacing: -0.2},
  headerGradient: {
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    elevation: 3,
  },
  headerOverlay: {padding: 28, paddingBottom: 38},
  welcomeText: {
    fontSize: 16,
    color: COLORS.surface,
    fontWeight: '800',
    opacity: 0.92,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  babyName: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.surface,
    marginBottom: 8,
    textAlign: 'center',
  },
  babyBirthdate: {
    fontSize: 16,
    color: COLORS.surface,
    marginBottom: 6,
    textAlign: 'center',
    opacity: 0.92,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  babyBlessing: {
    fontSize: 14,
    color: COLORS.surface,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.88,
  },
  pregnancyHeader: {
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    elevation: 3,
  },
  pregnancyHeaderContent: {
    padding: 28,
    alignItems: 'center',
    paddingBottom: 38,
  },
  pregnancyHeaderEmoji: {fontSize: 64, marginBottom: 14},
  pregnancyHeaderTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.surface,
    marginBottom: 14,
    letterSpacing: -0.4,
  },
  pregnancyWeek: {fontSize: 24, fontWeight: '900', color: COLORS.surface, letterSpacing: -0.3},
  pregnancyDays: {
    fontSize: 15,
    color: COLORS.surface,
    marginTop: 6,
    opacity: 0.92,
    fontWeight: '600',
  },
  progressSection: {paddingHorizontal: 16, paddingVertical: 22},
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  progressLabel: {fontSize: 16, fontWeight: '800', color: COLORS.text, letterSpacing: -0.2},
  progressPercent: {fontSize: 20, fontWeight: '900', color: COLORS.primary},
  progressBarContainer: {
    height: 14,
    backgroundColor: '#DBEAFE',
    borderRadius: 7,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  progressBar: {height: '100%', borderRadius: 7},
  checkupsSection: {paddingHorizontal: 16, paddingVertical: 18},
  checkupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 6,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    backgroundColor: COLORS.surface,
  },
  checkupLeft: {flexDirection: 'row', alignItems: 'center', flex: 1, gap: 14},
  checkupWeek: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkupWeekText: {fontSize: 14, fontWeight: '800', color: COLORS.surface},
  checkupInfo: {flex: 1},
  checkupType: {fontSize: 15, fontWeight: '700', color: COLORS.text},
  checkupDate: {fontSize: 12, color: COLORS.textSecondary, marginTop: 2},
  checkupStatus: {alignItems: 'center', justifyContent: 'center'},
  checkupStatusText: {fontSize: 18},
  tipsSection: {paddingHorizontal: 16, paddingVertical: 16},
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  tipCard: {
    width: '48%',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  tipEmoji: {fontSize: 36, marginBottom: 10},
  tipTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  tipDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)', // Darker blurred backdrop
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: width * 0.85,
    borderRadius: 30,
    paddingBottom: 25,
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  iconCircle: {
    marginTop: -40,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 60,
    elevation: 5,
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 15,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
    textAlign: 'center',
  },
  modalSubText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  buttonWrapper: {
    marginTop: 25,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sparkleLeft: { position: 'absolute', top: 60, left: 40 },
  sparkleRight: { position: 'absolute', top: 20, right: 40 },
  closeTextBtn: { marginTop: 15 },
  maybeLater: { color: '#94A3B8', fontSize: 13, fontWeight: '600' },
  gradientBlessed: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blessedText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.surface,
    letterSpacing: 1,
  },
  filterContainer: {paddingHorizontal: 16, paddingVertical: 15},
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  filterButtonTextActive: {color: COLORS.surface},
  vaccineList: {paddingHorizontal: 16, paddingBottom: 100},
  vaccineCard: {
    borderLeftWidth: 5,
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    backgroundColor: COLORS.surface,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  vaccineCardContent: {flexDirection: 'row', alignItems: 'center', gap: 12},
  vaccineIcon: {fontSize: 32},
  vaccineDetails: {flex: 1},
  vaccineName: {fontSize: 15, fontWeight: '800', color: COLORS.text},
  vaccineCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  vaccineGivenDate: {fontSize: 11, color: COLORS.textSecondary, marginTop: 4},
  statusBadge: {paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12},
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.surface,
    textTransform: 'uppercase',
  },
  tabNavigation: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 85,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  tabButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  tabButtonGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  tabButtonEmoji: {fontSize: 24, marginBottom: 4},
  tabButtonText: {fontSize: 10, fontWeight: '800', color: COLORS.textSecondary},
  tabButtonTextActive: {color: COLORS.surface, fontSize: 11},
  footer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
  },
  playMusicButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 10,
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  musicButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playMusicText: {fontSize: 30},
  ceremonyContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  annaprasanTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#7B3F00',
    textAlign: 'center',
    letterSpacing: 1,
  },
  goldDivider: {
    height: 2,
    width: '50%',
    backgroundColor: '#7B3F00',
    marginVertical: 10,
    opacity: 0.5,
  },
  ceremonyMainText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#B45309',
    marginBottom: 6,
  },
  ceremonySubText: {
    fontSize: 13,
    color: '#7B3F00',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 15,
    lineHeight: 18,
    marginBottom: 15,
  },
  ceremonyIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
  ceremonyItem: {
    alignItems: 'center',
  },
  ceremonyEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  ceremonyLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7B3F00',
  },
  celebrationShadow: {
    elevation: 12,
    shadowColor: '#F59E0B',
    shadowOpacity: 0.6,
    shadowRadius: 15,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  flowerRainOverlay: {
    position: 'absolute', // Poori screen par failane ke liye
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,        // Sabse upar dikhane ke liye
    elevation: 10,       // Android ke liye extra priority
  },
});
