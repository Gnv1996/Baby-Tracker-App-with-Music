import React from 'react';
import { StatusBar ,SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Src/Screen/SplashScreen';
import HomeScreen from './Src/Screen/HomeScreen';
import DevelopmentScreen from './Src/Screen/DevelopmentScreen';
import SymptomTrackerScreen from './Src/Screen/SysmtomsTracker';
import AppointmentsPage from './Src/Screen/AppointmentsPage';
import MusicPlayer from './Src/Screen/MusicPlayer';
const Stack = createStackNavigator();
import PregnancyWeekToMonth from './Src/Screen/PregnancyWeekToMonth';
import DietTipsScreen from './Src/Screen/DietTipsScreen';
import NormalDeliveryPrep from './Src/Screen/NormalDeliveryPrep';
import VaccineReminderScreen from './Src/Screen/VaccineReminderScreen';
import PregnancyMonthChartComponent from './Src/Screen/MonthWise';
import VaccineTrackerScreen from './Src/Baby Birth';
import BabyMilestonesScreen from './Src/Baby Birth/BabyActivity';


export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
          <Stack.Screen name="monthwise" component={PregnancyMonthChartComponent} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Development" component={DevelopmentScreen} />
        <Stack.Screen name="SymptomTracker" component={SymptomTrackerScreen} /> 
        <Stack.Screen name="Appointment" component={AppointmentsPage} /> 
        <Stack.Screen name="Play" component={MusicPlayer} /> 
        <Stack.Screen name="Month" component={PregnancyWeekToMonth} />
        <Stack.Screen name="Diet" component={DietTipsScreen} />
        <Stack.Screen name="NormalDelivery" component={NormalDeliveryPrep} />
        <Stack.Screen name="Vaccine" component={VaccineReminderScreen} />
        <Stack.Screen name="MyBaby" component={VaccineTrackerScreen} />
        <Stack.Screen name="Activity" component={BabyMilestonesScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}