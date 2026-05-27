<<<<<<< HEAD
﻿# SensoresRN

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
=======
﻿# Menu Unico - 6 Exemplos de Sensores

Esta branch consolida os seis exemplos da aula em um unico app com menu de navegacao interna.

## Objetivo

Permitir alternar rapidamente entre os exemplos sem trocar de branch.

## O que existe nesta branch

- menu horizontal com os 6 exemplos;
- componentes separados por exemplo;
- exibicao de dados em tempo real conforme sensor selecionado;
- controles de orientacao dentro da propria tela do exemplo 6.

## Exemplos disponiveis no menu

1. Giroscopio
2. Acelerometro
3. Pedometro
4. Bateria
5. Magnetometro
6. Rotacao da Tela

## Arquivo principal

- App.tsx

## Como executar

```bash
npm install
npm start
```

Abra no celular e toque nos botoes do menu para navegar entre os exemplos.

## Estrategia de implementacao

1. estado central selected define o exemplo ativo;
2. cada exemplo foi isolado em um componente interno;
3. renderCurrentExample escolhe o componente com base no menu;
4. cada componente cuida do proprio ciclo de vida de listeners.

## Por que esta abordagem foi escolhida

- isolamento por componente evita mistura de estados de sensores;
- menu por estado simplifica navegacao sem dependencia externa;
- arquitetura facilita expansao para novos sensores no futuro;
- permite demonstracao rapida em sala sem checkout entre branches.

## Testes sugeridos

- alternar entre exemplos varias vezes;
- observar se listeners continuam estaveis apos trocas;
- validar orientacao e bateria apos usar sensores de movimento.

## Relacao com outras branches

As branches individuais continuam intactas e sao recomendadas para estudo isolado de cada sensor.

Esta branch e ideal para demonstracao integrada.
>>>>>>> 9db778d3eea5868eb54e271892390494a5887496
