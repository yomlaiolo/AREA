import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AreaPage from './areaPage';
import ForgePage from './forgePage';
import { Image, StyleSheet, Text } from 'react-native';
import ProfilePage from './profilePage';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
                initialRouteName='Area'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let icon;

                        console.log(route.name);
                        if (route.name === 'Area') {
                            icon = focused ? require('@ressources/play_filled.png') : require('@ressources/play.png');
                        } else if (route.name === 'Forge') {
                            icon = focused ? require('@ressources/anvil_filled.png') : require('@ressources/anvil.png');
                        } else if (route.name === 'Profile') {
                            icon = focused ? require('@ressources/user_filled.png') : require('@ressources/user.png');
                        }

                        return <Image source={icon} style={styles.icon} />;
                    },
                    headerShown: false,
                    tabBarActiveTintColor: '#0db6a8',
                    tabBarInactiveTintColor: 'white',
                    tabBarStyle: [styles.tabBar, {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }
                    ],
                    tabBarShowLabel: false,
                })}
            >
      <Tab.Screen name="Forge" component={ForgePage} />
      <Tab.Screen name="Area" component={AreaPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    tabBar: {
        borderTopWidth: 0,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2, // Negative value here for the shadow to go upwards
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
