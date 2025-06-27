import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import WaveAvatarIcon, { getRandomColor } from '../components/WaveAvatarIcon';
import { Ionicons } from '@expo/vector-icons';

type Family = {
    code: string;
    name: string;
    last_address: string;
};

type Props = {
    family: Family;
    onPress?: (color: string) => void;
    style?: ViewStyle;
    color?: string;
    showArrow?: boolean;
};

export default function FamilyMemberCard({ family, onPress, color, style, showArrow }: Props) {
    const colorRef = useRef<string>(color || getRandomColor());
    const avatarColor = colorRef.current;

    return (
        <TouchableOpacity
            onPress={onPress ? () => onPress(avatarColor) : undefined}
            activeOpacity={onPress ? 0.6 : 1}
            style={{
                marginBottom: 18,
                borderRadius: 16,
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 14,
                paddingHorizontal: 10,
                shadowColor: '#1976D2',
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
                ...style,
            }}
            disabled={!onPress}
        >
            <WaveAvatarIcon size={64} color={avatarColor} />
            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#1976D2', marginBottom: 4, marginLeft: 4 }}>
                    {family.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                    <Text style={{ color: '#90caf9', fontSize: 16, fontWeight: 'bold', marginRight: 6, marginLeft: 4 }}>#</Text>
                    <Text style={{ color: '#333', fontSize: 15, fontWeight: 'bold' }}>{family.code}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>📍</Text>
                    <Text style={{ color: '#888', fontSize: 13, flexShrink: 1 }}>
                        {family.last_address || 'N/A'}
                    </Text>
                </View>
            </View>
            {showArrow && (
                <Ionicons
                    name="chevron-forward"
                    size={26}
                    color="#bdbdbd"
                    style={{ marginLeft: 2 }}
                />
            )}
        </TouchableOpacity>
    );
}