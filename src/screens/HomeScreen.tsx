import React, { useEffect, useState } from 'react';
import {
    Text, View, TextInput, Alert, TouchableOpacity, Keyboard,
    Platform, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomString, isValidInputString } from '../utils';
import { DEVICE_KEY } from '../constants';
import i18n from '../locales';
import { FAMILY_LIST_KEY } from '../constants';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [randomStr, setRandomStr] = useState<string>('');
    const [inputCode, setInputCode] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [warning, setWarning] = useState('');

    /** Check if exist family list => goto Family tab */
    useEffect(() => {
        const checkFamilyList = async () => {
            const listStr = await AsyncStorage.getItem(FAMILY_LIST_KEY);
            if (listStr) {
                const list = JSON.parse(listStr);
                if (Array.isArray(list) && list.length > 0) {
                    (navigation as any).navigate('Family');
                }
            }
        };
        checkFamilyList();
    }, []);

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

    const handleTrack = async () => {
        Keyboard.dismiss();
        const input = inputCode.trim().toUpperCase();
        if (!isValidInputString(input)) {
            setWarning(i18n.t('warning_wrong'));
        } else if (input === randomStr) {
            setWarning(i18n.t('warning'));
        } else {
            setWarning('');

            // TODO sent to server

            // Save local storage
            try {
                const oldListStr = await AsyncStorage.getItem(FAMILY_LIST_KEY);
                let oldList = [];
                if (oldListStr) {
                    oldList = JSON.parse(oldListStr);
                }
                // Update last_address later
                oldList.push({ code: input, name: familyName, last_address: '' });
                await AsyncStorage.setItem(FAMILY_LIST_KEY, JSON.stringify(oldList));
            } catch (e) {
                Alert.alert('Error', 'Cannot save family member');
            }

            setInputCode('');
            setFamilyName('');

            (navigation as any).navigate('Family');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#f6f8fc' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Text style={styles.codeLabel}>{i18n.t('this_phone_code')}</Text>
                    <Text selectable style={styles.codeText}>{randomStr}</Text>
                    <Text style={styles.inputLabel}>{i18n.t('enter_code_label')}</Text>
                    <TextInput
                        value={inputCode}
                        onChangeText={setInputCode}
                        placeholder={i18n.t('code')}
                        autoCapitalize="characters"
                        maxLength={5}
                        style={styles.input}
                        placeholderTextColor={'#AAA'}
                    />
                    <Text style={[styles.inputLabel, { marginTop: 10 }]}>{i18n.t('family_name')}</Text>
                    <TextInput
                        value={familyName}
                        onChangeText={setFamilyName}
                        placeholder={i18n.t('family_name')}
                        style={styles.inputNormal}
                        placeholderTextColor={'#AAA'}
                    />
                    <TouchableOpacity onPress={handleTrack} style={styles.trackBtn} activeOpacity={0.6}>
                        <Text style={styles.trackBtnText}>{i18n.t('track_btn')}</Text>
                    </TouchableOpacity>
                    {warning ? (
                        <Text style={styles.warning}>{warning}</Text>
                    ) : null}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        minHeight: 500,
    },
    codeLabel: {
        color: '#1976D2',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    codeText: {
        color: '#E64A19',
        fontSize: 44,
        fontWeight: 'bold',
        letterSpacing: 8,
        marginBottom: 28,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
        textAlign: 'center',
    },
    inputLabel: {
        marginTop: 50,
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginLeft: '2.5%',
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#1976D2',
        borderRadius: 10,
        padding: Platform.OS === 'ios' ? 14 : 10,
        width: '95%',
        marginBottom: 16,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#222',
        fontWeight: '600',
        letterSpacing: 4,
        shadowColor: '#1976D2',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 1,
    },
    inputNormal: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: Platform.OS === 'ios' ? 14 : 10,
        width: '95%',
        backgroundColor: '#fff',
        color: '#222',
    },
    trackBtn: {
        backgroundColor: '#1976D2',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 60,
        marginTop: 20,
        shadowColor: '#1976D2',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 2,
    },
    trackBtnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    warning: {
        color: '#D32F2F',
        marginTop: 22,
        textAlign: 'center',
        fontSize: 15,
        backgroundColor: '#fff3f3',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ffcdd2',
        width: '95%',
    },
});