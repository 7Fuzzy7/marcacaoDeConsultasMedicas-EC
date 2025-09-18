import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

/**
 * Estilos para o componente EmptyState
 * 
 * Demonstra:
 * - Separação de estilos em arquivos dedicados
 * - Uso consistente do tema da aplicação
 * - Reutilização de estilos
 */

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.large}px;
  margin-top: ${theme.spacing.large}px;
`;

export const EmptyIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${theme.colors.surface};
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.medium}px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.6;
  font-size: ${theme.typography.body.fontSize}px;
  line-height: 24px;
`;

export const EmptySubtext = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.4;
  font-size: ${theme.typography.caption.fontSize}px;
  margin-top: ${theme.spacing.small}px;
`;
