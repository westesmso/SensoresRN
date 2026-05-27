# exemplo 1 giroscopio

Branch: exemplo-1-giroscopio

## Visao geral

Leitura de velocidade angular nos eixos x, y e z usando Gyroscope.

## Objetivo didatico

Esta branch foi organizada para estudo isolado do tema principal, com codigo comentado e foco em clareza de funcionamento.

## O que esta implementado

- Tela principal em App.tsx
- Leitura/controle do sensor relacionado ao tema da branch
- Estados de carregamento e indisponibilidade quando aplicavel
- Cleanup de listeners para evitar vazamento de recursos

## Stack tecnica

- Expo SDK 54
- React Native
- TypeScript
- Bibliotecas Expo de sensores e sistema conforme o tema

## Como executar

1. Trocar para a branch:

`ash
git checkout exemplo-1-giroscopio
`

2. Instalar dependencias:

`ash
npm install
`

3. Iniciar projeto:

`ash
npm start
`

4. Rodar no dispositivo:
- Expo Go no celular (recomendado)
- Android emulator/iOS simulator com limitacoes de sensores

## Roteiro de validacao

1. Abrir a tela do exemplo
2. Interagir fisicamente com o dispositivo quando necessario
3. Verificar se os dados mudam conforme esperado
4. Confirmar comportamento de erro/indisponibilidade

## Decisoes de implementacao

- Uso de hooks do React para manter logica previsivel
- Separacao clara entre leitura inicial e assinatura em tempo real
- Limpeza explicita no retorno do useEffect
- Tipagem forte para reduzir erros de integracao

## Observacoes

- Sensores podem variar por fabricante/dispositivo.
- Pedometro e sensores de movimento funcionam melhor em hardware real.
- Algumas leituras podem ter latencia ou filtragem do sistema operacional.

## Branches relacionadas

- master: base do projeto
- menu-6-exemplos-sensores: versao integrada com menu unico
