import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAMILY_LIST_KEY } from '../constants';
import { useFocusEffect } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import FamilyMemberCard from '../components/FamilyMemberCard';
import i18n from '../locales';

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
            showArrow
        />
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={familyList}
                keyExtractor={item => item.code}
                renderItem={renderItem}
                ListEmptyComponent={<Text>{i18n.t('no_family_tracked')}</Text>}
                ListHeaderComponent={
                    <TouchableOpacity
                        onPress={() => (navigation as any).navigate('Home')}
                        activeOpacity={0.6}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#e3f2fd',
                            borderRadius: 12,
                            paddingVertical: 14,
                            paddingHorizontal: 18,
                            marginBottom: 10,
                            shadowColor: '#1976D2',
                            shadowOpacity: 0.06,
                            shadowRadius: 6,
                            elevation: 1,
                        }}
                    >
                        <Text style={{ fontSize: 20, color: '#1976D2', fontWeight: 'bold', marginRight: 10 }}>+</Text>
                        <Text style={{ fontSize: 16, color: '#1976D2', fontWeight: '600' }}>
                            {i18n.t('add_family') || 'Thêm người thân'}
                        </Text>
                    </TouchableOpacity>
                }
            />
        </View>
    );
}