import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Onboarding() {
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem("onboarded", "true");
    } catch (error) {
      console.log("Error setting onboarded flag", error);
    } finally {
      router.replace("/(auth)/login");
    }
  };

  const handleSignIn = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <Ionicons name="cube" size={48} color="#ffffff" />
        </View>

        <Text style={styles.title}>Cartway</Text>
        <Text style={styles.subtitle}>Dispatch Made Simple</Text>
        <Text style={styles.description}>
          Send packages, track deliveries, and manage your logistics all in one
          place.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.9}
          onPress={handleGetStarted}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
          <Text style={styles.primaryButtonArrow}>{"›"}</Text>
        </TouchableOpacity>

        <View style={styles.signInRow}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const PRIMARY_RED = "#d40000";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
  },
  logoWrapper: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: PRIMARY_RED,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  logo: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4b5563",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: 320,
  },
  footer: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: PRIMARY_RED,
    paddingVertical: 18,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButtonArrow: {
    color: "#ffffff",
    fontSize: 18,
    marginLeft: 8,
  },
  signInRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signInText: {
    fontSize: 14,
    color: "#6b7280",
  },
  signInLink: {
    fontSize: 14,
    color: PRIMARY_RED,
    fontWeight: "600",
  },
});
