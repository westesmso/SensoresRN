import { StatusBar } from 'expo-status-bar';
// Importa React e hooks para estado e ciclo de vida do listener do magnetômetro.
import React, { useEffect, useState } from 'react';
// Importa componentes nativos de layout/texto para compor a interface.
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// Importa magnetômetro para medir campo magnético nos eixos x, y e z.
import { Magnetometer } from 'expo-sensors';

// Estrutura da leitura do magnetômetro em microtesla por eixo.
type MagnetometerReading = {
  x: number;
  y: number;
  z: number;
};

// Componente principal do exemplo 5.
export default function App() {
  // Guarda última leitura para renderização em tempo real.
  const [reading, setReading] = useState<MagnetometerReading>({ x: 0, y: 0, z: 0 });

  // Guarda disponibilidade para lidar com aparelhos sem sensor.
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Efeito para iniciar e limpar listener do magnetômetro.
  useEffect(() => {
    // Referência local da assinatura para remoção segura.
    let subscription: ReturnType<typeof Magnetometer.addListener> | null = null;

    // Função assíncrona separada para verificar suporte e registrar listener.
    const prepareMagnetometer = async () => {
      // Confere se o sensor está disponível no hardware atual.
      const available = await Magnetometer.isAvailableAsync();
      setIsAvailable(available);

      // Evita tentativa de leitura em dispositivos sem magnetômetro.
      if (!available) {
        return;
      }

      // Define intervalo de atualização confortável para visualização didática.
      Magnetometer.setUpdateInterval(300);

      // Inicia assinatura para receber dados continuamente.
      subscription = Magnetometer.addListener((data) => {
        setReading(data);
      });
    };

    // Executa configuração inicial na montagem.
    prepareMagnetometer();

    // Remove listener ao desmontar para liberar recurso nativo.
    return () => {
      subscription?.remove();
    };
  }, []);

  // Calcula intensidade total do campo magnético para referência.
  const magnitude = Math.sqrt(reading.x ** 2 + reading.y ** 2 + reading.z ** 2);

  // Renderiza tela com os dados de orientação magnética.
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Exemplo 5: Magnetômetro</Text>

        {isAvailable === null && <Text style={styles.info}>Verificando sensor...</Text>}

        {isAvailable === false && (
          <Text style={styles.error}>Magnetômetro indisponível neste dispositivo.</Text>
        )}

        {isAvailable && (
          <View style={styles.card}>
            <Text style={styles.value}>X: {reading.x.toFixed(2)} µT</Text>
            <Text style={styles.value}>Y: {reading.y.toFixed(2)} µT</Text>
            <Text style={styles.value}>Z: {reading.z.toFixed(2)} µT</Text>
            <Text style={styles.magnitude}>Intensidade: {magnitude.toFixed(2)} µT</Text>
            <Text style={styles.hint}>Gire o aparelho para observar as mudanças.</Text>
          </View>
        )}
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

// Conjunto de estilos para manter legibilidade e hierarquia visual.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f3ff',
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
    color: '#5b21b6',
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
    borderColor: '#c4b5fd',
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
    color: '#4c1d95',
  },
  hint: {
    marginTop: 4,
    fontSize: 14,
    color: '#475569',
  },
});
