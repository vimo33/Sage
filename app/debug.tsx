import { View, Text, StyleSheet } from 'react-native';

export default function DebugScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sage Debug Mode</Text>
      <Text style={styles.subtext}>If you see this, the JS bridge is working.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#37ec13',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#e8d5b7',
    fontSize: 16,
    marginTop: 10,
  },
});
