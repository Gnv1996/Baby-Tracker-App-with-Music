import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from "react-native"

export default function PregnancyMonthChartComponent({ lmpDate = "2025-02-18", locale = "en-IN" }) {
    const LMP = new Date(lmpDate + "T00:00:00")
    const today = new Date()
  
    // Helper functions
    const addDays = (date, days) => {
      const d = new Date(date)
      d.setDate(d.getDate() + days)
      return d
    }
  
    const formatDate = (d) =>
      d.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" })
  
    // Expected Due Date (40 weeks from LMP)
    const EDD = addDays(LMP, 280)
  
    // Pregnancy month ranges (medical convention)
    const monthRanges = [
      { id: "1", label: "1st Month", startWeek: 1, endWeek: 4 },
      { id: "2", label: "2nd Month", startWeek: 5, endWeek: 8 },
      { id: "3", label: "3rd Month", startWeek: 9, endWeek: 13 },
      { id: "4", label: "4th Month", startWeek: 14, endWeek: 17 },
      { id: "5", label: "5th Month", startWeek: 18, endWeek: 22 },
      { id: "6", label: "6th Month", startWeek: 23, endWeek: 27 },
      { id: "7", label: "7th Month", startWeek: 28, endWeek: 31 },
      { id: "8", label: "8th Month", startWeek: 32, endWeek: 35 },
      { id: "9", label: "9th Month", startWeek: 36, endWeek: 40 },
    ]
  
    // Month objects with dates
    const months = monthRanges.map((m) => {
      const start = addDays(LMP, (m.startWeek - 1) * 7)
      const end = addDays(LMP, m.endWeek * 7 - 1)
      return { ...m, start, end }
    })
  
    // Safe delivery window (37–40 weeks)
    const safeStart = addDays(LMP, 259) // 37 weeks
    const safeEnd = EDD
  
    const copyToClipboard = (text) => {
      Alert.alert("📋 Copied", text, [{ text: "OK", style: "default" }])
    }
  
    // Find current month
    const currentMonthId = months.find((m) => today >= m.start && today <= m.end)?.id
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>🌸 Pregnancy Journey</Text>
          <Text style={styles.subtitle}>Month-wise Tracking Chart</Text>
        </View>

        <View style={styles.metaContainer}>
          <View style={styles.metaCard}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🗓</Text>
            </View>
            <View style={styles.metaContent}>
              <Text style={styles.metaLabel}>Last Menstrual Period</Text>
              <Text style={styles.metaValue}>{formatDate(LMP)}</Text>
            </View>
          </View>

          <View style={styles.metaCard}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🎀</Text>
            </View>
            <View style={styles.metaContent}>
              <Text style={styles.metaLabel}>Expected Due Date</Text>
              <Text style={styles.metaValue}>{formatDate(EDD)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.safeDeliveryCard}>
          <View style={styles.safeHeader}>
            <Text style={styles.safeIcon}>✨</Text>
            <Text style={styles.safeTitle}>Safe Delivery Window</Text>
          </View>
          <View style={styles.safeDateContainer}>
            <Text style={styles.safeDate}>{formatDate(safeStart)}</Text>
            <View style={styles.dateSeparator}>
              <View style={styles.separatorDot} />
              <View style={styles.separatorLine} />
              <View style={styles.separatorDot} />
            </View>
            <Text style={styles.safeDate}>{formatDate(safeEnd)}</Text>
          </View>
        </View>

        <View style={styles.monthsHeader}>
          <Text style={styles.monthsTitle}>Monthly Progress</Text>
          <Text style={styles.monthsSubtitle}>Track your baby's development</Text>
        </View>

        <FlatList
          data={months}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.monthsList}
          renderItem={({ item, index }) => {
            const isCurrent = item.id === currentMonthId
            return (
              <TouchableOpacity
                style={[
                  styles.monthCard,
                  {
                    backgroundColor: isCurrent
                      ? "#B0E0E6" // 🎀 highlighted color for current month
                      : index % 2 === 0
                      ? "#FFE4E6"
                      : "#FFF0F1",
                    borderWidth: isCurrent ? 2 : 1,
                    borderColor: isCurrent ? "#4169E1" : "#FFB6C1",
                  },
                ]}
                onPress={() =>
                  copyToClipboard(
                    `${item.label}: ${formatDate(item.start)} — ${formatDate(item.end)}`
                  )
                }
                activeOpacity={0.8}
              >
                <View style={styles.monthHeader}>
                  <View style={styles.monthNumber}>
                    <Text style={styles.monthNumberText}>{item.id}</Text>
                  </View>
                  <View style={styles.monthInfo}>
                    <Text style={[styles.monthLabel, isCurrent && { color: "#FF6F91" }]}>
                      {item.label} {isCurrent ? "⭐" : ""}
                    </Text>
                    <View style={styles.monthDateContainer}>
                      <Text style={styles.monthDate}>{formatDate(item.start)}</Text>
                      <Text style={styles.monthSeparator}>—</Text>
                      <Text style={styles.monthDate}>{formatDate(item.end)}</Text>
                    </View>
                  </View>
      
                </View>
                <View style={styles.monthFooter}>
                  <Text style={styles.monthNote}>
                    {isCurrent ? "👉 Current Month in Progress" : "💕 Growth Phase Tracking"}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: "#FF9E9E",
    borderRadius: 20,
    shadowColor: "#FF1493",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFE4E6",
    textAlign: "center",
    marginTop: 4,
  },
  metaContainer: {
    marginBottom: 25,
  },
  metaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9E9E",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFE4E6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  iconText: {
    fontSize: 24,
  },
  metaContent: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF6F91",
  },
  safeDeliveryCard: {
    backgroundColor: "#E8F5E8",
    padding: 20,
    borderRadius: 18,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#4CAF50",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  safeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  safeIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  safeTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
  },
  safeDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  safeDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B5E20",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  dateSeparator: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  separatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
  },
  separatorLine: {
    width: 20,
    height: 2,
    backgroundColor: "#4CAF50",
    marginHorizontal: 4,
  },
  monthsHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  monthsTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FF6F91",
    marginBottom: 4,
  },
  monthsSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  monthsList: {
    paddingBottom: 10,
  },
  monthCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#FFB6C1",
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  monthNumber: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#FF9E9E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  monthNumberText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  monthInfo: {
    flex: 1,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  monthDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6F91",
  },
  monthSeparator: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF69B4",
    marginHorizontal: 8,
  },
  copyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF69B4",
    justifyContent: "center",
    alignItems: "center",
  },
  copyIcon: {
    fontSize: 18,
  },
  monthFooter: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  monthNote: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
  },
  bottomSpacing: {
    height: 30,
  },
})
