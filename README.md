# Sensores RN - Base do Projeto

Este repositorio contem exemplos de sensores para React Native com Expo SDK 54.

A branch master foi mantida como base limpa do projeto, com dependencias instaladas e pronta para servir de ponto de partida para os exemplos separados.

## Tecnologias

- Expo SDK 54
- React Native 0.81
- TypeScript
- expo-sensors
- expo-battery
- expo-screen-orientation

## Objetivo desta branch

A branch master existe para:

1. manter a estrutura inicial do app organizada;
2. centralizar dependencias usadas por todas as outras branches;
3. facilitar criacao de novas branches sem conflitos;
4. servir como referencia para comparacao entre exemplos.

## Estrutura principal

- App.tsx: app base
- index.ts: entrypoint do Expo
- package.json: scripts e dependencias
- tsconfig.json: configuracao TypeScript

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o Expo:

```bash
npm start
```

3. Abra no Expo Go (Android/iOS) para testes reais de sensores.

## Branches de exemplos

- exemplo-1-giroscopio
- exemplo-2-acelerometro
- exemplo-3-pedometro
- exemplo-4-bateria
- exemplo-5-magnetometro
- exemplo-6-rotacao-tela
- menu-6-exemplos-sensores

## Observacoes importantes

- Sensores geralmente nao funcionam em emulador com a mesma fidelidade do dispositivo real.
- Para pedometro e alguns sensores fisicos, prefira testar em aparelho real.
- A versao web nao representa comportamento completo dos sensores nativos.

## Fluxo recomendado de estudo

1. Comece pela branch exemplo-1-giroscopio.
2. Siga para acelerometro e pedometro.
3. Depois veja bateria, magnetometro e rotacao.
4. Finalize com menu-6-exemplos-sensores para visualizar tudo em um app unico.

## Licenca

Uso educacional.
