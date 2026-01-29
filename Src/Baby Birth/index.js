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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const BABY_NAME = 'Dhruv Gautam';
const BABY_BIRTHDATE = new Date('2025-11-02');
const PREGNANCY_DUE_DATE = new Date('2025-12-15');

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
  startDate.setDate(startDate.getDate() - 280); // 40 weeks = 280 days

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

function AgeCard() {
  const age = useMemo(() => calculateAge(BABY_BIRTHDATE), []);

  const units = [
    {key: 'years', label: 'Years', emoji: '🎂'},
    {key: 'months', label: 'Months', emoji: '🗓️'},
    {key: 'days', label: 'Days', emoji: '☀️'},
  ];

  return (
    <View style={styles.ageCardContainer}>
      <LinearGradient
        colors={['#FFF5F7', '#F0E7FF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.ageCard}>
        <Text style={styles.ageCardTitle}>Dhruv Gautam's Age</Text>
        <View style={styles.ageGrid}>
          {units.map(({key, label, emoji}) => {
            const value = age[key];
            const colors =
              key === 'years'
                ? ['#FF6B9D', '#FF1493']
                : key === 'months'
                ? ['#00CED1', '#20B2AA']
                : ['#FFD700', '#FFA500'];
            return (
              <View style={styles.ageItem} key={key}>
                <Text style={styles.ageEmoji}>{emoji}</Text>
                <LinearGradient
                  colors={colors}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.ageValueBox}>
                  <Text style={styles.ageValue}>{value}</Text>
                </LinearGradient>
                <Text style={styles.ageLabel}>{label}</Text>
              </View>
            );
          })}
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
      ? {bg: '#FFF0F5', border: '#FF69B4', gradient: ['#FFE8F0', '#FFD6E8']}
      : {bg: '#E0F7F6', border: '#20B2AA', gradient: ['#E0F7F6', '#B2E8E8']};

  const colors = getTypeColor(feeding.type);
  return (
    <LinearGradient
      colors={colors.gradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={[styles.feedingCard, {borderLeftColor: colors.border}]}>
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
    </LinearGradient>
  );
}

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
    <View
      style={[
        styles.screenContainer,
        {marginHorizontal: 10, marginVertical: 40},
      ]}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Feeding Tracker</Text>
        <Text style={styles.headerSubtitle}>Track your baby's nutrition</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.statsRow}>
          <LinearGradient
            colors={['#FFE8F0', '#FFB6D9']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.statCard}>
            <Text style={styles.statEmoji}>🍼</Text>
            <Text style={styles.statValue}>{todayFeedings.length}</Text>
            <Text style={styles.statLabel}>Feedings</Text>
          </LinearGradient>
          <LinearGradient
            colors={['#E0F7F6', '#98E9E9']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.statCard}>
            <Text style={styles.statEmoji}>⏱️</Text>
            <Text style={styles.statValue}>{totalDuration}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </LinearGradient>
          <LinearGradient
            colors={['#FFF4E0', '#FFEAA7']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.statCard}>
            <Text style={styles.statEmoji}>💧</Text>
            <Text style={styles.statValue}>{totalVolume}</Text>
            <Text style={styles.statLabel}>ml Formula</Text>
          </LinearGradient>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}>
          <LinearGradient
            colors={['#FF6B9D', '#FF1493']}
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
          <LinearGradient
            colors={['#FFFFFF', '#F8F9FF']}
            style={styles.modalContent}>
            <Text style={styles.modalTitle}>Record Feeding</Text>
            <Text style={styles.modalLabel}>Feeding Type</Text>
            <View style={styles.typeSelector}>
              {['breast', 'formula'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedType(type)}
                  style={[
                    styles.typeButton,
                    selectedType === type && styles.typeButtonActive,
                    selectedType === type && styles.typeButtonActiveBg,
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
              placeholderTextColor="#CCC"
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
                  placeholderTextColor="#CCC"
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
                  colors={['#FF6B9D', '#FF8CB7']}
                  style={styles.saveButtonGradient}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
}

function PregnancyTrackerScreen() {
  const pregnancyData = calculatePregnancyProgress(PREGNANCY_DUE_DATE);

  const [checkups, setCheckups] = useState([
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
          colors={['#FF6B9D', '#FF1493']}
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

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>Pregnancy Progress</Text>
            <Text style={styles.progressPercent}>
              {Math.round(pregnancyData.progress)}%
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={['#00CED1', '#20B2AA']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[
                styles.progressBar,
                {width: `${pregnancyData.progress}%`},
              ]}
            />
          </View>
        </View>

        {/* Checkups */}
        <View style={styles.checkupsSection}>
          <Text style={styles.sectionTitle}>Medical Checkups</Text>
          {checkups.map(checkup => (
            <LinearGradient
              key={checkup.id}
              colors={
                checkup.status === 'Completed'
                  ? ['#E8F5E9', '#C8E6C9']
                  : ['#FFF9C4', '#FFEB3B']
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.checkupCard}>
              <View style={styles.checkupLeft}>
                <View
                  style={[
                    styles.checkupWeek,
                    checkup.status === 'Completed'
                      ? styles.checkupWeekCompleted
                      : styles.checkupWeekUpcoming,
                  ]}>
                  <Text style={styles.checkupWeekText}>W{checkup.week}</Text>
                </View>
                <View style={styles.checkupInfo}>
                  <Text style={styles.checkupType}>{checkup.type}</Text>
                  <Text style={styles.checkupDate}>{checkup.date}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.checkupStatus,
                  checkup.status === 'Completed'
                    ? styles.checkupStatusCompleted
                    : styles.checkupStatusUpcoming,
                ]}>
                <Text
                  style={[
                    styles.checkupStatusText,
                    checkup.status === 'Completed' &&
                      styles.checkupStatusTextCompleted,
                  ]}>
                  {checkup.status === 'Completed' ? '✅' : '⏳'}
                </Text>
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Daily Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Wellness Tips</Text>
          <View style={styles.tipsGrid}>
            {tips.map((tip, index) => (
              <LinearGradient
                key={index}
                colors={
                  index % 4 === 0
                    ? ['#FFE8F0', '#FFB6D9']
                    : index % 4 === 1
                    ? ['#E0F7F6', '#98E9E9']
                    : index % 4 === 2
                    ? ['#FFF4E0', '#FFEAA7']
                    : ['#F3E5F5', '#E1BEE7']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.tipCard}>
                <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDesc}>{tip.desc}</Text>
              </LinearGradient>
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
  // 🕒 Check if modal was already shown today
  useEffect(() => {
    checkBlessingStatus();
  }, []);

  const checkBlessingStatus = async () => {
    try {
      const today = new Date().toDateString(); // "Mon Nov 03 2025"
      const lastBlessed = await AsyncStorage.getItem('lastBlessedDate');

      if (lastBlessed !== today) {
        // 🩷 Not blessed today → show modal
        setModalVisible(true);
      }
    } catch (error) {
      console.log('Error checking blessing status:', error);
    }
  };

  const handleBlessed = async () => {
    try {
      const today = new Date().toDateString();
      await AsyncStorage.setItem('lastBlessedDate', today);
      setModalVisible(false);
    } catch (error) {
      console.log('Error saving blessed date:', error);
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
    {name: 'DTwP 3 / DTaP 3', weeks: 14, emoji: '💪', category: '14 Weeks'},
    {name: 'IPV 3', weeks: 14, emoji: '🧠', category: '14 Weeks'},
    {name: 'Hib 3', weeks: 14, emoji: '🧬', category: '14 Weeks'},
    {name: 'Hepatitis B – 4', weeks: 14, emoji: '🛡️', category: '14 Weeks'},
    {name: 'Rotavirus 3', weeks: 14, emoji: '🌀', category: '14 Weeks'},
    {name: 'PCV 3', weeks: 14, emoji: '🫁', category: '14 Weeks'},

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

  // const categories = ["All", "Birth", "6 Weeks", "10 Weeks", "9 Months","12 Months", "15 Months","16 Months","18 Months","2 YEARS","4-6 YEARS","10-12 YEARS","16 YEARS"]

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

  const getStatus = (scheduledDate, givenDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    scheduledDate.setHours(0, 0, 0, 0);

    // ✅ Vaccine actually given
    if (givenDate) return 'Completed';

    // 🟡 Due today
    if (scheduledDate.getTime() === today.getTime()) return 'Today';

    const daysUntil = Math.floor(
      (scheduledDate - today) / (1000 * 60 * 60 * 24),
    );

    // 🔵 Due this week
    if (daysUntil > 0 && daysUntil <= 7) return 'This Week';

    // ⚪ Not due yet
    return 'Upcoming';
  };

  const filteredVaccines =
    selectedCategory === 'All'
      ? vaccines
      : vaccines.filter(v => v.category === selectedCategory);

  const babyBirthdateString = BABY_BIRTHDATE.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <ImageBackground
          source={require('../Assest/beta.jpeg')} // ✅ correct your image path
          style={styles.headerGradient}
          imageStyle={{borderBottomLeftRadius: 24, borderBottomRightRadius: 24}}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
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

        {/* 🙏 Blessing Modal */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Image
                source={require('../Assest/beta.jpeg')}
                style={styles.babyImage}
                resizeMode="cover"
              />
              <Text style={styles.modalText}>
                ✨ Give your blessings to this sweet baby Boy! ✨
              </Text>

              <TouchableOpacity
                onPress={handleBlessed}
                style={styles.blessedButton}>
                <LinearGradient
                  colors={['#FF6F91', '#FF9E9E']}
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
                  selectedCategory === category && styles.filterButtonActive,
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
            const scheduledDate = new Date(BABY_BIRTHDATE);
            scheduledDate.setDate(scheduledDate.getDate() + vaccine.weeks * 7);
            const status = getStatus(
              new Date(scheduledDate),
              vaccine.givenDate,
            );

            return (
              <View
                key={index}
                style={[
                  styles.vaccineCard,
                  status === 'Completed' && styles.vaccineCardCompleted,
                  status === 'Today' && styles.vaccineCardToday,
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
                      status === 'Completed' && styles.statusBadgeCompleted,
                      status === 'Today' && styles.statusBadgeToday,
                      status === 'This Week' && styles.statusBadgeThisWeek,
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

export default function BabyHealthApp() {
  const [activeTab, setActiveTab] = useState('vaccines');
  const navigation = useNavigation();

  const handleTabPress = tabId => {
    if (tabId === 'pregnancy') {
      navigation.navigate('Home'); // 👶 Navigate to Home screen
    } else if (tabId === 'activity') {
      navigation.navigate('Activity'); // 👶 Navigate to Home screen
    } else {
      setActiveTab(tabId); // for other tabs, just change state
    }
  };

  const tabs = [
    {id: 'vaccines', label: 'Vaccines', emoji: '💉'},
    {id: 'feeding', label: 'Feeding', emoji: '🍼'},
    {id: 'activity', label: 'Activity', emoji: '🤸'},
    {id: 'pregnancy', label: 'Pregnancy', emoji: '🤰'},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
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
              colors={['#FF6F91', '#FF9E9E']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.musicButtonGradient}>
              <Text style={styles.playMusicText}>🎵</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.tabNavigation}>
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
                    ? ['#FF6B9D', '#FF8CB7']
                    : ['#F5F5F5', '#F5F5F5']
                }
                style={styles.tabButtonGradient}>
                <Text
                  style={[
                    styles.tabButtonEmoji,
                    activeTab === tab.id && styles.tabButtonEmojiActive,
                  ]}>
                  {tab.emoji}
                </Text>
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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  container: {
    flex: 1,
    paddingBottom: 75,
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: -4},
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 75,
    paddingBottom: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  tabButtonGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 6,
    marginVertical: 6,
  },
  tabButtonActive: {},
  tabButtonEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabButtonEmojiActive: {
    fontSize: 26,
  },
  tabButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999999',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },

  headerGradient: {
    height: 350, // 👶 visible image area
    width: '100%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },

  headerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },

  headerContent: {
    padding: 20,
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 18,
    color: '#FFE4EC',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },

  babyName: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },

  babyBirthdate: {
    fontSize: 16,
    color: '#FDECEF',
    marginTop: 6,
    fontStyle: 'italic',
  },

  babyBlessing: {
    marginTop: 8,
    fontSize: 14,
    color: '#FFD6E0',
    letterSpacing: 0.5,
  },
  vaccineGivenDate: {
    color: 'gray',
    fontSize: 14,
    marginVertical: 10,
    paddingVertical: 4,
  },

  ageCardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  ageCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  ageCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  ageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  ageItem: {
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  ageEmoji: {
    fontSize: 28,
  },
  ageValueBox: {
    width: 72,
    height: 72,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  ageValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  ageLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    shadowColor: '#FF6B9D',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginTop: 6,
  },

  addButton: {
    overflow: 'hidden',
    borderRadius: 18,
    marginVertical: 20,
    shadowColor: '#FF6B9D',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  addButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 0.5,
  },

  historySection: {
    paddingVertical: 12,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#333',
    marginBottom: 18,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyStateEmoji: {
    fontSize: 48,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },

  vaccineList: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  vaccineCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderLeftWidth: 8,
    borderLeftColor: '#BDBDBD',
    padding: 18,
    marginBottom: 14,
    elevation: 3,
  },
  vaccineCardCompleted: {
    backgroundColor: '#E8F5E9',
    borderLeftColor: '#81C784',
  },
  vaccineCardToday: {
    backgroundColor: '#FFF8E1',
    borderLeftColor: '#FFD54F',
  },
  vaccineCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vaccineIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  vaccineDetails: {
    flex: 1,
  },
  vaccineName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#333',
  },
  vaccineCategory: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
  },
  statusBadgeCompleted: {
    backgroundColor: '#C8E6C9',
  },
  statusBadgeToday: {
    backgroundColor: '#FFECB3',
  },
  statusBadgeThisWeek: {
    backgroundColor: '#BBDEFB',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },

  feedingCard: {
    borderLeftWidth: 6,
    padding: 16,
    marginBottom: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  feedingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  feedingIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  feedingIcon: {
    fontSize: 32,
  },
  feedingInfo: {
    flex: 1,
  },
  feedingType: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  feedingTime: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    fontWeight: '500',
  },
  feedingAmount: {
    alignItems: 'flex-end',
  },
  feedingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginVertical: 4,
  },
  feedingDuration: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  feedingVolume: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 36,
    maxHeight: height * 0.75,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FF6B9D',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 8,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeButtonActive: {
    borderColor: '#FF6B9D',
  },
  typeButtonActiveBg: {
    backgroundColor: '#FFE8F0',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#999',
  },
  typeButtonTextActive: {
    color: '#FF6B9D',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 24,
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 12,
  },
  cancelButtonText: {
    paddingVertical: 14,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#999',
  },
  saveButton: {
    elevation: 6,
  },
  saveButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
  },

  categoryScroll: {
    marginVertical: 12,
  },
  categoryContent: {
    paddingHorizontal: 12,
    gap: 10,
  },
  categoryButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  categoryButtonGradient: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },

  vaccineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingVertical: 12,
  },

  pregnancyHeader: {
    padding: 28,
    borderRadius: 24,
    marginVertical: 16,
    alignItems: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  pregnancyHeaderContent: {
    alignItems: 'center',
    gap: 12,
  },
  pregnancyHeaderEmoji: {
    fontSize: 48,
  },
  pregnancyHeaderTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  pregnancyWeek: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  pregnancyDays: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.95,
  },

  progressSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: '800',
    color: '#00CED1',
  },
  progressBarContainer: {
    height: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 3,
  },
  progressBar: {
    height: '100%',
    borderRadius: 12,
  },

  checkupsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  checkupCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  checkupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  checkupWeek: {
    width: 52,
    height: 52,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD93D',
    shadowColor: '#FFD93D',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkupWeekCompleted: {
    backgroundColor: '#4CAF50',
  },
  checkupWeekUpcoming: {
    backgroundColor: '#FFD93D',
  },
  checkupWeekText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checkupInfo: {
    gap: 6,
  },
  checkupType: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  checkupDate: {
    fontSize: 12,
    color: '#777',
    fontWeight: '500',
  },
  checkupStatus: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkupStatusCompleted: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  checkupStatusUpcoming: {
    backgroundColor: 'rgba(255, 217, 61, 0.2)',
  },
  checkupStatusText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  checkupStatusTextCompleted: {
    color: '#4CAF50',
  },
  checkupCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 6,
    borderLeftColor: '#FFD93D',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  checkupCardCompleted: {
    borderLeftColor: '#4ECDC4',
    backgroundColor: '#F0FFFE',
  },
  checkupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkupWeek: {
    backgroundColor: '#FFE8F0',
    borderRadius: 14,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  checkupWeekText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FF6B9D',
  },
  checkupInfo: {
    flex: 1,
  },
  checkupType: {
    fontSize: 16,
    fontWeight: '900',
    color: '#333',
  },
  checkupDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  checkupStatus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkupStatusCompleted: {
    backgroundColor: '#E8F5E9',
  },
  checkupStatusUpcoming: {
    backgroundColor: '#FFF8E1',
  },
  checkupStatusText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFD93D',
  },
  checkupStatusTextCompleted: {
    color: '#4ECDC4',
  },

  tipsSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tipCard: {
    width: '48%',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tipEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  tipDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playMusicButton: {
    borderRadius: 30,
    shadowColor: '#FF6B8B',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  musicButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  playMusicText: {
    color: '#FFF',
    fontSize: 24,
  },
  blessButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // 🔥 soft dim background
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  babyImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#FFB6C1',
    marginBottom: 15,
  },

  modalText: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
    lineHeight: 26,
  },

  blessedButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientBlessed: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  blessedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  blessingModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blessingModalContent: {
    width: '85%',
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  blessingTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  blessingText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 28,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
  },
  blessingButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  blessingButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blessingButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FF6B9D',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  vaccineEmoji: {
    fontSize: 28,
  },
  vaccineInfo: {
    flex: 1,
  },
  vaccineName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  vaccineCategory: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
    marginTop: 4,
  },
  vaccineDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    fontWeight: '500',
  },
  vaccineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  vaccineStatusBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4CAF50',
  },
  givenDate: {
    fontSize: 11,
    color: '#888',
    fontWeight: '500',
  },
  filterContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  filterButton: {
    marginRight: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF6B9D',
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: '#FF6B9D',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B9D',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
});
