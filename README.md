# Exemplo 3 - Pedometro

Esta branch implementa leitura de passos em tempo real e consulta historica de 24h.

## O que este exemplo demonstra

- disponibilidade do pedometro;
- leitura historica com intervalo de tempo;
- contagem ao vivo com watchStepCount;
- tratamento de erros em acesso ao sensor.

## Arquivo principal

- App.tsx

## Como executar

```bash
npm install
npm start
```

Use dispositivo real e caminhe alguns metros para validar a contagem.

## Comportamento esperado

- exibe "passos desde abertura" em tempo real;
- exibe "passos ultimas 24h" com consulta inicial;
- mostra mensagem quando o sensor nao esta disponivel;
- evita crash em falhas de permissao/sistema.

## Por que esta abordagem foi escolhida

1. separacao entre historico e ao vivo melhora entendimento didatico;
2. watchStepCount fornece feedback imediato ao usuario;
3. getStepCountAsync permite contextualizar atividade diaria;
4. try/catch protege o app em ambientes com suporte parcial.

## Testes recomendados

- abrir app parado e observar valores iniciais;
- caminhar por 30-50 passos e conferir incremento;
- reabrir app e comparar historico com leitura ao vivo.

## Observacoes

- alguns aparelhos exigem permissao de atividade fisica;
- em simuladores o resultado costuma ser limitado ou inexistente.
