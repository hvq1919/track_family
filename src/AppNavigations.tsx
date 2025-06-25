import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FamilyScreen from './screens/FamilyScreen';
import DetailScreen from './screens/DetailScreen';
import { headerOptions } from './styles';
import i18n from './locales';

const Stack = createStackNavigator();

const FamilyStack = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="FamilyMain" component={FamilyScreen} options={{ title: i18n.t('family_title') }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: i18n.t('detail_title') }} />
    </Stack.Navigator>
  );
}

export { FamilyStack };