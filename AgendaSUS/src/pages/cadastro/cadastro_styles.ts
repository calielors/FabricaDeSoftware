import React from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors/colors";

export const CadastroStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.branco,
    },
    cadastro_box: {
        width: '90%',
        height: '50%',
        alignItems: 'center',
        gap: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.placeholder_text,
        backgroundColor: COLORS.cinza_claro,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto', 
        transform: [{ translateY: -88 }], 
    },
    inputs: {
        width: '90%',
        height: 50,
        backgroundColor: '#ebeaea',
        borderRadius: 30,
        paddingLeft: 20,
    },
    criar: {
        width: '80%',
        height: 50,
        backgroundColor: COLORS.azul_principal,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    criar_text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    gov_box_container: {
        width: '100%',
        position: 'absolute',
        bottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    gov_box: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.azul_principal,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        alignSelf: 'center',

    },
    links: {
        color: COLORS.azul_principal,
        fontSize: 12,
        fontWeight: 'bold',
    }
});