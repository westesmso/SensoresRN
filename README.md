# Exemplo 2 - Acelerometro

Esta branch mostra como ler o acelerometro e calcular magnitude do movimento.

## O que este exemplo demonstra

- leitura dos eixos X, Y e Z;
- calculo da magnitude total do vetor;
- verificacao de disponibilidade;
- ciclo completo de subscribe/unsubscribe.

## Conceito rapido

O acelerometro mede aceleracao, incluindo efeito da gravidade, em tres eixos.

## Arquivo principal

- App.tsx

## Como executar

```bash
npm install
npm start
```

Teste em aparelho real, movimentando e inclinando o celular.

## Formula usada

A magnitude e calculada por:

magnitude = sqrt(x^2 + y^2 + z^2)

## Comportamento esperado

- os eixos mudam conforme orientacao e movimento;
- magnitude varia com intensidade do deslocamento;
- mensagem de indisponibilidade aparece em aparelhos sem suporte.

## Por que esta abordagem foi escolhida

1. combinar eixos com magnitude melhora interpretacao dos dados;
2. update interval controlado evita ruido excessivo na UI;
3. estado unico por leitura simplifica renderizacao;
4. cleanup garante estabilidade em navegacao/troca de tela.

## Testes recomendados

- aparelho parado sobre mesa (valor mais estavel);
- movimentos bruscos para observar picos;
- rotacao de orientacao para validar mudancas nos eixos.
