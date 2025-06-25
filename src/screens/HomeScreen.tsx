import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomString } from '../utils';
import { DEVICE_KEY } from '../constants';

export default function HomeScreen() {
    const [randomStr, setRandomStr] = useState<string>('');

    useEffect(() => {
        const loadOrCreate = async () => {
            const stored = await AsyncStorage.getItem(DEVICE_KEY);
            if (stored) {
                setRandomStr(stored);
            } else {
                const newStr = getRandomString();
                await AsyncStorage.setItem(DEVICE_KEY, newStr);
                setRandomStr(newStr);
            }
        };
        loadOrCreate();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center',  }}>
            <Text style={{color: '#f57f17', fontSize: 32, fontWeight: 'bold', letterSpacing: 5 }}>{randomStr}</Text>
        </View>
    );
}