import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { NewsItem } from './types';
import { styles } from './styles';

type WebViewScreenProps = {
    newsItem: NewsItem;
    onGoBack: () => void;
};

export const WebViewScreen: React.FC<WebViewScreenProps> = ({ newsItem, onGoBack }) => {
    const webViewRef = useRef<WebView>(null);
    const [canGoBack, setCanGoBack] = useState(false);

    const handleGoBack = () => {
        // If WebView can go back in browser history, do that first
        if (canGoBack && webViewRef.current) {
            webViewRef.current.goBack();
        } else {
            // Otherwise, close WebView and return to news card
            onGoBack();
        }
    };

    return (
        <View style={styles.fullScreenWebView}>
            <SafeAreaView style={styles.fullScreenWebView}>
                {/* Full-screen WebView Header */}
                <View style={styles.fullScreenHeader}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.circularBackButton}>
                        <Feather name="arrow-left" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Full-screen WebView */}
                <WebView
                    ref={webViewRef}
                    source={{ uri: newsItem.websiteUrl }}
                    style={styles.webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(navState) => {
                        setCanGoBack(navState.canGoBack);
                    }}
                    renderLoading={() => (
                        <View style={styles.loadingContainer}>
                            <Feather name="globe" size={48} color="white" style={{ marginBottom: 16 }} />
                            <Text style={styles.loadingText}>Loading {newsItem.newsSource}...</Text>
                        </View>
                    )}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.log('WebView error loading:', nativeEvent);
                    }}
                    onLoadEnd={() => {
                        console.log('WebView loaded:', newsItem.websiteUrl);
                    }}
                    onShouldStartLoadWithRequest={(request) => {
                        // Allow all requests
                        return true;
                    }}
                />
            </SafeAreaView>
        </View>
    );
};