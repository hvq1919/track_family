import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAMILY_LIST_KEY } from '../constants';
import { useFocusEffect } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import FamilyMemberCard from '../components/FamilyMemberCard';

type RootStackParamList = {
    Family: undefined;
    Detail: { family: any };
};

type FamilyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Family'>;

type Props = {
    navigation: FamilyScreenNavigationProp;
};

type Family = {
    code: string;
    name: string;
    last_address: string;
};

export default function FamilyScreen({ navigation }: Props) {
    const [familyList, setFamilyList] = useState<Family[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            const loadList = async () => {
                const listStr = await AsyncStorage.getItem(FAMILY_LIST_KEY);
                if (listStr) {
                    setFamilyList(JSON.parse(listStr));
                } else {
                    setFamilyList([]);
                }
            };
            loadList();
        }, [])
    );

    useEffect(() => {
        const loadList = async () => {
            const listStr = await AsyncStorage.getItem(FAMILY_LIST_KEY);
            if (listStr) {
                setFamilyList(JSON.parse(listStr));
            }
        };
        loadList();
    }, []);

    const handlePressItem = (item: Family, color: string) => {
        navigation.navigate('Detail', { family: item, color } as any);
    };

    const renderItem = ({ item }: { item: Family }) => (
        <FamilyMemberCard
            family={item}
            onPress={color => handlePressItem(item, color)}
        />
    );

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={familyList}
                keyExtractor={item => item.code}
                renderItem={renderItem}
                ListEmptyComponent={<Text>No family tracked yet.</Text>}
            />
        </View>
    );
}