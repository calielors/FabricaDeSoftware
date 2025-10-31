import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors/colors';

export const Medicamentos_Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.branco,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.preto,
        textAlign: 'center',
        marginVertical: 5,
    },
    resultsContainer: {
        marginTop: 12,
        marginHorizontal: 10,
        paddingHorizontal: 6,
        flex: 1,
    },
    item: {
        padding: 10,
        borderRadius: 12,
        marginBottom: 10,
        borderColor: COLORS.placeholder_text,
        borderWidth: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.preto,
    },
    itemInfo: {
        fontSize: 14,
        color: COLORS.placeholder_text,
        marginTop: 4,
    },

    unidadeName: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.preto,
        maxWidth:'65%', //Ajuste da distância da unidade ao status
        paddingTop: 5
    },

    emptyText: {
        textAlign: 'center',
        color: COLORS.placeholder_text,
        marginTop: 20,
        fontStyle: 'italic',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statusContainer: {
        flexDirection: 'row',
        position:'absolute',
        top:'45%',
        right: 0
    },

    statusText: {
        fontSize: 14,
        fontWeight: '600',
    },

});
