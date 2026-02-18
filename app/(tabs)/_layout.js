import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const tabs = [
  { name: "index", title: "Home", icon: "home-outline" },
  { name: "delivery", title: "Delivery", icon: "cube-outline" },
  { name: "discovery", title: "Discovery", icon: "bag-handle-outline" },
  { name: "services", title: "Services", icon: "grid-outline" },
  { name: "profile", title: "Profile", icon: "person-outline" },
];

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#d40000",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={icon} size={size * 0.8} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}