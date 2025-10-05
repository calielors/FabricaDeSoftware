import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors/colors';

export const ConsultasStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.branco,
        padding: 12,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.preto,
        marginBottom: 12,
    },
    item: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    itemTitle: {
        fontSize: 16,
        color: COLORS.preto,
        fontWeight: '700',
    },
    itemMeta: {
        marginTop: 6,
        color: COLORS.placeholder_text,
    },
    empty: {
        textAlign: 'center',
        color: COLORS.placeholder_text,
        marginTop: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    }
});
