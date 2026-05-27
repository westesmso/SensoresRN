# Exemplo 4 - Bateria

Esta branch mostra monitoramento de nivel e estado de bateria em tempo real.

## O que este exemplo demonstra

- leitura inicial do percentual da bateria;
- leitura do estado (carregando, carregada, descarregando);
- listeners para atualizacao sem recarregar a tela.

## Arquivo principal

- App.tsx

## Como executar

```bash
npm install
npm start
```

Conecte/desconecte carregador para testar transicao de estados.

## Comportamento esperado

- app mostra nivel atual em percentual;
- estado muda automaticamente ao conectar carregador;
- interface atualiza em tempo real com listeners.

## Por que esta abordagem foi escolhida

1. leitura inicial garante estado correto no primeiro render;
2. listeners evitam polling manual e reduzem complexidade;
3. mapeamento de enum para string melhora legibilidade;
4. cleanup remove assinaturas e evita comportamento duplicado.

## Testes recomendados

- abrir com carregador desconectado;
- conectar carregador e observar mudanca de estado;
- deixar alguns minutos para ver ajuste de percentual.
