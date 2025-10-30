import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartItem from '../components/CartItem';
import PriceSummary from '../components/PriceSummary';
import { useCart } from '../hooks/useCart';

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useCart();

  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onUpdateQuantity={updateQuantity}
      onRemove={removeFromCart}
    />
  );

  const renderHeader = () => {
    if (cartItems.length === 0) return null;
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          My Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </Text>
        <TouchableOpacity onPress={clearCart} activeOpacity={0.7}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    if (cartItems.length === 0) return null;
    return (
      <View style={styles.footerContainer}>
        <PriceSummary subtotal={getCartTotal()} />
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('CheckoutSuccess', {
            orderTotal: getCartTotal(),
            itemCount: cartItems.length
          })}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={100} color="#ccc" />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyText}>
        Add some products to get started
      </Text>
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate('ProductList')}
        activeOpacity={0.8}
      >
        <Text style={styles.shopButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={cartItems.length === 0 && styles.emptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  clearText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: '600',
  },
  footerContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 24,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
