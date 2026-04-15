# Agendamento SUS Online

[Documento com as especificações do projeto](https://docs.google.com/document/d/17JzTCo7LYkEA5B1WowKCUH6qqCqh-t1_/edit#heading=h.knpinbvkozm4)

[Acesso das HU com os protótipos](https://docs.google.com/spreadsheets/d/1jKtuyUHv7XniL5sgp3FePg4-SvljHVftocVHPyPiOnQ/edit?gid=891834841#gid=891834841)

Protótipos Mobile: [(Acesso no Figma)](https://www.figma.com/design/0THctJLxAMypddq06xTW1v/SUSAGENDAMENTO?node-id=0-1&p=f&t=BVUlqQPTzNu1cjh9-0)
<br>
<img width="20%" height="667" alt="Login" src="https://github.com/user-attachments/assets/023cba3b-eb49-4041-9ea3-accb56c438ec" />
<img width="20%" height="667" alt="Tela Principal" src="https://github.com/user-attachments/assets/11b27c9a-67f6-4a9a-9c74-aea5ffd97938" />
<img width="20%" height="667" alt="AbaAgendamento" src="https://github.com/user-attachments/assets/6ef04067-4ae0-4f37-a628-7aa308f6e84e" />
<img width="20%" height="667" alt="AbaConfimaçao" src="https://github.com/user-attachments/assets/e1d7b6bb-6c0c-452c-831e-97801811bc4c" />
<img width="20%" height="667" alt="AbaMeuHistorico" src="https://github.com/user-attachments/assets/8ec3240c-184a-43e6-8812-d86b189f8225" />
<img width="20%" height="667" alt="AbaMinhasConsultas" src="https://github.com/user-attachments/assets/c9789a35-a79e-4e11-9386-5c06a6480c1c" />
<img width="20%" height="667" alt="AbaUnidadedeSaude" src="https://github.com/user-attachments/assets/02a011da-5f97-41bd-99f3-1dd98bccc677" />
<img width="20%" height="667" alt="AbaMedicamento" src="https://github.com/user-attachments/assets/28dda518-b1f3-4510-869e-8f76699532a0" />

# Pré-requisitos
-Android Studio<br>
-Android SDK<br>
-Java SDK<br>
-Um emulador configurado para android<br>
-Visual Studio Code<br>
-Extensão "Expo Tools" para VSCode<br>
-Expo Orbit<br>

# Realizando a build do projeto localmente e rodando (android/web)
**Realize a build pelo menos uma vez, e sempre realize quando alterar bibliotecas** <br>
Clone o repositório na branch 'main'<br>
Abra a pasta raíz com o Visual Studio Code<br>
Abra o terminal e confirme que ele está na rota terminando em '\FabricaDeSoftware'<br>
Execute o comando 'npm install'<br>
Execute o comando 'npx expo prebuild'<br>
Execute o comando 'npx expo run:android' e selecione a plataforma<br>
Aguarde o build local terminar. Pode demorar mais de 20 minutos<br>
Aperte 'a' para abrir no emulador android ou 'w' par abrir na web<br>

# Rodando sem realizar build
**Você pode rodar sem build após mudanças não relacionadas ao app.json ou a bibliotecas** <br>
Execute o comando 'npx expo start'<br>
Aperte 'a' para abrir no emulador android ou 'w' par abrir na web<br>

# Rodando uma build específica (android/web)
Acesse o a build específica (pelo dashboard do expo.dev ou por um link)<br>
Clique em "Open with Orbit" ou "Abrir com Orbit"<br>