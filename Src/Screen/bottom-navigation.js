import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Ionicons from "react-native-vector-icons/Ionicons"
import { BlurView } from "@react-native-community/blur"

const BottomNavigation = ({ currentScreen, navigation }) => {
  const navItems = [
    { name: "Home", icon: "home", component: Ionicons },
    { name: "Diet", icon: "nutrition", component: Ionicons },
    { name: "NormalDelivery", icon: "woman-outline", component: Ionicons },
    { name: "Vaccine", icon: "bandage-outline", component: Ionicons },

  ]
 
 

  return (
    <View style={styles.container}>
      {/* Frosted Glass Effect for iOS */}
      {Platform.OS === "ios" ? (
        <BlurView style={styles.blur} blurType="light" blurAmount={15} />
      ) : (
        <LinearGradient colors={["#ffffffcc", "#ffe6ec"]} style={styles.background} />
      )}

      <View style={styles.navContainer}>
        {navItems.map((item) => {
          const IconComponent = item.component
          const isActive = currentScreen === item.name

          return (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => navigation.navigate(item.name)}
              activeOpacity={0.8}
            >
              <View style={isActive ? styles.activeIconWrapper : styles.iconWrapper}>
                <IconComponent
                  name={item.icon}
                  size={24}
                  color={isActive ? "#fff" : "#888"}
                />
              </View>
              <Text style={[styles.navText, isActive && styles.activeNavText]}>{item.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    height: 70,
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 12,
    overflow: "hidden",
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 20,
  },
  activeIconWrapper: {
    padding: 10,
    backgroundColor: "#FF6F91",
    borderRadius: 20,
    shadowColor: "#FF6F91",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  navText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  activeNavText: {
    color: "#FF6F91",
    fontWeight: "600",
  },
})

export default BottomNavigation
