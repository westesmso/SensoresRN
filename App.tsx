import { StatusBar } from 'expo-status-bar';
// Importa React e hooks para gerir estado e ciclo de vida da leitura da bateria.
import React, { useEffect, useState } from 'react';
// Importa componentes de UI para montar a tela do exemplo.
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// Importa API de bateria para nível, estado de carga e listeners de mudança.
import * as Battery from 'expo-battery';

// Converte enum numérico em texto para exibição legível ao usuário.
const batteryStateToLabel = (state: Battery.BatteryState): string => {
  if (state === Battery.BatteryState.CHARGING) {
    return 'Carregando';
  }

  if (state === Battery.BatteryState.FULL) {
    return 'Carregada';
  }

  if (state === Battery.BatteryState.UNPLUGGED) {
    return 'Descarregando';
  }

  return 'Desconhecido';
};

// Componente principal do exemplo 4.
export default function App() {
  // Guarda nível da bateria em porcentagem (0 a 100).
  const [level, setLevel] = useState<number | null>(null);

  // Guarda texto de estado (carregando, descarregando etc.).
  const [stateLabel, setStateLabel] = useState<string>('Carregando dados...');

  // Efeito para carregar estado inicial e escutar mudanças em tempo real.
  useEffect(() => {
    // Assinatura para mudança de percentual de bateria.
    let levelSubscription: Battery.Subscription | null = null;
    // Assinatura para mudança de estado de carga (plugado, cheio, etc.).
    let stateSubscription: Battery.Subscription | null = null;

    // Função assíncrona para leitura inicial da bateria.
    const prepareBattery = async () => {
      // Lê nível atual da bateria (valor decimal de 0 a 1).
      const batteryLevel = await Battery.getBatteryLevelAsync();
      // Converte decimal para percentual e guarda no estado.
      setLevel(Math.round(batteryLevel * 100));

      // Lê estado da bateria e converte enum em texto para a tela.
      const batteryState = await Battery.getBatteryStateAsync();
      setStateLabel(batteryStateToLabel(batteryState));

      // Escuta mudanças de nível para atualizar UI sem recarregar tela.
      levelSubscription = Battery.addBatteryLevelListener(({ batteryLevel: nextLevel }) => {
        setLevel(Math.round(nextLevel * 100));
      });

      // Escuta mudanças de estado para refletir se está carregando.
      stateSubscription = Battery.addBatteryStateListener(({ batteryState: nextState }) => {
        setStateLabel(batteryStateToLabel(nextState));
      });
    };

    // Dispara rotina inicial quando componente monta.
    prepareBattery();

    // Limpa listeners ao desmontar para liberar recursos nativos.
    return () => {
      levelSubscription?.remove();
      stateSubscription?.remove();
    };
  }, []);

  // Renderização principal do exemplo.
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Exemplo 4: Bateria</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nível atual:</Text>
          <Text style={styles.value}>{level === null ? 'Carregando...' : `${level}%`}</Text>
          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.state}>{stateLabel}</Text>
        </View>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

// Agrupa estilos para facilitar manutenção e consistência visual.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ecfeff',
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
    color: '#155e75',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#67e8f9',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#0e7490',
  },
  value: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0f172a',
  },
  state: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0f172a',
  },
});
