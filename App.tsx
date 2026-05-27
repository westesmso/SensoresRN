import { StatusBar } from 'expo-status-bar';
// Importa React e hooks para controlar ciclo de vida e estado do sensor.
import React, { useEffect, useState } from 'react';
// Importa componentes base de layout e texto do React Native.
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// Importa acelerômetro para medir aceleração nos três eixos.
import { Accelerometer } from 'expo-sensors';

// Tipa a leitura em três eixos para manter consistência no estado.
type AccelerometerReading = {
  x: number;
  y: number;
  z: number;
};

// Componente principal do exemplo 2.
export default function App() {
  // Guarda leitura mais recente recebida do acelerômetro.
  const [reading, setReading] = useState<AccelerometerReading>({ x: 0, y: 0, z: 0 });

  // Guarda disponibilidade para tratar aparelhos sem sensor.
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Hook de efeito para iniciar sensor uma vez e limpar ao sair.
  useEffect(() => {
    // Mantém referência da inscrição para conseguir remover no cleanup.
    let subscription: ReturnType<typeof Accelerometer.addListener> | null = null;

    // Função separada facilita uso de await sem tornar o efeito assíncrono.
    const prepareAccelerometer = async () => {
      // Verifica suporte de hardware/sistema operacional ao acelerômetro.
      const available = await Accelerometer.isAvailableAsync();
      // Atualiza a interface com resultado da verificação.
      setIsAvailable(available);

      // Evita registrar listener quando o sensor não existe.
      if (!available) {
        return;
      }

      // Define frequência de atualização equilibrada para demo didática.
      Accelerometer.setUpdateInterval(250);

      // Escuta leituras e envia para estado para rerender automático.
      subscription = Accelerometer.addListener((data) => {
        setReading(data);
      });
    };

    // Dispara configuração inicial assim que o componente monta.
    prepareAccelerometer();

    // Remove listener ao desmontar, evitando leaks e callbacks órfãos.
    return () => {
      subscription?.remove();
    };
  }, []);

  // Calcula intensidade total do vetor para mostrar "força" de movimento.
  const magnitude = Math.sqrt(reading.x ** 2 + reading.y ** 2 + reading.z ** 2);

  // Renderização da interface.
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Exemplo 2: Acelerômetro</Text>

        {isAvailable === null && <Text style={styles.info}>Verificando sensor...</Text>}

        {isAvailable === false && (
          <Text style={styles.error}>Acelerômetro indisponível neste dispositivo.</Text>
        )}

        {isAvailable && (
          <View style={styles.card}>
            <Text style={styles.value}>X: {reading.x.toFixed(3)}</Text>
            <Text style={styles.value}>Y: {reading.y.toFixed(3)}</Text>
            <Text style={styles.value}>Z: {reading.z.toFixed(3)}</Text>
            <Text style={styles.magnitude}>Magnitude: {magnitude.toFixed(3)}</Text>
            <Text style={styles.hint}>Balance o celular e observe a aceleração.</Text>
          </View>
        )}
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

// Concentra todos os estilos em um único objeto para legibilidade.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fff4',
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
    color: '#14532d',
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
    borderColor: '#86efac',
    gap: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  magnitude: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
  },
  hint: {
    marginTop: 4,
    fontSize: 14,
    color: '#475569',
  },
});
