import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ViewStyle, TextStyle, Alert } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { adminApiService, AdminUser, ChangePasswordData } from '../services/adminApi';
import theme from '../styles/theme';

interface UserManagementProps {
  style?: ViewStyle;
  onSignOut?: () => void;
}

interface StyledProps {
  role: string;
}

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return theme.colors.error;
    case 'doctor':
      return theme.colors.primary;
    case 'patient':
      return theme.colors.success;
    default:
      return theme.colors.secondary;
  }
};

const getRoleText = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'doctor':
      return 'Médico';
    case 'patient':
      return 'Paciente';
    default:
      return role;
  }
};

const UserManagement: React.FC<UserManagementProps> = ({ style, onSignOut }) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [changingPassword, setChangingPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await adminApiService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (userId: string) => {
    if (!newPassword || newPassword.trim().length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const changeData: ChangePasswordData = {
        userId,
        newPassword: newPassword.trim()
      };

      await adminApiService.changeUserPassword(changeData);
      
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setChangingPassword(null);
      setNewPassword('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar a senha');
    }
  };

  const renderUser = (user: AdminUser, index: number) => (
    <UserContainer key={user.id}>
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
        <UserRole role={user.role}>
          {getRoleText(user.role)}
          {user.specialty && ` - ${user.specialty}`}
        </UserRole>
      </UserInfo>
      
      {changingPassword === user.id ? (
        <PasswordContainer>
          <Input
            placeholder="Nova senha (mín. 6 caracteres)"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            containerStyle={styles.passwordInput}
          />
          <ButtonContainer>
            <Button
              title="Salvar"
              onPress={() => handleChangePassword(user.id)}
              buttonStyle={[styles.saveButton]}
              titleStyle={styles.buttonText}
            />
            <Button
              title="Cancelar"
              onPress={() => {
                setChangingPassword(null);
                setNewPassword('');
              }}
              buttonStyle={[styles.cancelButton]}
              titleStyle={styles.buttonText}
            />
          </ButtonContainer>
        </PasswordContainer>
      ) : (
        <Button
          title="Alterar Senha"
          onPress={() => setChangingPassword(user.id)}
          buttonStyle={styles.changePasswordButton}
          titleStyle={styles.buttonText}
        />
      )}
    </UserContainer>
  );

  if (loading) {
    return (
      <Container style={style}>
        <SectionTitle>Gerenciar Usuários</SectionTitle>
        <LoadingText>Carregando usuários...</LoadingText>
      </Container>
    );
  }

  return (
    <Container style={style}>
      <SectionTitle>Gerenciar Usuários</SectionTitle>
      <SubTitle>Total: {users.length} usuários</SubTitle>
      
      <UsersListContainer>
        {users.map(renderUser)}
        
        {onSignOut && (
          <LogoutButtonContainer>
            <Button
              title="Sair"
              onPress={onSignOut}
              buttonStyle={styles.logoutButton}
              titleStyle={styles.buttonText}
            />
          </LogoutButtonContainer>
        )}
      </UsersListContainer>
      
      <BottomSpacer />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 0px;
`;

const UsersListContainer = styled.View`
  flex: 1;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const BottomSpacer = styled.View`
  height: 80px;
`;

const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 12px;
  margin-top: 20px;
  z-index: 10;
  background-color: ${theme.colors.background};
  padding: 8px 0px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  color: ${theme.colors.secondary};
  margin-bottom: 20px;
  margin-top: 5px;
  z-index: 10;
  background-color: ${theme.colors.background};
  padding: 4px 0px;
  font-weight: 500;
`;

const UserContainer = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid ${theme.colors.border};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const UserInfo = styled.View`
  margin-bottom: 16px;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 6px;
`;

const UserEmail = styled.Text`
  font-size: 14px;
  color: ${theme.colors.secondary};
  margin-bottom: 8px;
`;

const UserRole = styled.Text<StyledProps>`
  font-size: 12px;
  font-weight: bold;
  color: ${(props: StyledProps) => getRoleColor(props.role)};
  text-transform: uppercase;
  background-color: ${(props: StyledProps) => getRoleColor(props.role) + '20'};
  padding: 4px 8px;
  border-radius: 12px;
  align-self: flex-start;
`;

const PasswordContainer = styled.View`
  margin-top: 16px;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.border};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.secondary};
  text-align: center;
  margin-top: 40px;
`;

const LogoutButtonContainer = styled.View`
  margin-top: 30px;
  margin-bottom: 20px;
  padding-top: 20px;
  border-top-width: 2px;
  border-top-color: ${theme.colors.border};
  background-color: ${theme.colors.background};
`;

const styles = {
  passwordInput: {
    marginBottom: 12,
  } as ViewStyle,
  saveButton: {
    backgroundColor: theme.colors.success,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  } as ViewStyle,
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  } as ViewStyle,
  changePasswordButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
  } as ViewStyle,
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  } as TextStyle,
  logoutButton: {
    backgroundColor: theme.colors.error,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  } as ViewStyle,
};

export default UserManagement;
