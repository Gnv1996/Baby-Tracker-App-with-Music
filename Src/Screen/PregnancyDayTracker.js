import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const screenWidth = Dimensions.get("window").width;
const DAY_BOX_WIDTH = 56;
const DAY_BOX_MARGIN = 6;

function PregnancyDayTracker({ pregnancyLength = 280 }) {
  const startDate = new Date(2025, 1, 18); // Feb 18, 2025
  const today = new Date();

  const diffTime = today.getTime() - startDate.getTime();
  let currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (currentDay < 1) currentDay = 1;
  if (currentDay > pregnancyLength) currentDay = pregnancyLength;

  const daysLeft = pregnancyLength - currentDay;

  // === Create a centered daysArray ===
  const VISIBLE_DAYS = 5;
  const HALF = Math.floor(VISIBLE_DAYS / 2);

  let startDay = currentDay - HALF;
  let endDay = currentDay + HALF;

  if (startDay < 1) {
    endDay += 1 - startDay;
    startDay = 1;
  }

  if (endDay > pregnancyLength) {
    startDay -= endDay - pregnancyLength;
    endDay = pregnancyLength;
    if (startDay < 1) startDay = 1;
  }

  const daysArray = [];
  for (let i = startDay; i <= endDay; i++) {
    daysArray.push(i);
  }

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const scrollRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const index = daysArray.findIndex((day) => day === currentDay);
      if (index >= 0 && scrollRef.current) {
        const boxTotalWidth = DAY_BOX_WIDTH + 2 * DAY_BOX_MARGIN;
        const offset =
          boxTotalWidth * index - (screenWidth / 2 - boxTotalWidth / 2);

        scrollRef.current.scrollTo({ x: offset > 0 ? offset : 0, animated: true });
      }
    }, 100); // delay to ensure layout is ready

    return () => clearTimeout(timeout);
  }, [currentDay, daysArray]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Pregnancy Day Tracker </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={DAY_BOX_WIDTH + 2 * DAY_BOX_MARGIN}
        decelerationRate="fast"
        ref={scrollRef}
      >
        {daysArray.map((day) => {
          const isCurrent = day === currentDay;
          const isLocked = day !== currentDay;

          return (
            <Animated.View
              key={day}
              style={[
                styles.dayBox,
                isCurrent && [
                  styles.currentDayBox,
                  { transform: [{ scale: scaleAnim }] },
                ],
                isLocked && styles.lockedDayBox,
              ]}
            >
              <View style={styles.lockIconWrapper}>
                {isLocked ? (
                  <Icon name="lock" size={18} color="#bbb" />
                ) : (
                  <View style={{ height: 18 }} />
                )}
              </View>
              <Text style={[styles.dayText, isCurrent && styles.currentDayText]}>
                {day}
              </Text>
            </Animated.View>
          );
        })}
      </ScrollView>

      <View style={styles.daysLeftBox}>
        <Text style={styles.daysLeftText}>{daysLeft}days left</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FF6B8B",
    textAlign: "center",
    marginBottom: 15,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  dayBox: {
    width: DAY_BOX_WIDTH,
    height: 80,
    marginHorizontal: DAY_BOX_MARGIN,
    borderRadius: 14,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  lockIconWrapper: {
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    marginTop: 8,
    fontSize: 22,
    color: "#555",
    fontWeight: "600",
  },
  currentDayBox: {
    backgroundColor: "#FF6B8B",
    borderColor: "#FF4266",
    shadowColor: "#FF4266",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  currentDayText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 30,
  },
  lockedDayBox: {
    opacity: 0.5,
    borderColor: "#ccc",
  },
  daysLeftBox: {
    marginTop: 18,
    alignItems: "center",
  },
  daysLeftText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
});

export default PregnancyDayTracker;
