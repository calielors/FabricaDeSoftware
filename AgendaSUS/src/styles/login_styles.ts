import React from "react";
import { StyleSheet } from "react-native";

export const Login_Styles = (theme : any)=>StyleSheet.create({
      container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: theme.background,
      },
      login_box: {
            width: '90%',
            height: '45%',
            alignItems: 'center',
            gap: 15,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.placeholder,
            backgroundColor: theme.card,
            borderRadius: 10,
            marginTop: 'auto',
            marginBottom: 'auto',
            transform: [{ translateY: -88 }],
      },
      textos: {
            color: theme.text,
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
            backgroundColor: theme.primary,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
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
            borderColor: theme.primary,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            alignSelf: 'center',

      },
      links: {
            color: theme.primary,
            fontSize: 12,
            fontWeight: 'bold',
      }
});