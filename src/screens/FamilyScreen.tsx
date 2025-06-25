import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

// Define your stack param list
type RootStackParamList = {
    Family: undefined;
    Detail: undefined;
};

export default function FamilyScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Family'>>();

    return (
        <View style={{ flex: 1 }}>
            <Text>FamilyScreen</Text>
            <Button
                title="Go to Detail"
                onPress={() => navigation.navigate('Detail')}
            />
        </View>
    );
}