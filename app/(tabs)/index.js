import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGreeting } from "../../utils/greeting";
import { Bell, Search, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Header Section --- */}
        <View style={styles.headerContainer}>
          {/* Top Section: Greeting & Profile */}
          <View style={styles.topRow}>
            <View>
              <Text style={styles.greetingText}>{getGreeting()} 👋</Text>
              <Text style={styles.userNameText}>Demo</Text>
            </View>

            <View style={styles.iconGroup}>
              <TouchableOpacity style={styles.notificationBtn}>
                <Bell size={20} color="#FFFFFF" />
                <View style={styles.dotBadge} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.profileCircle}>
                <Text style={styles.profileInitials}>DU</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar / Delivery Request */}
          <TouchableOpacity activeOpacity={0.9} style={styles.searchBar}>
            <View style={styles.searchIconContainer}>
              <Search size={18} color="#D31211" strokeWidth={2.5} />
            </View>

            <View style={styles.searchTextContainer}>
              <Text style={styles.searchTitle}>Place a delivery request</Text>
              <Text style={styles.searchSubtitle}>
                Enter pickup & delivery location
              </Text>
            </View>

            <ChevronRight size={20} color="#CCCCCC" />
          </TouchableOpacity>
        </View>

        {/* --- Promo Banners --- */}
        <View style={styles.promoContainer}>
          <TouchableOpacity
            style={[styles.promoCard, { backgroundColor: "#F28C32", flex: 2 }]}
          >
            <Text style={styles.promoLabel}>Craving small chops?</Text>
            <Text style={styles.promoTitle}>Buy from Skyefoodies</Text>
            <Text style={styles.promoSub}>Fresh snacks • Fast delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.promoCard, { backgroundColor: "#00A651", flex: 1 }]}
          >
            <Text style={styles.promoLabel}>🇳🇬 Hungry?</Text>
            <Text style={styles.promoTitle}>Order from Item7go</Text>
            <Text style={styles.promoSub}>Ready in 30min</Text>
          </TouchableOpacity>
        </View>

        {/* --- Main Actions Grid --- */}
        <Text style={styles.sectionTitle}>What would you like to do?</Text>
        <View style={styles.grid}>
          <ActionCard
            icon= {<Ionicons name="paper-plane-outline" size={24} color="#d31e3d"/>}
            title="Send a Package"
            sub="Instant or scheduled delivery"
          />
          <ActionCard
            icon={<Ionicons name="restaurant-outline" size={24} color="#48b10c"/>}
            title="Order Food"
            sub="From your favorite restaurants"
            action={() => router.push("/discovery")}
          />
          <ActionCard
            icon={<MaterialIcons name="storefront" size={24} color="#4c9297"/>}
            title="Get Delivery from Store"
            sub="Already ordered? We'll pick it up"
          />
          <ActionCard
            icon={<Ionicons name="navigate-outline" size={24} color="black"/>}
            title="Track Delivery"
            sub="Live updates on your orders"
            action={()=> router.push("/delivery")}
          />
        </View>

        {/* --- Food Stores --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Food stores near you</Text>
          <TouchableOpacity onPress={() => router.push("/discovery")}>
            <Text style={styles.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          <StoreCard
            name="Mama Put Kitchen"
            type="Local Food"
            rating="4.8"
            time="25-35 min"
          />
          <StoreCard
            name="Chicken Republic"
            type="Fast Food"
            rating="4.5"
            time="20-30 min"
          />
          <StoreCard
            name="The Place"
            type="Local Food"
            rating="4.7"
            time="30-40 min"
          />
        </ScrollView>

        {/* --- Saved Places --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved places</Text>
          <Text style={styles.addBtn}>+ Add new</Text>
        </View>
        <View style={styles.savedPlace}>
          <Text>🏠</Text>
          <View style={styles.placeText}>
            <Text style={styles.placeName}>Home</Text>
            <Text style={styles.placeAddr}>12 Bodija Estate, Ibadan</Text>
          </View>
        </View>

        {/* --- Bottom Discount Banner --- */}
        <View style={styles.footerBanner}>
          <Text style={styles.footerLabel}>First time here?</Text>
          <Text style={styles.footerTitle}>
            Get 50% off your first delivery
          </Text>
          <TouchableOpacity style={styles.sendBtn}>
            <Text style={styles.sendBtnText}>Send now →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable Components
const ActionCard = ({ icon, title, sub, action }) => (
  <TouchableOpacity style={styles.actionCard} onPress={action}>
    <Text style={styles.actionIcon}>{icon}</Text>
    <Text style={styles.actionTitle}>{title}</Text>
    <Text style={styles.actionSub}>{sub}</Text>
  </TouchableOpacity>
);

const StoreCard = ({ name, type, rating, time }) => (
  <View style={styles.storeCard}>
    <View style={styles.storeImgPlaceholder} />
    <Text style={styles.storeName} numberOfLines={1}>
      {name}
    </Text>
    <Text style={styles.storeSub}>{type}</Text>
    <Text style={styles.storeStats}>
      ⭐ {rating} 🕒 {time}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: {
    backgroundColor: "#D31211", // Brand Red
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderRadius: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  greetingText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    fontWeight: "400",
  },
  userNameText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 2,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dotBadge: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    backgroundColor: "#FFCC00", // Matches the indicator in
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#D31211",
  },
  profileCircle: {
    backgroundColor: "#FFFFFF",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    color: "#D31211",
    fontWeight: "bold",
    fontSize: 14,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    // Soft shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  searchIconContainer: {
    backgroundColor: "#FDECEC", // Subtle pink/red tint
    padding: 8,
    borderRadius: 10,
    marginRight: 12,
  },
  searchTextContainer: {
    flex: 1,
  },
  searchTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  searchSubtitle: {
    fontSize: 12,
    color: "#7F7F7F",
    marginTop: 1,
  },

  promoContainer: { flexDirection: "row", padding: 16, gap: 10 },
  promoCard: { padding: 12, borderRadius: 12 },
  promoLabel: { color: "#fff", fontSize: 10 },
  promoTitle: { color: "#fff", fontWeight: "bold", marginVertical: 4 },
  promoSub: { color: "#fff", fontSize: 10, opacity: 0.9 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 10,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", padding: 8 },
  actionCard: {
    width: "45%",
    backgroundColor: "#fff",
    margin: "2.5%",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  actionTitle: { fontWeight: "bold", marginTop: 8, fontSize: 13 },
  actionSub: { fontSize: 11, color: "#777", marginTop: 4 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
  seeAll: { color: "#D31211", fontSize: 12 },
  addBtn: { color: "#D31211", fontWeight: "bold" },

  horizontalScroll: { paddingLeft: 16, marginTop: 10 },
  storeCard: {
    width: 130,
    marginRight: 12,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  storeImgPlaceholder: {
    height: 60,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 8,
  },
  storeName: { fontWeight: "bold", fontSize: 12 },
  storeSub: { fontSize: 10, color: "#777" },
  storeStats: { fontSize: 10, marginTop: 4 },

  savedPlace: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  placeText: { marginLeft: 12 },
  placeName: { fontWeight: "bold" },
  placeAddr: { fontSize: 12, color: "#777" },

  footerBanner: {
    backgroundColor: "#D31211",
    margin: 16,
    padding: 20,
    borderRadius: 15,
  },
  footerLabel: { color: "#fff", opacity: 0.8 },
  footerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  sendBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  sendBtnText: { color: "#D31211", fontWeight: "bold" },
});

export default App;
