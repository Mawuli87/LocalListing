import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.grey,
    },
    image: {
        width: 42,
        height: 32,
    },
    imageContainer: {
        backgroundColor: colors.lightGrey,
        padding: 5, 
        marginBottom: 8,
    }
});
