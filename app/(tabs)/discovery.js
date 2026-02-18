import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  FlatList 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PromoBanner from '../../components/discoveryPromoBanner';

// Mock Data
const CATEGORIES = ['All', 'Local', 'Fast Food', 'Supermarket', 'Pharmacy', 'Café', 'Snacks'];
const FEATURED = [
  { id: '1', name: 'Mama Put Kitchen', rating: '4.8', time: '25-35 min', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'The Place', rating: '4.7', time: '30-40 min', image: 'https://via.placeholder.com/150' },
];

export default function DiscoveryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Discovery</Text>
          <TouchableOpacity style={styles.locationSelector}>
            <Ionicons name="location-outline" size={14} color="#e31b23" />
            <Text style={styles.locationText}>Select delivery address</Text>
            <Ionicons name="chevron-forward" size={14} color="#666" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="time-outline" size={24} color="black" style={styles.icon} />
          <Ionicons name="heart-outline" size={24} color="black" style={styles.icon} />
          <Ionicons name="cart-outline" size={24} color="black" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={[styles.toggleBtn, styles.activeToggle]}>
            <Text style={styles.activeToggleText}>Browse Stores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleBtn}>
            <Text style={styles.inactiveToggleText}>My Orders</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput 
            style={styles.input} 
            placeholder="Search stores, restaurants..." 
          />
        </View>

        {/* Food/Non-Food Filter */}
        <View style={styles.tabContainer}>
          <View style={styles.tabItemActive}>
             <MaterialCommunityIcons name="silverware-fork-knife" size={16} color="black" />
             <Text style={styles.tabText}>Food</Text>
          </View>
          <View style={styles.tabItemInactive}>
             <MaterialCommunityIcons name="shopping-outline" size={16} color="#999" />
             <Text style={styles.tabTextInactive}>Non-Food</Text>
          </View>
        </View>

        {/* Categories Horizontal List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesList}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.categoryChip, index === 0 && styles.activeChip]}>
              <Text style={index === 0 ? styles.activeChipText : styles.chipText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <PromoBanner />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⭐ Featured</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        
        <FlatList 
          horizontal
          data={FEATURED}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.card}>
               <Image source={{uri: item.image}} style={styles.cardImage} />
               <Text style={styles.cardName}>{item.name}</Text>
               <Text style={styles.cardMeta}>⭐ {item.rating}  •  {item.time}</Text>
               <Text style={styles.freeDelivery}>Free Delivery</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎯 Picked For You</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <FlatList 
          horizontal
          data={FEATURED}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.card}>
               <Image source={{uri: item.image}} style={styles.cardImage} />
               <Text style={styles.cardName}>{item.name}</Text>
               <Text style={styles.cardMeta}>⭐ {item.rating}  •  {item.time}</Text>
               <Text style={styles.freeDelivery}>Free Delivery</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff'},
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    marginBottom: 15 
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  locationSelector: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 12, color: '#666', marginHorizontal: 4 },
  headerIcons: { flexDirection: 'row' },
  icon: { marginRight: 15 },
  
  toggleContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#f0f0f0', 
    marginHorizontal: 15, 
    borderRadius: 8, 
    padding: 4 
  },
  toggleBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 6 },
  activeToggle: { backgroundColor: '#e31b23' },
  activeToggleText: { color: '#fff', fontWeight: 'bold' },
  inactiveToggleText: { color: '#999' },

  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 45
  },
  input: { flex: 1, marginLeft: 10 },

  tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tabItemActive: { flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, borderBottomWidth: 2, borderBottomColor: 'black' },
  tabItemInactive: { flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10 },
  
  categoriesList: { paddingLeft: 15, marginVertical: 15 },
  categoryChip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 10 },
  activeChip: { backgroundColor: '#e31b23' },
  activeChipText: { color: '#fff', fontWeight: 'bold' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#e31b23', fontWeight: 'bold' },

  card: { width: 160, marginLeft: 15, marginVertical: 15, borderWidth: 1, borderColor: '#eee', borderRadius: 10},
  cardImage: { width: 160, height: 100, borderRadius: 10, backgroundColor: '#eee' },
  cardName: { fontWeight: 'bold', marginTop: 5, padding: 3 },
  cardMeta: { fontSize: 12, color: '#666', padding: 3 },
  freeDelivery: { fontSize: 12, color: 'green', fontWeight: '500', padding: 3 }
});