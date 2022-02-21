# SophiaChat: Projeto React Native de um mensageiro clean, usando Redux, Pacotes Firebase e ImagePicker (+BlobUtil) 
Projeto clean para portfolio pessoal @henrymenezes - 8henriquemenezes@gmail.com.

<img src="https://sophiaraquel.store/github/BACK2.png">
<img src="https://sophiaraquel.store/github/BACK1.png">

# Descrição
Neste Projeto react native utilizei as bibliotecas: Redux para a centralização dos estados da aplicação, banco de dados não relacional (NoSQL) Firebase, Firebase Storage para upload de imagens unido a biblioteca ImagePicker+BlobUtil e Firebase Auth para requisições de cadastro e login. Criações de componentes externos e uso de estados.

# App Mensageiro com telas:
- Preload
- Home
- SignIn
- SignUp
- Chats
- Internal Chat
- Mundo Social (Rede de Cadastros do Database)
- Config (clean com botão SignOut)

# Versões das Principais Libs
- React Native: 0.63.0
- React: 16.13.1
- Redux: 3.7.2
- Firebase: 4.6.1
- react-native-image-picker: 4.7.1
- react-native-blob-util: 0.13.18
- react-navigation: 4.4.4

# Permissões
````
```
android\app\src\main\AndroidManifest
  <code> <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
   <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
   <uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION" />
  </code>
```
````
