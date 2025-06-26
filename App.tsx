import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen'; // Importing HomeScreen from the src folder
import SettingsScreen from './src/screens/SettingsScreen'; // Importing SettingsScreen from the src folder
import { FamilyStack } from './src/AppNavigations';
import { headerOptions, mainColor } from './src/styles';
import i18n from './src/locales';
import { Ionicons } from '@expo/vector-icons';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ActionSheetProvider>
      < NavigationContainer >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            ...headerOptions,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home-outline';
              if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
              if (route.name === 'Family') iconName = focused ? 'people' : 'people-outline';
              if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: mainColor,
            tabBarInactiveTintColor: 'gray',
          })}
        >
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
    </ActionSheetProvider>
  );
}