import React from 'react';
import { Icon } from 'react-native-elements';
import theme from '../../../../styles/theme';
import { Container, EmptyIcon, EmptyText, EmptySubtext } from './styles';

/**
 * Componente para exibir estados vazios de forma consistente
 * 
 * Este componente demonstra:
 * - Componentização de UI reutilizável
 * - Props opcionais com valores padrão
 * - Uso de ícones para melhor UX
 * - Separação de estilos
 */

interface EmptyStateProps {
  icon?: string;
  iconType?: string;
  message?: string;
  subMessage?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon = 'inbox',
  iconType = 'material',
  message = 'Nenhum item encontrado',
  subMessage = 'Os dados aparecerão aqui quando disponíveis'
}) => {
  return (
    <Container>
      <EmptyIcon>
        <Icon
          name={icon}
          type={iconType}
          size={40}
          color={theme.colors.text}
        />
      </EmptyIcon>
      <EmptyText>{message}</EmptyText>
      <EmptySubtext>{subMessage}</EmptySubtext>
    </Container>
  );
};

export default EmptyState;
