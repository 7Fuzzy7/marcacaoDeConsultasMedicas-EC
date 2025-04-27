import React from 'react';
import styled from 'styled-components/native';
import { HeaderContainer, HeaderTitle } from '../components/Header';
import AppointmentForm from '../components/AppointmentForm';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../types/appointments';
import { RootStackParamList } from '../types/navigation';

type CreateAppointmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;
};

const CreateAppointmentScreen: React.FC<CreateAppointmentScreenProps> = ({ navigation }) => {
  const handleSubmit = async (appointment: {
    doctorId: string;
    date: Date;
    time: string;
    description: string;
  }) => {
    try {
      // Recuperar consultas existentes
      const existingAppointments = await AsyncStorage.getItem('appointments');
      const appointments = existingAppointments ? JSON.parse(existingAppointments) : [];

      // Adicionar nova consulta
      const newAppointment = {
        id: Date.now().toString(),
        ...appointment,
        status: 'pending',
      };

      appointments.push(newAppointment);

      // Salvar no AsyncStorage
      await AsyncStorage.setItem('appointments', JSON.stringify(appointments));

      // Navegar de volta para a tela inicial
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao salvar consulta:', error);
      alert('Erro ao salvar a consulta. Tente novamente.');
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Agendar Consulta</HeaderTitle>
      </HeaderContainer>

      <Content>
        <AppointmentForm onSubmit={handleSubmit} />
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.ScrollView`
  flex: 1;
`;

export default CreateAppointmentScreen;