import React from 'react';
import { Icon } from 'react-native-elements';
import {
  Container,
  IconContainer,
  InfoContainer,
  StatsNumber,
  StatsLabel,
  TrendContainer,
  TrendText
} from './styles';

/**
 * Componente para exibir cartões de estatísticas
 * 
 * Este componente demonstra:
 * - Componentização de elementos de UI
 * - Props bem definidas e tipadas
 * - Flexibilidade para diferentes tipos de dados
 * - Visual moderno e profissional
 */

interface StatsCardProps {
  icon: string;
  iconType?: string;
  iconColor: string;
  backgroundColor: string;
  number: number;
  label: string;
  trend?: number;
  trendLabel?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  iconType = 'material',
  iconColor,
  backgroundColor,
  number,
  label,
  trend,
  trendLabel
}) => {
  return (
    <Container>
      <IconContainer backgroundColor={backgroundColor}>
        <Icon
          name={icon}
          type={iconType}
          size={24}
          color={iconColor}
        />
      </IconContainer>
      
      <InfoContainer>
        <StatsNumber>{number.toLocaleString()}</StatsNumber>
        <StatsLabel>{label}</StatsLabel>
      </InfoContainer>

      {trend !== undefined && (
        <TrendContainer>
          <TrendText positive={trend >= 0}>
            {trend >= 0 ? '+' : ''}{trend}%
          </TrendText>
          {trendLabel && (
            <StatsLabel style={{ fontSize: 11 }}>{trendLabel}</StatsLabel>
          )}
        </TrendContainer>
      )}
    </Container>
  );
};

export default StatsCard;
