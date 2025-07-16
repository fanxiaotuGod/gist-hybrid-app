import React, { useState } from 'react';
import { View, Text, SafeAreaView, Share, Platform, Linking, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NewsCardProps, NewsItem } from './types';
import { newsData } from './newsData';
import { styles } from './styles';
import { AnimatedCardContent } from './AnimatedCardContent';
import { WebViewScreen } from './WebViewScreen';

// News card hook integrated into this file
const useNewsCard = (currentNews: NewsItem, currentIndex: number) => {
  // Track likes for each news item individually
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [showWebView, setShowWebView] = useState(false);

  // Check if current news item is liked
  const isLiked = likedItems.has(currentIndex);

  const handleLikePress = () => {
    setLikedItems(prev => {
      const newLikedItems = new Set(prev);
      if (newLikedItems.has(currentIndex)) {
        // Unlike this item
        newLikedItems.delete(currentIndex);
      } else {
        // Like this item (and unlike all others)
        newLikedItems.clear();
        newLikedItems.add(currentIndex);
      }
      return newLikedItems;
    });
  };

  const handleSharePress = async () => {
    const shareText = `${currentNews.title}\n\n${currentNews.summary}\n\nFrom: ${currentNews.newsSource}`;
    const shareUrl = currentNews.websiteUrl;

    if (Platform.OS === 'web') {
      // Web-specific sharing
      if (navigator.share) {
        // Use Web Share API if available (modern browsers)
        try {
          await navigator.share({
            title: currentNews.title,
            text: currentNews.summary,
            url: shareUrl,
          });
        } catch (error) {
          console.log('Web Share API failed, falling back to clipboard');
          // Fallback to clipboard
          copyToClipboard(shareText + '\n' + shareUrl);
        }
      } else {
        // Fallback: Copy to clipboard
        copyToClipboard(shareText + '\n' + shareUrl);
      }
    } else {
      // Mobile sharing (original functionality)
      try {
        const result = await Share.share({
          message: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    if (Platform.OS === 'web') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          alert('News story copied to clipboard!');
        }).catch(() => {
          // Fallback for older browsers
          fallbackCopyToClipboard(text);
        });
      } else {
        fallbackCopyToClipboard(text);
      }
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      alert('News story copied to clipboard!');
    } catch (err) {
      console.error('Fallback copy failed:', err);
      alert('Could not copy to clipboard. Please copy manually.');
    }

    document.body.removeChild(textArea);
  };

  const handleFollowPress = () => {
    if (Platform.OS === 'web') {
      // Web: Open in new tab/window
      window.open(currentNews.websiteUrl, '_blank');
    } else {
      // Mobile: Use WebView
      setShowWebView(true);
    }
  };

  const handleCloseWebView = () => {
    setShowWebView(false);
  };

  return {
    isLiked,
    showWebView,
    handleLikePress,
    handleSharePress,
    handleFollowPress,
    handleCloseWebView,
  };
};

export const NewsCard: React.FC<NewsCardProps> = ({ onGoBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentNews = newsData[currentIndex];

  // Use the integrated news card hook
  const {
    isLiked,
    showWebView,
    handleLikePress,
    handleSharePress,
    handleFollowPress,
    handleCloseWebView,
  } = useNewsCard(currentNews, currentIndex);

  // Handle going back from WebView
  const handleWebViewGoBack = () => {
    handleCloseWebView();
    if (onGoBack) {
      onGoBack();
    }
  };

  if (showWebView && Platform.OS !== 'web') {
    return (
      <WebViewScreen
        newsItem={currentNews}
        onGoBack={handleWebViewGoBack}
      />
    );
  }

  return (
    <View style={styles.fullScreen}>
      {/* Configure status bar for Android */}
      {Platform.OS === 'android' && (
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
      )}
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.6)',
          'rgba(0,0,0,0.7)',
          'rgba(0,0,0,0.85)',
          'rgba(0,0,0,0.95)',
        ]}
        style={styles.fullScreen}
      >
        {/* Use SafeAreaView for iOS, regular View for Android */}
        {Platform.OS === 'ios' ? (
          <SafeAreaView style={styles.fullScreen}>
            <View style={styles.container}>
              {renderContent()}
            </View>
          </SafeAreaView>
        ) : (
          <View style={styles.container}>
            {renderContent()}
          </View>
        )}
      </LinearGradient>
    </View>
  );

  // Helper function to render the main content
  function renderContent() {
    return (
      <>
        {/* Selection bars - Fixed position */}
        <View style={styles.selectionBars}>
          {newsData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.selectionBar,
                index === currentIndex ? styles.activeBar : styles.inactiveBar
              ]}
            />
          ))}
        </View>

        {/* Header - Fixed position */}
        <View style={styles.header}>
          <Text
            style={styles.newsSource}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {currentNews.newsSource}
          </Text>
          <View style={styles.headerIcons}>
            <Feather name="more-horizontal" size={24} color="white" />
            <Feather name="x" size={24} color="white" style={{ marginLeft: 16 }} />
          </View>
        </View>

        {/* Animated Card Content - Only this moves */}
        <AnimatedCardContent
          newsItem={currentNews}
          isLiked={isLiked}
          onLikePress={handleLikePress}
          onFollowPress={handleFollowPress}
          onSharePress={handleSharePress}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          maxIndex={newsData.length}
        />

        {/* Swipe indicator - Fixed position */}
        <View style={styles.swipeIndicator}>
          <Text style={styles.swipeText}>
            {currentIndex + 1} of {newsData.length} • Swipe to see more news
          </Text>
        </View>
      </>
    );
  }
};