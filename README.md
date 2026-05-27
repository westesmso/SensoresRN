# Menu Unico - 6 Exemplos de Sensores

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
