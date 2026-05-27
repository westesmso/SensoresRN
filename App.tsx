import { StatusBar } from 'expo-status-bar';
// Importa React com hooks para estado local e efeitos de inscrição.
import React, { useEffect, useState } from 'react';
// Importa componentes de interface e botão para ações de bloqueio.
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// Importa API de orientação da tela para ler e controlar rotação.
import * as ScreenOrientation from 'expo-screen-orientation';

// Traduz o enum de orientação para texto amigável em português.
const orientationToLabel = (orientation: ScreenOrientation.Orientation): string => {
  if (orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
    return 'Retrato';
  }

  if (orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN) {
    return 'Retrato Invertido';
  }

  if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
    return 'Paisagem Esquerda';
  }

  if (orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
    return 'Paisagem Direita';
  }

  return 'Desconhecida';
};

// Componente principal do exemplo 6.
export default function App() {
  // Guarda a orientação atual detectada no dispositivo.
  const [orientationLabel, setOrientationLabel] = useState('Lendo orientação...');

  // Guarda texto do bloqueio atual para feedback didático.
  const [lockLabel, setLockLabel] = useState('Sem bloqueio');

  // Efeito para ler orientação inicial e escutar alterações em tempo real.
  useEffect(() => {
    // Função assíncrona para leitura inicial da orientação.
    const loadInitialOrientation = async () => {
      // Obtém enum da orientação atual no momento da abertura.
      const current = await ScreenOrientation.getOrientationAsync();
      // Converte enum para string amigável exibida na interface.
      setOrientationLabel(orientationToLabel(current));
    };

    // Assina eventos de rotação para atualizar texto automaticamente.
    const subscription = ScreenOrientation.addOrientationChangeListener((event) => {
      setOrientationLabel(orientationToLabel(event.orientationInfo.orientation));
    });

    // Executa leitura inicial após registrar listener.
    loadInitialOrientation();

    // Remove listener ao desmontar para evitar inscrições acumuladas.
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  // Bloqueia orientação para retrato vertical, útil em formulários e leitura.
  const lockPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    setLockLabel('Bloqueado em Retrato');
  };

  // Bloqueia orientação para paisagem, útil em jogos e vídeo.
  const lockLandscape = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    setLockLabel('Bloqueado em Paisagem');
  };

  // Remove bloqueio e devolve controle automático ao sistema operacional.
  const unlockAll = async () => {
    await ScreenOrientation.unlockAsync();
    setLockLabel('Sem bloqueio');
  };

  // Renderiza interface com orientação atual e botões de controle.
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Exemplo 6: Rotação de Tela</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Orientação atual:</Text>
          <Text style={styles.value}>{orientationLabel}</Text>
          <Text style={styles.label}>Estado de bloqueio:</Text>
          <Text style={styles.value}>{lockLabel}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <Button title="Bloquear Retrato" onPress={lockPortrait} />
          <Button title="Bloquear Paisagem" onPress={lockLandscape} />
          <Button title="Desbloquear" onPress={unlockAll} />
        </View>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

// Define estilos para separar informações e ações com clareza.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0fdfa',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#115e59',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5eead4',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#0f766e',
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  buttonGroup: {
    gap: 8,
  },
});
