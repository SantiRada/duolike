import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.navActive,
        tabBarInactiveTintColor: Colors.navInactive,
        headerStyle: {
          backgroundColor: Colors.background,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: Colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: Colors.navBackground,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="home"
              size={28}
              color={color}
            />
          ),
          headerTitle: 'DuolikeUX',
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practicar',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="fitness-center"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="person"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
