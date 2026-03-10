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

const {width, height} = Dimensions.get('window');

// --- CONSTANTS & LOGIC (UNTOUCHED) ---
const BABY_NAME = 'Dhruv Gautam';
const BABY_BIRTHDATE = new Date('2025-11-02');
const PREGNANCY_DUE_DATE = new Date('2025-12-15');

const COLORS = {
  primary: '#2D5A4F',
  primaryLight: '#4A7C6E',
  primaryBg: '#F0F6F4',
  accent: '#E8A89B',
  accentLight: '#F5E6E3',
  success: '#6BA587',
  warning: '#EDB88B',
  background: '#FAFBF9',
  surface: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
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
  const age = useMemo(() => calculateAge(BABY_BIRTHDATE), []);
  const units = [
    {key: 'years', label: 'Years', emoji: '🎂'},
    {key: 'months', label: 'Months', emoji: '📅'},
    {key: 'days', label: 'Days', emoji: '☀️'},
  ];

  return (
    <View style={styles.ageCardContainer}>
      <View style={styles.ageCard}>
        <View style={styles.ageCardHeaderRow}>
          <Text style={styles.ageCardTitle}>{BABY_NAME}'s Age</Text>
          <Text style={styles.ageCardPulse}>● Live</Text>
        </View>
        <View style={styles.ageGrid}>
          {units.map(({key, label, emoji}) => {
            const value = age[key];
            return (
              <View style={styles.ageItem} key={key}>
                <Text style={styles.ageEmoji}>{emoji}</Text>
                <View style={styles.ageValueBox}>
                  <Text style={styles.ageValue}>{value}</Text>
                </View>
                <Text style={styles.ageLabel}>{label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function UpcomingInjectionCard({vaccine, scheduledDate}) {
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
              {scheduledDate.split(' ')[0]}
            </Text>
            <Text style={styles.dueYearValue}>
              {scheduledDate.split(' ').slice(1).join(' ')}
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

function MilkTrackerScreen() {
  const [feedings, setFeedings] = useState([
    {
      id: 1,
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'breast',
      duration: 15,
    },
    {
      id: 2,
      time: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: 'formula',
      duration: 8,
      volume: 100,
    },
    {
      id: 3,
      time: new Date(Date.now() - 12 * 60 * 60 * 1000),
      type: 'breast',
      duration: 18,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('breast');
  const [duration, setDuration] = useState('');
  const [volume, setVolume] = useState('');

  const addFeeding = () => {
    if (!duration || (selectedType === 'formula' && !volume)) return;
    const newFeed = {
      id: feedings.length + 1,
      time: new Date(),
      type: selectedType,
      duration: Number(duration),
      volume: selectedType === 'formula' ? Number(volume) : null,
    };
    setFeedings([newFeed, ...feedings]);
    setDuration('');
    setVolume('');
    setModalVisible(false);
  };

  const todayFeedings = feedings.filter(f => {
    const today = new Date();
    return (
      f.time.getDate() === today.getDate() &&
      f.time.getMonth() === today.getMonth() &&
      f.time.getFullYear() === today.getFullYear()
    );
  });

  const totalDuration = todayFeedings.reduce((sum, f) => sum + f.duration, 0);
  const totalVolume = todayFeedings
    .filter(f => f.type === 'formula')
    .reduce((sum, f) => sum + (f.volume || 0), 0);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Feeding Tracker</Text>
        <Text style={styles.headerSubtitle}>Track your baby's nutrition</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.statsRow}>
          <View
            style={[styles.statCard, {backgroundColor: COLORS.accentLight}]}>
            <Text style={styles.statEmoji}>🍼</Text>
            <Text style={styles.statValue}>{todayFeedings.length}</Text>
            <Text style={styles.statLabel}>Feedings</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor: COLORS.primaryBg}]}>
            <Text style={styles.statEmoji}>⏱️</Text>
            <Text style={styles.statValue}>{totalDuration}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor: '#FEF3E0'}]}>
            <Text style={styles.statEmoji}>💧</Text>
            <Text style={styles.statValue}>{totalVolume}</Text>
            <Text style={styles.statLabel}>ml Formula</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryLight]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.addButtonGradient}>
            <Text style={styles.addButtonText}>+ Record Feeding</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Today's Feedings</Text>
          {todayFeedings.length > 0 ? (
            todayFeedings.map(feeding => (
              <MilkFeedingCard key={feeding.id} feeding={feeding} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateEmoji}>🍼</Text>
              <Text style={styles.emptyStateText}>
                No feedings recorded yet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, {backgroundColor: COLORS.surface}]}>
            <View style={styles.modalDragHandle} />
            <Text style={styles.modalTitle}>Record Feeding</Text>
            <Text style={styles.modalLabel}>Feeding Type</Text>
            <View style={styles.typeSelector}>
              {['breast', 'formula'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedType(type)}
                  style={[
                    styles.typeButton,
                    selectedType === type && {backgroundColor: COLORS.primary},
                  ]}>
                  <Text
                    style={[
                      styles.typeButtonText,
                      selectedType === type && styles.typeButtonTextActive,
                    ]}>
                    {type === 'breast' ? '🍼 Breast' : '👶 Formula'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.modalLabel}>Duration (minutes)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter duration"
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
              placeholderTextColor={COLORS.textSecondary}
            />
            {selectedType === 'formula' && (
              <>
                <Text style={styles.modalLabel}>Volume (ml)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter volume"
                  keyboardType="numeric"
                  value={volume}
                  onChangeText={setVolume}
                  placeholderTextColor={COLORS.textSecondary}
                />
              </>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addFeeding}
                style={[styles.modalButton, styles.saveButton]}>
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primaryLight]}
                  style={styles.saveButtonGradient}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
    {name: 'Influenza (IIV) – 1', weeks: 24, emoji: '🤧', category: '6 Months'},

    /* ------------------ 7 MONTHS ------------------ */
    {name: 'Influenza (IIV) – 2', weeks: 28, emoji: '🤧', category: '7 Months'},

    /* ------------------ 6–9 MONTHS ------------------ */
    {
      name: 'Typhoid Conjugate Vaccine',
      weeks: 36,
      emoji: '🥼',
      category: '9 Months',
    },

    /* ------------------ 9 MONTHS ------------------ */
    {name: 'MMR – 1', weeks: 36, emoji: '😷', category: '9 Months'},

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
    const babyAgeWeeks = Math.floor(
      (today - BABY_BIRTHDATE) / (1000 * 60 * 60 * 24 * 7),
    );
    const upcomingVaccines = vaccines.filter(v => !v.givenDate);
    if (upcomingVaccines.length === 0) return null;
    const sorted = [...upcomingVaccines].sort((a, b) => a.weeks - b.weeks);
    let nextVaccine = sorted.find(v => v.weeks >= babyAgeWeeks);
    if (!nextVaccine) nextVaccine = sorted[0];
    return nextVaccine;
  }, []);

  return (
    <View style={styles.screenContainer}>
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
            scheduledDate={'2 May 2026'}
          />
        )}

        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.blessingModalContainer,
                {backgroundColor: COLORS.surface},
              ]}>
              <View style={styles.modalDecorativeCircle} />
              <Text style={styles.modalText}>
                ✨ Give your blessings to this sweet baby Boy! ✨
              </Text>
              <TouchableOpacity
                onPress={handleBlessed}
                style={styles.blessedButton}>
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primaryLight]}
                  style={styles.gradientBlessed}>
                  <Text style={styles.blessedText}>🙏 Blessed 🙏</Text>
                </LinearGradient>
              </TouchableOpacity>
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
    {id: 'feeding', label: 'Feeding', emoji: '🍼'},
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  ageCardContainer: {marginHorizontal: 16, marginVertical: 16},
  ageCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
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
    backgroundColor: COLORS.primaryBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  ageValue: {fontSize: 20, fontWeight: '700', color: COLORS.primary},
  ageLabel: {fontSize: 12, color: COLORS.textSecondary, fontWeight: '600'},
  // NEXT UP CARD STYLES (NEW)
  upcomingInjectionContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#FF7F7F',
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  upcomingInjectionGradient: {padding: 20, paddingTop: 15},
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
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    elevation: 2,
  },
  statEmoji: {fontSize: 28},
  statValue: {fontSize: 20, fontWeight: '700', color: COLORS.text},
  statLabel: {fontSize: 12, color: COLORS.textSecondary, fontWeight: '600'},
  addButton: {
    marginHorizontal: 16,
    marginVertical: 12,
    overflow: 'hidden',
    borderRadius: 16,
  },
  addButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {fontSize: 16, fontWeight: '800', color: COLORS.surface},
  historySection: {paddingHorizontal: 16, paddingBottom: 16},
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  emptyState: {alignItems: 'center', paddingVertical: 40},
  emptyStateEmoji: {fontSize: 48, marginBottom: 12},
  emptyStateText: {fontSize: 14, color: COLORS.textSecondary},
  feedingCard: {
    borderLeftWidth: 6,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  feedingHeader: {flexDirection: 'row', alignItems: 'center', gap: 12},
  feedingIconBox: {
    backgroundColor: COLORS.surface,
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedingIcon: {fontSize: 24},
  feedingInfo: {flex: 1},
  feedingType: {fontSize: 14, fontWeight: '700', color: COLORS.text},
  feedingTime: {fontSize: 12, color: COLORS.textSecondary, marginTop: 2},
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  modalDragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    borderRadius: 3,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 12,
  },
  typeSelector: {flexDirection: 'row', gap: 12, marginBottom: 4},
  typeButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  typeButtonTextActive: {color: COLORS.surface},
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: '#FAFAFA',
    marginBottom: 4,
  },
  modalButtons: {flexDirection: 'row', gap: 12, marginTop: 25},
  modalButton: {flex: 1, overflow: 'hidden', borderRadius: 14},
  cancelButton: {backgroundColor: '#F3F4F6'},
  cancelButtonText: {
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  saveButton: {overflow: 'hidden', borderRadius: 14},
  saveButtonGradient: {paddingVertical: 16, alignItems: 'center'},
  saveButtonText: {fontSize: 14, fontWeight: '800', color: COLORS.surface},
  headerGradient: {
    height: 280,
    width: '100%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  headerOverlay: {padding: 25, paddingBottom: 35},
  welcomeText: {
    fontSize: 15,
    color: COLORS.surface,
    fontWeight: '700',
    opacity: 0.9,
    marginBottom: 10,
    textAlign: 'center',
  },
  babyName: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.surface,
    marginBottom: 8,
    textAlign: 'center',
  },
  babyBirthdate: {
    fontSize: 15,
    color: COLORS.surface,
    marginBottom: 4,
    textAlign: 'center',
    opacity: 0.9,
  },
  babyBlessing: {
    fontSize: 13,
    color: COLORS.surface,
    fontWeight: '600',
    textAlign: 'center',
  },
  pregnancyHeader: {
    height: 280,
    width: '100%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  pregnancyHeaderContent: {
    padding: 25,
    alignItems: 'center',
    paddingBottom: 35,
  },
  pregnancyHeaderEmoji: {fontSize: 56, marginBottom: 12},
  pregnancyHeaderTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.surface,
    marginBottom: 12,
  },
  pregnancyWeek: {fontSize: 20, fontWeight: '800', color: COLORS.surface},
  pregnancyDays: {
    fontSize: 14,
    color: COLORS.surface,
    marginTop: 4,
    opacity: 0.9,
  },
  progressSection: {paddingHorizontal: 16, paddingVertical: 20},
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {fontSize: 15, fontWeight: '700', color: COLORS.text},
  progressPercent: {fontSize: 18, fontWeight: '800', color: COLORS.primary},
  progressBarContainer: {
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {height: '100%', borderRadius: 5},
  checkupsSection: {paddingHorizontal: 16, paddingVertical: 16},
  checkupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 6,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  checkupLeft: {flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12},
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
    elevation: 1,
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blessingModalContainer: {
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '85%',
    overflow: 'hidden',
  },
  modalDecorativeCircle: {
    position: 'absolute',
    top: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.primaryBg,
    opacity: 0.5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },
  blessedButton: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 18,
    elevation: 5,
  },
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
    borderLeftWidth: 6,
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
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
});
