import { MATERIAL_COLORS } from "./constants";

export const getRandomMaterialColor = () => {
    const idx = Math.floor(Math.random() * MATERIAL_COLORS.length);
    return MATERIAL_COLORS[idx];
}

export const mainColor = getRandomMaterialColor();
export const headerOptions: any = {
    headerStyle: {
        backgroundColor: mainColor,
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22,
        letterSpacing: 1,
    },
};