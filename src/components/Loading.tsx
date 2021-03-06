import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import R from '@resources';

export const Loading: FC = () => {
  return (
    <View style={[styles.container, R.commonStyles.center]}>
      <ActivityIndicator size={'large'} color={R.theme.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
