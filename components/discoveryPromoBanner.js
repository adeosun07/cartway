import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 30;
const ITEM_WIDTH = BANNER_WIDTH + 30;

const PROMOS = [
  { id: '1', title: 'Free Delivery Week!', sub: 'On orders above ₦3,000', color: '#E8F5E9', icon: 'truck-delivery' },
  { id: '2', title: '20% Off Your First Order', sub: 'Use code WELCOME20', color: '#FFEBEE', icon: 'ticket-percent' },
  { id: '3', title: 'New Restaurants Added!', sub: 'Explore local favorites', color: '#FFF9C4', icon: 'silverware-fork-knife' },
];

// Duplicate data for looping
const LOOP_DATA = [...PROMOS, ...PROMOS];

const PromoBanner = () => {
  const flatListRef = useRef(null);
  const timeoutRef = useRef(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      const nextIndex = index + 1;

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * ITEM_WIDTH,
        animated: true,
      });

      setIndex(nextIndex);
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  // Silent reset when reaching cloned part
  useEffect(() => {
    if (index === PROMOS.length) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: 0,
          animated: false, // no visible jump
        });
        setIndex(0);
      }, 50);
    }
  }, [index]);

  const activeIndex = index % PROMOS.length;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={LOOP_DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        keyExtractor={(item, i) => item.id + i}
        renderItem={({ item }) => (
          <View style={[styles.bannerCard, { backgroundColor: item.color }]}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name={item.icon} size={24} color="#333" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.sub}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.dotContainer}>
        {PROMOS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIndex ? '#e31b23' : '#CCC' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 15 },

  bannerCard: {
    width: BANNER_WIDTH,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },

  iconCircle: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 10,
    borderRadius: 25,
  },

  textContainer: { marginLeft: 15 },
  title: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 2 },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  }
});

export default PromoBanner;
