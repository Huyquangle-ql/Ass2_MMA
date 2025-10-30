import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../hooks/useCart';

const CheckoutSuccessScreen = ({ navigation, route }) => {
  const { clearCart } = useCart();
  const { orderTotal, itemCount } = route.params || {};
  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Clear cart after successful checkout
    clearCart();

    // Animate success icon
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleContinueShopping = () => {
    navigation.navigate('ProductList');
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={80} color="#fff" />
        </View>
      </Animated.View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Order Successful!</Text>
        <Text style={styles.subtitle}>
          Thank you for your purchase
        </Text>

        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="receipt-outline" size={24} color="#666" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Order Number</Text>
              <Text style={styles.detailValue}>
                #{Math.floor(Math.random() * 1000000)}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="cube-outline" size={24} color="#666" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Items</Text>
              <Text style={styles.detailValue}>{itemCount || 0} items</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="cash-outline" size={24} color="#666" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Total Amount</Text>
              <Text style={styles.detailValue}>
                ${(orderTotal || 0).toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={24} color="#666" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Estimated Delivery</Text>
              <Text style={styles.detailValue}>3-5 business days</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="mail-outline" size={20} color="#2196F3" />
          <Text style={styles.infoText}>
            Order confirmation has been sent to your email
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinueShopping}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => alert('Order tracking coming soon!')}
          activeOpacity={0.8}
        >
          <Ionicons name="location-outline" size={20} color="#2196F3" />
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  successCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  orderDetails: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailText: {
    marginLeft: 16,
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    marginLeft: 12,
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  trackButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CheckoutSuccessScreen;
