import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';

interface TimeSlotListProps {
  onSelectTime: (time: string) => void;
  selectedTime?: string;
  style?: ViewStyle;
}

interface StyledProps {
  isSelected: boolean;
}

const TimeSlotList: React.FC<TimeSlotListProps> = ({
  onSelectTime,
  selectedTime,
  style,
}) => {
  // Gera horários de 30 em 30 minutos das 9h às 18h
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <Container style={style}>
      <TimeGrid>
        {timeSlots.map((time) => (
          <TimeCard
            key={time}
            onPress={() => onSelectTime(time)}
            isSelected={selectedTime === time}
          >
            <TimeText isSelected={selectedTime === time}>{time}</TimeText>
          </TimeCard>
        ))}
      </TimeGrid>
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 15px;
`;

const TimeGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px;
`;

const TimeCard = styled(TouchableOpacity)<StyledProps>`
  width: 23%;
  padding: 8px;
  border-radius: 6px;
  background-color: ${(props: StyledProps) => props.isSelected ? theme.colors.primary + '20' : theme.colors.background};
  border-width: 1px;
  border-color: ${(props: StyledProps) => props.isSelected ? theme.colors.primary : theme.colors.border};
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.Text<StyledProps>`
  font-size: 12px;
  font-weight: 500;
  color: ${(props: StyledProps) => props.isSelected ? theme.colors.primary : theme.colors.text};
`;

export default TimeSlotList; 