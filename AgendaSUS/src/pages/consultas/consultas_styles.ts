import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors/colors';

export const Consultas_Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.branco,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.preto,
        marginTop: 15,
        textAlign: 'center',
    },
    content: {
        flex: 1,
    },
    listContainer: {
        marginTop: 12,
        marginHorizontal: 10,
        paddingHorizontal: 6,
        flex: 1,
    },
    item: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderColor: COLORS.placeholder_text,
        borderWidth: 1,
    },
    itemMeta: {
        marginTop: 6,
        fontSize: 15,
        color: COLORS.preto,
        fontWeight: 'bold',
    },
    empty: {
        textAlign: 'center',
        color: COLORS.placeholder_text,
        marginTop: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    statusContainer: {
        marginTop: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    emptyText: {
        textAlign: 'center',
        color: COLORS.placeholder_text,
        marginTop: 20,
        fontStyle: 'italic',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
    },
    cancelarButton: {
        backgroundColor: COLORS.vermelho,
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 6,
    },
});
