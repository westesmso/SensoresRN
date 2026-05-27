import { StatusBar } from 'expo-status-bar';
// Importa React com hooks para estado e efeitos colaterais de sensores.
import React, { useEffect, useState } from 'react';
// Importa componentes de interface para construir a tela do exemplo.
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// Importa o pedômetro para contar passos em tempo real e histórico.
import { Pedometer } from 'expo-sensors';

// Componente principal para o exemplo 3 (pedômetro).
export default function App() {
  // Armazena quantidade de passos detectados desde que o app iniciou a escuta.
  const [liveSteps, setLiveSteps] = useState(0);

  // Armazena quantidade de passos das últimas 24 horas para comparação.
  const [dailySteps, setDailySteps] = useState<number | null>(null);

  // Indica se o pedômetro existe no dispositivo atual.
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Estado simples para mostrar erros de permissão/dispositivo ao usuário.
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Efeito executado uma vez para inicializar leitura e assinatura.
  useEffect(() => {
    // Referência da assinatura para permitir remoção correta no cleanup.
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;

    // Função assíncrona separada para manter o effect síncrono.
    const preparePedometer = async () => {
      try {
        // Valida disponibilidade do recurso no hardware/sistema.
        const available = await Pedometer.isAvailableAsync();
        setIsAvailable(available);

        // Interrompe inicialização quando não há pedômetro no aparelho.
        if (!available) {
          setErrorMessage('Pedômetro indisponível neste dispositivo.');
          return;
        }

        // Define janela de 24h para consulta de passos históricos.
        const end = new Date();
        const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);

        // Consulta a quantidade de passos registrada no período calculado.
        const result = await Pedometer.getStepCountAsync(start, end);
        setDailySteps(result.steps);

        // Inicia escuta contínua para contar passos em tempo real no app.
        subscription = Pedometer.watchStepCount((update) => {
          setLiveSteps(update.steps);
        });
      } catch (error) {
        // Converte erro desconhecido em string amigável para depuração.
        setErrorMessage(`Erro ao acessar pedômetro: ${String(error)}`);
      }
    };

    // Dispara a rotina de preparação logo na montagem da tela.
    preparePedometer();

    // Remove inscrição ao desmontar para evitar vazamento de recursos.
    return () => {
      subscription?.remove();
    };
  }, []);

  // Renderiza interface informativa com leitura histórica e ao vivo.
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Exemplo 3: Pedômetro</Text>

        {isAvailable === null && <Text style={styles.info}>Verificando sensor...</Text>}

        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

        {isAvailable && !errorMessage && (
          <View style={styles.card}>
            <Text style={styles.label}>Passos desde abertura do app:</Text>
            <Text style={styles.value}>{liveSteps}</Text>
            <Text style={styles.label}>Passos das últimas 24h:</Text>
            <Text style={styles.value}>{dailySteps ?? 'Carregando...'}</Text>
            <Text style={styles.hint}>Para testar, caminhe alguns metros.</Text>
          </View>
        )}
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

// Define estilos visuais para manter apresentação organizada.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#9a3412',
  },
  info: {
    fontSize: 16,
    color: '#334155',
  },
  error: {
    fontSize: 16,
    color: '#b91c1c',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fdba74',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#7c2d12',
  },
  value: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0f172a',
  },
  hint: {
    marginTop: 4,
    fontSize: 14,
    color: '#475569',
  },
});
