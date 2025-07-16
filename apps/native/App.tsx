import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NewsCard } from 'ui';

export default function App() {
  return (
      <>
        <NewsCard />
        <StatusBar style="light" />
      </>
  );
}