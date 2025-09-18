import React from 'react';
import { Container, EmptyText } from './styles';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'Nenhuma consulta agendada' 
}) => {
  return (
    <Container>
      <EmptyText>{message}</EmptyText>
    </Container>
  );
};

export default EmptyState;
