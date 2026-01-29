import React, { useState, useEffect } from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Animated, 
  Dimensions,
  Modal,
  SafeAreaView
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const { width, height } = Dimensions.get('window')

const PregnancyWeekToMonth = () => {
  const [expanded, setExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [animation] = useState(new Animated.Value(0))
  const [currentWeek, setCurrentWeek] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(0)
  const [daysPregnant, setDaysPregnant] = useState(0)
  
  // LMP Date: February 18, 2025
  const lmpDate = new Date(2025, 1, 18) // 1 = February (0-indexed)

  // Corrected pregnancy timeline with proper calendar months
  const weekToMonthData = [
    { 
      month: 1, 
      weeks: [1, 2, 3, 4], 
      description: "Early development",
      icon: "eye-outline",
      color: ["#FFE5E5", "#FFF0F0"],
      accentColor: "#FF8A80",
      details: "Neural tube forms, heart begins to beat",
      monthName: "February-March" // LMP starts Feb 18
    },
    { 
      month: 2, 
      weeks: [5, 6, 7, 8], 
      description: "Major organs forming",
      icon: "heart-outline",
      color: ["#FFF3E0", "#FFF8F0"],
      accentColor: "#FFB74D",
      details: "Arms and legs develop, facial features form",
      monthName: "March-April" // March 2025
    },
    { 
      month: 3, 
      weeks: [9, 10, 11, 12, 13], 
      description: "End of first trimester",
      icon: "flower-outline",
      color: ["#E8F5E8", "#F0FFF0"],
      accentColor: "#81C784",
      details: "All major organs present, baby can move",
      monthName: "April-May" // April 2025
    },
    { 
      month: 4, 
      weeks: [14, 15, 16, 17], 
      description: "Gender may be visible",
      icon: "eye-outline",
      color: ["#E3F2FD", "#F0F8FF"],
      accentColor: "#64B5F6",
      details: "Hair and nails grow, skeleton hardens",
      monthName: "May-June" // May 2025
    },
    { 
      month: 5, 
      weeks: [18, 19, 20, 21], 
      description: "You may feel movement",
      icon: "leaf-outline",
      color: ["#F3E5F5", "#FAF0FC"],
      accentColor: "#BA68C8",
      details: "Baby can hear sounds, develops sleep patterns",
      monthName: "June-July" // June 2025 - Current month
    },
    { 
      month: 6, 
      weeks: [22, 23, 24, 25, 26], 
      description: "End of second trimester",
      icon: "star-outline",
      color: ["#FFF9C4", "#FFFEF0"],
      accentColor: "#FFD54F",
      details: "Eyes open, brain develops rapidly",
      monthName: "July-August" // July 2025
    },
    { 
      month: 7, 
      weeks: [27, 28, 29, 30], 
      description: "Baby gains weight rapidly",
      icon: "trending-up-outline",
      color: ["#FFECB3", "#FFF8E1"],
      accentColor: "#FFB74D",
      details: "Can survive outside womb with care",
      monthName: "August-September" // August 2025
    },
    { 
      month: 8, 
      weeks: [31, 32, 33, 34, 35], 
      description: "Lungs are developing",
      icon: "leaf-outline",
      color: ["#E0F2F1", "#F0FFF8"],
      accentColor: "#4DB6AC",
      details: "Bones harden, immune system develops",
      monthName: "September-October" // September 2025
    },
    { 
      month: 9, 
      weeks: [36, 37, 38, 39, 40], 
      description: "Full term, ready for birth",
      icon: "gift-outline",
      color: ["#FCE4EC", "#FFF0F5"],
      accentColor: "#F06292",
      details: "Fully developed, ready for delivery",
      monthName: "October-November" // October-November 2025
    },
  ]

  // Calculate current pregnancy week and month based on LMP
  useEffect(() => {
    const calculatePregnancyInfo = () => {
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - lmpDate.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      // Calculate weeks (pregnancy weeks start from LMP)
      const calculatedWeek = Math.floor(diffDays / 7) + 1 // Add 1 because pregnancy starts at week 1
      
      // Find current month based on week
      let calculatedMonth = 1
      for (const monthData of weekToMonthData) {
        if (monthData.weeks.includes(calculatedWeek)) {
          calculatedMonth = monthData.month
          break
        }
      }

      // If week is beyond 40, cap it
      const finalWeek = Math.min(calculatedWeek, 40)
      
      setCurrentWeek(finalWeek)
      setCurrentMonth(calculatedMonth)
      setDaysPregnant(diffDays)
    }

    calculatePregnancyInfo()
    // Update daily
    const timer = setInterval(calculatePregnancyInfo, 86400000)
    return () => clearInterval(timer)
  }, [])

  const getCalendarMonth = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long' };
    return today.toLocaleDateString('en-US', options);
  }

  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1
    setExpanded(!expanded)
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start()
  }

  const currentMonthData = weekToMonthData.find(data => data.month === currentMonth)

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 380],
  })

  const iconRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  // Format LMP date for display
  const formatLMPDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return lmpDate.toLocaleDateString('en-US', options)
  }

  // Calculate due date (LMP + 280 days)
  const getDueDate = () => {
    const dueDate = new Date(lmpDate)
    dueDate.setDate(dueDate.getDate() + 280)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return dueDate.toLocaleDateString('en-US', options)
  }

  // Get estimated delivery month for display
  const getEstimatedDeliveryMonth = () => {
    const dueDate = new Date(lmpDate)
    dueDate.setDate(dueDate.getDate() + 280)
    const options = { month: 'long', year: 'numeric' }
    return dueDate.toLocaleDateString('en-US', options)
  }

  // Calendar Grid Component
  const CalendarGrid = () => {
    const renderWeekGrid = () => {
      const weeks = Array.from({ length: 40 }, (_, i) => i + 1)
      const rows = []
      
      for (let i = 0; i < weeks.length; i += 4) {
        const weekRow = weeks.slice(i, i + 4)
        rows.push(
          <View key={i} style={styles.calendarRow}>
            {weekRow.map(week => {
              const monthData = weekToMonthData.find(m => m.weeks.includes(week))
              const isCurrentWeek = week === currentWeek
              const isPastWeek = week < currentWeek
              
              return (
                <TouchableOpacity
                  key={week}
                  style={[
                    styles.calendarCell,
                    isCurrentWeek && styles.currentCalendarCell,
                    isPastWeek && styles.pastCalendarCell,
                    { backgroundColor: monthData ? monthData.accentColor + '20' : '#F5F5F5' }
                  ]}
                  onPress={() => {
                    // Handle week selection if needed
                  }}
                >
                  <Text style={[
                    styles.calendarCellText,
                    isCurrentWeek && styles.currentCalendarCellText,
                    isPastWeek && styles.pastCalendarCellText
                  ]}>
                    {week}
                  </Text>
                  <Text style={[
                    styles.calendarCellMonth,
                    isCurrentWeek && styles.currentCalendarCellMonth,
                    isPastWeek && styles.pastCalendarCellMonth
                  ]}>
                    M{monthData?.month}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        )
      }
      return rows
    }

    return (
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>Pregnancy Calendar View</Text>
        <Text style={styles.calendarSubtitle}>
          LMP: {formatLMPDate()} • Due: {getDueDate()} • Today: {getCalendarMonth()}
        </Text>
        <Text style={styles.calendarNote}>
          Expected delivery: {getEstimatedDeliveryMonth()}
        </Text>

        <View style={styles.calendarHeader}>
          <Text style={styles.calendarHeaderText}>Week 1-4</Text>
          <Text style={styles.calendarHeaderText}>Week 5-8</Text>
          <Text style={styles.calendarHeaderText}>Week 9-12</Text>
          <Text style={styles.calendarHeaderText}>Week 13-16</Text>
        </View>
        <ScrollView style={styles.calendarScrollView}>
          {renderWeekGrid()}
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <TouchableOpacity 
        style={styles.headerContainer} 
        onPress={toggleExpanded} 
        activeOpacity={0.9}
      >
        <LinearGradient 
          colors={["#FF6F91", "#FF9E9E", "#FFB3BA"]} 
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
          
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.monthBadge}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
                  style={styles.monthBadgeGradient}
                >
                  <Text style={styles.monthBadgeNumber}>{currentMonth}</Text>
                  <Text style={styles.monthBadgeLabel}>MONTH</Text>
                </LinearGradient>
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Pregnancy Timeline</Text>
                <Text style={styles.headerSubtitle}>
                  {currentMonthData?.monthName} • Week {currentWeek}
                </Text>
                <Text style={styles.headerDescription}>
                  {currentMonthData?.description}
                </Text>
                <Text style={styles.headerDays}>
                  {daysPregnant} days pregnant
                </Text>
              </View>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.calendarButton}
                onPress={() => setShowModal(true)}
              >
                <Ionicons name="calendar-outline" size={20} color="#FFF" />
              </TouchableOpacity>
              
              <Animated.View 
                style={[
                  styles.iconContainer,
                  { transform: [{ rotate: iconRotation }] }
                ]}
              >
                <Ionicons name="chevron-down" size={24} color="#FF6B8B" />
              </Animated.View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Enhanced Content */}
      <Animated.View style={[styles.contentWrapper, { height: animatedHeight }]}>
        <View style={styles.contentContainer}>
          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressTitle}>Pregnancy Journey</Text>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={["#FF6F91", "#FF9E9E"]}
                style={[styles.progressFill, { width: `${(currentMonth / 9) * 100}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{Math.round((currentMonth / 9) * 100)}% Complete</Text>
          </View>

          {/* Enhanced month cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.monthsScrollContainer}
            decelerationRate="fast"
            snapToInterval={200}
          >
            {weekToMonthData.map((monthData, index) => {
              const isCurrentMonth = monthData.month === currentMonth
              const isPastMonth = monthData.month < currentMonth

              return (
                <View 
                  key={monthData.month} 
                  style={[
                    styles.monthCard,
                    isCurrentMonth && styles.currentMonthCard,
                    isPastMonth && styles.pastMonthCard
                  ]}
                >
                  <LinearGradient
                    colors={
                      isCurrentMonth 
                        ? ["#FF6F91", "#FF9E9E"] 
                        : isPastMonth
                        ? ["#E8F5E8", "#F0FFF0"]
                        : monthData.color
                    }
                    style={styles.monthCardGradient}
                  >
                    <View style={styles.monthHeader}>
                      <View style={[
                        styles.monthIconContainer,
                        { backgroundColor: isCurrentMonth ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)' }
                      ]}>
                        <Ionicons 
                          name={monthData.icon} 
                          size={20} 
                          color={isCurrentMonth ? '#FFF' : monthData.accentColor} 
                        />
                      </View>
                      <View style={styles.monthTitleContainer}>
                        <Text style={[
                          styles.monthNumber, 
                          isCurrentMonth && styles.currentMonthNumber,
                          isPastMonth && styles.pastMonthNumber
                        ]}>
                          Month {monthData.month}
                        </Text>
                        <Text style={[
                          styles.monthName,
                          isCurrentMonth && styles.currentMonthName,
                          isPastMonth && styles.pastMonthName
                        ]}>
                          {monthData.monthName}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.weeksContainer}>
                      {monthData.weeks.map((week) => {
                        const isCurrentWeek = week === currentWeek
                        const isPastWeek = week < currentWeek
                        
                        return (
                          <View 
                            key={week} 
                            style={[
                              styles.weekBadge,
                              isCurrentWeek && styles.currentWeekBadge,
                              isPastWeek && styles.pastWeekBadge,
                              isCurrentMonth && !isCurrentWeek && styles.currentMonthWeekBadge
                            ]}
                          >
                            <Text style={[
                              styles.weekText,
                              isCurrentWeek && styles.currentWeekText,
                              isPastWeek && styles.pastWeekText,
                              isCurrentMonth && !isCurrentWeek && styles.currentMonthWeekText
                            ]}>
                              {week}
                            </Text>
                          </View>
                        )
                      })}
                    </View>

                    <Text style={[
                      styles.monthDescription,
                      isCurrentMonth && styles.currentMonthDescription,
                      isPastMonth && styles.pastMonthDescription
                    ]}>
                      {monthData.description}
                    </Text>

                    {isPastMonth && (
                      <View style={styles.completedBadge}>
                        <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                        <Text style={styles.completedText}>Completed</Text>
                      </View>
                    )}
                    
                    {isCurrentMonth && (
                      <View style={styles.currentBadge}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color="#FFF" />
                        <Text style={styles.currentText}>Current</Text>
                      </View>
                    )}
                  </LinearGradient>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Full Screen Calendar Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Ionicons name="close" size={24} color="#FF6B8B" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Pregnancy Calendar</Text>
            <View style={styles.placeholder} />
          </View>
          
          <CalendarGrid />
          
          <View style={styles.modalLegend}>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#FF6B8B" }]} />
                <Text style={styles.legendText}>Current Week</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#4CAF50" }]} />
                <Text style={styles.legendText}>Completed</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  headerContainer: {
    borderRadius: 28,
    overflow: "hidden",
  },
  headerGradient: {
    padding: 24,
    minHeight: 140,
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  monthBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  monthBadgeGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  monthBadgeNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B8B",
  },
  monthBadgeLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FF6B8B",
    letterSpacing: 1,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    marginBottom: 4,
  },
  headerDescription: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 16,
    marginBottom: 2,
  },
  headerDays: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    fontStyle: 'italic',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentWrapper: {
    overflow: 'hidden',
  },
  contentContainer: {
    backgroundColor: "#fff",
    paddingVertical: 24,
    borderRadius: 10,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#888",
    textAlign: 'center',
    fontWeight: '500',
  },
  monthsScrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  monthCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  currentMonthCard: {
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1.05 }],
  },
  pastMonthCard: {
    opacity: 0.8,
  },
  monthCardGradient: {
    padding: 20,
    height: 220,
    justifyContent: "space-between",
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  monthTitleContainer: {
    flex: 1,
  },
  monthNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  monthName: {
    fontSize: 12,
    color: "#666",
    fontWeight: '500',
  },
  currentMonthNumber: {
    color: "#FFF",
  },
  currentMonthName: {
    color: "rgba(255,255,255,0.8)",
  },
  pastMonthNumber: {
    color: "#4CAF50",
  },
  pastMonthName: {
    color: "#4CAF50",
  },
  weeksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  weekBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    minWidth: 32,
    alignItems: 'center',
  },
  currentWeekBadge: {
    backgroundColor: "#FF6B8B",
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  pastWeekBadge: {
    backgroundColor: "#E8F5E8",
  },
  currentMonthWeekBadge: {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  weekText: {
    fontSize: 12,
    color: "#36454F",
    fontWeight: "600",
  },
  currentWeekText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  pastWeekText: {
    color: "#4CAF50",
  },
  currentMonthWeekText: {
    color: "#FFF",
  },
  monthDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
  },
  currentMonthDescription: {
    color: "rgba(255,255,255,0.9)",
  },
  pastMonthDescription: {
    color: "#4CAF50",
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  completedText: {
    fontSize: 11,
    color: "#4CAF50",
    fontWeight: '600',
    marginLeft: 4,
  },
  currentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  currentText: {
    fontSize: 11,
    color: "#FFF",
    fontWeight: '600',
    marginLeft: 4,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  placeholder: {
    width: 40,
  },
  // Calendar Styles
  calendarContainer: {
    flex: 1,
    padding: 20,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 4,
    textAlign: "center",
  },
  calendarSubtitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
    textAlign: "center",
  },
  calendarNote: {
    fontSize: 12,
    color: "#FF6B8B",
    marginBottom: 16,
    textAlign: "center",
    fontWeight: '600',
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  calendarHeaderText: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
  calendarScrollView: {
    flex: 1,
  },
  calendarRow: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 8,
  },
  calendarCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  currentCalendarCell: {
    backgroundColor: "#FF6B8B",
    borderColor: "#FF6B8B",
    shadowColor: "#FF6B8B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  pastCalendarCell: {
    backgroundColor: "#E8F5E8",
    borderColor: "#4CAF50",
  },
  calendarCellText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  currentCalendarCellText: {
    color: "#301934",
    fontWeight: "bold",
  },
  pastCalendarCellText: {
    color: "#4CAF50",
  },
  calendarCellMonth: {
    fontSize: 10,
    color: "#888",
    marginTop: 2,
  },
  currentCalendarCellMonth: {
    color: "#36454F",
  },
  pastCalendarCellMonth: {
    color: "#4CAF50",
  },
  modalLegend: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
    fontWeight: '500',
  },
})

export default PregnancyWeekToMonth;