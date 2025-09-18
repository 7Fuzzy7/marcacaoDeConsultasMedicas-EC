import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

/**
 * Estilos para o componente StatsCard
 * 
 * Demonstra:
 * - Cards informativos com visual moderno
 * - Uso de props para customização dinâmica
 * - Sombras e elevação para profundidade
 */

export const Container = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  padding: ${theme.spacing.medium}px;
  margin-bottom: ${theme.spacing.medium}px;
  flex-direction: row;
  align-items: center;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
`;

export const IconContainer = styled.View<{ backgroundColor: string }>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => props.backgroundColor};
  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.medium}px;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const StatsNumber = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 2px;
`;

export const StatsLabel = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.7;
`;

export const TrendContainer = styled.View`
  align-items: flex-end;
`;

export const TrendText = styled.Text<{ positive?: boolean }>`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 500;
`;
