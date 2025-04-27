import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './src/routes';
import theme from './src/styles/theme';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={theme.colors.primary} 
        />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}