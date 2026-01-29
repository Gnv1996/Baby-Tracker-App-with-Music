import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export default function AppointmentsPage() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const navigation = useNavigation();

  const upcomingAppointments = [
  
    {
      id: 1,
      title: 'BP Follow-up Visit',
      date: 'October 31, 2025',
      time: '01:30 PM',
      location: 'Uma Foundation, Patna, Bihar',
      doctor: 'Dr. Alka Pandey',
      tests: [
        'Blood Pressure monitoring',
        'Routine prenatal check-up',
        'Baby movement and heartbeat check',
      ],
      notes:
        'Visited on 31 October 2025 with BP reading 153/95 mmHg.',
      instructions: [
        'Record BP daily at home',
        'Maintain rest and avoid stress',
        'Drink plenty of water and take a balanced diet',
        'Continue regular pregnancy medicines as advised earlier',
      ],
      prescriptions: [],
      month: 'OCT',
      day: '31',
    },
    {
      id: 2,
      title: 'Delivery (C-Section)',
      date: 'November 2, 2025',
      time: '11:25 AM',
      location: 'Uma Foundation, Patna, Bihar',
      doctor: 'Dr. Alka Pandey',
      tests: [
        'Pre-delivery vital check-up',
        'C-section procedure',
        'Newborn baby examination',
      ],
      notes:
        'C-section was performed on 2 November 2025 at around 11:00 AM due to fluctuating BP. A healthy baby boy was born. Both mother and baby are stable after delivery. Doctor advised rest and postnatal care.',
      instructions: [
        'Take complete bed rest for at least 2 weeks',
        'Continue prescribed medicines and supplements',
        'Keep the surgical wound clean and dry',
        'Breastfeed the baby regularly and stay hydrated',
        'Visit hospital for postnatal check-up after 7 days',
      ],
      prescriptions: [],
      month: 'NOV',
      day: '2',
    }
    
    
    
  ];

  const pastAppointments = [
    {
      id: 3,
      title: 'First Prenatal Visit',
      date: 'March 29, 2025',
      time: '09:30 AM',
      location: 'Saint Joseph Hospital ,UP',
      doctor: 'Dr. Megha Sharma',
      notes: 'Initial consultation and confirmation of pregnancy.',
      tests: ['USG TVS', 'ANC Profile'],
      month: 'MAR',
      day: '29',
    },
    {
      id: 4,
      title: 'Ultrasound Scan (TVS)',
      date: 'April 7, 2025',
      time: '09:30 AM',
      location: 'Saint Joseph Hospital ,UP',
      doctor: 'Dr. Megha Sharma',
      notes:
        'Bring previous scan reports. Drink water 1 hour before the appointment.',
      tests: ['HbA1c', 'Glucose Fasting and 2 hrs'],
      medicines: ['Tab Folic Acid'],
      month: 'APR',
      day: '07',
    },
    {
      id: 5,
      title: 'Ultrasound Appointment & Routine Checkup',
      date: 'May 13, 2025',
      time: '9:30 AM',
      location: 'Saint Joseph Hospital ,UP',
      doctor: 'Dr. Megha Sharma',
      notes: 'Routine prenatal checkup. Blood pressure and weight monitoring.',
      tests: ['NT / NB Scan', 'Double Marker Test'],
      medicines: ['Convical-D', 'Tab Folic Acid', 'Vitamin D3'],
      month: 'MAY',
      day: '13',
    },
    {
      id: 6,
      title: 'Routine Health Check',
      date: 'June 12, 2025',
      time: '9:00 AM',
      location: 'Saint Joseph Hospital, UP',
      doctor: 'Dr. Megha Sharma',
      notes:
        'Doctor administered Tetanus injection and prescribed Iron and Calcium supplements. Tests are predicted based on consultation.',
      month: 'JUN',
      day: '12',
      injections: ['Tetanus (TT)'],
      prescriptions: ['Iron supplements', 'Calcium supplements'],
    },
    {
      id: 7,
      title: 'Prenatal Visit & Ultrasound',
      date: 'July 12, 2025',
      time: '9:00 AM',
      location: 'Saint Joseph Hospital, UP',
      doctor: 'Dr. Megha Sharma',
      tests: ['Anomaly Scan (Completed)', 'Tetanus (TT) Injection given'],
      notes:
        'Anomaly Scan report is normal. Tetanus (TT2) second dose administered. TT schedule complete.',
      month: 'JUL',
      day: '12',
      instructions: [
        'Continue Calcium and Iron supplements as advised',
        'No further Tetanus dose needed this pregnancy',
      ],
    },
    {
      id: 8,
      title: 'Prenatal Visit',
      date: 'August 13, 2025',
      time: '9:00 AM',
      location: 'Saint Joseph Hospital, UP',
      doctor: 'Dr. Megha Sharma',
      tests: [
        'Prescribed medicines: Convical-D tablet, Ferigard-XT syrup, Gemfate suspension',
        'OGTT (Oral Glucose Tolerance Test) planned for next visit',
      ],
      notes:
        'Follow-up visit. Medicines prescribed. OGTT scheduled for next appointment.',
      month: 'AUG',
      day: '13',
      instructions: [
        'Continue prescribed medicines as advised',
        'Get OGTT done before next visit',
      ],
    },

    {
      id: 9,
      title: 'Prenatal Visit & Report Review',
      date: 'August 31, 2025',
      time: '9:00 AM',
      location: 'Uma Foundation, Patna (Bihar)',
      doctor: 'Dr. Alka Panday',
      notes:
        'Shifted to parents’ home in Bihar. Doctor reviewed all previous reports from Saint Joseph Hospital (Dr. Megha Sharma). Prescribed new medicines after report review.',
      tests: [
        'Report review: Previous scans and blood tests checked',
        'General prenatal check-up',
      ],
      prescriptions: [
        {
          name: 'Candida-V Gel',
          use: 'Vaginal infection se bachav aur treatment (itching, discharge, burning ke liye)',
        },
        {
          name: 'Frego + Seacare-SR',
          use: 'Progesterone support — uterus ko relax karke pregnancy ko safe rakhna, miscarriage aur preterm labour prevent karna',
        },
        {
          name: 'Calcium D3',
          use: 'Aapke aur baby ke bones aur teeth strong banana, cramps aur deficiency se bachav',
        },
        {
          name: 'Ticlofen',
          use: 'Pain relief (sirf doctor ke advice par, short duration ke liye)',
        },
      ],

      month: 'AUG',
      day: '31',
    },
    {
      id: 10,
      title: 'Prescription & Treatment Update',
      date: 'September 12, 2025',
      time: '01:00 PM',
      location: 'Uma Foundation, Patna, Bihar',
      doctor: 'Dr. Alka Pandey',
      notes:
        'Doctor prescribed updated treatment after ultrasound and check-up. Enoxaparin injection, Aspirin tablet, and weekly RL drips advised.',
      tests: ['Doppler Ultrasound'],
      prescriptions: [
        {
          name: 'Enoxaparin 40 mg Injection (SC, daily)',
          use: 'Prevents blood clot formation and improves blood supply to the placenta and baby',
        },
        {
          name: 'Aspirin 150 mg Tablet (at bedtime)',
          use: 'Taken orally at night, helps improve blood flow during pregnancy and reduce complications',
        },
        {
          name: 'Ringer Lactate (RL) Drip – Weekly',
          use: 'Weekly IV fluid for hydration and better blood circulation',
        },

        {
          name: 'Iron Supplement (Faa-20)',
          use: 'Maintain hemoglobin, folic acid and zinc support, prevent anemia',
        },
        {
          name: 'Calcium + Vitamin D3 Supplement (Zecal-Gold)',
          use: 'Support strong bones and teeth, prevent cramps',
        },
        {
          name: 'Progesterone Tablet (Susten)',
          use: 'Support pregnancy and prevent preterm contractions',
        },
      ],
      month: 'SEP',
      day: '12',
    },

    {
      id: 12,
      title: 'Follow-up Consultation',
      date: 'September 19, 2025',
      time: '01:30 PM',
      location: 'Uma Foundation, Patna, Bihar',
      doctor: 'Dr. Alka Pandey',
      notes:
        'Follow-up visit to review progress after starting Enoxaparin and Aspirin. RL drip continued weekly. Iron, Calcium, Progesterone (Susten), and multivitamin (Faa-20) supplements were also continued.',
      prescriptions: [
        {
          name: 'Continue Enoxaparin Injection (daily)',
          use: 'Maintain blood circulation and prevent clot formation',
        },
        {
          name: 'Continue Aspirin Tablet (night)',
          use: 'Support blood flow to placenta',
        },
        {
          name: 'RL Drip – Weekly',
          use: 'Continue hydration and circulation support',
        },
        {
          name: 'Iron Supplement (Faa-20)',
          use: 'Maintain hemoglobin, folic acid and zinc support, prevent anemia',
        },
        {
          name: 'Calcium + Vitamin D3 Supplement (Zecal-Gold)',
          use: 'Support strong bones and teeth, prevent cramps',
        },
        {
          name: 'Progesterone Tablet (Susten)',
          use: 'Support pregnancy and prevent preterm contractions',
        },
      ],
      month: 'SEP',
      day: '19',
    },
    {
      id: 13,
      title: 'Follow-up Visit & Color Doppler Advice',
      date: 'October 7, 2025',
      time: '01:00 PM',
      location: 'Uma Foundation, Patna, Bihar',
      doctor: 'Dr. Alka Pandey',
      tests: [
        'Routine prenatal check-up',
        'Blood Pressure & Weight Check',
        'Review of prescribed medicines',
        'Doctor advised Color Doppler Ultrasound for monitoring baby’s blood flow and placenta condition',
      ],
      notes:
        'Doctor advised a Color Doppler Ultrasound to assess blood circulation between baby and placenta. The test was completed and the report was shown to the doctor for review. Aspirin and RL Drip were continued as advised till 9 October.',
      instructions: [
        'Continue all prescribed medicines till 9 October as advised',
        'Maintain good hydration and take proper rest',
        'Monitor baby’s movements daily and inform doctor if any changes are noticed',
      ],
      prescriptions: [
        {
          name: 'Enoxaparin Injection (night, till 9 October)',
          use: 'Maintain blood circulation and prevent clot formation',
        },
        {
          name: 'Aspirin Tablet (night, till 9 October)',
          use: 'Support blood flow to placenta',
        },
        {
          name: 'RL Drip – Weekly (till 9 October)',
          use: 'Hydration and circulation support',
        },
        {
          name: 'Iron Supplement (Faa-20)',
          use: 'Maintain hemoglobin, folic acid and zinc support, prevent anemia',
        },
        {
          name: 'Calcium + Vitamin D3 Supplement (Zecal-Gold)',
          use: 'Support strong bones and teeth, prevent cramps',
        },
        {
          name: 'Progesterone Tablet (Susten)',
          use: 'Support pregnancy and prevent preterm contractions',
        },
      ],
      month: 'OCT',
      day: '07',
    },
    {
      id: 14,
      title: 'BP Check & Follow-up',
      date: 'October 28, 2025',
      time: '01:30 PM',
      location: 'Uma Foundation, Patna, Bihar',
      doctor: 'Dr. Alka Pandey',
      tests: [
        'Blood Pressure Check (130/90 mmHg)',
      ],
      notes:
        'Doctor noted BP 130/90 mmHg. Prescribed Labetalol (100 mg) once daily. Advised to record BP daily and visit again after 2 days.',
      instructions: [
        'Take Labetalol 100 mg daily as advised',
        'Record BP daily (morning and evening)',
        'Avoid salt and fried food',
        'Stay hydrated and rest adequately',
        'Come for follow-up after 2 days',
      ],
      prescriptions: [
        {
          name: 'Labetalol 100 mg',
          use: 'Take 1 tablet daily',
        },
        {
          name: 'Calcium + Vitamin D3 Supplement (Zecal-Gold)',
          use: 'Support strong bones and teeth, prevent cramps',
        },
      ],
      month: 'OCT',
      day: '28',
    },
  ];

  const renderAppointment = ({item}) => (
    <View style={[styles.card, selectedTab === 'past' && styles.pastCard]}>
      <View style={styles.dateBox}>
        <Text style={styles.month}>{item.month}</Text>
        <Text style={styles.day}>{item.day}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#ec4899" />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#ec4899" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="user-md" size={16} color="#ec4899" />
          <Text style={styles.infoText}>{item.doctor}</Text>
        </View>

        {/* Add tests list if available */}
        {item.tests && item.tests.length > 0 && (
          <View style={[styles.notesBox, {marginTop: 8}]}>
            <Text style={styles.notesTitle}>Investigation:</Text>
            {item.tests.map((test, index) => (
              <Text key={index} style={styles.notesText}>
                - {test}
              </Text>
            ))}
          </View>
        )}

        {/* Add prescriptions list if available */}
        {item.prescriptions && item.prescriptions.length > 0 && (
          <View style={[styles.notesBox, {marginTop: 8}]}>
            <Text style={styles.notesTitle}>💊 Medicines:</Text>
            {item.prescriptions.map((med, index) => (
              <View key={index} style={{marginBottom: 4}}>
                <Text style={styles.notesText}>• {med.name}</Text>
                <Text
                  style={[
                    styles.notesText,
                    {marginLeft: 12, fontSize: 12, color: '#6b7280'},
                  ]}>
                  {med.use}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Add medicines list if available */}

        {item.notes && (
          <View style={styles.notesBox}>
            <Text style={styles.notesTitle}>Notes:</Text>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        )}

        {selectedTab !== 'past' && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.outlineText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity style={styles.newBtn}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.newBtnText}>New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'upcoming' && styles.activeTabText,
            ]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
          onPress={() => setSelectedTab('past')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'past' && styles.activeTabText,
            ]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          selectedTab === 'upcoming' ? upcomingAppointments : pastAppointments
        }
        keyExtractor={item => item.id.toString()}
        renderItem={renderAppointment}
        scrollEnabled={false}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  newBtn: {
    flexDirection: 'row',
    backgroundColor: '#ec4899',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  newBtnText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
  },
  activeTab: {
    borderBottomColor: '#ec4899',
  },
  tabText: {
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ec4899',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pastCard: {
    opacity: 0.6,
  },
  dateBox: {
    backgroundColor: '#fce7f3',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  month: {
    color: '#ec4899',
    fontWeight: '500',
    fontSize: 12,
  },
  day: {
    color: '#ec4899',
    fontWeight: 'bold',
    fontSize: 24,
  },
  details: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    gap: 6,
  },
  infoText: {
    marginLeft: 8,
    color: '#4b5563',
    fontSize: 14,
  },
  notesBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    padding: 8,
    marginTop: 10,
  },
  notesTitle: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 13,
    color: '#4b5563',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  outlineButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 4,
  },
  outlineText: {
    color: '#1f2937',
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: '#fca5a5',
    borderWidth: 1,
    borderRadius: 4,
  },
  cancelText: {
    color: '#b91c1c',
  },
});
