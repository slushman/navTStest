import React, { ReactElement, useCallback, useMemo } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import * as R from 'ramda';

import PageOne from './PageOne';
import PageTwo from './PageTwo';

Icon.loadFont();

const Tab = createBottomTabNavigator();

const routes = [
  { component: PageOne, icon: 'ios-jet', name: 'pageone', title: 'Page One' },
  { component: PageTwo, icon: 'ios-settings', name: 'pagetwo', title: 'Page Two' },
];

const mapIndexed = R.addIndex(R.map);

const App = () => {
  const tabBarOptions = useMemo(() => ({
    activeTintColor: 'green',
    inactiveTintColor: 'gray',
  }), []);

  const renderTab = useCallback(({ component, icon, name, title }, index) => (
    <Tab.Screen
      component={component}
      key={index}
      name={name}
      options={{
        tabBarIcon: ({ color, size }) => (<Icon color={color} name={icon} size={size} />),
        tabBarLabel: title,
      }}
    />
  ), []);

  return (
    <NavigationNativeContainer>
      <Tab.Navigator
        initialRouteName="pagetwo"
        tabBarOptions={tabBarOptions}
      >
        {
          mapIndexed(renderTab, routes)
        }
      </Tab.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
