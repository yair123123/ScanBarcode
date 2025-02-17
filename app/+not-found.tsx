import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const NotFoundScreen = () => (
  <View>
    <Stack.Screen options={{ title: 'Not Found' }} />
    <View style={styles.container}>
      <Link style={styles.button} href={'/tabs/(scan)'}>
        Go back to home
      </Link>
    </View>
  </View>
);

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    fontSize: 18,
    color: '#007BFF',
  },
});
