import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors/colors';

export const CadastroStyles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: COLORS.branco,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.preto,
        marginBottom: 12,
        alignSelf: 'center'
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: COLORS.placeholder_text,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    btn: {
        backgroundColor: COLORS.azul_principal,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    btnText: { color: COLORS.branco, fontWeight: '700' },
});
