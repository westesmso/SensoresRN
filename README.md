# Exemplo 6 - Rotacao da Tela

Esta branch demonstra leitura de orientacao e bloqueio/desbloqueio de rotacao.

## O que este exemplo demonstra

- deteccao da orientacao atual;
- escuta de mudanca de orientacao em tempo real;
- bloqueio em retrato;
- bloqueio em paisagem;
- desbloqueio para modo automatico.

## Arquivo principal

- App.tsx

## Como executar

```bash
npm install
npm start
```

Teste girando o celular entre vertical e horizontal.

## Comportamento esperado

- a orientacao atual e atualizada em tempo real;
- botoes aplicam bloqueio conforme acao do usuario;
- estado visual do bloqueio acompanha a regra ativa.

## Por que esta abordagem foi escolhida

1. listener de orientacao permite resposta imediata na UI;
2. funcoes separadas de lock/unlock deixam intencao clara;
3. mapeamento de enums para texto facilita uso em aula;
4. padrao async/await torna fluxo facil de manter.

## Testes recomendados

- bloqueie em retrato e tente girar;
- bloqueie em paisagem e valide travamento;
- desbloqueie e confirme retorno ao automatico.
