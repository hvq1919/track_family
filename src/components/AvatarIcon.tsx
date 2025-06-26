import React from 'react';
import { View } from 'react-native';

/**
 * Use: <AvatarIcon size={72} />
 */
const AVATAR_COLORS = [
  '#1976D2', '#388E3C', '#D32F2F', '#F57C00', '#7B1FA2', '#0288D1', '#C2185B', '#FFA000', '#455A64'
];

function getRandomColor() {
  const idx = Math.floor(Math.random() * AVATAR_COLORS.length);
  return AVATAR_COLORS[idx];
}

export default function AvatarIcon({ size = 64, color }: { size?: number; color?: string }) {
  const partColor = color || getRandomColor();
  const headRadius = size * 0.22;
  const bodyWidth = size * 1;
  const bodyHeight = size * 1;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        overflow: 'hidden',
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
          marginTop:5,
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
  );
}