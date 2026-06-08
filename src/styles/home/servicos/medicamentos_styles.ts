import { StyleSheet } from 'react-native';

export const Medicamentos_Styles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
  },
  content: {
    marginHorizontal: 10,
  },
  buscaNativaDestacada: {
    width: "100%",
    height: 46,
    backgroundColor: theme.card,
  },

  // --- ESTRUTURA DE FILTROS ---
  containerBarraFiltro: {
    width: '100%',
    height: 45, 
    flexDirection: 'row', // Alinha os itens na horizontal
    alignItems: 'center', // Centraliza verticalmente
    borderTopWidth: 1,
    borderTopColor: theme.placeholder + '20',
    borderBottomWidth: 1,
    borderBottomColor: theme.placeholder + '20',
    marginBottom: 15,
    backgroundColor: theme.background,
  },
  scrollFiltro: {
    flex: 1, // Essa é a mágica: o ScrollView usa todo o espaço que sobrar na esquerda e empurra o resto pra direita!
  },
  scrollContentFiltro: {
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15, // Apenas um respiro no final da rolagem
  },
  botaoFiltroScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: '100%',
  },
  divisorScroll: {
    width: 1,
    height: 14,
    backgroundColor: theme.placeholder + '40',
  },
  
  // --- BOTÃO FIXO NA DIREITA ---
  botaoFiltroEstatico: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 45, // Mesma altura do container principal
  },
  divisorEstatico: {
    width: 1,
    height: 24, 
    backgroundColor: theme.text + '35', // Mais escurinho para destacar do carrossel
  },
  textFiltroML: {
    fontSize: 14,
    color: theme.text,
    fontWeight: '400',
  },
  textFiltroMLAtivo: {
    color: theme.primary, 
    fontWeight: '600',
  },
  // ----------------------------------------------

  item: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderColor: theme.placeholder,
    borderWidth: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
  },
  unidadeName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
    maxWidth: '65%',
    paddingTop: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: '45%',
    right: 0,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: theme.placeholder,
    marginTop: 20,
    fontStyle: 'italic',
  },
  opcaoFiltroLinhaCustom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.placeholder,
  },
  textOpcaoLinhaCustom: {
    fontSize: 16,
    color: theme.text,
    fontWeight: "600",
  }
});