import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const DevelopmentScreen = ({ navigation }) => {
  // LMP date: February 18
  const lmpDate = new Date(new Date().getFullYear(), 1, 18);
  const today = new Date();
  const diffTime = Math.abs(today - lmpDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const currentWeek = Math.floor(diffDays / 7);
  
  // Development information based on current week
  const getDevelopmentInfo = () => {
    if (currentWeek < 5) {
      return {
        title: 'Embryonic Development',
        size: '< 0.1 inches',
        weight: '< 0.04 oz',
        comparison: 'Poppy Seed',
        description: 'The fertilized egg implants in the uterus. The placenta, amniotic sac, and yolk sac are forming. The embryo is now made up of three layers that will develop into different parts of the body.',
        milestones: [
          'Neural tube forms (will become brain and spinal cord)',
          'Heart begins to form',
          'Arm and leg buds appear'
        ]
      };
    } else if (currentWeek < 9) {
      return {
        title: 'Early Organ Development',
        size: '0.9 inches',
        weight: '0.07 oz',
        comparison: 'Raspberry',
        description: 'Your baby is now called a fetus. All essential organs have begun to form. The babys heart is beating at a steady rhythm. The arms and legs are growing longer, and fingers and toes have begun to form.',
        milestones: [
          'Facial features forming',
          'Heart chambers developing',
          'Brain developing rapidly',
          'Tiny fingers and toes forming'
        ]
      };
    } else if (currentWeek < 13) {
      return {
        title: 'End of First Trimester',
        size: '2.9 inches',
        weight: '22.68 grams (g)',
        comparison: 'Peach',
        description: 'Your babys organs, muscles, and nerves are continuing to develop. External genitalia are forming. The baby can move, but you won t feel it yet. Fingernails and toenails are forming.',
        milestones: [
          'All essential organs formed',
          'Baby can make facial expressions',
          'Kidneys begin producing urine',
          'Vocal cords forming'
        ]
      };
    } else if (currentWeek < 17) {
      return {
        title: 'Second Trimester Growth',
        size: '4.6 inches',
        weight: ' 99.22 grams (g)',
        comparison: 'Avocado',
        description: 'Your baby skeleton is forming. The skin is thin and transparent. The baby begins to develop a sleep-wake cycle. Meconium is forming in the intestinal tract.',
        milestones: [
          'Baby can hear sounds',
          'Sucking reflex developing',
          'Hair pattern forming on scalp',
          'Baby can make facial expressions'
        ]
      };
    } else if (currentWeek < 21) {
      return {
        title: 'Mid-Pregnancy Development',
        size: '6.5 inches',
        weight: '297.67 grams (g)',
        comparison: 'Banana',
        description: 'Your babys movements become more coordinated. You may start to feel the baby move (quickening). The baby is covered in a white, waxy substance called vernix caseosa, which protects the skin.',
        milestones: [
          'You can feel baby moving',
          'Baby can swallow',
          'Fingerprints and footprints forming',
          'Baby develops sleep-wake cycles'
        ]
      };
    } else if (currentWeek < 25) {
      return {
        title: 'Continued Growth',
        size: '8.8 inches',
        weight: '589.67 grams (g)',
        comparison: 'Eggplant',
        description: 'Your babys skin is wrinkled, red, and translucent. The lungs are developing but not yet mature. The baby is more active, and you ll feel stronger movements. The baby can now hear your voice clearly.',
        milestones: [
          'Lungs begin to produce surfactant',
          'Taste buds developing',
          'Brain growing rapidly',
          'Baby responds to sounds'
        ]
      };
    } else if (currentWeek < 29) {
      return {
        title: 'Third Trimester Begins',
        size: '10.5 inches',
        weight: '997.9 grams (g)',
        comparison: 'Cabbage',
        description: 'Your baby brain is developing rapidly. The baby eyes can open and close and sense light. The lungs are still developing. If born now, the baby would need intensive care but has a good chance of survival.',
        milestones: [
          'Eyes can open and close',
          'Brain wave activity increases',
          'Lungs continue to mature',
          'Baby can hiccup'
        ]
      };
    } else if (currentWeek < 33) {
      return {
        title: 'Rapid Weight Gain',
        size: '16.7 inches',
        weight: '1 kg and 905.1 g',
        comparison: 'Pineapple',
        description: 'Your baby is gaining weight rapidly. The bones are fully formed but still soft. The baby can now regulate its own body temperature. The baby is practicing breathing movements.',
        milestones: [
          'Baby can turn head side to side',
          'Rapid brain development',
          'Fingernails reach fingertips',
          'Baby responds to light'
        ]
      };
    } else if (currentWeek < 37) {
      return {
        title: 'Final Development',
        size: '18.9 inches',
        weight: '2 kilograms and 630.84 grams',
        comparison: 'Honeydew Melon',
        description: 'Your baby is considered full-term at 37 weeks. The baby is shedding the lanugo (fine hair) and vernix. The lungs are nearly mature. The baby is getting into position for birth.',
        milestones: [
          'Lungs are nearly mature',
          'Baby practices breathing',
          'Baby settles into birth position',
          'Immune system developing'
        ]
      };
    } else {
      return {
        title: 'Ready for Birth',
        size: '20+ inches',
        weight: '3 kg and 82.33 g',
        comparison: 'Watermelon',
        description: 'Your baby is fully developed and ready for birth. The baby continues to gain weight. The brain and lungs continue to mature. The baby has dropped lower into your pelvis in preparation for birth.',
        milestones: [
          'Lungs fully mature',
          'Brain continues rapid development',
          'Baby has strong grasp',
          'Immune system strengthening'
        ]
      };
    }
  };
  
  const developmentInfo = getDevelopmentInfo();
  
  return (
    <SafeAreaView style={styles.safeArea}>
   <StatusBar
    backgroundColor="#FF6B8B"  // Darker pink/red background
        barStyle="light-content"    // Light icons & text for status bar
        translucent={false}         // Non-translucent for better visibility
      />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FF6B8B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Monthly Baby Development</Text>
          <View style={styles.placeholder} />
        </View>
        
        <ScrollView style={styles.content}>
          {/* Week Indicator */}
          <View style={styles.weekIndicator}>
            <LinearGradient
              colors={['#FF6F91', '#FFC8D7']}
              style={styles.weekGradient}
            >
              <Text style={styles.weekText}>Week {currentWeek}</Text>
            </LinearGradient>
          </View>
          
          {/* Development Title */}
          <Text style={styles.developmentTitle}>{developmentInfo.title}</Text>
          
          {/* Baby Size */}
          <View style={styles.sizeContainer}>
            <View style={styles.sizeImageContainer}>
              <Image 
                source={require('../Assest/baby-development.jpg')} 
                style={styles.sizeImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.sizeDetails}>
              <View style={styles.sizeItem}>
                <Text style={styles.sizeLabel}>Size</Text>
                <Text style={styles.sizeValue}>{developmentInfo.size}</Text>
              </View>
              <View style={styles.sizeItem}>
                <Text style={styles.sizeLabel}>Weight</Text>
                <Text style={styles.sizeValue}>{developmentInfo.weight}</Text>
              </View>
              <View style={styles.sizeItem}>
                <Text style={styles.sizeLabel}>Comparison</Text>
                <Text style={styles.sizeValue}>{developmentInfo.comparison}</Text>
              </View>
            </View>
          </View>
          
          {/* Development Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's Happening This Week</Text>
            <Text style={styles.descriptionText}>{developmentInfo.description}</Text>
          </View>
          
          {/* Development Milestones */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Milestones</Text>
            {developmentInfo.milestones.map((milestone, index) => (
              <View key={index} style={styles.milestoneItem}>
                <View style={styles.milestoneDot} />
                <Text style={styles.milestoneText}>{milestone}</Text>
              </View>
            ))}
          </View>
          
          {/* Tips for Mom */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tips for Mom</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                Stay hydrated and eat a balanced diet rich in fruits, vegetables, and protein.
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                Get plenty of rest and listen to your body when you need to slow down.
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                Talk to your healthcare provider about any concerns or unusual symptoms.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5EB',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    fontFamily: 'Avenir-Heavy',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  weekIndicator: {
    alignItems: 'center',
    marginBottom: 15,
  },
  weekGradient: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  weekText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'Avenir-Heavy',
  },
  developmentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Avenir-Heavy',
  },
  sizeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sizeImageContainer: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeImage: {
    width: 100,
    height: 100,
  },
  sizeDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  sizeItem: {
    marginBottom: 8,
  },
  sizeLabel: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Avenir',
  },
  sizeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B8B',
    fontFamily: 'Avenir-Medium',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 12,
    fontFamily: 'Avenir-Heavy',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    fontFamily: 'Avenir',
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  milestoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B8B',
    marginRight: 10,
  },
  milestoneText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    fontFamily: 'Avenir',
  },
  tipCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'Avenir',
  },
});

export default DevelopmentScreen;