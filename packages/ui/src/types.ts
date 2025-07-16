export type NewsItem = {
    imageUrl: string;
    title: string;
    summary: string;
    newsSource: string;
    websiteUrl: string;
};

export type NewsCardProps = {
    onGoBack?: () => void;
};

export type AnimatedCardContentProps = {
    newsItem: NewsItem;
    isLiked: boolean;
    onLikePress: () => void;
    onFollowPress: () => void;
    onSharePress: () => void;
    slideAnim: any; // Animated.Value
    fadeAnim: any; // Animated.Value
    panHandlers: any;
};