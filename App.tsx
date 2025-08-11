import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/styles/theme';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={theme.colors.primary} 
        />
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
