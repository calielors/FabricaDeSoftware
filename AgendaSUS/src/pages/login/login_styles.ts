import React from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors/colors";

export const Login_Styles = StyleSheet.create({
      container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: COLORS.branco,
      },
      sus_agendamento: {
            backgroundColor: COLORS.azul_principal,
            width: '100%',
            height: '15%',
            position: 'absolute',
            top: 0,
            alignItems: 'center',
            paddingTop: 60,
      },
      login_box: {
            width: '90%',
            height: '50%',
            alignItems: 'center',
            gap: 15,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.placeholder_text,
            backgroundColor: COLORS.cinza_claro,
            borderRadius: 10,
            marginTop: '25%',
      },
      textos: {
            alignSelf: 'flex-start',
            marginLeft: '5%',
            fontSize: 16,
            fontWeight: 'normal',
      },
      inputs: {
            width: '90%',
            height: 50,
            backgroundColor: '#ebeaea',
            borderRadius: 30,
            paddingLeft: 20,
      },
      acessar: {
            width: '90%',
            height: 50,
            backgroundColor: COLORS.azul_principal,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
      },
      acessar_text: {
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