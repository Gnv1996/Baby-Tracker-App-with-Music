"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from "react-native"
import moment from "moment"

const { width } = Dimensions.get("window")

const vaccines = [
  /* ------------------ BIRTH ------------------ */
  {
    name: "BCG",
    weeks: 0,
    emoji: "💉",
    category: "Birth",
    description: "Protection against Tuberculosis",
    givenDate: "3 Nov 2025",
  },
  {
    name: "OPV 0",
    weeks: 0,
    emoji: "👅",
    category: "Birth",
    description: "Oral Polio Vaccine at birth",
    givenDate: "3 Nov 2025",
  },
  {
    name: "Hepatitis B – Birth Dose",
    weeks: 0,
    emoji: "🛡️",
    category: "Birth",
    description: "Hep B (BD)",
    givenDate: "3 Nov 2025",
  },

  /* ------------------ 6 WEEKS ------------------ */
  { name: "DTwP 1 / DTaP 1", weeks: 6, emoji: "💪", category: "6 Weeks", givenDate: "18 Dec 2025" },
  { name: "IPV 1", weeks: 6, emoji: "🧠", category: "6 Weeks", givenDate: "18 Dec 2025" },
  { name: "Hib 1", weeks: 6, emoji: "🧬", category: "6 Weeks", givenDate: "18 Dec 2025" },
  { name: "Hepatitis B – 2", weeks: 6, emoji: "🛡️", category: "6 Weeks", givenDate: "18 Dec 2025" },
  { name: "Rotavirus 1", weeks: 6, emoji: "🌀", category: "6 Weeks", givenDate: "18 Dec 2025" },
  { name: "PCV 1", weeks: 6, emoji: "🫁", category: "6 Weeks", givenDate: "18 Dec 2025" },

  /* ------------------ 10 WEEKS ------------------ */
  { name: "DTwP 2 / DTaP 2", weeks: 10, emoji: "💪", category: "10 Weeks",givenDate: "19 Jan 2026" },
  { name: "IPV 2", weeks: 10, emoji: "🧠", category: "10 Weeks",givenDate: "19 Jan 2026" },
  { name: "Hib 2", weeks: 10, emoji: "🧬", category: "10 Weeks",givenDate: "19 Jan 2026" },
  { name: "Hepatitis B – 3", weeks: 10, emoji: "🛡️", category: "10 Weeks",givenDate: "19 Jan 2026" },
  { name: "Rotavirus 2", weeks: 10, emoji: "🌀", category: "10 Weeks",givenDate: "19 Jan 2026" },
  { name: "PCV 2", weeks: 10, emoji: "🫁", category: "10 Weeks",givenDate: "19 Jan 2026" },

  /* ------------------ 14 WEEKS ------------------ */
  { name: "DTwP 3 / DTaP 3", weeks: 14, emoji: "💪", category: "14 Weeks" },
  { name: "IPV 3", weeks: 14, emoji: "🧠", category: "14 Weeks" },
  { name: "Hib 3", weeks: 14, emoji: "🧬", category: "14 Weeks" },
  { name: "Hepatitis B – 4", weeks: 14, emoji: "🛡️", category: "14 Weeks" },
  { name: "Rotavirus 3", weeks: 14, emoji: "🌀", category: "14 Weeks" },
  { name: "PCV 3", weeks: 14, emoji: "🫁", category: "14 Weeks" },

  /* ------------------ 6 MONTHS ------------------ */
  { name: "Influenza (IIV) – 1", weeks: 24, emoji: "🤧", category: "6 Months" },

  /* ------------------ 7 MONTHS ------------------ */
  { name: "Influenza (IIV) – 2", weeks: 28, emoji: "🤧", category: "7 Months" },

  /* ------------------ 6–9 MONTHS ------------------ */
  { name: "Typhoid Conjugate Vaccine", weeks: 36, emoji: "🥼", category: "9 Months" },

  /* ------------------ 9 MONTHS ------------------ */
  { name: "MMR – 1", weeks: 36, emoji: "😷", category: "9 Months" },

  /* ------------------ 12 MONTHS ------------------ */
  { name: "Hepatitis A (Live)", weeks: 52, emoji: "🍽️", category: "12 Months" },

  /* ------------------ 15 MONTHS ------------------ */
  { name: "MMR – 2", weeks: 64, emoji: "😷", category: "15 Months" },
  { name: "Varicella – 1", weeks: 64, emoji: "🐔", category: "15 Months" },
  { name: "PCV Booster", weeks: 64, emoji: "🫁", category: "15 Months" },

  /* ------------------ 16–18 MONTHS ------------------ */
  { name: "DTwP Booster 1 / DTaP B1", weeks: 72, emoji: "💪", category: "18 Months" },
  { name: "Hib Booster", weeks: 72, emoji: "🧬", category: "18 Months" },
  { name: "IPV Booster", weeks: 72, emoji: "🧠", category: "18 Months" },

  /* ------------------ 18–19 MONTHS ------------------ */
  { name: "Hepatitis A – 2 (Inactivated)", weeks: 78, emoji: "🍽️", category: "18 Months" },
  { name: "Varicella – 2", weeks: 78, emoji: "🐔", category: "18 Months" },

  /* ------------------ 4–6 YEARS ------------------ */
  { name: "DTwP Booster 2 / DTaP B2", weeks: 260, emoji: "💪", category: "4–6 Years" },
  { name: "IPV Booster 2", weeks: 260, emoji: "🧠", category: "4–6 Years" },
  { name: "MMR – 3", weeks: 260, emoji: "😷", category: "4–6 Years" },

  /* ------------------ 10–12 YEARS ------------------ */
  { name: "Tdap", weeks: 520, emoji: "💪", category: "10–12 Years" },
  { name: "HPV", weeks: 520, emoji: "🛡️", category: "10–12 Years" },
];


