import React, { FC, useCallback, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Loading } from '@components/Loading';
import R from '@resources';
import { Text } from '@components';
import {
  useInternetReachable,
  useRemoteConfig,
  useTypedSelector,
} from '@hooks';
import { Analytics, Messaging } from '@services';
import { APIService } from '@services/APIService';

interface InitializerProps {}

export const Initializer: FC<InitializerProps> = ({ children }) => {
  const appReady = useTypedSelector((state) => state.appReadiness.appReady);
  const isInternetReachable = useInternetReachable();
  const remoteConfig = useRemoteConfig();

  const servicesInitiliaze = useCallback(async () => {
    APIService.initialize(remoteConfig);
    await Analytics.initialize();
    await Messaging.initialize();
  }, [remoteConfig]);

  useEffect(() => {
    (async () => {
      if (appReady) {
        await servicesInitiliaze();

        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(R.theme.primary, true);
        }
      }
    })();
  }, [appReady, servicesInitiliaze]);

  if (appReady) {
    return <>{children}</>;
  }

  return (
    <View style={[styles.container, R.commonStyles.center]}>
      {isInternetReachable === false ? (
        <Text>İnternet bağlantınızı kontrol ediniz</Text>
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: R.theme.primary },
});
