import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Animated, Dimensions, PanResponder, Platform } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCardContentProps } from './types';
import { styles } from './styles';

const { width: screenWidth } = Dimensions.get('window');

// Animation hook integrated into this file
const useCardAnimation = (
    currentIndex: number,
    setCurrentIndex: (index: number) => void,
    maxIndex: number
) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // Animate to next/previous card
    const animateToCard = (newIndex: number) => {
        const direction = newIndex > currentIndex ? -1 : 1;

        // Slide out current card
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: direction * screenWidth,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Update index and reset position
            setCurrentIndex(newIndex);
            slideAnim.setValue(-direction * screenWidth);

            // Slide in new card
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Ensure final position is exactly 0
                slideAnim.setValue(0);
            });
        });
    };

    // Pan responder for swipe gestures with animation
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 20;
        },
        onPanResponderMove: (evt, gestureState) => {
            // Real-time sliding during swipe - only affect the card
            // Limit the slide distance to prevent going too far off-screen
            const maxSlide = screenWidth * 0.8; // Maximum slide distance
            const clampedDx = Math.max(-maxSlide, Math.min(maxSlide, gestureState.dx));
            slideAnim.setValue(clampedDx);
        },
        onPanResponderRelease: (evt, gestureState) => {
            const swipeThreshold = Platform.OS === 'web' ? 80 : 50; // Higher threshold for web

            if (gestureState.dx > swipeThreshold && currentIndex > 0) {
                // Swipe right - previous news
                animateToCard(currentIndex - 1);
            } else if (gestureState.dx < -swipeThreshold && currentIndex < maxIndex - 1) {
                // Swipe left - next news
                animateToCard(currentIndex + 1);
            } else {
                // Snap back to original position with spring animation
                Animated.spring(slideAnim, {
                    toValue: 0,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }).start();
            }
        },
        onPanResponderTerminate: () => {
            // Ensure we always return to center if gesture is interrupted
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 100,
                friction: 8,
                useNativeDriver: true,
            }).start();
        },
    });

    return {
        slideAnim,
        fadeAnim,
        panResponder,
        animateToCard,
    };
};

// Updated component props to include animation control
type AnimatedCardProps = {
    newsItem: any;
    isLiked: boolean;
    onLikePress: () => void;
    onFollowPress: () => void;
    onSharePress: () => void;
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    maxIndex: number;
};

export const AnimatedCardContent: React.FC<AnimatedCardProps> = ({
                                                                     newsItem,
                                                                     isLiked,
                                                                     onLikePress,
                                                                     onFollowPress,
                                                                     onSharePress,
                                                                     currentIndex,
                                                                     setCurrentIndex,
                                                                     maxIndex,
                                                                 }) => {
    // Use the integrated animation hook
    const { slideAnim, fadeAnim, panResponder } = useCardAnimation(
        currentIndex,
        setCurrentIndex,
        maxIndex
    );

    return (
        <Animated.View
            style={[
                styles.cardWrapper,
                {
                    transform: [{ translateX: slideAnim }],
                    opacity: fadeAnim,
                }
            ]}
            {...panResponder.panHandlers}
        >
            {/* Main Content Card */}
            <View style={styles.card}>
                {/* Image Section */}
                <View style={styles.imageSection}>
                    <ImageBackground
                        source={{ uri: newsItem.imageUrl }}
                        style={styles.imageContainer}
                        imageStyle={styles.image}
                    >
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={styles.imageGradient}
                        >
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{newsItem.title}</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>

                {/* Content section */}
                <View style={styles.contentSection}>
                    <View style={styles.contentContainer}>
                        <View style={styles.summaryWrapper}>
                            <Text style={styles.summary}>{newsItem.summary}</Text>
                        </View>
                        <Text style={styles.attribution}>
                            Summarized News Story by {'\n'}
                            <Text style={styles.gist}>The Gist - AI News App</Text>
                        </Text>
                    </View>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.sideActions}>
                    <TouchableOpacity onPress={onLikePress}>
                        <Feather
                            name="heart"
                            size={32}
                            color={isLiked ? "#ff4757" : "white"}
                            fill={isLiked ? "#ff4757" : "none"}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.followButton} onPress={onFollowPress}>
                    <Text style={styles.followButtonText}>Follow News Source</Text>
                </TouchableOpacity>

                <View style={styles.sideActions}>
                    <TouchableOpacity onPress={onSharePress}>
                        <Entypo name="paper-plane" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};