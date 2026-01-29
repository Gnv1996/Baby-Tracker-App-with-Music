import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const SymptomTrackerScreen = ({ navigation }) => {
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  
  // Current date
  const [currentDate, setCurrentDate] = useState('');
  
  // Selected symptom for detailed view
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  
  // Symptoms data
  const [symptoms, setSymptoms] = useState([
    { 
      id: 1, 
      name: 'Nausea', 
      icon: 'head-side-cough', 
      color: '#FF6B8B',
      lightColor: '#FFE5EB',
      intensity: 2,
      history: [1, 3, 2, 4, 2, 1, 0],
      description: 'Morning sickness or nausea throughout the day',
      tips: [
        'Eat small, frequent meals',
        'Try ginger tea or candies',
        'Avoid strong smells',
        'Stay hydrated'
      ]
    },
    { 
      id: 2, 
      name: 'Fatigue', 
      icon: 'bed', 
      color: '#9C88B2',
      lightColor: '#E8E1F0',
      intensity: 3,
      history: [2, 2, 3, 4, 3, 3, 2],
      description: 'Feeling extremely tired or exhausted',
      tips: [
        'Rest when you can',
        'Take short naps',
        'Maintain a regular sleep schedule',
        'Ask for help with daily tasks'
      ]
    },
    { 
      id: 3, 
      name: 'Headache', 
      icon: 'head-side-virus', 
      color: '#5DADE2',
      lightColor: '#D4E6F1',
      intensity: 1,
      history: [0, 1, 2, 1, 0, 1, 1],
      description: 'Pain or discomfort in the head or scalp',
      tips: [
        'Rest in a dark, quiet room',
        'Apply a cold compress',
        'Stay hydrated',
        'Practice relaxation techniques'
      ]
    },
    { 
      id: 4, 
      name: 'Mood Swings', 
      icon: 'theater-masks', 
      color: '#F4D03F',
      lightColor: '#FCF3CF',
      intensity: 2,
      history: [1, 2, 3, 2, 2, 1, 2],
      description: 'Rapid changes in mood or emotions',
      tips: [
        'Practice mindfulness',
        'Talk about your feelings',
        'Get regular exercise',
        'Ensure adequate rest'
      ]
    },
    { 
      id: 5, 
      name: 'Cravings', 
      icon: 'ice-cream', 
      color: '#E74C3C',
      lightColor: '#FADBD8',
      intensity: 3,
      history: [2, 3, 3, 2, 3, 4, 3],
      description: 'Strong desire for specific foods',
      tips: [
        'Indulge in moderation',
        'Find healthier alternatives',
        'Keep healthy snacks available',
        'Stay hydrated'
      ]
    },
    { 
      id: 6, 
      name: 'Heartburn', 
      icon: 'fire', 
      color: '#E67E22',
      lightColor: '#FAE5D3',
      intensity: 2,
      history: [0, 1, 2, 2, 3, 2, 2],
      description: 'Burning sensation in the chest or throat',
      tips: [
        'Eat smaller, frequent meals',
        'Avoid spicy or acidic foods',
        'Don\'t lie down after eating',
        'Sleep with your head elevated'
      ]
    },
    { 
      id: 7, 
      name: 'Swelling', 
      icon: 'hand-holding-water', 
      color: '#3498DB',
      lightColor: '#D4E6F1',
      intensity: 1,
      history: [0, 0, 1, 1, 2, 2, 1],
      description: 'Fluid retention, especially in feet and ankles',
      tips: [
        'Elevate your feet when sitting',
        'Avoid standing for long periods',
        'Wear comfortable shoes',
        'Reduce salt intake'
      ]
    },
    { 
      id: 8, 
      name: 'Back Pain', 
      icon: 'user-injured', 
      color: '#9B59B6',
      lightColor: '#E8DAEF',
      intensity: 2,
      history: [1, 1, 2, 2, 3, 2, 2],
      description: 'Discomfort or pain in the lower back',
      tips: [
        'Practice good posture',
        'Use a pregnancy pillow',
        'Try gentle stretching',
        'Apply heat or cold packs'
      ]
    },
  ]);
  
  // Format current date
  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
    
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  // Update symptom intensity
  const updateIntensity = (id, value) => {
    setSymptoms(symptoms.map(symptom => 
      symptom.id === id ? { ...symptom, intensity: value } : symptom
    ));
  };
  
  // Render intensity selector
  const renderIntensitySelector = (symptom) => {
    return (
      <View style={styles.intensityContainer}>
        {[0, 1, 2, 3, 4].map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.intensityButton,
              { backgroundColor: value <= symptom.intensity ? symptom.color : symptom.lightColor }
            ]}
            onPress={() => updateIntensity(symptom.id, value)}
          />
        ))}
      </View>
    );
  };
  
  // Get intensity label
  const getIntensityLabel = (intensity) => {
    switch(intensity) {
      case 0: return 'None';
      case 1: return 'Mild';
      case 2: return 'Moderate';
      case 3: return 'Severe';
      case 4: return 'Very Severe';
      default: return '';
    }
  };
  
  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    color: (opacity = 1) => `rgba(156, 136, 178, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  
  // Days of the week for chart labels
  const getDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    const result = [];
    
    for (let i = 6; i >= 0; i--) {
      const index = (today - i + 7) % 7;
      result.push(days[index]);
    }
    
    return result;
  };
  
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
          <Text style={styles.headerTitle}>Symptom Tracker</Text>
          <TouchableOpacity style={styles.historyButton}>
            <Ionicons name="calendar-outline" size={24} color="#FF6B8B" />
          </TouchableOpacity>
        </View>
        
        {selectedSymptom ? (
          // Detailed symptom view
          <ScrollView style={styles.content}>
            <TouchableOpacity 
              style={styles.backToListButton}
              onPress={() => setSelectedSymptom(null)}
            >
              <Ionicons name="chevron-back" size={18} color="#888" />
              <Text style={styles.backToListText}>Back to all symptoms</Text>
            </TouchableOpacity>
            
            <View style={[styles.symptomDetailHeader, { backgroundColor: selectedSymptom.lightColor }]}>
              <View style={[styles.symptomIconLarge, { backgroundColor: selectedSymptom.color }]}>
                <FontAwesome5 name={selectedSymptom.icon} size={28} color="#FFF" />
              </View>
              <Text style={styles.symptomDetailName}>{selectedSymptom.name}</Text>
              <Text style={styles.symptomDetailIntensity}>
                {getIntensityLabel(selectedSymptom.intensity)}
              </Text>
            </View>
            
            <View style={styles.symptomChartContainer}>
              <Text style={styles.sectionTitle}>7-Day History</Text>
              <LineChart
                data={{
                  labels: getDaysOfWeek(),
                  datasets: [
                    {
                      data: selectedSymptom.history,
                      color: (opacity = 1) => selectedSymptom.color,
                      strokeWidth: 2,
                    },
                  ],
                }}
                width={width - 40}
                height={180}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            </View>
            
            <View style={styles.todayTracking}>
              <Text style={styles.sectionTitle}>Today's Intensity</Text>
              <View style={styles.intensitySelectorLarge}>
                {[0, 1, 2, 3, 4].map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.intensityButtonLarge,
                      { backgroundColor: value <= selectedSymptom.intensity ? selectedSymptom.color : selectedSymptom.lightColor }
                    ]}
                    onPress={() => updateIntensity(selectedSymptom.id, value)}
                  >
                    <Text style={[
                      styles.intensityButtonText,
                      { color: value <= selectedSymptom.intensity ? '#FFF' : selectedSymptom.color }
                    ]}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.intensityLabelsContainer}>
                <Text style={styles.intensityLabelSmall}>None</Text>
                <Text style={styles.intensityLabelSmall}>Very Severe</Text>
              </View>
            </View>
            
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>About This Symptom</Text>
              <Text style={styles.descriptionText}>{selectedSymptom.description}</Text>
            </View>
            
            <View style={styles.tipsContainer}>
              <Text style={styles.sectionTitle}>Helpful Tips</Text>
              {selectedSymptom.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <View style={[styles.tipDot, { backgroundColor: selectedSymptom.color }]} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.notesContainer}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <TouchableOpacity style={styles.addNoteButton}>
                <Text style={styles.addNoteText}>+ Add a note about this symptom</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          // Symptoms list view
          <ScrollView style={styles.content}>
            <Animated.View 
              style={[
                styles.dateContainer, 
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }] 
                }
              ]}
            >
              <Text style={styles.dateText}>{currentDate}</Text>
              <Text style={styles.dateSubtext}>Track your symptoms today</Text>
            </Animated.View>
            
            <View style={styles.symptomsContainer}>
              {symptoms.map((symptom, index) => (
                <Animated.View 
                  key={symptom.id}
                  style={[
                    styles.symptomCard,
                    { 
                      opacity: fadeAnim,
                      transform: [{ translateY: Animated.multiply(slideAnim, new Animated.Value(1 + index * 0.2)) }] 
                    }
                  ]}
                >
                  <TouchableOpacity 
                    style={styles.symptomCardContent}
                    onPress={() => setSelectedSymptom(symptom)}
                  >
                    <View style={[styles.symptomIcon, { backgroundColor: symptom.color }]}>
                      <FontAwesome5 name={symptom.icon} size={18} color="#FFF" />
                    </View>
                    <View style={styles.symptomInfo}>
                      <Text style={styles.symptomName}>{symptom.name}</Text>
                      <Text style={styles.symptomIntensity}>
                        {getIntensityLabel(symptom.intensity)}
                      </Text>
                    </View>
                    {renderIntensitySelector(symptom)}
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
            
            <TouchableOpacity style={styles.addSymptomButton}>
              <LinearGradient
                colors={['#FF6B8B', '#FF8E9E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addSymptomGradient}
              >
                <Text style={styles.addSymptomText}>+ Add New Symptom</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <View style={styles.summaryContainer}>
              <Text style={styles.sectionTitle}>Today's Summary</Text>
              <View style={styles.summaryContent}>
                <Image 
                  source={require('../Assest/perganant.jpg')} 
                  style={styles.summaryImage}
                  resizeMode="contain"
                />
                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryText}>
                    You're experiencing moderate nausea, fatigue, and cravings today. These symptoms are common during pregnancy.
                  </Text>
                  <TouchableOpacity style={styles.summaryButton}>
                    <Text style={styles.summaryButtonText}>View Recommendations</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
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
  historyButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    fontFamily: 'Avenir-Heavy',
  },
  dateSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    fontFamily: 'Avenir',
  },
  symptomsContainer: {
    marginBottom: 20,
  },
  symptomCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  symptomCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  symptomIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symptomInfo: {
    flex: 1,
    marginLeft: 12,
  },
  symptomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    fontFamily: 'Avenir-Medium',
  },
  symptomIntensity: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    fontFamily: 'Avenir',
  },
  intensityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intensityButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 4,
  },
  addSymptomButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
  },
  addSymptomGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  addSymptomText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Avenir-Medium',
  },
  summaryContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 12,
    fontFamily: 'Avenir-Heavy',
  },
  summaryContent: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryImage: {
    width: 80,
    height: 80,
  },
  summaryTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  summaryText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'Avenir',
  },
  summaryButton: {
    backgroundColor: '#FFE5EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  summaryButtonText: {
    fontSize: 12,
    color: '#FF6B8B',
    fontWeight: '600',
    fontFamily: 'Avenir-Medium',
  },
  backToListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backToListText: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Avenir-Medium',
  },
  symptomDetailHeader: {
    alignItems: 'center',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
  },
  symptomIconLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  symptomDetailName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
    fontFamily: 'Avenir-Heavy',
  },
  symptomDetailIntensity: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
    fontFamily: 'Avenir',
  },
  symptomChartContainer: {
    marginBottom: 25,
  },
  chart: {
    marginTop: 10,
    borderRadius: 15,
  },
  todayTracking: {
    marginBottom: 25,
  },
  intensitySelectorLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  intensityButtonLarge: {
    width: (width - 80) / 5,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intensityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy',
  },
  intensityLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  intensityLabelSmall: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Avenir',
  },
  descriptionContainer: {
    marginBottom: 25,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    fontFamily: 'Avenir',
  },
  tipsContainer: {
    marginBottom: 25,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    fontFamily: 'Avenir',
  },
  notesContainer: {
    marginBottom: 30,
  },
  addNoteButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFE5EB',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addNoteText: {
    fontSize: 14,
    color: '#FF6B8B',
    fontFamily: 'Avenir-Medium',
  },
});

export default SymptomTrackerScreen;