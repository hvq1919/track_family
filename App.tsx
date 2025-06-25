import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen'; // Importing HomeScreen from the src folder
import SettingsScreen from './src/screens/SettingsScreen'; // Importing SettingsScreen from the src folder
import { FamilyStack } from './src/AppNavigations';
import { headerOptions } from './src/styles';
import i18n from './src/locales';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    < NavigationContainer >
      <Tab.Navigator screenOptions={headerOptions}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
            options={{
              headerShown: true,
              title: i18n.t('home_title'),
              tabBarLabel: i18n.t('home_title'),
            }}
        />
        <Tab.Screen
          name="Family"
          component={FamilyStack}
             options={{
            headerShown: false,
            title: i18n.t('family_title'),
            tabBarLabel: i18n.t('family_title'),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: i18n.t('settings_title'),
            tabBarLabel: i18n.t('settings_title'),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer >
  );
}