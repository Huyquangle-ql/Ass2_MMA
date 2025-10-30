import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PriceSummary = ({ subtotal, shipping = 0, tax = 0 }) => {
  const total = subtotal + shipping + tax;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal:</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>
      {shipping > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Shipping:</Text>
          <Text style={styles.value}>${shipping.toFixed(2)}</Text>
        </View>
      )}
      {tax > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Tax:</Text>
          <Text style={styles.value}>${tax.toFixed(2)}</Text>
        </View>
      )}
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default PriceSummary;
