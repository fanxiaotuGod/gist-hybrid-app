import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, ImageBackground } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type NewsCardProps = {
  imageUrl: string;
  title: string;
  summary: string;
  newsSource: string;
};

export const NewsCard: React.FC<NewsCardProps> = ({ imageUrl, title, summary, newsSource }) => {
  return (
    <LinearGradient
      colors={[
        'rgba(0,0,0,0.6)',
        'rgba(0,0,0,0.7)',
        'rgba(0,0,0,0.85)',
        'rgba(0,0,0,0.95)',
      ]}
      style={styles.fullScreen}
    >
      <SafeAreaView style={styles.fullScreen}>
        <View style={styles.container}>
          {/* Selection bars - same width as main card */}
          <View style={styles.selectionBars}>
            <View style={[styles.selectionBar, styles.activeBar]} />
            <View style={[styles.selectionBar, styles.inactiveBar]} />
            <View style={[styles.selectionBar, styles.inactiveBar]} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.newsSource}>{newsSource}</Text>
            <View style={styles.headerIcons}>
              <Feather name="more-horizontal" size={24} color="white" />
              <Feather name="x" size={24} color="white" style={{ marginLeft: 16 }} />
            </View>
          </View>

          {/* Main Content Card - Extended further down */}
          <View style={styles.card}>
            {/* Image with title overlay - takes half of card */}
            <View style={styles.imageSection}>
              <ImageBackground source={{ uri: imageUrl }} style={styles.imageContainer} imageStyle={styles.image}>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.imageGradient}
                >
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
            
            {/* Content section - takes other half of card */}
            <View style={styles.contentSection}>
              <View style={styles.contentContainer}>
                <Text style={styles.summary}>{summary}</Text>
                <Text style={styles.attribution}>
                  Summarized News Story by <Text style={styles.gist}>The Gist - AI News App</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Footer - moved closer to bottom */}
          <View style={styles.footer}>
            <View style={styles.sideActions}>
              <Feather name="heart" size={32} color="white" />
            </View>
            
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow News Source</Text>
            </TouchableOpacity>
            
            <View style={styles.sideActions}>
              <Entypo name="paper-plane" size={28} color="white" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  selectionBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16, // Match main card margins
  },
  selectionBar: {
    height: 3,
    flex: 1,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  activeBar: {
    backgroundColor: 'white',
  },
  inactiveBar: {
    backgroundColor: '#444',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  newsSource: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a', // Lighter background
    marginBottom: 8, // Reduced margin to extend card down
  },
  imageSection: {
    flex: 1, // Takes half of the card
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8, // Smaller radius
    padding: 12, // Smaller padding to make it shorter
    alignSelf: 'flex-start', // Make container width fit content
    maxWidth: '80%', // Limit width to make it shorter
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  contentSection: {
    flex: 1, // Takes other half of the card
  },
  contentContainer: {
    backgroundColor: '#2a2a2a', // Lighter background
    padding: 20,
    flex: 1,
  },
  summary: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 22,
  },
  attribution: {
    color: '#888',
    marginTop: 16,
    fontSize: 12,
  },
  gist: {
    color: '#4ade80',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8, // Reduced padding to move closer to bottom
    paddingBottom: Platform.OS === 'ios' ? 0 : 8, // Even closer to bottom
  },
  sideActions: {
    width: 60,
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12, // Smaller radius to show 4 corners clearly
    flex: 1,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  followButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
}); 