const babyBirthDate = moment("2025-11-02")

const VaccineTrackerScreen = () => {
  const [today, setToday] = useState(moment())
  const [selectedCategory, setSelectedCategory] = useState("All")


  const categories = [
    "All",
    "Birth",
    "6 Weeks",
    "10 Weeks",
    "14 Weeks",
    "6 Months",
    "7 Months",
    "9 Months",
    "12 Months",
    "15 Months",
    "18 Months",
    "4–6 Years",
    "10–12 Years",
  ];
  

  const getStatus = (scheduledDate, givenDate) => {
    if (givenDate) return "Completed"
    if (scheduledDate.isSame(today, "day")) return "Today"
    if (scheduledDate.diff(today, "days") <= 7 && scheduledDate.isAfter(today))
      return "This Week"
    if (scheduledDate.isAfter(today)) return "Upcoming"
    return "Missed"
  }
  
  const getStatusCounts = () => {
    const counts = { completed: 0, today: 0, thisWeek: 0, upcoming: 0 }
  
    vaccines.forEach((vaccine) => {
      const scheduledDate = getScheduledDate(vaccine)
      const status = getStatus(scheduledDate, vaccine.givenDate)
  
      if (status === "Completed") counts.completed++
      else if (status === "Today") counts.today++
      else if (status === "This Week") counts.thisWeek++
      else counts.upcoming++
    })
  
    return counts
  }
  

  const getScheduledDate = (vaccine) => {
    if (vaccine.givenDate) {
      return moment(vaccine.givenDate, "DD MMM YYYY")
    }
    return moment(babyBirthDate).add(vaccine.weeks, "weeks")
  }
  

  const filteredVaccines =
    selectedCategory === "All" ? vaccines : vaccines.filter((vaccine) => vaccine.category === selectedCategory)

  const statusCounts = getStatusCounts()
  const completionPercentage = Math.round((statusCounts.completed / vaccines.length) * 100)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF9E9E" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.titleContainer}>
              <Text style={styles.headerEmoji}>💉</Text>
              <View>
                <Text style={styles.headerTitle}>Baby Vaccine Tracker</Text>
                <Text style={styles.headerSubtitle}>Keep your little baby protected</Text>
              </View>
            </View>
            <View style={styles.babyNameBadge}>
              <Text style={styles.babyNameText}>Nici 👶</Text>
            </View>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.progressTitle}>Vaccination Progress</Text>
                <Text style={styles.progressSubtitle}>Track your baby's health journey</Text>
              </View>
              <View style={styles.percentageCircle}>
                <Text style={styles.progressPercentage}>{completionPercentage}%</Text>
              </View>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${completionPercentage}%` }]}>
                  <View style={styles.progressShine} />
                </View>
              </View>
              <Text style={styles.progressText}>
                {statusCounts.completed} of {vaccines.length} vaccines completed
              </Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <View style={[styles.statCircle, styles.statCompleted]}>
                  <Text style={styles.statEmoji}>✅</Text>
                  <Text style={styles.statNumber}>{statusCounts.completed}</Text>
                </View>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statCircle, styles.statToday]}>
                  <Text style={styles.statEmoji}>🔥</Text>
                  <Text style={styles.statNumber}>{statusCounts.today}</Text>
                </View>
                <Text style={styles.statLabel}>Today</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statCircle, styles.statThisWeek]}>
                  <Text style={styles.statEmoji}>📅</Text>
                  <Text style={styles.statNumber}>{statusCounts.thisWeek}</Text>
                </View>
                <Text style={styles.statLabel}>This Week</Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.statCircle, styles.statUpcoming]}>
                  <Text style={styles.statEmoji}>⏰</Text>
                  <Text style={styles.statNumber}>{statusCounts.upcoming}</Text>
                </View>
                <Text style={styles.statLabel}>Upcoming</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Filter by Age Group</Text>
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>
              {filteredVaccines.length} {filteredVaccines.length === 1 ? "vaccine" : "vaccines"}
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContentContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>
                {category}
              </Text>
              {selectedCategory === category && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.vaccineList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.vaccineListContent}
      >
        {filteredVaccines.map((vaccine, index) => {
const scheduledDate = getScheduledDate(vaccine)
const status = getStatus(scheduledDate, vaccine.givenDate)


        
          const daysFromNow = scheduledDate.diff(today, "days")

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.vaccineCard,
                status === "Completed" && styles.cardCompleted,
                status === "Today" && styles.cardToday,
                status === "This Week" && styles.cardThisWeek,
              ]}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.emojiContainer,
                    status === "Completed" && styles.emojiCompleted,
                    status === "Today" && styles.emojiToday,
                    status === "This Week" && styles.emojiThisWeek,
                  ]}
                >
                  <Text style={styles.vaccineEmoji}>{vaccine.emoji}</Text>
                </View>
                <View style={styles.vaccineInfo}>
                  <View style={styles.vaccineNameRow}>
                    <Text style={styles.vaccineName}>{vaccine.name}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        status === "Completed" && styles.statusCompleted,
                        status === "Today" && styles.statusToday,
                        status === "This Week" && styles.statusThisWeek,
                        status === "Upcoming" && styles.statusUpcoming,
                      ]}
                    >
                      <Text style={styles.statusText}>{status}</Text>
                    </View>
                  </View>
                  <Text style={styles.vaccineDescription}>{vaccine.description}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.dateRow}>
                  <View style={styles.dateInfo}>
                    <Text style={styles.dateLabel}>Scheduled Date</Text>
                    <Text style={styles.vaccineDate}>{scheduledDate.format("DD MMM YYYY")}</Text>
                  </View>
                  {daysFromNow > 0 && status !== "This Week" && (
                    <View style={styles.daysRemainingContainer}>
                      <Text style={styles.daysRemainingLabel}>In</Text>
                      <Text style={styles.daysRemaining}>{daysFromNow}</Text>
                      <Text style={styles.daysRemainingLabel}>days</Text>
                    </View>
                  )}
                  {status === "This Week" && (
                    <View style={styles.urgentBadge}>
                      <Text style={styles.urgentText}>⚡ This Week</Text>
                    </View>
                  )}
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{vaccine.category}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}

        <View style={styles.footer}>
          <View style={styles.footerCard}>
            <View style={styles.footerIconContainer}>
              <Text style={styles.footerIcon}>👩‍⚕️</Text>
            </View>
            <Text style={styles.footerTitle}>Medical Advice</Text>
            <Text style={styles.footerText}>
              Always consult with your pediatrician for a personalized vaccination schedule tailored to your baby's
              needs.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
  header: {
    backgroundColor: "#FF9E9E",
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "#FF1493",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  headerContent: {
    paddingHorizontal: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#FFE4E1",
    marginTop: 2,
    fontWeight: "500",
  },
  babyNameBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  babyNameText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#FF1493",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 13,
    color: "#999",
    fontWeight: "500",
  },
  percentageCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FF69B4",
    shadowColor: "#FF1493",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  progressPercentage: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FF1493",
  },
  progressBarContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 14,
    backgroundColor: "#FFE4E1",
    borderRadius: 7,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF1493",
    borderRadius: 7,
    position: "relative",
  },
  progressShine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 7,
  },
  progressText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  statCompleted: {
    backgroundColor: "#4CAF50",
  },
  statToday: {
    backgroundColor: "#FF6347",
  },
  statThisWeek: {
    backgroundColor: "#FF69B4",
  },
  statUpcoming: {
    backgroundColor: "#FFB6C1",
  },
  statEmoji: {
    fontSize: 16,
    marginBottom: 2,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    fontWeight: "600",
  },
  categorySection: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: "#FFF5F7",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
  },
  filterBadge: {
    backgroundColor: "#FFE4E1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF1493",
  },
  categoryContainer: {
    paddingVertical: 4,
  },
  categoryContentContainer: {
    paddingRight: 24,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#FFE4E1",
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryButtonActive: {
    backgroundColor: "#FF69B4",
    borderColor: "#FF1493",
    shadowColor: "#FF1493",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  categoryText: {
    fontSize: 14,
    color: "#FF69B4",
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    marginTop: 6,
    alignSelf: "center",
  },
  vaccineList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  vaccineListContent: {
    paddingBottom: 24,
  },
  vaccineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFE4E1",
  },
  cardCompleted: {
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50",
    backgroundColor: "#F8FFF8",
  },
  cardToday: {
    borderLeftWidth: 5,
    borderLeftColor: "#FF6347",
    backgroundColor: "#FFFAF8",
  },
  cardThisWeek: {
    borderLeftWidth: 5,
    borderLeftColor: "#FF69B4",
    backgroundColor: "#FFF8FB",
  },
  cardHeader: {
    flexDirection: "row",
    padding: 20,
    paddingBottom: 16,
  },
  emojiContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFE4E1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 3,
    borderColor: "#FFB6C1",
  },
  emojiCompleted: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  emojiToday: {
    backgroundColor: "#FFF3E0",
    borderColor: "#FF6347",
  },
  emojiThisWeek: {
    backgroundColor: "#FCE4EC",
    borderColor: "#FF69B4",
  },
  vaccineEmoji: {
    fontSize: 32,
  },
  vaccineInfo: {
    flex: 1,
  },
  vaccineNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  vaccineName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  vaccineDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    fontWeight: "500",
  },
  cardFooter: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    color: "#999",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  vaccineDate: {
    fontSize: 14,
    color: "#FF1493",
    fontWeight: "700",
  },
  daysRemainingContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: "#FFF0F5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFB6C1",
  },
  daysRemainingLabel: {
    fontSize: 11,
    color: "#FF69B4",
    fontWeight: "600",
    marginHorizontal: 2,
  },
  daysRemaining: {
    fontSize: 18,
    color: "#FF1493",
    fontWeight: "800",
    marginHorizontal: 4,
  },
  urgentBadge: {
    backgroundColor: "#FF69B4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  urgentText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: "#4CAF50",
  },
  statusToday: {
    backgroundColor: "#FF6347",
  },
  statusThisWeek: {
    backgroundColor: "#FF69B4",
  },
  statusUpcoming: {
    backgroundColor: "#FFB6C1",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFE4E1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFB6C1",
  },
  categoryBadgeText: {
    fontSize: 11,
    color: "#FF1493",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  footer: {
    paddingVertical: 24,
    alignItems: "center",
  },
  footerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#FFE4E1",
    width: "100%",
  },
  footerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#FFB6C1",
  },
  footerIcon: {
    fontSize: 32,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
  },
})

export default VaccineTrackerScreen
