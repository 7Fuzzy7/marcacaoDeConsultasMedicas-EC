import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Componentes locais
import Header from '../../components/Header';
import AppointmentCard from './components/AppointmentCard';
import EmptyState from './components/EmptyState';

// Hooks customizados
import { useHomeScreen } from './hooks/useHomeScreen';

// Estilos
import { 
  Container, 
  Content, 
  AppointmentList, 
  TitleContainer, 
  Title 
} from './styles';

// Tipos
import { RootStackParamList } from '../../types/navigation';
import { Appointment } from '../../types/appointments';
import theme from '../../styles/theme';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    appointments,
    doctors,
    refreshing,
    onRefresh,
    getDoctorInfo
  } = useHomeScreen();

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentCard 
      appointment={item}
      doctor={getDoctorInfo(item.doctorId)}
    />
  );

  const handleCreateAppointment = () => {
    navigation.navigate('CreateAppointment');
  };

  return (
    <Container>
      <Header />
      <TitleContainer>
        <Title>Minhas Consultas</Title>
      </TitleContainer>

      <Content>
        <Button
          title="Agendar Nova Consulta"
          icon={
            <FontAwesome
              name="calendar-plus-o"
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />
          }
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: theme.spacing.medium
          }}
          onPress={handleCreateAppointment}
        />

        <AppointmentList
          data={appointments}
          keyExtractor={(item: Appointment) => item.id}
          renderItem={renderAppointment}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<EmptyState />}
        />
      </Content>
    </Container>
  );
};

export default HomeScreen;
