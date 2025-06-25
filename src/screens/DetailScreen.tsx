import { Text, View } from 'react-native';
import i18n from '../locales';

export default function DetailScreen() {
    return (
        <View style={{ flex: 1 }}>
            <Text>{i18n.t('detail_title')}</Text>
        </View>
    );
}