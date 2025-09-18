import styled from 'styled-components/native';
import theme from '../../styles/theme';

/**
 * Estilos principais para AdminDashboardScreen
 * 
 * Este arquivo demonstra:
 * - Separação clara de estilos do componente
 * - Uso consistente do sistema de design
 * - Organização hierárquica de containers
 */

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  showsVerticalScrollIndicator: false,
}))``;

export const Header = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: ${theme.spacing.medium}px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  opacity: 0.7;
  text-align: center;
`;

export const SectionContainer = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
`;

export const StatsContainer = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xlarge}px;
`;

export const LoadingText = styled.Text`
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: ${theme.spacing.medium}px;
`;
