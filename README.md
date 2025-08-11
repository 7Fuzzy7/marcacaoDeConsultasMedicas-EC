# Sistema de Agendamento de Consultas Médicas

[![React Native](https://img.shields.io/badge/React%20Native-0.72.0-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Um aplicativo mobile para agendamento de consultas médicas, desenvolvido com React Native e TypeScript.

## Sobre o Projeto

Este é um aplicativo mobile desenvolvido em React Native para agendamento de consultas médicas. O sistema permite que pacientes visualizem médicos disponíveis, agendem consultas e gerenciem seus compromissos médicos de forma simples e intuitiva.

### Funcionalidades Principais

- Visualização de médicos disponíveis
- Agendamento de consultas
- Gerenciamento de consultas (visualizar, editar, cancelar)
- Interface intuitiva e responsiva
- Persistência de dados local
- Validação de datas e horários
- Seleção de médicos por especialidade

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) - Framework para desenvolvimento mobile
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Styled Components](https://styled-components.com/) - Estilização com CSS-in-JS
- [React Navigation](https://reactnavigation.org/) - Navegação entre telas
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Armazenamento local
- [React Native Elements](https://reactnativeelements.com/) - Biblioteca de componentes UI

## Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (para desenvolvimento Android)
- [Xcode](https://developer.apple.com/xcode/) (para desenvolvimento iOS, apenas em macOS)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/marcacaoDeConsultasMedicas.git
cd marcacaoDeConsultasMedicas
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Instale as dependências do iOS (apenas em macOS):
```bash
cd ios
pod install
cd ..
```

4. Inicie o aplicativo:
```bash
# Para Android
npm run android
# ou
yarn android

# Para iOS (apenas em macOS)
npm run ios
# ou
yarn ios
```

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
│   ├── Header/    # Componente de cabeçalho
│   └── AppointmentForm/  # Formulário de agendamento
├── screens/        # Telas do aplicativo
│   ├── HomeScreen.tsx
│   └── CreateAppointmentScreen.tsx
├── styles/         # Estilos globais e tema
│   └── theme.ts
├── types/          # Definições de tipos TypeScript
│   ├── appointments.ts
│   ├── doctors.ts
│   └── navigation.ts
└── utils/          # Funções utilitárias
```

## Funcionalidades Detalhadas

### Agendamento de Consultas
- Seleção de médico por especialidade
- Escolha de data e horário
- Adição de descrição/motivo da consulta
- Validação de disponibilidade

### Gerenciamento de Consultas
- Visualização de todas as consultas agendadas
- Edição de consultas existentes
- Cancelamento de consultas
- Atualização de status

### Interface do Usuário
- Design moderno e responsivo
- Navegação intuitiva
- Feedback visual de ações
- Suporte a temas claro/escuro

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores

- **Professor Hete Caetano** - [hete.caetano@fiap.com.br](mailto:hete.caetano@fiap.com.br)

## Agradecimentos

- [React Native Community](https://reactnative.dev/help)
- [React Navigation](https://reactnavigation.org/)
- [Styled Components](https://styled-components.com/)
- Todos os contribuidores do projeto

## Suporte

Se você encontrar algum problema ou tiver sugestões, por favor abra uma issue no GitHub.

---

Desenvolvido por Professor Hete Caetano e compartilhado com alunos de TDS 