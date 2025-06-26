import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';

const AVATAR_COLORS = [
    '#1976D2', '#388E3C', '#D32F2F', '#F57C00', '#7B1FA2', '#0288D1', '#C2185B', '#FFA000', '#455A64'
];

export function getRandomColor() {
    const idx = Math.floor(Math.random() * AVATAR_COLORS.length);
    return AVATAR_COLORS[idx];
}

export default function WaveAvatarIcon({ size = 64, color }: { size?: number; color?: string }) {
    const colorRef = useRef<string>(color || getRandomColor());
    const partColor = colorRef.current;
    const headRadius = size * 0.22;
    const bodyWidth = size * 0.6;
    const bodyHeight = size * 0.38;

    // Animation for "wave"
    const waveAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(waveAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            })
        ).start();
    }, [waveAnim]);

    const waveScale = waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.6],
    });

    const waveOpacity = waveAnim.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0.35, 0.18, 0],
    });

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {/* Animated wave effect */}
            <Animated.View
                style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: '#1976D2',
                    opacity: waveOpacity,
                    transform: [{ scale: waveScale }],
                }}
            />
            {/* Avatar with shadow and border */}
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderWidth: 3,
                    borderColor: '#1976D2',
                    shadowColor: '#1976D2',
                    shadowOpacity: 0.25,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 8,
                }}
            >
                {/* Head */}
                <View
                    style={{
                        width: headRadius * 2,
                        height: headRadius * 2,
                        borderRadius: headRadius,
                        backgroundColor: partColor,
                        marginBottom: 4,
                        marginTop: 5,
                    }}
                />
                {/* Body */}
                <View
                    style={{
                        width: bodyWidth,
                        height: bodyHeight,
                        borderTopLeftRadius: bodyWidth / 2,
                        borderTopRightRadius: bodyWidth / 2,
                        backgroundColor: partColor,
                    }}
                />
            </View>
        </View>
    );
}