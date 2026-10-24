import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';

const BottomNavigation = ({ currentScreen, navigation }) => {
  const navItems = [
    { name: 'Home', label: 'Pregnancy', icon: 'heart', activeIcon: 'heart' },
    { name: 'MyBaby', label: 'Baby Hub', icon: 'sparkles-outline', activeIcon: 'sparkles' },
    { name: 'Play', label: 'Lullabies', icon: 'musical-notes-outline', activeIcon: 'musical-notes' },
    { name: 'Diet', label: 'Diet Tips', icon: 'nutrition-outline', activeIcon: 'nutrition' },
    { name: 'NormalDelivery', label: 'Prep', icon: 'fitness-outline', activeIcon: 'fitness' },
  ];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <BlurView style={styles.blur} blurType="light" blurAmount={20} />
        ) : (
          <LinearGradient
            colors={['#FFFFFFEE', '#FFF5F8EE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.background}
          />
        )}

        <View style={styles.navContainer}>
          {navItems.map((item) => {
            const isActive = currentScreen === item.name;

            return (
              <TouchableOpacity
                key={item.name}
                style={styles.navItem}
                onPress={() => {
                  if (currentScreen !== item.name) {
                    navigation.navigate(item.name);
                  }
                }}
                activeOpacity={0.7}
              >
                {isActive ? (
                  <LinearGradient
                    colors={['#FF6B8B', '#FF8FA3']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.activeIconWrapper}
                  >
                    <Ionicons name={item.activeIcon} size={20} color="#FFFFFF" />
                  </LinearGradient>
                ) : (
                  <View style={styles.iconWrapper}>
                    <Ionicons name={item.icon} size={20} color="#94A3B8" />
                  </View>
                )}
                <Text
                  style={[
                    styles.navText,
                    isActive && styles.activeNavText,
                  ]}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
    pointerEvents: 'box-none',
  },
  container: {
    width: '100%',
    height: 66,
    borderRadius: 33,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 182, 193, 0.35)',
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 14,
    overflow: 'hidden',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 6,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#FF6B8B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  navText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
  activeNavText: {
    color: '#FF6B8B',
    fontWeight: '800',
  },
});

export default BottomNavigation;
