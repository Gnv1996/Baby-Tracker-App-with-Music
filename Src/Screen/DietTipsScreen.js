import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const fruitsData = [
  { emoji: '🍌', name: 'Banana', vitamins: 'Vitamin B6, C, Potassium, Fiber', benefits: 'Nausea control, energy boost, constipation relief', color: '#FFF3CD' },
  { emoji: '🍐', name: 'Pears', vitamins: 'Vitamin C, Fiber, Potassium, Folate', benefits: 'Good digestion, fetal brain development', color: '#D4F4DD' },
  { emoji: '🥒', name: 'Cucumber', vitamins: 'Vitamin K, C, Magnesium, Hydration', benefits: 'Cooling, reduces swelling, hydrates', color: '#E8F5E8' },
  { emoji: '🥭', name: 'Mango', vitamins: 'Vitamin A, C, Folate', benefits: 'Supports baby\'s skin, immunity, digestion', color: '#FFE4B5' },
  { emoji: '🍎', name: 'Apple', vitamins: 'Vitamin C, Fiber, Potassium', benefits: 'Boosts immunity & baby\'s brain development', color: '#FFE4E1' },
  { emoji: '🥥', name: 'Coconut Water', vitamins: 'Electrolytes (K, Mg), Natural Hydration', benefits: 'Reduces acidity, swelling, and keeps energy up', color: '#F0F8FF' },
  { emoji: '🍊', name: 'Orange', vitamins: 'Vitamin C, Folate, Potassium', benefits: 'Boosts immunity, helps iron absorption, fetal growth', color: '#FFEFD5' },
  { emoji: '🍎', name: 'Pomegranate', vitamins: 'Vitamin C, K, Folate, Fiber, Iron', benefits: 'Increases hemoglobin, improves blood flow to baby', color: '#FDE2E4' },
  { emoji: '🥛', name: 'Milk', vitamins: 'Calcium, Vitamin D, Protein, B12', benefits: 'Supports baby\'s bones, teeth & overall growth', color: '#F5FFFA' },

  // Dry Fruits
  { emoji: '🌰', name: 'Almonds', vitamins: 'Vitamin E, Magnesium, Fiber', benefits: 'Boosts immunity, energy, brain development', color: '#FFF3CD' },
  { emoji: '🌴', name: 'Dates (Khajur)', vitamins: 'Iron, Potassium, Fiber', benefits: 'Energy boost, prevents anemia, helps contractions in later weeks', color: '#D2A679' },
  { emoji: '🥜', name: 'Cashews (Kajju)', vitamins: 'Magnesium, Protein, Healthy Fats', benefits: 'Bone & heart health, energy', color: '#FFE4B5' },
  { emoji: '🍇', name: 'Raisins (Kishmis)', vitamins: 'Iron, Potassium, Antioxidants', benefits: 'Prevents anemia, boosts energy', color: '#F4E1D2' },
  { emoji: '🖤', name: 'Black Raisins', vitamins: 'Iron, Calcium, Fiber', benefits: 'Blood purification, energy & digestion', color: '#D3C4BC' },
  { emoji: '🌰', name: 'Munakka', vitamins: 'Iron, Calcium, Antioxidants', benefits: 'Boosts immunity, prevents anemia', color: '#EED6B9' },
];



const GradientCard = ({ children, colors = ['#FFFFFF', '#F8F9FA'] }) => {
  return (
    <View style={[styles.gradientCard, { backgroundColor: colors[0] }]}>
      {children}
    </View>
  );
};

const MealCard = ({ title, children, icon, timeColor = '#FF6B6B' }) => (
  <View style={styles.mealCard}>
    <View style={[styles.mealHeader, { backgroundColor: timeColor + '15' }]}>
      <Text style={styles.mealIcon}>{icon}</Text>
      <Text style={[styles.mealTitle, { color: timeColor }]}>{title}</Text>
    </View>
    <View style={styles.mealContent}>
      {children}
    </View>
  </View>
);

