import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Validacao_Styles as style } from "./validacao_styles";
import { COLORS } from "../../../assets/colors/colors";
import { Top_Bar } from "../../../components/top_bar";
import { TextInput as PaperInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { CadastroContext } from "../CadastroContext";
import { supabase } from "../../../services/supabase";

export default function Validacao() {
  const [codigo, setCodigo] = useState("");
  const navigation: any = useNavigation();
  const { cadastro, clearCadastro } = useContext(CadastroContext);

  if (!cadastro) return null; 

  const { username, cpf, email, password } = cadastro;

  async function handleProximo() {
    if (codigo.length !== 6) {
      Alert.alert("Atenção", "O código deve ter 6 dígitos.");
      return;
    }

    if (codigo !== "123456") {
      Alert.alert("Código inválido", "O código informado está incorreto. Use 123456 para teste.");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("register", {
        body: {
          nome: username,
          cpf: cpf,
          email: email,
          password: password,
        },
      });

      if (error) {
        Alert.alert("Erro", error.message || "Erro ao criar conta");
        return;
      }

      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            navigation.getParent()?.navigate("Login");
            clearCadastro();
          },
        },
      ]);
    } catch (err) {
      Alert.alert("Erro", "Falha ao conectar com o servidor.");
    }
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={style.container}>
        <Top_Bar />
        <View style={style.box}>
          <Text style={style.titulo}>Verificação</Text>
          <Text style={style.subtitulo}>
            Insira o código de 6 dígitos enviado ao e-mail {email}
          </Text>

          <Text style={style.label}>Código</Text>
          <PaperInput
            mode="outlined"
            value={codigo}
            onChangeText={(text) =>
              setCodigo(text.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="Digite o código"
            keyboardType="numeric"
            activeOutlineColor={COLORS.azul_principal}
            style={style.input}
            theme={{ roundness: 30 }}
          />

          <TouchableOpacity
            style={style.botao}
            onPress={handleProximo}
            activeOpacity={0.7}
          >
            <Text style={style.botao_text}>Concluir</Text>
          </TouchableOpacity>
         
          <TouchableOpacity
            style={style.voltar}
            //Funçao reenvio de e-mail
            activeOpacity={0.7}
          >
            <Text style={style.voltar_text}>Reenviar o e-mail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.voltar}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={style.voltar_text}>Alterar e-mail</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}
