import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import UserManagement from '../../components/UserManagement';
import theme from '../../styles/theme';

// Componentes locais
import TabNavigation from './components/TabNavigation';
import StatsCard from './components/StatsCard';
import AppointmentCard from './components/AppointmentCard';
import EmptyState from './components/EmptyState';

// Hooks customizados
import { useAdminDashboard } from './hooks/useAdminDashboard';

// Estilos
import {
  Container,
  ScrollContainer,
  Header as HeaderContainer,
  Title,
  Subtitle,
  SectionContainer,
  SectionTitle,
  StatsContainer,
  LoadingContainer,
  LoadingText,
} from './styles';

/**
 * AdminDashboardScreen Refatorada
 * 
 * Esta refatoração demonstra:
 * - Separação clara de responsabilidades
 * - Componentes especializados e reutilizáveis
 * - Custom hooks para lógica de negócio
 * - Estrutura modular e escalável
 * - Código limpo e bem documentado
 */

const AdminDashboardScreen: React.FC = () => {
  const { signOut } = useAuth();
  const {
    appointments,
    loading,
    activeTab,
    setActiveTab,
    updateAppointmentStatus,
    appointmentStats,
    userStats,
  } = useAdminDashboard();

  // Loading state
  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <LoadingText>Carregando dados do painel...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  // Renderiza a seção de consultas
  const renderAppointmentsSection = () => (
    <SectionContainer>
      <SectionTitle>Estatísticas de Consultas</SectionTitle>
      <StatsContainer>
        <StatsCard
          icon="calendar-today"
          iconColor="#fff"
          backgroundColor={theme.colors.primary}
          number={appointmentStats.total}
          label="Total de Consultas"
        />
        <StatsCard
          icon="schedule"
          iconColor="#fff"
          backgroundColor={theme.colors.warning}
          number={appointmentStats.pending}
          label="Consultas Pendentes"
        />
        <StatsCard
          icon="check-circle"
          iconColor="#fff"
          backgroundColor={theme.colors.success}
          number={appointmentStats.confirmed}
          label="Consultas Confirmadas"
        />
        <StatsCard
          icon="cancel"
          iconColor="#fff"
          backgroundColor={theme.colors.error}
          number={appointmentStats.cancelled}
          label="Consultas Canceladas"
        />
      </StatsContainer>

      <SectionTitle>Consultas Recentes</SectionTitle>
      {appointments.length === 0 ? (
        <EmptyState
          icon="calendar-today"
          message="Nenhuma consulta agendada"
          subMessage="As consultas aparecerão aqui quando forem criadas"
        />
      ) : (
        appointments.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onStatusUpdate={updateAppointmentStatus}
          />
        ))
      )}
    </SectionContainer>
  );

  // Renderiza a seção de usuários
  const renderUsersSection = () => (
    <SectionContainer>
      <SectionTitle>Estatísticas de Usuários</SectionTitle>
      <StatsContainer>
        <StatsCard
          icon="people"
          iconColor="#fff"
          backgroundColor={theme.colors.primary}
          number={userStats.total}
          label="Total de Usuários"
        />
        <StatsCard
          icon="local-hospital"
          iconColor="#fff"
          backgroundColor={theme.colors.info}
          number={userStats.doctors}
          label="Médicos"
        />
        <StatsCard
          icon="person"
          iconColor="#fff"
          backgroundColor={theme.colors.success}
          number={userStats.patients}
          label="Pacientes"
        />
        <StatsCard
          icon="admin-panel-settings"
          iconColor="#fff"
          backgroundColor={theme.colors.warning}
          number={userStats.admins}
          label="Administradores"
        />
      </StatsContainer>

      <SectionTitle>Gerenciamento de Usuários</SectionTitle>
      <UserManagement onSignOut={signOut} />
    </SectionContainer>
  );

  return (
    <Container>
      <Header />
      <ScrollContainer>
        <HeaderContainer>
          <Title>Painel Administrativo</Title>
          <Subtitle>Gerencie consultas e usuários da plataforma</Subtitle>
        </HeaderContainer>

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'appointments' 
          ? renderAppointmentsSection() 
          : renderUsersSection()
        }
      </ScrollContainer>
    </Container>
  );
};

export default AdminDashboardScreen;