const InfoCard = ({ title, children, bgColor = '#F8F9FA', titleColor = '#2C3E50' }) => (
  <View style={[styles.infoCard, { backgroundColor: bgColor }]}>
    <Text style={[styles.infoTitle, { color: titleColor }]}>{title}</Text>
    <View style={styles.infoContent}>
      {children}
    </View>
  </View>
);

const FruitCard = ({ fruit }) => (
  <View style={[styles.fruitCard, { backgroundColor: fruit.color }]}>
    <View style={styles.fruitHeader}>
      <Text style={styles.fruitEmoji}>{fruit.emoji}</Text>
      <Text style={styles.fruitName}>{fruit.name}</Text>
    </View>
    <View style={styles.fruitDetails}>
      <View style={styles.fruitSection}>
        <Text style={styles.fruitLabel}>🔬 Nutrients</Text>
        <Text style={styles.fruitText}>{fruit.vitamins}</Text>
      </View>
      <View style={styles.fruitSection}>
        <Text style={styles.fruitLabel}>🤰 Benefits</Text>
        <Text style={styles.fruitText}>{fruit.benefits}</Text>
      </View>
    </View>
  </View>
);

const DietTipsScreen = () => {

    const navigation=useNavigation()
  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <View style={styles.header}>
  <View style={styles.headerLeft}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
    <View>
      <Text style={styles.headerTitle}>Pregnancy Diet Guide</Text>
      <Text style={styles.headerSubtitle}>Healthy eating for you & baby</Text>
    </View>
  </View>

  <View style={styles.headerDecoration}>
    <Text style={styles.headerEmoji}>🤱</Text>
  </View>
</View>


      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Daily Meal Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Daily Meal Plan</Text>
          
    
          <MealCard title="Morning (7:00–8:00 AM)" icon="🌅" timeColor="#FF9500">
  <Text style={styles.mealPoint}>• Warm water + 1 tsp ajwain (strain & drink)</Text>
  <Text style={styles.mealPoint}>• 5 soaked almonds + 1 date + 1 walnut</Text>
  <Text style={styles.mealPoint}>• 5 soaked kishmish (raisins)</Text>
  <Text style={styles.mealPoint}>• 2 cashews (kaju)</Text>
  <Text style={styles.mealPoint}>• 1 soaked munakka</Text>
  <Text style={styles.mealPoint}>• 1 dry date (chuhara)</Text>
</MealCard>


          <MealCard title="Breakfast (8:30–9:30 AM)" icon="🍽️" timeColor="#34C759">
            <Text style={styles.mealPoint}>• Vegetable daliya OR moong dal chilla</Text>
            <Text style={styles.mealPoint}>• 1 cup chai (low sugar), 1 small banana</Text>
          </MealCard>

          <MealCard title="Mid-Morning (11:30 AM)" icon="🍓" timeColor="#FF3B30">
            <Text style={styles.mealPoint}>• Buttermilk with jeera + kala namak</Text>
            <Text style={styles.mealPoint}>• 1 pear / apple / papaya</Text>
          </MealCard>

          <MealCard title="Lunch (1:00–2:00 PM)" icon="🍛" timeColor="#007AFF">
            <Text style={styles.mealPoint}>• Roti + lauki/tinda + moong dal</Text>
            <Text style={styles.mealPoint}>• Small bowl dahi</Text>
          </MealCard>

          <MealCard title="Evening Snack (4:30–5:30 PM)" icon="☕" timeColor="#5856D6">
            <Text style={styles.mealPoint}>• Fennel tea or ajwain chai</Text>
            <Text style={styles.mealPoint}>• Pear / roasted makhana / khakra</Text>
          </MealCard>

          <MealCard title="Dinner (7:00–8:00 PM)" icon="🍲" timeColor="#AF52DE">
            <Text style={styles.mealPoint}>• Moong dal khichdi + veggie soup</Text>
          </MealCard>

          <MealCard title="Bedtime (9:30–10:00 PM)" icon="🌙" timeColor="#8E8E93">
            <Text style={styles.mealPoint}>• Warm milk + haldi</Text>
            <Text style={styles.mealPoint}>• If constipation: 1 tsp isabgol + warm water</Text>
          </MealCard>
        </View>

        {/* Gas Relief Remedies */}
        <View style={styles.section}>
          <InfoCard 
            title="🌿 Natural Gas Relief Remedies" 
            bgColor="#E8F5E8" 
            titleColor="#2E7D32"
          >
            <View style={styles.remedyItem}>
              <Text style={styles.remedyIcon}>🕖</Text>
              <Text style={styles.remedyText}>Empty stomach: Ajwain water</Text>
            </View>
            <View style={styles.remedyItem}>
              <Text style={styles.remedyIcon}>🍽️</Text>
              <Text style={styles.remedyText}>After meals: 1 tsp saunf (chew)</Text>
            </View>
            <View style={styles.remedyItem}>
              <Text style={styles.remedyIcon}>☕</Text>
              <Text style={styles.remedyText}>Evening: Ginger + fennel tea</Text>
            </View>
            <View style={styles.remedyItem}>
              <Text style={styles.remedyIcon}>🥥</Text>
              <Text style={styles.remedyText}>Anytime: Coconut water (cooling)</Text>
            </View>
            <View style={styles.remedyItem}>
              <Text style={styles.remedyIcon}>🚶‍♀️</Text>
              <Text style={styles.remedyText}>After meals: 10–15 mins walk</Text>
            </View>
          </InfoCard>
        </View>

        {/* Foods to Avoid */}
        <View style={styles.section}>
          <InfoCard 
            title="🚫 Foods to Avoid" 
            bgColor="#FFEBEE" 
            titleColor="#C62828"
          >
            <View style={styles.avoidItem}>
              <Text style={styles.avoidBullet}>•</Text>
              <Text style={styles.avoidText}>Rajma, chhole, besan, fried food</Text>
            </View>
            <View style={styles.avoidItem}>
              <Text style={styles.avoidBullet}>•</Text>
              <Text style={styles.avoidText}>Soda, cold drinks, chewing gum</Text>
            </View>
            <View style={styles.avoidItem}>
              <Text style={styles.avoidBullet}>•</Text>
              <Text style={styles.avoidText}>Tamarind, chili, pickles</Text>
            </View>
            <View style={styles.avoidItem}>
              <Text style={styles.avoidBullet}>•</Text>
              <Text style={styles.avoidText}>Lying down after meals</Text>
            </View>
          </InfoCard>
        </View>

        {/* Fruits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🍉 Beneficial Fruits</Text>
          <Text style={styles.sectionSubtitle}>Packed with essential nutrients for pregnancy</Text>
          
          {fruitsData.map((fruit, index) => (
            <FruitCard key={index} fruit={fruit} />
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#FF9E9E',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  
  headerSubtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  
  headerDecoration: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  headerEmoji: {
    fontSize: 30,
  },
  
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mealIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  mealContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  mealPoint: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    lineHeight: 20,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContent: {
    gap: 12,
  },
  remedyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  remedyIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  remedyText: {
    fontSize: 14,
    color: '#2E7D32',
    flex: 1,
    lineHeight: 20,
  },
  avoidItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  avoidBullet: {
    fontSize: 16,
    color: '#C62828',
    marginRight: 12,
    marginTop: 2,
  },
  avoidText: {
    fontSize: 14,
    color: '#C62828',
    flex: 1,
    lineHeight: 20,
  },
  fruitCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  fruitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fruitEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  fruitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  fruitDetails: {
    gap: 8,
  },
  fruitSection: {
    marginBottom: 8,
  },
  fruitLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 4,
  },
  fruitText: {
    fontSize: 13,
    color: '#5D6D7E',
    lineHeight: 18,
    paddingLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default DietTipsScreen;