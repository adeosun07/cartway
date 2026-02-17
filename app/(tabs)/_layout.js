import {Tabs} from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{headerShown: false,
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={20} color={color} />
                ),
                tabBarActiveTintColor: "#d40000",
                tabBarInactiveTintColor: "#6b7280",
            }}/>
            <Tabs.Screen name="delivery" options={{headerShown: false,
                title: "Delivery",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="cube-outline" size={20} color={color} />
                ),
            }}/>
            <Tabs.Screen name="discovery" options={{headerShown: false,
                title: "Discovery",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="bag-handle-outline" size={20} color={color} />
                ),
            }}/>
            <Tabs.Screen name="services" options={{headerShown: false, 
                title: "Services",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="grid-outline" size={20} color={color} />
                ),
                }}/>
            <Tabs.Screen name="profile" options={{headerShown: false,
                title: "Profile",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={20} color={color} />
                ),
            }}/>
        </Tabs>
    )
}