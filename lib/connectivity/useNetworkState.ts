/**
 * Network State Hook
 *
 * Provides real-time network connectivity status.
 * Used to show the offline indicator and reinforce privacy messaging.
 */

import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export interface NetworkState {
  /** Whether the device is connected to the internet */
  isConnected: boolean;
  /** Whether the connection status is still being determined */
  isLoading: boolean;
  /** The type of connection (wifi, cellular, none, etc.) */
  connectionType: string | null;
}

/**
 * Hook to monitor network connectivity state
 * @returns NetworkState object with connection status
 */
export function useNetworkState(): NetworkState {
  const [state, setState] = useState<NetworkState>({
    isConnected: false,
    isLoading: true,
    connectionType: null,
  });

  useEffect(() => {
    // Get initial state
    NetInfo.fetch().then((netInfoState: NetInfoState) => {
      setState({
        isConnected: netInfoState.isConnected ?? false,
        isLoading: false,
        connectionType: netInfoState.type,
      });
    });

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((netInfoState: NetInfoState) => {
      setState({
        isConnected: netInfoState.isConnected ?? false,
        isLoading: false,
        connectionType: netInfoState.type,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}
