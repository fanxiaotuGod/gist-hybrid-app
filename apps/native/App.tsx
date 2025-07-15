import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet } from 'react-native';
import { NewsCard } from 'ui';
import { LinearGradient } from 'expo-linear-gradient';

const jsonData = {
  image_url: "https://nypost.com/wp-content/uploads/sites/2/2024/03/Maryland-Bridge-Collapse_48236-ce6b1.jpg?quality=90&strip=all",
  title: "Hero workers stopped cars from crossing Francis Scott Key Bridge moments before collapse",
  summary: "The Francis Scott Key Bridge in Baltimore collapsed after a container ship hit it. The ship lost propulsion and warned officials of a possible collision. The bridge was closed for repairs at the time and workers were on the bridge when it collapsed.",
  newsSource: "National Post",
};

export default function App() {
  return (
    <ImageBackground
      source={{ uri: jsonData.image_url }}
      style={styles.container}
      blurRadius={8}
    >
      <LinearGradient
        colors={[
          'rgba(100,100,100,0.4)',
          'rgba(60,60,60,0.6)',
          'rgba(30,30,30,0.8)',
          'rgba(0,0,0,0.9)',
        ]}
        style={styles.overlay}
      >
        <NewsCard
          imageUrl={jsonData.image_url}
          title={jsonData.title}
          summary={jsonData.summary}
          newsSource={jsonData.newsSource}
        />
        <StatusBar style="light" />
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
});
