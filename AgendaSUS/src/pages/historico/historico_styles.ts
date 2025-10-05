import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors/colors';

export const Historico_Styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.branco,
    },
    eventText: {
        color: COLORS.preto,
        fontSize: 16,
        marginBottom: 10,
    },
    eventRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    badgePresent: {
        backgroundColor: '#d4f5dd',
        color: COLORS.verde,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        overflow: 'hidden',
        fontWeight: '700',
    },
    badgeAbsent: {
        backgroundColor: '#fff3db',
        color: '#d98200',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        overflow: 'hidden',
        fontWeight: '700',
    },
    tabBar: {
        backgroundColor: COLORS.branco,
    },
    tabIndicator: {
        backgroundColor: COLORS.azul_principal,
    },
});

