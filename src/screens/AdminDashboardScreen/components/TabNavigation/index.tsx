import React from 'react';
import { Icon } from 'react-native-elements';
import theme from '../../../../styles/theme';
import { Container, TabButton, TabText, TabIcon } from './styles';

/**
 * Componente de navegação por abas
 * 
 * Este componente demonstra:
 * - Navegação intuitiva entre seções
 * - Estados visuais claros (ativo/inativo)
 * - Componentização de elementos de UI
 * - Callback pattern para comunicação com componente pai
 */

export type TabType = 'appointments' | 'users';

interface Tab {
  id: TabType;
  label: string;
  icon: string;
  iconType?: string;
}

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: Tab[] = [
  {
    id: 'appointments',
    label: 'Consultas',
    icon: 'calendar-today',
    iconType: 'material'
  },
  {
    id: 'users',
    label: 'Usuários',
    icon: 'people',
    iconType: 'material'
  }
];

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <Container>
      {tabs.map(tab => (
        <TabButton
          key={tab.id}
          active={activeTab === tab.id}
          onPress={() => onTabChange(tab.id)}
        >
          <TabIcon active={activeTab === tab.id}>
            <Icon
              name={tab.icon}
              type={tab.iconType}
              size={20}
              color={activeTab === tab.id ? '#fff' : theme.colors.text}
            />
          </TabIcon>
          <TabText active={activeTab === tab.id}>
            {tab.label}
          </TabText>
        </TabButton>
      ))}
    </Container>
  );
};

export default TabNavigation;
