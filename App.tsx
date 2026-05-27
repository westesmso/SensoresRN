import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Battery from 'expo-battery';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Accelerometer, Gyroscope, Magnetometer, Pedometer } from 'expo-sensors';

type SensorAxes = {
  x: number;
  y: number;
  z: number;
};

type MenuKey =
  | 'gyroscope'
  | 'accelerometer'
  | 'pedometer'
  | 'battery'
  | 'magnetometer'
  | 'orientation';

const MENU_ITEMS: { key: MenuKey; label: string }[] = [
  { key: 'gyroscope', label: 'Exemplo 1 - Giroscopio' },
  { key: 'accelerometer', label: 'Exemplo 2 - Acelerometro' },
  { key: 'pedometer', label: 'Exemplo 3 - Pedometro' },
  { key: 'battery', label: 'Exemplo 4 - Bateria' },
  { key: 'magnetometer', label: 'Exemplo 5 - Magnetometro' },
  { key: 'orientation', label: 'Exemplo 6 - Rotacao da Tela' },
];

const formatState = (state: Battery.BatteryState): string => {
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

const formatOrientation = (orientation: ScreenOrientation.Orientation): string => {
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

function GyroscopeExample() {
  const [reading, setReading] = useState<SensorAxes>({ x: 0, y: 0, z: 0 });
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let subscription: ReturnType<typeof Gyroscope.addListener> | null = null;

    const prepare = async () => {
      const available = await Gyroscope.isAvailableAsync();
      setIsAvailable(available);

      if (!available) {
        return;
      }

      Gyroscope.setUpdateInterval(250);
      subscription = Gyroscope.addListener((data) => setReading(data));
    };

    prepare();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.exampleCard}>
      <Text style={styles.exampleTitle}>Leitura do Giroscopio</Text>
      {isAvailable === null && <Text style={styles.info}>Verificando sensor...</Text>}
      {isAvailable === false && <Text style={styles.error}>Sensor indisponivel.</Text>}
      {isAvailable && (
        <>
          <Text style={styles.value}>X: {reading.x.toFixed(3)}</Text>
          <Text style={styles.value}>Y: {reading.y.toFixed(3)}</Text>
          <Text style={styles.value}>Z: {reading.z.toFixed(3)}</Text>
        </>
      )}
    </View>
  );
}

function AccelerometerExample() {
  const [reading, setReading] = useState<SensorAxes>({ x: 0, y: 0, z: 0 });
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let subscription: ReturnType<typeof Accelerometer.addListener> | null = null;

    const prepare = async () => {
      const available = await Accelerometer.isAvailableAsync();
      setIsAvailable(available);

      if (!available) {
        return;
      }

      Accelerometer.setUpdateInterval(250);
      subscription = Accelerometer.addListener((data) => setReading(data));
    };

    prepare();

    return () => {
      subscription?.remove();
    };
  }, []);

  const magnitude = Math.sqrt(reading.x ** 2 + reading.y ** 2 + reading.z ** 2);

  return (
    <View style={styles.exampleCard}>
      <Text style={styles.exampleTitle}>Leitura do Acelerometro</Text>
      {isAvailable === null && <Text style={styles.info}>Verificando sensor...</Text>}
      {isAvailable === false && <Text style={styles.error}>Sensor indisponivel.</Text>}
      {isAvailable && (
        <>
          <Text style={styles.value}>X: {reading.x.toFixed(3)}</Text>
          <Text style={styles.value}>Y: {reading.y.toFixed(3)}</Text>
          <Text style={styles.value}>Z: {reading.z.toFixed(3)}</Text>
          <Text style={styles.value}>Magnitude: {magnitude.toFixed(3)}</Text>
        </>
      )}
    </View>
  );
}

function PedometerExample() {
  const [liveSteps, setLiveSteps] = useState(0);
  const [dailySteps, setDailySteps] = useState<number | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;

    const prepare = async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);

      if (!available) {
        return;
      }

      const end = new Date();
      const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);
      const result = await Pedometer.getStepCountAsync(start, end);
      setDailySteps(result.steps);
      subscription = Pedometer.watchStepCount((update) => setLiveSteps(update.steps));
    };

    prepare();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.exampleCard}>
      <Text style={styles.exampleTitle}>Leitura do Pedometro</Text>
      {isAvailable === null && <Text style={styles.info}>Verificando sensor...</Text>}
      {isAvailable === false && <Text style={styles.error}>Sensor indisponivel.</Text>}
      {isAvailable && (
        <>
          <Text style={styles.value}>Passos desde abertura: {liveSteps}</Text>
          <Text style={styles.value}>Passos ultimas 24h: {dailySteps ?? 'Carregando...'}</Text>
        </>
      )}
    </View>
  );
}

