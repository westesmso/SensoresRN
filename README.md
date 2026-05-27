# Exemplo 5 - Magnetometro

Esta branch implementa leitura de campo magnetico em tres eixos e intensidade total.

## O que este exemplo demonstra

- leitura dos eixos X, Y e Z em uT;
- calculo da intensidade total do campo;
- controle de disponibilidade do sensor.

## Arquivo principal

- App.tsx

## Como executar

```bash
npm install
npm start
```

Gire o aparelho e aproxime de objetos metalicos para observar variacoes.

## Comportamento esperado

- valores mudam com orientacao espacial do aparelho;
- intensidade total responde a alteracoes do ambiente magnetico;
- fallback de indisponibilidade e exibido se necessario.

## Por que esta abordagem foi escolhida

1. exibicao por eixo ajuda a interpretar direcao do campo;
2. intensidade total facilita comparacao rapida entre leituras;
3. update interval moderado melhora estabilidade visual;
4. estrutura de estado simples reduz complexidade do componente.

## Testes recomendados

- girar lentamente 360 graus;
- aproximar de imas e superfices metalicas;
- comparar em ambientes internos e externos.
