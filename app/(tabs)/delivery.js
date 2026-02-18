import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Search,
  ListFilter,
  Copy,
  Phone,
  MessageSquare,
  Package,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const DeliveriesScreen = () => {
  const [activeTab, setActiveTab] = useState("All");

  // ✅ CENTRAL DELIVERY DATA
  const deliveries = [
    {
      id: 1,
      status: "Active",
      statusLabel: "On the way",
      statusColor: "#FEE2E2",
      statusTextColor: "#EF4444",
      time: "2:30 PM",
      pickup: "Bodija Market, Ibadan",
      dropoff: "UI Campus, Ibadan",
      pin: "4 8 2 9",
      driver: "Adebayo O.",
      rating: "4.8",
      price: "₦1,500",
    },
    {
      id: 2,
      status: "Active",
      statusLabel: "Preparing",
      statusColor: "#FEF3C7",
      statusTextColor: "#D97706",
      time: "1:15 PM",
      isOrder: true,
      items: "Jollof Rice • Fried Chicken • Plantain",
      pickup: "Mama Put Kitchen",
      dropoff: "Challenge, Ibadan",
      pin: "7 3 5 6",
      price: "₦4,500",
    },
    {
      id: 3,
      status: "Done",
      statusLabel: "Delivered",
      statusColor: "#DCFCE7",
      statusTextColor: "#16A34A",
      time: "4:00 PM",
      pickup: "Ring Road, Ibadan",
      dropoff: "Mokola, Ibadan",
      driver: "Chinedu M.",
      rating: "4.9",
      price: "₦1,200",
      isDone: true,
    },
  ];

  // ✅ FILTER LOGIC
  const filteredDeliveries = useMemo(() => {
    if (activeTab === "All") return deliveries;
    return deliveries.filter((d) => d.status === activeTab);
  }, [activeTab]);

  const activeCount = deliveries.filter((d) => d.status === "Active").length;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.screenTitle}>My Deliveries</Text>
          <View style={styles.orderCountBadge}>
            <Text style={styles.orderCountText}>
              {deliveries.length} orders
            </Text>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search size={18} color="#999" />
            <TextInput
              placeholder="Search by ID, location or store"
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <ListFilter size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* TABS */}
        <View style={styles.tabBar}>
          {["All", "Active", "Done", "Cancelled"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabItem,
                activeTab === tab && styles.activeTabItem,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>

                {tab === "Active" && activeCount > 0 && (
                  <View style={styles.tabBadge}>
                    <Text style={styles.tabBadgeText}>{activeCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredDeliveries.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Package size={32} color="#666" />
            </View>
            <Text style={styles.emptyTitle}>No deliveries found</Text>
            <Text style={styles.emptySub}>
              Your deliveries will appear here
            </Text>
            <TouchableOpacity style={styles.bookBtn}>
              <Text style={styles.bookBtnText}>Book a delivery</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredDeliveries.map((delivery) => (
            <DeliveryCard key={delivery.id} {...delivery} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const DeliveryCard = ({
  statusLabel,
  statusColor,
  statusTextColor,
  time,
  pickup,
  dropoff,
  pin,
  driver,
  rating,
  price,
  isOrder,
  items,
  isDone,
}) => (
  <View style={styles.card}>
    <View style={[styles.cardHeader, { backgroundColor: statusColor }]}>
      <View style={styles.statusRow}>
        <Text style={[styles.statusText, { color: statusTextColor }]}>
          {statusLabel === "Delivered" ? (
            "✓ "
          ) : isOrder && statusLabel === "Preparing" ? (
            <Ionicons name="time-outline" size={14} color={statusTextColor} />
          ) : (
            <Ionicons name="car-outline" size={14} color={statusTextColor} />
          )}
          {statusLabel}
        </Text>
        <View style={styles.headerRight}>
          {isOrder && (
            <View style={styles.orderLabel}>
              <Text style={styles.orderLabelText}>📋 Order</Text>
            </View>
          )}
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
    </View>

    <View style={styles.cardBody}>
      <View style={styles.routeContainer}>
        <View style={styles.timeline}>
          <View style={[styles.dot, { backgroundColor: "#16A34A" }]} />
          <View style={styles.line} />
          <View style={[styles.dot, { backgroundColor: "#EF4444" }]} />
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addrLabel}>Pickup</Text>
          <Text style={styles.addrText}>{pickup}</Text>

          <Text style={[styles.addrLabel, { marginTop: 12 }]}>Drop-off</Text>
          <Text style={styles.addrText}>{dropoff}</Text>
        </View>
      </View>

      {items && <Text style={styles.itemsText}>{items}</Text>}

      {pin && (
        <View style={styles.pinContainer}>
          <View>
            <Text style={styles.pinLabel}>Delivery PIN</Text>
            <Text style={styles.pinValue}>{pin}</Text>
          </View>
          <TouchableOpacity style={styles.copyBtn}>
            <Copy size={16} color="#666" />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      )}

      {driver && (
        <View style={styles.driverRow}>
          <View style={styles.driverProfile}>
            <View style={styles.driverAvatar}>
              <Text style={styles.avatarText}>
                {driver.substring(0, 2).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.driverName}>{driver}</Text>
              <Text style={styles.ratingText}>⭐ {rating}</Text>
            </View>
          </View>

          {!isDone && (
            <View style={styles.actionIcons}>
              <TouchableOpacity style={styles.iconCircle}>
                <Phone size={18} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircle}>
                <MessageSquare size={18} color="#666" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <View style={styles.cardFooter}>
        <View style={styles.dateTag}>
          <Text style={styles.dateText}>📅 Today</Text>
        </View>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  header: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  screenTitle: { fontSize: 20, fontWeight: "bold" },
  orderCountBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orderCountText: { fontSize: 12, color: "#666" },

  searchContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: { flex: 1, height: 40, fontSize: 14 },
  filterBtn: { justifyContent: "center", paddingHorizontal: 5 },

  tabBar: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#e0e0e063",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTabItem: {
    backgroundColor: "#FFF",
    elevation: 2,
    shadowOpacity: 0.1,
  },
  tabText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: { color: "#000" },
  tabBadge: {
    backgroundColor: "#D31211",
    borderRadius: 10,
    paddingHorizontal: 6,
    marginLeft: 6,
  },
  tabBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  scrollContent: { padding: 16 },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  cardHeader: { paddingHorizontal: 12, paddingVertical: 8 },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: { fontSize: 12, fontWeight: "bold" },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeText: { fontSize: 12, color: "#666" },
  orderLabel: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  orderLabelText: { fontSize: 10, fontWeight: "600" },

  cardBody: { padding: 16 },
  routeContainer: { flexDirection: "row" },
  timeline: {
    alignItems: "center",
    width: 20,
    marginRight: 10,
    paddingTop: 5,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  line: {
    width: 2,
    height: 30,
    backgroundColor: "#EEE",
  },
  addressContainer: { flex: 1 },
  addrLabel: {
    fontSize: 10,
    color: "#999",
    textTransform: "uppercase",
  },
  addrText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
  },

  itemsText: {
    marginTop: 12,
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    backgroundColor: "#F9F9F9",
    padding: 8,
    borderRadius: 6,
  },

  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  pinLabel: { fontSize: 10, color: "#EF4444" },
  pinValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF4444",
    letterSpacing: 2,
  },
  copyBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
  copyText: { fontSize: 12, color: "#666" },

  driverRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  driverProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#EF4444", fontWeight: "bold" },
  driverName: { fontWeight: "600" },
  ratingText: { fontSize: 12, color: "#666" },
  actionIcons: { flexDirection: "row", gap: 10 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  dateTag: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dateText: { fontSize: 10, color: "#666" },
  priceText: { fontWeight: "bold", fontSize: 16 },

  emptyState: { alignItems: "center", marginTop: 100 },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySub: { color: "#999", marginBottom: 20 },
  bookBtn: {
    backgroundColor: "#D31211",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  bookBtnText: { color: "#FFF", fontWeight: "bold" },
});

export default DeliveriesScreen;