function BatteryExample() {
  const [level, setLevel] = useState<number | null>(null);
  const [state, setState] = useState('Carregando dados...');

  useEffect(() => {
    let levelSub: ReturnType<typeof Battery.addBatteryLevelListener> | null = null;
    let stateSub: ReturnType<typeof Battery.addBatteryStateListener> | null = null;

    const prepare = async () => {
      const batteryLevel = await Battery.getBatteryLevelAsync();
      const batteryState = await Battery.getBatteryStateAsync();

      setLevel(Math.round(batteryLevel * 100));
      setState(formatState(batteryState));

      levelSub = Battery.addBatteryLevelListener((event) => {
        setLevel(Math.round(event.batteryLevel * 100));
      });

      stateSub = Battery.addBatteryStateListener((event) => {
        setState(formatState(event.batteryState));
      });
    };

    prepare();

    return () => {
      levelSub?.remove();
      stateSub?.remove();
    };
  }, []);

  return (
    <View style={styles.exampleCard}>
      <Text style={styles.exampleTitle}>Leitura de Bateria</Text>
      <Text style={styles.value}>Nivel: {level === null ? 'Carregando...' : `${level}%`}</Text>
      <Text style={styles.value}>Estado: {state}</Text>
    </View>
  );
}

function MagnetometerExample() {
  const [reading, setReading] = useState<SensorAxes>({ x: 0, y: 0, z: 0 });
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let subscription: ReturnType<typeof Magnetometer.addListener> | null = null;

    const prepare = async () => {
      const available = await Magnetometer.isAvailableAsync();
      setIsAvailable(available);

      if (!available) {
        return;
      }

      Magnetometer.setUpdateInterval(300);
      subscription = Magnetometer.addListener((data) => setReading(data));
    };

    prepare();

    return () => {
      subscription?.remove();
    };
  }, []);

  const magnitude = Math.sqrt(reading.x ** 2 + reading.y ** 2 + reading.z ** 2);

  return (
    <View style={styles.exampleCard}>
      <Text style={styles.exampleTitle}>Leitura do Magnetometro</Text>
      {isAvailable === null && <Text style={styles.info}>Verificando sensor...</Text>}
      {isAvailable === false && <Text style={styles.error}>Sensor indisponivel.</Text>}
      {isAvailable && (
        <>
          <Text style={styles.value}>X: {reading.x.toFixed(2)} uT</Text>
          <Text style={styles.value}>Y: {reading.y.toFixed(2)} uT</Text>
          <Text style={styles.value}>Z: {reading.z.toFixed(2)} uT</Text>
          <Text style={styles.value}>Intensidade: {magnitude.toFixed(2)} uT</Text>
        </>
      )}
    </View>
  );
}

function OrientationExample() {
  const [orientation, setOrientation] = useState('Lendo orientacao...');
  const [lockState, setLockState] = useState('Sem bloqueio');

  useEffect(() => {
    const load = async () => {
      const current = await ScreenOrientation.getOrientationAsync();
      setOrientation(formatOrientation(current));
    };

    const subscription = ScreenOrientation.addOrientationChangeListener((event) => {
      setOrientation(formatOrientation(event.orientationInfo.orientation));
    });

    load();

    return () => {
      subscription.remove();
    };
  }, []);

  const lockPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    setLockState('Bloqueado em Retrato');
  };

  const lockLandscape = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    setLockState('Bloqueado em Paisagem');
  };

  const unlock = async () => {
    await ScreenOrientation.unlockAsync();
    setLockState('Sem bloqueio');
  };

  return (
    <View style={styles.exampleCard}>
      <Text style={styles.exampleTitle}>Rotacao da Tela</Text>
      <Text style={styles.value}>Orientacao: {orientation}</Text>
      <Text style={styles.value}>Bloqueio: {lockState}</Text>
      <View style={styles.buttonGroup}>
        <Button title="Bloquear Retrato" onPress={lockPortrait} />
        <Button title="Bloquear Paisagem" onPress={lockLandscape} />
        <Button title="Desbloquear" onPress={unlock} />
      </View>
    </View>
  );
}

export default function App() {
  const [selected, setSelected] = useState<MenuKey>('gyroscope');

  const renderCurrentExample = () => {
    if (selected === 'gyroscope') {
      return <GyroscopeExample />;
    }

    if (selected === 'accelerometer') {
      return <AccelerometerExample />;
    }

    if (selected === 'pedometer') {
      return <PedometerExample />;
    }

    if (selected === 'battery') {
      return <BatteryExample />;
    }

    if (selected === 'magnetometer') {
      return <MagnetometerExample />;
    }

    return <OrientationExample />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Aula 29 - Sensores</Text>
        <Text style={styles.subtitle}>Menu unico para navegar entre os 6 exemplos.</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuRow}>
          {MENU_ITEMS.map((item) => {
            const isActive = selected === item.key;

            return (
              <Pressable
                key={item.key}
                style={[styles.menuButton, isActive && styles.menuButtonActive]}
                onPress={() => setSelected(item.key)}
              >
                <Text style={[styles.menuButtonText, isActive && styles.menuButtonTextActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {renderCurrentExample()}
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    padding: 20,
    gap: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 15,
    color: '#334155',
  },
  menuRow: {
    gap: 8,
    paddingVertical: 4,
  },
  menuButton: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  menuButtonActive: {
    borderColor: '#1d4ed8',
    backgroundColor: '#dbeafe',
  },
  menuButtonText: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 13,
  },
  menuButtonTextActive: {
    color: '#1e3a8a',
  },
  exampleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dbe1ea',
    padding: 16,
    gap: 8,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  value: {
    fontSize: 18,
    color: '#0f172a',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#475569',
  },
  error: {
    fontSize: 16,
    color: '#b91c1c',
    fontWeight: '700',
  },
  buttonGroup: {
    gap: 8,
    marginTop: 8,
  },
});
