import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../src/contexts/ThemeContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GerenciadorDeProgresso } from '@/src/assets/components/topbar';

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabsLayout() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      
      <GerenciadorDeProgresso />

      <MaterialTopTabs
        tabBarPosition="bottom"
        tabBar={({ state, descriptors, navigation }) => {
          return (
            <View style={[styles.tabContainer, {
              backgroundColor: theme.background,
              paddingBottom: insets.bottom + 5,
              height: 65 + insets.bottom
            }]}>
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.title !== undefined ? options.title : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                const renderIcon = (color: string) => {
                  const size = 24;
                  switch (route.name) {
                    case "(index)": return <Ionicons name="home" size={size} color={color} />;
                    case "(consultas)": return <FontAwesome name="bars" size={size} color={color} />;
                    case "(agendar)": return <MaterialIcons name="event-available" size={size} color={color} />;
                    case "(perfil)": return <FontAwesome5 name="user-cog" size={18} color={color} />;
                    default: return null;
                  }
                };

                return (
                  <TouchableOpacity
                    key={route.key}
                    onPress={onPress}
                    style={styles.tabItem}
                  >
                    <View style={[styles.indicator, {
                      backgroundColor: isFocused ? theme.primary : 'transparent'
                    }]} />

                    {renderIcon(isFocused ? theme.primary : theme.placeholder)}

                    <Text style={{
                      color: isFocused ? theme.primary : theme.placeholder,
                      fontSize: 10,
                      marginTop: 4
                    }}>
                      {label === 'index' ? 'Início' : label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
        screenOptions={{
          swipeEnabled: true,      
          animationEnabled: true,  
        }}
      >
        <MaterialTopTabs.Screen name="(index)" options={{ title: "Início" }} />
        <MaterialTopTabs.Screen name="(consultas)" options={{ title: "Consultas" }} />
        <MaterialTopTabs.Screen name="(agendar)" options={{ title: "Agendar" }} />
        <MaterialTopTabs.Screen name="(perfil)" options={{ title: "Perfil" }} />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    elevation: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  indicator: {
    width: '60%',
    height: 3,
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  }
});