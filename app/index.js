import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAppState = async () => {
      try {
        const onboarded = await AsyncStorage.getItem("onboarded");
        const token = await AsyncStorage.getItem("token");

        if (token) {
          router.replace("/(tabs)");
        } else if (!onboarded) {
          router.replace("/onboarding");
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.log("Error checking app state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAppState();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});