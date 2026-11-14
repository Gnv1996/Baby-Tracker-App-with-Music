import React, { useEffect, useRef, useMemo } from "react";
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
  const birthDate = new Date(2025, 10, 2); // Nov 2, 2025
  const today = new Date();
  const isDelivered = today >= birthDate;

  const calculationDate = isDelivered ? birthDate : today;
  const diffTime = calculationDate.getTime() - startDate.getTime();
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

  const daysArray = useMemo(() => {
    const arr = [];
    for (let i = startDay; i <= endDay; i++) {
      arr.push(i);
    }
    return arr;
  }, [startDay, endDay]);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
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
    );
    loop.start();

    return () => loop.stop();
  }, [scaleAnim]);

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
                  <Icon name="lock" size={16} color="#bbb" />
                ) : isDelivered ? (
                  <Text style={{ fontSize: 13 }}>🎂</Text>
                ) : (
                  <View style={{ height: 16 }} />
                )}
              </View>
              <Text style={[styles.dayText, isCurrent && styles.currentDayText]}>
                {day}
              </Text>
              {isCurrent && isDelivered ? (
                <Text style={styles.bornBadgeText}>BORN</Text>
              ) : null}
            </Animated.View>
          );
        })}
      </ScrollView>

      <View style={styles.daysLeftBox}>
        {isDelivered ? (
          <View style={styles.deliveredBadge}>
            <Text style={styles.deliveredText}>
              🎉 Baby Dhruv Born on 2 Nov 2025 • Day 257
            </Text>
          </View>
        ) : (
          <Text style={styles.daysLeftText}>{daysLeft} days left</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    marginBottom: 20,
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
    height: 84,
    marginHorizontal: DAY_BOX_MARGIN,
    borderRadius: 16,
    backgroundColor: "#F9F9F9",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 6,
  },
  lockIconWrapper: {
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    marginTop: 2,
    fontSize: 18,
    color: "#555",
    fontWeight: "700",
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
    fontWeight: "900",
    fontSize: 22,
    marginTop: 1,
  },
  bornBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    marginTop: 1,
  },
  lockedDayBox: {
    opacity: 0.5,
    borderColor: "#ccc",
  },
  daysLeftBox: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  daysLeftText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  deliveredBadge: {
    backgroundColor: "#FFF0F3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFD1DC",
    alignSelf: "center",
  },
  deliveredText: {
    color: "#E11D48",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
});

export default PregnancyDayTracker;
