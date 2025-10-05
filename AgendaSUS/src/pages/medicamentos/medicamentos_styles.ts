import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors/colors';

export const MedicamentosStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.branco,
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.preto,
        marginBottom: 12,
    },
    item: {
        padding: 18,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 12,
        alignItems: 'flex-start',
    },
    itemName: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.preto,
    },
    itemInfo: {
        marginTop: 6,
        fontSize: 16,
        color: COLORS.placeholder_text,
    },
    popularContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 12,
    },
    popularItem: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 12,
        width: '30%',
        alignItems: 'center',
    },
    popularText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.preto,
        textAlign: 'center',
    },
    searchContainer: {
        marginVertical: 12,
        alignItems: 'center',
    },
    searchInput: {
        width: '90%',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        fontSize: 18,
    },
    resultsContainer: {
        marginTop: 12,
    }
});
