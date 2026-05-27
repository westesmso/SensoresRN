# SensoresRN

Repositorio da aula 29 (Sensores) com exemplos em React Native usando Expo SDK 54.

## Objetivo

Esta branch contem a base do projeto, dependencias, configuracoes e ponto de partida para os exemplos.

## Tecnologias

- Expo SDK 54
- React Native 0.81.5
- React 19.1.0
- TypeScript 5.9.2
- expo-sensors
- expo-battery
- expo-screen-orientation

## Estrutura

- App.tsx: tela principal
- index.ts: bootstrap do app
- app.json: configuracoes do Expo
- assets/: icones e splash

## Como executar

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar o projeto:

```bash
npm start
```

3. Abrir no dispositivo:
- Android: tecla `a` no terminal do Expo
- iOS: tecla `i` (em ambiente compativel)
- Expo Go: escanear QR code

## Sobre os exemplos

Cada exemplo foi colocado em uma branch dedicada para facilitar estudo, comparacao e avaliacao.

Branches de exemplo:

- exemplo-1-giroscopio
- exemplo-2-acelerometro
- exemplo-3-pedometro
- exemplo-4-bateria
- exemplo-5-magnetometro
- exemplo-6-rotacao-tela
- menu-6-exemplos-sensores

## Boas praticas usadas

- Verificacao de disponibilidade de sensor antes de uso
- Limpeza de listeners no unmount para evitar leak
- Tratamento visual para estados de carregamento/erro
- Tipagem forte com TypeScript

## Observacoes importantes

- Alguns sensores podem nao estar disponiveis em emuladores.
- Para melhor resultado, use dispositivo fisico.
- O pedometro exige movimento real para atualizar valores.
