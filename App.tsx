import { StatusBar } from 'expo-status-bar';
// Importa o React para permitir a criação do componente funcional e o uso de hooks.
import React, { useEffect, useState } from 'react';
// Importa componentes de interface nativos para montar a tela.
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// Importa o sensor de giroscópio para ler velocidade angular nos eixos x, y e z.
import { Gyroscope } from 'expo-sensors';

// Define o formato do estado que armazena a leitura atual do giroscópio.
type GyroscopeReading = {
  x: number;
  y: number;
  z: number;
};

// Declara o componente principal do app para o exemplo 1.
export default function App() {
  // Guarda a leitura mais recente do giroscópio para mostrar em tela.
  const [reading, setReading] = useState<GyroscopeReading>({ x: 0, y: 0, z: 0 });

  // Guarda se o sensor está disponível no dispositivo atual.
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Executa a inscrição no sensor quando o componente monta e remove ao desmontar.
  useEffect(() => {
    // Variável para guardar a assinatura do listener e permitir limpeza correta.
    let subscription: ReturnType<typeof Gyroscope.addListener> | null = null;

    // Função assíncrona isolada para verificar suporte e iniciar o sensor.
    const prepareGyroscope = async () => {
      // Confere se o hardware/OS expõe o giroscópio para o app.
      const available = await Gyroscope.isAvailableAsync();
      // Atualiza estado de disponibilidade para feedback visual ao usuário.
      setIsAvailable(available);

      // Interrompe aqui se o sensor não existir para evitar erro de assinatura.
      if (!available) {
        return;
      }

      // Define intervalo de atualização em milissegundos (250ms = 4 leituras/segundo).
      Gyroscope.setUpdateInterval(250);

      // Registra callback que recebe novas leituras e atualiza o estado da tela.
      subscription = Gyroscope.addListener((data) => {
        // Salva exatamente o objeto retornado para manter os eixos sincronizados.
        setReading(data);
      });
    };

    // Dispara a rotina de configuração do sensor na montagem do componente.
    prepareGyroscope();

    // Retorna limpeza para remover o listener e evitar vazamento de memória.
    return () => {
      // Remove a assinatura somente se ela foi criada com sucesso.
      subscription?.remove();
    };
  }, []);

  // Renderiza o conteúdo visual da tela deste exemplo.
  return (
    // SafeAreaView evita sobreposição com notch/status bar em dispositivos modernos.
    <SafeAreaView style={styles.safeArea}>
      {/* Container central para organizar título e valores */}
      <View style={styles.container}>
        {/* Título da aula para contextualizar o sensor em uso */}
        <Text style={styles.title}>Exemplo 1: Giroscópio</Text>

        {/* Mostra mensagem enquanto a checagem de disponibilidade está em andamento */}
        {isAvailable === null && <Text style={styles.info}>Verificando sensor...</Text>}

        {/* Mostra alerta amigável quando o dispositivo não oferece o giroscópio */}
        {isAvailable === false && (
          <Text style={styles.error}>Giroscópio indisponível neste dispositivo.</Text>
        )}

        {/* Exibe os três eixos quando o sensor está disponível */}
        {isAvailable && (
          <View style={styles.card}>
            <Text style={styles.value}>X: {reading.x.toFixed(3)}</Text>
            <Text style={styles.value}>Y: {reading.y.toFixed(3)}</Text>
            <Text style={styles.value}>Z: {reading.z.toFixed(3)}</Text>
            <Text style={styles.hint}>Mova o celular para observar as variações.</Text>
          </View>
        )}
      </View>

      {/* Mantém a barra de status legível no tema claro do exemplo */}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

// Define os estilos em objeto imutável para reaproveitamento e performance.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f7ff',
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
    color: '#1b2a52',
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
    borderColor: '#c7d2fe',
    gap: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  hint: {
    marginTop: 4,
    fontSize: 14,
    color: '#475569',
  },
});
