import { Tabs } from 'expo-router';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getThemedColors, COLORS, RADII, withAlpha } from '../../lib/ui/theme';

type TabName = 'index' | 'explore' | 'journal' | 'insights' | 'settings';

type TabIconProps = {
  name: TabName;
  focused: boolean;
  color: string;
};

// Icon mapping: [outlined, filled] variants for each tab
const TAB_ICONS: Record<TabName, { outlined: keyof typeof Ionicons.glyphMap; filled: keyof typeof Ionicons.glyphMap }> = {
  index: { outlined: 'chatbubble-outline', filled: 'chatbubble' },
  explore: { outlined: 'compass-outline', filled: 'compass' },
  journal: { outlined: 'book-outline', filled: 'book' },
  insights: { outlined: 'sparkles-outline', filled: 'sparkles' },
  settings: { outlined: 'settings-outline', filled: 'settings' },
};

const ACTIVE_COLOR = '#37ec13';
const INACTIVE_COLOR = '#737373';

const TabIcon = ({ name, focused, color }: TabIconProps) => {
  const iconConfig = TAB_ICONS[name];
  const iconName = focused ? iconConfig.filled : iconConfig.outlined;

  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Ionicons
        name={iconName}
        size={24}
        color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
      />
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => <TabIcon name="index" focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused, color }) => <TabIcon name="explore" focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ focused, color }) => <TabIcon name="journal" focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contrasts"
        options={{
          href: null, // Hide contrasts tab from tab bar
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ focused, color }) => <TabIcon name="insights" focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color }) => <TabIcon name="settings" focused={focused} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 32,
    borderRadius: RADII.full,
  },
  iconContainerFocused: {
    backgroundColor: withAlpha(ACTIVE_COLOR, 0.15),
  },
});
