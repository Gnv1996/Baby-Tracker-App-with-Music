import { View, Text, StyleSheet, Dimensions, Image, ScrollView, StatusBar } from "react-native"
import { LinearGradient } from "react-native-linear-gradient"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const { width } = Dimensions.get("window")

const PregnancyProgress = ({ pregnancyInfo }) => {
  // Calculate overall pregnancy progress (40 weeks total)
  const totalProgress = (pregnancyInfo.currentWeek / 40) * 100
  const currentMonth = Math.floor(pregnancyInfo.currentWeek / 4)

  console.warn(pregnancyInfo,"see the data")
  const totalWeeks = 40
  const totalMonths = 9

  const remainingMonths = totalMonths - currentMonth
  const remainingDays = 7 - pregnancyInfo.currentDay
  const adjustedRemainingDays = remainingDays === 7 ? 0 : remainingDays
  const remainingWeeks = totalWeeks - pregnancyInfo.currentWeek - (adjustedRemainingDays === 0 ? 0 : 1)
  const adjustedRemainingWeeks = remainingDays === 7 ? remainingWeeks + 1 : remainingWeeks

  // Calculate trimester progress
  const trimesterProgress = (() => {
    if (pregnancyInfo.currentWeek < 13) {
      // First trimester (weeks 1-12)
      return (pregnancyInfo.currentWeek / 12) * 100
    } else if (pregnancyInfo.currentWeek < 27) {
      // Second trimester (weeks 13-26)
      return ((pregnancyInfo.currentWeek - 12) / 14) * 100
    } else {
      // Third trimester (weeks 27-40)
      return ((pregnancyInfo.currentWeek - 26) / 14) * 100
    }
  })()

  // Get current trimester number
  const trimesterNumber = pregnancyInfo.currentWeek < 13 ? 1 : pregnancyInfo.currentWeek < 27 ? 2 : 3

  // Get development milestones based on current week
  const getMilestone = () => {
    const week = pregnancyInfo.currentWeek;
  
    if (week < 6) return "Neural tube is forming";
    if (week < 8) return "Major organs are developing";
    if (week < 10) return "Baby’s heart is beating";
    if (week < 13) return "Fingers and toes are forming";
    if (week < 16) return "Baby’s movements begin (you won’t feel yet)";
    if (week < 20) return "Baby can hear sounds and might respond";
    if (week < 23) return "Baby’s skin is developing, looks red and wrinkled";
    if (week < 27) return "Baby’s kicks are stronger and more frequent";
    if (week < 30) return "Baby’s lungs are maturing";
    if (week < 34) return "Baby is gaining weight quickly";
    if (week < 36) return "Baby’s body is practicing breathing";
    if (week < 38) return "Baby is settling into birth position";
    if (week < 40) return "Baby is full-term and ready!";
    return "Baby may arrive any day now!";
  };
  

  // Get baby weight based on current week
  const getBabyWeight = () => {
    const week = pregnancyInfo.currentWeek;
  
    if (week < 10) return "< 3g";
    if (week < 11) return "5g";
    if (week < 12) return "8g";
    if (week < 13) return "14g";
    if (week < 14) return "23g";
    if (week < 15) return "43g";
    if (week < 16) return "70g";
    if (week < 17) return "100g";
    if (week < 18) return "140g";
    if (week < 19) return "190g";
    if (week < 20) return "240g";
    if (week < 21) return "300g";
    if (week < 22) return "407g";
    if (week < 23) return "430g";
    if (week < 24) return "500g";
    if (week < 25) return "600g";
    if (week < 26) return "700g";
    if (week < 27) return "800g";
    if (week < 28) return "900g";
    if (week < 29) return "1000g";
    if (week < 30) return "1150g";
    if (week < 31) return "1300g";
    if (week < 32) return "1500g";
    if (week < 33) return "1700g";
    if (week < 34) return "1900g";
    if (week < 35) return "2100g";
    if (week < 36) return "2300g";
    if (week < 37) return "2500g";
    if (week < 38) return "2700g";
    if (week < 39) return "2900g";
    if (week < 40) return "3100g";
    return "~3500g"; // Full term
  };
  

  // Get fruit emoji based on comparison
// Get fruit emoji based on comparison
const getFruitEmoji = () => {
  const comparison = pregnancyInfo.babySizeComparison

  switch (comparison) {
    case "Poppy Seed": return "🖤"
    case "Sesame Seed": return "⚪"
    case "Lentil": return "🟤"
    case "Blueberry": return "🫐"
    case "Raspberry": return "🍓"
    case "Grape": return "🍇"
    case "Lime": return "🍈"
    case "Plum": return "🟣" // or 🍑 if you prefer visual similarity
    case "Peach": return "🍑"
    case "Lemon": return "🍋"
    case "Apple": return "🍎"
    case "Banana": return "🍌"
    case "Eggplant": return "🍆"
    case "Cabbage": return "🥬"
    case "Papaya": return "🍈"
    case "Pineapple": return "🍍"
    case "Coconut": return "🥥"
    case "Watermelon": return "🍉"
    case "Pumpkin": return "🎃"
    default: return "🤰"
  }
}


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar backgroundColor="#FF6B8B" barStyle="light-content" translucent={false} />
      
      {/* Overall Progress */}
      <View style={styles.headerSection}>
        <LinearGradient
          colors={["#FF6F91", "#FF9E9E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Your Pregnancy Journey</Text>
          <View style={styles.weekBadge}>
            <Text style={styles.weekNumber}>{pregnancyInfo.currentWeek}</Text>
            <Text style={styles.weekLabel}>WEEKS</Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <LinearGradient
                colors={["#FFF", "#FFE5EB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBar, { width: `${totalProgress}%` }]}
              />
            </View>
            
            <View style={styles.milestoneMarkers}>
              <View style={[styles.milestone, { left: "30%" }]}>
                <Text style={styles.milestoneText}>T1</Text>
              </View>
              <View style={[styles.milestone, { left: "65%" }]}>
                <Text style={styles.milestoneText}>T2</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.progressDetails}>
            <View style={styles.progressDetail}>
              <Text style={styles.progressLabel}>Month</Text>
              <Text style={styles.progressValue}>{currentMonth}</Text>
            </View>
            <View style={{borderRightColor:'white',borderRightWidth:2}}/>
  
        
            
            <View style={styles.progressDetail}>
              <Text style={styles.progressLabel}>Week</Text>
              <Text style={styles.progressValue}>{pregnancyInfo.currentWeek}</Text>
            </View>
            <View style={styles.progressDetail}>
              <Text style={styles.progressLabel}>Day</Text>
              <Text style={styles.progressValue}>{pregnancyInfo.currentDay}</Text>
            </View>
            <View style={styles.progressDetail}>
              <Text style={styles.progressLabel}>Completed</Text>
              <Text style={styles.progressValue}>{Math.round(totalProgress)}%</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Trimester Progress */}
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <MaterialCommunityIcons
            name={trimesterNumber === 1 ? "sprout" : trimesterNumber === 2 ? "flower" : "fruit-cherries"}
            size={24}
            color="#FF6F91"
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>Trimester Progress</Text>
        </View>
        
        <View style={styles.trimesterContainer}>
          <View style={styles.trimesterHeader}>
            <View style={styles.trimesterIconContainer}>
              <MaterialCommunityIcons
                name={trimesterNumber === 1 ? "sprout" : trimesterNumber === 2 ? "flower" : "fruit-cherries"}
                size={24}
                color="#FF6F91"
              />
            </View>
            <View style={styles.trimesterTitleContainer}>
              <Text style={styles.trimesterTitle}>Trimester {trimesterNumber}</Text>
              <Text style={styles.trimesterWeeks}>
                {trimesterNumber === 1 ? "Weeks 1-12" : trimesterNumber === 2 ? "Weeks 13-26" : "Weeks 27-40"}
              </Text>
            </View>
          </View>

          <View style={styles.trimesterProgressBarContainer}>
            <LinearGradient
              colors={["#FF6F91", "#FF9E9E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.trimesterProgressBar, { width: `${trimesterProgress}%` }]}
            />
            <View style={[styles.trimesterProgressCircle, { left: `${trimesterProgress}%` }]}>
              <Text style={styles.trimesterProgressText}>{Math.round(trimesterProgress)}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Baby Growth */}
      <View style={styles.section}>
  <View style={styles.sectionTitleContainer}>
    <MaterialCommunityIcons name="baby-face-outline" size={24} color="#FF6F91" style={styles.sectionIcon} />
    <Text style={styles.sectionTitle}>Baby Growth</Text>
  </View>

  <View style={styles.babyGrowthContainer}>
    {/* Left: Baby Image */}
    <View style={styles.babyImageContainer}>
      <Image
        source={require("../Assest/baby.jpg")}
        style={styles.babyImage}
        resizeMode="contain"
      />
    </View>

    {/* Right: Details */}
    <View style={styles.babyDetails}>
      <View style={styles.babyMetrics}>
        <View style={styles.babyMetric}>
          <Text style={styles.babyMetricLabel}>Size</Text>
          <Text style={styles.babyMetricValue}>{pregnancyInfo.babySize}</Text>
          <View style={styles.sizeProgressContainer}>
            <LinearGradient
              colors={["#FF6F91", "#FF9E9E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.sizeProgressBar, { width: `${(pregnancyInfo.currentWeek / 40) * 100}%` }]}
            />
          </View>
        </View>

        <View style={styles.babyMetric}>
          <Text style={styles.babyMetricLabel}>Weight</Text>
          <Text style={styles.babyMetricValue}>{getBabyWeight()}</Text>
          <View style={styles.weightProgressContainer}>
            <LinearGradient
              colors={["#FF6F91", "#FF9E9E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.weightProgressBar, { width: `${(pregnancyInfo.currentWeek / 40) * 100}%` }]}
            />
          </View>
        </View>
      </View>

      <View style={styles.babyComparison}>
        <Text style={styles.babyComparisonLabel}>Size of a</Text>
        <View style={styles.fruitContainer}>
          <Text style={styles.fruitEmoji}>{getFruitEmoji()}</Text>
          <Text style={styles.fruitName}>{pregnancyInfo.babySizeComparison}</Text>
        </View>
      </View>
    </View>
  </View>
</View>


      {/* Time Remaining */}
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons name="time-outline" size={24} color="#FF6F91" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Time Remaining</Text>
        </View>

        <View style={styles.remainingTimeContainer}>
          <View style={styles.timeBoxesRow}>
            <View style={[styles.timeBox, styles.monthBox]}>
              <Text style={styles.timeValue}>{remainingMonths}</Text>
              <Text style={styles.timeLabel}>Months</Text>
            </View>
            
            <View style={styles.timeBoxDivider}>
              <Text style={styles.timeBoxDividerText}>or</Text>
            </View>
            
            <View style={styles.weekDayGroup}>
              <View style={styles.weekDayRow}>
                <View style={styles.timeBox}>
                  <Text style={styles.timeValue}>{adjustedRemainingWeeks}</Text>
                  <Text style={styles.timeLabel}>Weeks</Text>
                </View>
                <View style={styles.timeBox}>
                  <Text style={styles.timeValue}>{adjustedRemainingDays}</Text>
                  <Text style={styles.timeLabel}>Days</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.dueContainer}>
            <Text style={styles.dueLabel}>Estimated Due Date</Text>
            <Text style={styles.dueDate}>
              {pregnancyInfo.dueDate ? pregnancyInfo.dueDate.toLocaleDateString("en-US", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              }) : "Loading..."}
            </Text>
          </View>
        </View>
      </View>

      {/* Development Milestone */}
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Ionicons name="star" size={24} color="#FF6F91" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Development Milestone</Text>
        </View>
        
        <View style={styles.milestoneContainer}>
          <View style={styles.milestoneContent}>
            <View style={styles.milestoneIconContainer}>
              <Ionicons name="star" size={24} color="#FF6F91" />
            </View>
            <Text style={styles.milestoneDescription}>{getMilestone()}</Text>
          </View>
          
          <View style={styles.milestoneWeekBadge}>
            <Text style={styles.milestoneWeekText}>Week {pregnancyInfo.currentWeek}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  headerSection: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  headerGradient: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  weekBadge: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  weekNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF6B8B",
  },
  weekLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
    letterSpacing: 1,
  },
  progressBarContainer: {
    width: "100%",
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 8,
  },
  milestoneMarkers: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  milestone: {
    position: "absolute",
    width: 2,
    height: 16,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  milestoneText: {
    position: "absolute",
    top: 16,
    left: -8,
    fontSize: 10,
    color: "#FFF",
    fontWeight: "bold",
  },
  progressDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 15,
  },
  progressDetail: {
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  progressValues: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginTop:20
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  trimesterContainer: {
    width: "100%",
  },
  trimesterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  trimesterIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFE5EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  trimesterTitleContainer: {
    flex: 1,
  },
  trimesterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  trimesterWeeks: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  trimesterProgressBarContainer: {
    height: 24,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  trimesterProgressBar: {
    height: "100%",
    borderRadius: 12,
  },
  trimesterProgressCircle: {
    position: "absolute",
    top: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#FF6B8B",
    transform: [{ translateX: -24 }],
  },
  trimesterProgressText: {
    fontSize: 8,
    // fontWeight: "bold",
    color: "#FF6B8B",
  },
  babyGrowthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFF0F3',
    borderRadius: 16,
  },
  
  babyImageContainer: {
    flex: 1, // 1 part of the container
    paddingRight: 10,
  },
  
  babyImage: {
    width: '100%',
    height: 150,
  },
  
  babyDetails: {
    flex: 2, // 2 parts of the container
    justifyContent: 'space-between',
  },
  
  babyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  babyMetric: {
    flex: 1,
    marginRight: 10,
  },
  
  babyMetricLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  
  babyMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6F91',
    marginBottom: 4,
  },
  
  sizeProgressContainer: {
    height: 6,
    backgroundColor: '#FFD1DC',
    borderRadius: 3,
  },
  
  sizeProgressBar: {
    height: 6,
    borderRadius: 3,
  },
  
  weightProgressContainer: {
    height: 6,
    backgroundColor: '#FFD1DC',
    borderRadius: 3,
  },
  
  weightProgressBar: {
    height: 6,
    borderRadius: 3,
  },
  
  babyComparison: {
    marginTop: 12,
  },
  
  babyComparisonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  
  fruitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  fruitEmoji: {
    fontSize: 20,
    marginRight: 6,
  },
  
  fruitName: {
    fontSize: 16,
    color: '#333',
  },
  
  remainingTimeContainer: {
    alignItems: "center",
  },
  timeBoxesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  timeBoxDivider: {
    marginHorizontal: 10,
  },
  timeBoxDividerText: {
    color: "#888",
    fontWeight: "500",
  },
  monthBox: {
    backgroundColor: "#FFE5EB",
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  timeBox: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    minWidth: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#444",
  },
  timeLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  weekDayGroup: {
    alignItems: "center",
  },
  weekDayRow: {
    flexDirection: "row",
  },
  dueContainer: {
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    padding: 15,
    width: "100%",
  },
  dueLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B8B",
  },
  milestoneContainer: {
    backgroundColor: "#FFE5EB",
    borderRadius: 15,
    padding: 16,
    position: "relative",
  },
  milestoneContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  milestoneIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  milestoneDescription: {
    flex: 1,
    fontSize: 16,
    color: "#444",
    fontWeight: "600",
    lineHeight: 22,
  },
  milestoneWeekBadge: {
    position: "absolute",
    top: -10,
    right: 15,
    backgroundColor: "#FF6B8B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  milestoneWeekText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
})

export default PregnancyProgress
