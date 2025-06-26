import React, { useLayoutEffect } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import FamilyMemberCard from '../components/FamilyMemberCard';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAMILY_LIST_KEY } from '../constants';
import { useActionSheet } from '@expo/react-native-action-sheet';

export default function DetailScreen({ route, navigation }: any) {
    const { family, color } = route.params;
    const { showActionSheetWithOptions } = useActionSheet();

    const handleMenu = () => {
        const options = ['Sửa thông tin', 'Xoá thành viên', 'Huỷ'];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
                title: family.name,
            },
            async (selectedIndex) => {
                if (selectedIndex === 0) {
                    // Edit action
                    Alert.alert('Chức năng đang phát triển', 'Bạn sẽ được cập nhật sau!');
                } else if (selectedIndex === 1) {
                    // Delete action
                    Alert.alert(
                        'Xoá thành viên',
                        `Bạn có chắc muốn xoá "${family.name}" khỏi danh sách?`,
                        [
                            { text: 'Huỷ', style: 'cancel' },
                            {
                                text: 'Xoá',
                                style: 'destructive',
                                onPress: async () => {
                                    const listStr = await AsyncStorage.getItem(FAMILY_LIST_KEY);
                                    let list = [];
                                    if (listStr) {
                                        list = JSON.parse(listStr);
                                    }
                                    const newList = list.filter((item: any) => item.code !== family.code);
                                    await AsyncStorage.setItem(FAMILY_LIST_KEY, JSON.stringify(newList));
                                    navigation.goBack();
                                }
                            }
                        ]
                    );
                }
            }
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ paddingHorizontal: 5 }}
                    onPress={handleMenu}
                >
                    <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                </TouchableOpacity>
            ),
        });
    });

    return (
        <View style={{ flex: 1, backgroundColor: '#f6f8fc' }}>
            <FamilyMemberCard family={family} color={color} />
        </View>
    );
}