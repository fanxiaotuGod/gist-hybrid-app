import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Get safe area insets for different platforms
const getStatusBarHeight = () => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 24;
  }
  return 0; // iOS handles this with SafeAreaView
};

const getNavigationBarHeight = () => {
  if (Platform.OS === 'android') {
    // Estimate navigation bar height for Android
    return 48;
  }
  return 0;
};

export const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    // Web-specific: Center content and limit width
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
      alignItems: 'center',
    }),
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // Platform-specific safe area handling
    ...(Platform.OS === 'android' && {
      paddingTop: getStatusBarHeight() + 8, // Status bar + extra spacing
      paddingBottom: getNavigationBarHeight() + 8, // Navigation bar + extra spacing
    }),
    // Web-specific: Maximum width constraint
    ...(Platform.OS === 'web' && {
      maxWidth: 350,
      width: 350,
      minHeight: screenHeight,
    }),
  },
  selectionBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4, // Reduced since container now handles spacing
    paddingBottom: 12,
    paddingHorizontal: 0,
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
    alignItems: 'center',
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  newsSource: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    width: 200,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  // Wrapper for the animated card content
  cardWrapper: {
    flex: 1,
    marginBottom: 8,
    // Web-specific: Ensure proper height
    ...(Platform.OS === 'web' && {
      minHeight: 600, // Minimum height for card content
    }),
  },
  card: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  imageSection: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 25,
    padding: 25,
    alignSelf: 'center',
    maxWidth: '90%',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  contentSection: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  summaryWrapper: {
    flex: 1,
  },
  summary: {
    color: '#E0E0E0',
    fontSize: 16,
    lineHeight: 22,
    // Platform-specific width
    ...(Platform.OS === 'web' ? {
      maxWidth: 320, // Maximum width on web
    } : {
      width: 350 // Fixed width on mobile
    }),
  },
  attribution: {
    color: '#888',
    fontSize: 12,
  },
  gist: {
    color: '#67b584',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
  },
  sideActions: {
    width: 60,
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  followButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
  swipeIndicator: {
    alignItems: 'center',
    paddingVertical: 4, // Reduced since container handles spacing
    marginBottom: Platform.OS === 'android' ? -35 : 0, // Extra margin for Android
  },
  swipeText: {
    color: '#888',
    fontSize: 12,
  },
  // Full-screen WebView styles
  fullScreenWebView: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  circularBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  webView: {
    flex: 1,
    marginTop: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
});