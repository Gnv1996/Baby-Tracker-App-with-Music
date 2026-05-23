import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Optimized image URLs with high availability production tags
const WHAT_TO_FEED = [
  { id: '1', title: 'ठंडा केला मैश करके', desc: 'यह नरम होता है और मसूड़ों को आराम देता है।', img: 'https://images.unsplash.com/photo-1566393028639-d108a42c46a7?w=200&q=80' },
  { id: '2', title: 'दही (ठंडी और ताजी)', desc: 'मसूड़ों को ठंडक देता है और पचने में आसान है।', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=150&q=80' },
  { id: '3', title: 'उबला हुआ आलू मैश करके', desc: 'नरम और हल्का, बच्चा आसानी से खा सकता है।', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&q=80' },
  { id: '4', title: 'सेब की प्यूरी (उबालकर)', desc: 'पौष्टिक और मसूड़ों के लिए अच्छा है।', img: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=200&q=80' },
  { id: '5', title: 'मां का दूध (Breastfeeding)', desc: 'बच्चे के लिए सर्वोत्तम और आराम देता है।', img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=200&q=80' },
  { id: '6', title: 'ठंडी गाजर (बड़े बच्चे के लिए)', desc: 'हल्का चबाने से मसूड़ों को आराम देता है।', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80' },
];

const WHAT_NOT_TO_DO = [
  { id: '1', title: 'ज्यादा मीठी चीजें न दें।', img: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=200&q=80' },
  { id: '2', title: 'गंदे हाथ या खिलौने मुँह में न जाने दें।', img: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=200&q=80' },
  { id: '3', title: 'पूरे मेवे और सख्त चीजें न दें।', img: 'https://images.unsplash.com/photo-1608797178974-15b35a61d121?w=200&q=80' },
];

const WHAT_ELSE_TO_DO = [
  { id: '1', title: 'साफ उंगली से हल्के हाथ से मसूड़ों की मालिश करें।', img: 'https://images.unsplash.com/photo-1543333995-a78aa23be7a7?w=200&q=80' },
  { id: '2', title: 'साफ ठंडी टीथर (Teether) दें।', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=200&q=80' },
  { id: '3', title: 'बच्चे को प्यार और आराम दें।', img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&q=80' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#FA8072" />

      {/* ================= HERO BANNER WITH RE-POLISHED CONTENT ================= */}
      <View style={styles.heroContainer}>
        <Image
  source={require('../Assest/maa.jpeg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>👶 BABY HEALTH RECON</Text>
          </View>
          <Text style={styles.heroMainTitle}>Teething Relief Guide</Text>
          <Text style={styles.heroSubTitle}>Solid Food Start: 2 May 2026</Text>
          <Text style={styles.heroDescription}>
            Your baby completes 6 months on this date 💚
          </Text>
        </View>
      </View>

      {/* ================= TWO-COLUMN GRID CONTENT ================= */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.mainGrid}>
          
          {/* LEFT COLUMN: WHAT TO FEED */}
          <View style={[styles.column, styles.leftColumn]}>
            <View style={styles.greenHeader}>
              <Text style={styles.columnHeaderText}>✅ क्या खिलाएं?</Text>
            </View>
            
            <View style={styles.columnBody}>
              {WHAT_TO_FEED.map((item) => (
                <View key={item.id} style={styles.feedRow}>
                  <Image source={{ uri: item.img }} style={styles.circleImage} />
                  <View style={styles.textContainer}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      <Text style={styles.greenNumber}>{item.id}. </Text>
                      {item.title}
                    </Text>
                    <Text style={styles.itemDesc} numberOfLines={3}>{item.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* RIGHT COLUMN: AVOID & TIPS */}
          <View style={styles.column}>
            
            {/* Section: क्या न करें? */}
            <View style={styles.sectionContainer}>
              <View style={styles.redHeader}>
                <Text style={styles.columnHeaderText}>❌ क्या न करें?</Text>
              </View>
              <View style={[styles.columnBody, styles.redBody]}>
                {WHAT_NOT_TO_DO.map((item) => (
                  <View key={item.id} style={styles.actionRow}>
                    <Image source={{ uri: item.img }} style={styles.circleImageSmall} />
                    <Text style={[styles.itemTitle, { flex: 1 }]} numberOfLines={2}>
                      <Text style={styles.redNumber}>{item.id}. </Text>
                      {item.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Section: और क्या करें? */}
            <View style={styles.sectionContainer}>
              <View style={styles.blueHeader}>
                <Text style={styles.columnHeaderText}>⭐ और क्या करें?</Text>
              </View>
              <View style={[styles.columnBody, styles.blueBody]}>
                {WHAT_ELSE_TO_DO.map((item) => (
                  <View key={item.id} style={styles.actionRow}>
                    <Image source={{ uri: item.img }} style={styles.circleImageSmall} />
                    <Text style={[styles.itemTitle, { flex: 1 }]} numberOfLines={2}>
                      <Text style={styles.blueNumber}>{item.id}. </Text>
                      {item.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

          </View>

        </View>
      </ScrollView>
      
      {/* Disclaimer Bottom Banner */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>⚠️ Always consult your pediatrician for health concerns.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  heroContainer: {
    overflow: 'hidden',
    height: 380,
    backgroundColor: '#10B981',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#059669',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  
  heroImage: {
    width: '100%',
    height: 380,
    position: 'absolute',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  heroMainTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.8,
    marginBottom: 4,
  },
  heroSubTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F0FDEF',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  heroDescription: {
    fontSize: 13,
    color: '#E0F5DC',
    marginTop: 4,
    fontWeight: '500',
    lineHeight: 18,
  },
  scrollContainer: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 32,
  },
  mainGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  column: {
    width: '49%',
  },
  leftColumn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E8F5E9',
    shadowColor: '#10B981',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#F0F4FF',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  greenHeader: { 
    backgroundColor: '#10B981', 
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  redHeader: { 
    backgroundColor: '#F43F5E', 
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#F43F5E',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  blueHeader: { 
    backgroundColor: '#3B82F6', 
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  
  columnHeaderText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  columnBody: {
    padding: 10,
    backgroundColor: '#FAFBFC',
  },
  redBody: { backgroundColor: '#FFF7F8' },
  blueBody: { backgroundColor: '#F0F6FF' },

  // List Item Rows Style
  feedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1.2,
    borderColor: '#E8F5E9',
    shadowColor: '#10B981',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1.2,
    borderColor: '#F3E8FF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  circleImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
    borderWidth: 2.5,
    borderColor: '#F0FDEF',
    shadowColor: '#10B981',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  circleImageSmall: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#F0F6FF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  greenNumber: { 
    color: '#10B981', 
    fontWeight: '900',
    fontSize: 12,
  },
  redNumber: { 
    color: '#F43F5E', 
    fontWeight: '900',
    fontSize: 12,
  },
  blueNumber: { 
    color: '#3B82F6', 
    fontWeight: '900',
    fontSize: 12,
  },

  itemTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 15,
    letterSpacing: 0.2,
  },
  itemDesc: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 3,
    lineHeight: 13,
    fontWeight: '500',
  },
  footer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  footerText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
