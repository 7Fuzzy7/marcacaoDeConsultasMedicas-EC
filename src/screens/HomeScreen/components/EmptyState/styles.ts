import styled from 'styled-components/native';
import theme from '../../../../styles/theme';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.large}px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.6;
  font-size: ${theme.typography.body.fontSize}px;
`;
