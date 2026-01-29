import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  ImageBackground,Animated,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import PregnancyProgress from "./Pregnancy-progress"
import { checkAndNotifyMonthComplete } from "./MonthlyNotification"
import PregnancyDayTracker from "./PregnancyDayTracker"
import PregnancyWeekToMonth from "./PregnancyWeekToMonth"

import BottomNavigation from "./bottom-navigation"

const HomeScreen = ({ navigation }) => {
  // LMP date: February 18
  const lmpDate = new Date(new Date().getFullYear(), 1, 18) // Month is 0-indexed (1 = February)
  const babyBirthDate = new Date(2025, 10, 2) 
  const [showCongratsModal, setShowCongratsModal] = useState(false)
  const [showMonthModal, setShowMonthModal] = useState(false)

  const [showProgressDetails, setShowProgressDetails] = useState(false)
  const [pregnancyInfo, setPregnancyInfo] = useState({
    dueDate: null,
    currentWeek: 0,
    currentDay: 0,
    trimester: "",
    babySize: "",
    babySizeComparison: "",
  })

  useEffect(() => {
    checkAndNotifyMonthComplete()
  }, [])
  const [pulseAnim] = useState(new Animated.Value(1))
  useEffect(() => {
    checkAndNotifyMonthComplete()
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
    ).start()
  }, [])


  useEffect(() => {
    const calculatePregnancyInfo = () => {
      const today = new Date()
      const babyBirthDate = new Date(2025, 10, 2) // 👶 Baby born on 2 Nov 2025
  
      // 🍼 Stop updating after birth date
      const calculationDate = today > babyBirthDate ? babyBirthDate : today
  
      // Calculate due date (LMP + 280 days)
      const dueDate = new Date(lmpDate)
      dueDate.setDate(dueDate.getDate() + 280)
  
      // Calculate how far along (in days)
      const diffTime = Math.abs(calculationDate - lmpDate)
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
      // Calculate weeks and days
      const currentWeek = Math.floor(diffDays / 7)
      const currentDay = diffDays % 7
  
      // Determine trimester
      let trimester = ""
      if (currentWeek < 13) {
        trimester = "First"
      } else if (currentWeek < 27) {
        trimester = "Second"
      } else {
        trimester = "Third"
      }
  
      let babySize = ""
      let babySizeComparison = ""
  
      if (currentWeek < 5) {
        babySize = "< 0.1 inches"
        babySizeComparison = "Poppy Seed"
      } else if (currentWeek < 6) {
        babySize = "0.13 inches"
        babySizeComparison = "Sesame Seed"
      } else if (currentWeek < 7) {
        babySize = "0.25 inches"
        babySizeComparison = "Lentil"
      } else if (currentWeek < 8) {
        babySize = "0.5 inches"
        babySizeComparison = "Blueberry"
      } else if (currentWeek < 9) {
        babySize = "0.9 inches"
        babySizeComparison = "Raspberry"
      } else if (currentWeek < 10) {
        babySize = "1.2 inches"
        babySizeComparison = "Grape"
      } else if (currentWeek < 11) {
        babySize = "1.6 inches"
        babySizeComparison = "Lime"
      } else if (currentWeek < 12) {
        babySize = "2.1 inches"
        babySizeComparison = "Plum"
      } else if (currentWeek < 13) {
        babySize = "2.9 inches"
        babySizeComparison = "Peach"
      } else if (currentWeek < 14) {
        babySize = "3.4 inches"
        babySizeComparison = "Lemon"
      } else if (currentWeek < 15) {
        babySize = "4 inches"
        babySizeComparison = "Apple"
      } else if (currentWeek < 16) {
        babySize = "4.6 inches"
        babySizeComparison = "Avocado"
      } else if (currentWeek < 17) {
        babySize = "5.1 inches"
        babySizeComparison = "Turnip"
      } else if (currentWeek < 18) {
        babySize = "5.6 inches"
        babySizeComparison = "Sweet Potato"
      } else if (currentWeek < 19) {
        babySize = "6 inches"
        babySizeComparison = "Mango"
      } else if (currentWeek < 20) {
        babySize = "6.5 inches"
        babySizeComparison = "Banana"
      } else if (currentWeek < 21) {
        babySize = "10.5 inches"
        babySizeComparison = "Carrot"
      } else if (currentWeek < 22) {
        babySize = "10.9 inches"
        babySizeComparison = "Spaghetti Squash"
      } else if (currentWeek < 23) {
        babySize = "11.4 inches"
        babySizeComparison = "Grapefruit"
      } else if (currentWeek < 24) {
        babySize = "11.8 inches"
        babySizeComparison = "Cantaloupe"
      } else if (currentWeek < 25) {
        babySize = "13.6 inches"
        babySizeComparison = "Cauliflower"
      } else if (currentWeek < 26) {
        babySize = "14 inches"
        babySizeComparison = "Kale"
      } else if (currentWeek < 27) {
        babySize = "14.4 inches"
        babySizeComparison = "Lettuce"
      } else if (currentWeek < 28) {
        babySize = "14.8 inches"
        babySizeComparison = "Eggplant"
      } else if (currentWeek < 29) {
        babySize = "15.2 inches"
        babySizeComparison = "Butternut Squash"
      } else if (currentWeek < 30) {
        babySize = "15.7 inches"
        babySizeComparison = "Cabbage"
      } else if (currentWeek < 31) {
        babySize = "16.2 inches"
        babySizeComparison = "Coconut"
      } else if (currentWeek < 32) {
        babySize = "16.7 inches"
        babySizeComparison = "Pineapple"
      } else if (currentWeek < 33) {
        babySize = "17.2 inches"
        babySizeComparison = "Durian"
      } else if (currentWeek < 34) {
        babySize = "17.7 inches"
        babySizeComparison = "Pumpkin"
      } else if (currentWeek < 35) {
        babySize = "18.2 inches"
        babySizeComparison = "Honeydew Melon"
      } else if (currentWeek < 36) {
        babySize = "18.7 inches"
        babySizeComparison = "Papaya"
      } else if (currentWeek < 37) {
        babySize = "19.1 inches"
        babySizeComparison = "Pineapple"
      } else if (currentWeek < 38) {
        babySize = "19.6 inches"
        babySizeComparison = "Coconut"
      } else if (currentWeek < 39) {
        babySize = "20 inches"
        babySizeComparison = "Watermelon"
      } else if (currentWeek < 40) {
        babySize = "20.2 inches"
        babySizeComparison = "Small Pumpkin"
      } else {
        babySize = "20.5 inches"
        babySizeComparison = "Newborn 👶"
      }
  
      setPregnancyInfo({
        dueDate,
        currentWeek,
        currentDay,
        trimester,
        babySize,
        babySizeComparison,
      })
    }
  
    calculatePregnancyInfo()
    const timer = setInterval(calculatePregnancyInfo, 86400000)
  
    return () => clearInterval(timer)
  }, [])
  

  useEffect(() => {
    const checkAndShowModal = async () => {
      const lastShown = await AsyncStorage.getItem("dailyAlertDate")
      const today = new Date().toISOString().slice(0, 10)

      if (lastShown !== today && pregnancyInfo.currentWeek != null) {
        setShowCongratsModal(true)
        await AsyncStorage.setItem("dailyAlertDate", today)
      }
    }

    checkAndShowModal()
  }, [pregnancyInfo])

  // Format date for display
  const formatDate = (date) => {
    if (!date) return ""
    const options = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  // Calculate overall pregnancy progress (40 weeks total)
  const totalProgress = (pregnancyInfo.currentWeek / 40) * 100

  const babyImages = {
    12: require("../Assest/12week.jpg"),
    13: require("../Assest/13week.jpg"),
    14: require("../Assest/14.jpg"),
    15: require("../Assest/15.jpg"),
    16: require("../Assest/16.jpg"),
    17: require("../Assest/17.jpg"),
    18: require("../Assest/18.jpg"),
    19: require("../Assest/19.jpg"),
    20: require("../Assest/20.jpg"),
    21: require("../Assest/21.jpg"),
    22: require("../Assest/22.jpg"),
    23: require("../Assest/23.jpg"),
    24: require("../Assest/24.jpg"),
    25: require("../Assest/25.jpg"),
    26: require("../Assest/26.jpg"),
    27: require("../Assest/27.jpg"),
    28: require("../Assest/28.jpg"),
    29: require("../Assest/29.jpg"),
    30: require("../Assest/30.jpg"),
    31: require("../Assest/31.jpg"),
    32: require("../Assest/32.jpg"),
    33: require("../Assest/33.jpg"),
    34: require("../Assest/34.jpg"),
    35: require("../Assest/35.jpg"),
    36: require("../Assest/36.jpg"),
    37: require("../Assest/37.jpg"),
    38: require("../Assest/38.jpg"),
    39: require("../Assest/39.jpg"),
    40: require("../Assest/40.jpg"),
    41: require("../Assest/newBorn.webp"),
  }

  const getBabyImage = (week) => {
    // Always show newborn image once pregnancy completes
    return babyImages[41]
  }
  

  // const getBabyImage = (week) => {
  //   if (week > 36) {
  //     return babyImages[41] // always show 40th week image if week exceeds 40
  //   } else if (babyImages[week]) {
  //     return babyImages[week]
  //   } else {
  //     return babyImages[22] // fallback (in case of unexpected value)
  //   }
  // }
  
  // Calculate visible weeks
  const getVisibleWeeks = (currentWeek) => {
    const weeks = []
    const start = Math.max(currentWeek - 1, 1)
    for (let i = start; i < start + 6; i++) {
      weeks.push(i)
    }
    return weeks
  }

  // Get fruit emoji based on comparison
  const getFruitEmoji = () => {
    const comparison = pregnancyInfo.babySizeComparison
  
    if (comparison === "Poppy Seed") return "🖤"
    if (comparison === "Sesame Seed") return "⚪"
    if (comparison === "Lentil") return "🟤"
    if (comparison === "Blueberry") return "🫐"
    if (comparison === "Raspberry") return "🍓"
    if (comparison === "Grape") return "🍇"
    if (comparison === "Lime") return "🍈"
    if (comparison === "Plum") return "🟣"
    if (comparison === "Peach") return "🍑"
    if (comparison === "Lemon") return "🍋"
    if (comparison === "Apple") return "🍎"
    if (comparison === "Avocado") return "🥑"
    if (comparison === "Turnip") return "🧄" // closest alternative
    if (comparison === "Sweet Potato") return "🍠"
    if (comparison === "Mango") return "🥭"
    if (comparison === "Banana") return "🍌"
    if (comparison === "Carrot") return "🥕"
    if (comparison === "Spaghetti Squash") return "🎃"
    if (comparison === "Grapefruit") return "🍊"
    if (comparison === "Cantaloupe") return "🍈" // reused as cantaloupe emoji not available
    if (comparison === "Cauliflower") return "🥦"
    if (comparison === "Kale") return "🥬"
    if (comparison === "Lettuce") return "🥗"
    if (comparison === "Eggplant") return "🍆"
    if (comparison === "Butternut Squash" || comparison === "Pumpkin") return "🎃"
    if (comparison === "Cabbage") return "🥬"
    if (comparison === "Coconut") return "🥥"
    if (comparison === "Pineapple") return "🍍"
    if (comparison === "Durian") return "🟡" // no durian emoji yet
    if (comparison === "Honeydew Melon") return "🍈"
    if (comparison === "Papaya") return "🍈"
    if (comparison === "Pineapple") return "🍍"
    if (comparison === "Coconut") return "🥥" // closest alternative
    if (comparison === "Watermelon") return "🍉"
    if (comparison === "Small Pumpkin" || comparison === "Pumpkin") return "🎃"
    if (comparison === "Newborn") return "👶"
  
    return "🤰" // Default emoji if no match
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FF9E9E" barStyle="light-content" translucent={false} />

      {/* Congratulations Modal */}
      <Modal
        visible={showCongratsModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowCongratsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={["#FF6F91", "#FF9E9E"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalEmojiContainer}>
                  <Text style={styles.modalEmoji}>🎉</Text>
                </View>
                <Text style={styles.modalTitle}>Congratulations, Nici & Gautam!</Text>
              </View>
              <Text style={styles.modalText}>
                🌟 A beautiful milestone reached!{"\n\n"}
                Your precious baby is now:{"\n"}
                🗓️ {pregnancyInfo.currentWeek} weeks & {pregnancyInfo.currentDay} day old!{"\n\n"}
                Each week brings more love, joy, and excitement. Wishing you both endless happiness on this magical
                journey! 💖👶{"\n\n"}
                Keep glowing and growing together!
              </Text>
              <TouchableOpacity style={styles.modalButtons} onPress={() => setShowCongratsModal(false)}>
                <Text style={styles.modalButtonText}>So Blessed! 💕</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>

      {/* Progress Details Modal */}
      <Modal visible={showProgressDetails} animationType="slide" onRequestClose={() => setShowProgressDetails(false)}>
        <SafeAreaView style={styles.progressModalContainer}>
          <View style={styles.progressModalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowProgressDetails(false)}>
              <Ionicons name="close" size={24} color="#FF6B8B" />
            </TouchableOpacity>
            <Text style={styles.progressModalTitle}>Baby Growth Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <PregnancyProgress pregnancyInfo={pregnancyInfo} />
        </SafeAreaView>
      </Modal>


      <Modal
  visible={showMonthModal}
  animationType="slide"
  transparent
  onRequestClose={() => setShowMonthModal(false)}
>
  <View style={styles.modalOverlay}>
    <LinearGradient
      colors={["#FF9E9E", "#FF6F91"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.modalContainer}
    >
      <View style={styles.modalContents}>
        <Text style={styles.modalTitle}>Month-wise Pregnancy Weeks</Text>

        <ScrollView style={{ marginTop: 10 }}>
          {[
            { month: 1, weeks: "1 - 4" },
            { month: 2, weeks: "5 - 8" },
            { month: 3, weeks: "9 - 13" },
            { month: 4, weeks: "14 - 17" },
            { month: 5, weeks: "18 - 21" },
            { month: 6, weeks: "22 - 26" },
            { month: 7, weeks: "27 - 30" },
            { month: 8, weeks: "31 - 35" },
            { month: 9, weeks: "36 - 40" },
          ].map(({ month, weeks }) => {
            const isCurrentMonth =
              pregnancyInfo.currentWeek >= parseInt(weeks.split(" - ")[0]) &&
              pregnancyInfo.currentWeek <= parseInt(weeks.split(" - ")[1]);
            return (
              <LinearGradient
                key={month}
                colors={isCurrentMonth ? ["#FFD7E0", "#FFB8CC"] : ["#FFF5F7", "#FFE5EB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.monthCard,
                  isCurrentMonth && { shadowColor: "#FF6B8B", shadowOpacity: 0.4 },
                ]}
              >
                <Text style={[styles.monthLabel, isCurrentMonth && { color: "#FF6B8B" }]}>
                  Month {month}
                </Text>
                <Text style={styles.weekLabel}>{weeks} Weeks</Text>
              </LinearGradient>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => setShowMonthModal(false)}
        >
          <Text style={styles.modalButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </View>
</Modal>



      <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingBottom: 100 }]}>
        {/* Baby Image Background */}
        <ImageBackground
          source={getBabyImage(pregnancyInfo.currentWeek)}
          style={styles.babyImageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "transparent", "rgba(0,0,0,0.6)"]}
            style={[StyleSheet.absoluteFill]}
          />

          {/* Top Info Bar */}
          <View style={styles.topInfoBar}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Day</Text>
              <Text style={styles.infoValue}>{pregnancyInfo.currentDay}</Text>
            </View>

            <Animated.View style={[styles.weekBadge, { transform: [{ scale: pulseAnim }] }]}>
              <LinearGradient colors={["#FF6F91", "#FF9E9E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.weekBadgeGradient}>
                <Text style={styles.weekNumber}>{pregnancyInfo.currentWeek}</Text>
                <Text style={[styles.weekLabel, { color: "#fff" }]}>WEEK</Text>
              </LinearGradient>
            </Animated.View>

            {/* <View style={styles.weekBadge}>
              <LinearGradient
                colors={["#FF6F91", "#FF9E9E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.weekBadgeGradient}
              >
                <Text style={styles.weekNumber}>{pregnancyInfo.currentWeek}</Text>
                <Text style={[styles.weekLabel,{color:'#fff'}]}>WEEK</Text>
              </LinearGradient>
            </View> */}
            <View style={styles.infoCard}>
  <Text style={styles.infoLabel}>Trimester</Text>
  <TouchableOpacity onPress={() => navigation.navigate('MyBaby')}>
    <Text style={styles.infoValue}>{pregnancyInfo.trimester.split(" ")[0]}</Text>
  </TouchableOpacity>
</View>

            {/* <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Trimester</Text>
              <Text style={styles.infoValue}>{pregnancyInfo.trimester.split(" ")[0]}</Text>
            </View> */}
          </View>

          {/* Week Circles */}
          <View style={styles.bottomOverlay}>
      <View style={styles.weekScrollContainer}>
        {getVisibleWeeks(pregnancyInfo.currentWeek).map((week) => (
          <TouchableOpacity
            key={week}
            onPress={() => {
              if (week === pregnancyInfo.currentWeek) {
                navigation.navigate('monthwise'); 
                // 👆 "WeekDetails" ko apne screen ka naam se replace karo
              }
            }}
          >
            <View
              style={[
                styles.weekCircle,
                week === pregnancyInfo.currentWeek && styles.currentWeekCircle,
              ]}
            >
              <Text
                style={[
                  styles.weekCircleText,
                  week === pregnancyInfo.currentWeek && styles.currentWeekText,
                ]}
              >
                {week}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
        </ImageBackground>

        {/* Pregnancy Day Tracker */}
        <View style={styles.trackerContainer}>
          <PregnancyDayTracker />
        </View>

        {/* Week to Month Conversion - NEW SECTION */}
        <PregnancyWeekToMonth currentWeek={pregnancyInfo.currentWeek} />

        {/* Baby Size */}
        <View style={styles.babySizeContainer}>
          <LinearGradient colors={["#FFF", "#FFF5F7"]} style={styles.sectionGradient}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <MaterialCommunityIcons name="baby-face-outline" size={24} color="#FF6B8B" style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Baby Size</Text>
              </View>
              <TouchableOpacity style={styles.infoButton} onPress={() => setShowProgressDetails(true)}>
                <Text style={styles.infoButtonText}>More Info</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.babySizeContent}>
              <View style={styles.babySizeImageContainer}>
                <LinearGradient colors={["#FFE5EB", "#FFF5F7"]} style={styles.babySizeImageGradient}>
                  <Image source={require("../Assest/baby2.jpg")} style={styles.babySizeImage} resizeMode="contain" />
                </LinearGradient>
              </View>

              <View style={styles.babySizeDetails}>
                <Text style={styles.babySizeText}>{pregnancyInfo.babySize}</Text>
                <View style={styles.comparisonContainer}>
                  <Text style={styles.comparisonLabel}>Size of a</Text>
                  <View style={styles.fruitContainer}>
                    <Text style={styles.fruitEmoji}>{getFruitEmoji()}</Text>
                    <Text style={styles.babySizeComparison}>{pregnancyInfo.babySizeComparison}</Text>
                  </View>
                </View>

                {/* Size Progress Bar */}
                <View style={styles.sizeProgressContainer}>
                  <View style={styles.progressLabelContainer}>
                    <Text style={styles.sizeProgressLabel}>Growth Progress</Text>
                    <Text style={styles.progressPercentage}>{Math.round(totalProgress)}%</Text>
                  </View>
                  <View style={styles.sizeProgressBackground}>
                    <LinearGradient
                      colors={["#FF6F91", "#FF9E9E"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.sizeProgressFill, { width: `${totalProgress}%` }]}
                    />
                  </View>
                </View>

                <Text style={styles.babySizeDescription}>
  {pregnancyInfo.currentWeek < 36 ? (
    <>
      Your baby is developing rapidly!{" "}
      {pregnancyInfo.currentWeek < 13
        ? "Vital organs are forming."
        : pregnancyInfo.currentWeek < 27
        ? "Your baby can now hear sounds and is very active."
        : "Your baby is putting on weight and preparing for birth."}
    </>
  ) : (
    "🎉 Baby boy was born on 2 November 2025 — he is healthy and doing well! 💙"
  )}
</Text>


                {/* <Text style={styles.babySizeDescription}>
                  Your baby is developing rapidly!{" "}
                  {pregnancyInfo.currentWeek < 13
                    ? "Vital organs are forming."
                    : pregnancyInfo.currentWeek < 27
                      ? "Your baby can now hear sounds and is very active."
                      : "Your baby is putting on weightssss and preparing for birth."}
                </Text> */}
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.sectionTitleContainer}>
            <FontAwesome5 name="bolt" size={20} color="#FF6B8B" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("Appointment")}>
              <LinearGradient colors={["#FFE5EB", "#FFF5F7"]} style={styles.quickActionGradient}>
                <View style={[styles.quickActionIcon, { backgroundColor: "#FFE5EB" }]}>
                  <FontAwesome5 name="calendar-check" size={22} color="#FF6B8B" />
                </View>
                <Text style={styles.quickActionText}>Appointments</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("SymptomTracker")}>
              <LinearGradient colors={["#E8E1F0", "#F5F0FF"]} style={styles.quickActionGradient}>
                <View style={[styles.quickActionIcon, { backgroundColor: "#E8E1F0" }]}>
                  <Ionicons name="fitness-outline" size={22} color="#9C88B2" />
                </View>
                <Text style={styles.quickActionText}>Symptoms</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate("Development")}>
              <LinearGradient colors={["#D4E6F1", "#EAF2F8"]} style={styles.quickActionGradient}>
                <View style={[styles.quickActionIcon, { backgroundColor: "#D4E6F1" }]}>
                  <MaterialCommunityIcons name="baby-face-outline" size={22} color="#5DADE2" />
                </View>
                <Text style={styles.quickActionText}>Development</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton} onPress={() => setShowProgressDetails(true)}>
              <LinearGradient colors={["#D5F5E3", "#EAFAF1"]} style={styles.quickActionGradient}>
                <View style={[styles.quickActionIcon, { backgroundColor: "#D5F5E3" }]}>
                  <FontAwesome5 name="chart-line" size={22} color="#58D68D" />
                </View>
                <Text style={styles.quickActionText}>Growth Chart</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.appointmentsContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="calendar-outline" size={24} color="#FF6B8B" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            </View>
            <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate("Appointment")}>
              <Text style={styles.infoButtonText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.appointmentCard}>
            <LinearGradient colors={["#FFE5EB", "#FFF5F7"]} style={styles.appointmentDateGradient}>
              <Text style={styles.appointmentMonth}>OCT</Text>
              <Text style={styles.appointmentDay}>31</Text>
            </LinearGradient>

            <View style={styles.appointmentDetails}>
              <Text style={styles.appointmentTitle}>🩺Follow-up Consultation</Text>
              <View style={styles.appointmentInfo}>
                <Ionicons name="time-outline" size={14} color="#888" style={styles.appointmentIcon} />
                <Text style={styles.appointmentTime}>01:45 PM</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Ionicons name="location-outline" size={14} color="#888" style={styles.appointmentIcon} />
                <Text style={styles.appointmentLocation}>Uma Foundation</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.appointmentAction}>
              <View style={styles.appointmentActionButton}>
                <Ionicons name="chevron-forward" size={24} color="#FF6B8B" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.appointmentCard}>
            <LinearGradient colors={["#FFE5EB", "#FFF5F7"]} style={styles.appointmentDateGradient}>
              <Text style={styles.appointmentMonth}>NOV</Text>
              <Text style={styles.appointmentDay}>02</Text>
            </LinearGradient>

            <View style={styles.appointmentDetails}>
              <Text style={styles.appointmentTitle}>🩺 Operation Day C-section🤱</Text>
              <View style={styles.appointmentInfo}>
                <Ionicons name="time-outline" size={14} color="#888" style={styles.appointmentIcon} />
                <Text style={styles.appointmentTime}>9:30 AM</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Ionicons name="person-outline" size={14} color="#888" style={styles.appointmentIcon} />
                <Text style={styles.appointmentLocation}>Dr. Alka Pandey</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.appointmentAction}>
              <View style={styles.appointmentActionButton}>
                <Ionicons name="chevron-forward" size={24} color="#FF6B8B" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Tips */}
        <View style={styles.tipsContainer}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="bulb-outline" size={24} color="#FF6B8B" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>This Week's Tips</Text>
          </View>

          <View style={styles.tipCard}>
            <LinearGradient colors={["#D4E6F1", "#EAF2F8"]} style={styles.tipIconGradient}>
              <Ionicons name="water-outline" size={24} color="#5DADE2" />
            </LinearGradient>

            <View style={styles.tipDetails}>
              <Text style={styles.tipTitle}>Stay Hydrated</Text>
              <Text style={styles.tipDescription}>
                Drink at least 8-10 glasses of water daily to support your baby's development and your own health.
              </Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <LinearGradient colors={["#D5F5E3", "#EAFAF1"]} style={styles.tipIconGradient}>
              <FontAwesome5 name="walking" size={24} color="#58D68D" />
            </LinearGradient>

            <View style={styles.tipDetails}>
              <Text style={styles.tipTitle}>Gentle Exercise</Text>
              <Text style={styles.tipDescription}>
                Regular, gentle exercise like walking or prenatal yoga can help reduce discomfort and prepare your body
                for birth.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation - NEW COMPONENT */}
      <BottomNavigation currentScreen="Home" navigation={navigation} />

      {/* Music Button - Moved up to avoid overlap with bottom navigation */}
      <View style={[styles.footer, { bottom: 90 }]}>
        <TouchableOpacity style={styles.playMusicButton} onPress={() => navigation.navigate("Play")}>
          <LinearGradient
            colors={["#FF6F91", "#FF9E9E"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.musicButtonGradient}
          >
            <Text style={styles.playMusicText}>🎵</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  babyImageBackground: {
    width: "100%",
    height: 420,
    justifyContent: "space-between",
  },
  topInfoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    // marginTop: 0,
  },
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    minWidth: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B8B",
  },
  weekBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  weekBadgeGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  weekNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  weekLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomOverlay: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  weekScrollContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  weekCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  currentWeekCircle: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#FF6F91",
    transform: [{ scale: 1.2 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  weekCircleText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  currentWeekText: {
    color: "#FF6F91",
  },
  trackerContainer: {
    marginTop: -20,
    zIndex: 10,
    backgroundColor: "#FFF5F7",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionIcon: {
    marginRight: 10,
  },
  babySizeContainer: {
    padding: 20,
    borderRadius: 25,
    overflow: "hidden",
  },
  sectionGradient: {
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    fontFamily: "Avenir-Heavy",
  },
  infoButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#FFE5EB",
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  infoButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF6B8B",
  },
  babySizeContent: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  babySizeImageContainer: {
    width: 120,
    height: 190,
    borderRadius: 45,
    overflow: "hidden",
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  babySizeImageGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  babySizeImage: {
    width: 120,
    height: 180,
    borderRadius: 40,
  },
  babySizeDetails: {
    flex: 1,
    marginLeft: 16,
  },
  babySizeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6B8B",
  },
  comparisonContainer: {
    marginTop: 4,
    marginBottom: 8,
  },
  comparisonLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  fruitContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fruitEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  babySizeComparison: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  sizeProgressContainer: {
    marginTop: 8,
    marginBottom: 10,
  },
  progressLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  sizeProgressLabel: {
    fontSize: 12,
    color: "#888",
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF6B8B",
  },
  sizeProgressBackground: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
  },
  sizeProgressFill: {
    height: "100%",
    borderRadius: 4,
  },
  babySizeDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginTop: 6,
  },
  quickActionsContainer: {
    padding: 20,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
  },
  quickActionButton: {
    width: "48%",
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  quickActionGradient: {
    padding: 16,
    alignItems: "center",
    borderRadius: 20,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  appointmentsContainer: {
    padding: 20,
  },
  appointmentCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentDateGradient: {
    width: 60,
    height: 70,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  appointmentMonth: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF6B8B",
    marginBottom: 4,
  },
  appointmentDay: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B8B",
  },
  appointmentDetails: {
    flex: 1,
    marginLeft: 16,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  appointmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  appointmentIcon: {
    marginRight: 6,
  },
  appointmentTime: {
    fontSize: 14,
    color: "#666",
  },
  appointmentLocation: {
    fontSize: 14,
    color: "#666",
  },
  appointmentAction: {
    padding: 8,
  },
  appointmentActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFE5EB",
    justifyContent: "center",
    alignItems: "center",
  },
  tipsContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  tipIconGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tipDetails: {
    flex: 1,
    marginLeft: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  playMusicButton: {
    borderRadius: 30,
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  musicButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  playMusicText: {
    color: "#FFF",
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    borderRadius: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: "hidden",
  },
  modalContent: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  modalEmojiContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalEmoji: {
    fontSize: 40,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6B8B",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  modalButtonText: {
    color: "#FF6B8B",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressModalContainer: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
  progressModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  closeButton: {
    padding: 8,
  },
  progressModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6B8B",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContents: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    maxHeight: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF6B8B",
    textAlign: "center",
  },
  monthCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B8B",
  },
  weekLabel: {
    fontSize: 16,
    color: "#FF6B8B",
  },
  modalButton: {
    marginTop: 15,
    backgroundColor: "#FF6B8B",
    paddingVertical: 12,

    borderRadius: 12,
  },
  modalButtons: {
    marginTop: 15,
    backgroundColor: "#FF6B8B",
    paddingVertical: 12,
    paddingHorizontal:15,
    borderRadius: 12,
  },
  modalButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  
  
})

export default HomeScreen;




