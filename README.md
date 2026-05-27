# Exemplo 1 - Giroscopio

Esta branch contem um exemplo focado no sensor de giroscopio usando Expo.

## O que este exemplo demonstra

- verificacao de disponibilidade do sensor;
- assinatura de eventos em tempo real;
- exibicao dos eixos X, Y e Z;
- limpeza correta de listener no unmount.

## Conceito rapido

O giroscopio mede velocidade angular, ou seja, o quanto o aparelho esta girando em torno de cada eixo.

## Arquivo principal

- App.tsx

## Como executar

```bash
npm install
npm start
```

Abra o app no celular e mova o aparelho para ver as variacoes.

## Comportamento esperado

- ao abrir, o app verifica se o sensor existe;
- se existir, inicia leitura periodica;
- a tela mostra valores com 3 casas decimais;
- ao fechar/sair da tela, o listener e removido.

## Por que esta abordagem foi escolhida

1. useEffect com dependencia vazia inicia o sensor apenas uma vez;
2. addListener atualiza estado de forma reativa;
3. remove no cleanup evita vazamento de memoria;
4. estado de disponibilidade melhora UX em aparelhos sem sensor.

## Testes recomendados

- gire o celular lentamente e observe mudanca gradual;
- gire rapidamente e veja picos maiores;
- teste em aparelho sem sensor (se houver) para validar fallback.

## Limitacoes

- emulador pode nao refletir leitura real;
- variacao de hardware entre fabricantes pode alterar sensibilidade.
