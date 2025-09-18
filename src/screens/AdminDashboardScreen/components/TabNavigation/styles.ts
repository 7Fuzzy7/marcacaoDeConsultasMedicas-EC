import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

/**
 * Estilos para o componente TabNavigation
 * 
 * Demonstra:
 * - Navegação por abas com visual moderno
 * - Estados ativos e inativos bem definidos
 * - Transições suaves de cor
 */

export const Container = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.surface};
  border-radius: 12px;
  margin-bottom: ${theme.spacing.large}px;
  border: 1px solid ${theme.colors.border};
  padding: 4px;
`;

export const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding: 14px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? theme.colors.primary : 'transparent'};
  border-radius: 8px;
  min-height: 48px;
`;

export const TabText = styled.Text<{ active: boolean }>`
  color: ${props => props.active ? '#fff' : theme.colors.text};
  font-weight: ${props => props.active ? 'bold' : '500'};
  font-size: 16px;
`;

export const TabIcon = styled.View<{ active: boolean }>`
  margin-bottom: 4px;
  opacity: ${props => props.active ? 1 : 0.6};
`;
