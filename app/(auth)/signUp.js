import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY_RED = "#d40000";
const BORDER_GRAY = "#e5e7eb";
const TEXT_GRAY = "#6b7280";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");

  const handleBack = () => {
    router.push("/(auth)/login");
  };

  const handleSignUp = () => {
    // TODO: replace with real authentication
    console.log("Sign up", { fullName, email, password });
    router.replace("/(tabs)")
  };

  const handleDemoAccount = () => {
    setEmail("demo@cartway.com");
    setPassword("demo1234");
    setFullName("Demo User");
    handleSignIn();
  };

  const handleSignIn = () => {
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#111827" />
        </TouchableOpacity>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>C</Text>
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join Cartway to start sending packages
        </Text>
      </View>

      <View style={styles.form}>
        <KeyboardAvoidingView
          style={styles.form}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.formContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={Keyboard.dismiss}
              style={styles.formContent}
            >
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={TEXT_GRAY}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={TEXT_GRAY}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={TEXT_GRAY}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={styles.eyeButton}
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={18}
                    color={TEXT_GRAY}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.9}
                onPress={handleSignUp}
              >
                <Text style={styles.primaryButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.demoButton}
                activeOpacity={0.9}
                onPress={handleDemoAccount}
              >
                <Ionicons
                  name="flash-outline"
                  size={18}
                  color={PRIMARY_RED}
                  style={styles.demoIcon}
                />
                <Text style={styles.demoButtonText}>Try Demo Account</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.bottomLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: PRIMARY_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },
  titleBlock: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: TEXT_GRAY,
  },
  form: {
    flex: 1,
  },
  formContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER_GRAY,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  eyeButton: {
    paddingLeft: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 8,
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: PRIMARY_RED,
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: PRIMARY_RED,
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER_GRAY,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: TEXT_GRAY,
  },
  demoButton: {
    borderWidth: 1,
    borderColor: "#facc15",
    backgroundColor: "#fefce8",
    paddingVertical: 14,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  demoIcon: {
    marginRight: 8,
  },
  demoButtonText: {
    fontSize: 14,
    color: PRIMARY_RED,
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  bottomText: {
    fontSize: 13,
    color: TEXT_GRAY,
  },
  bottomLink: {
    fontSize: 13,
    color: PRIMARY_RED,
    fontWeight: "600",
  },
});
