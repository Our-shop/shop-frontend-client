import React, { FC } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  settings: string;
  handleClick: (next: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ settings, handleClick }) => {
  const { t } = useTranslation();

  const allSettings = [
    { name: `${t('userProfile:Edit-user-details')}`, value: 'Edit user details' },
    { name: `${t('userProfile:Delivery-details')}`, value: 'Delivery details' },
    { name: `${t('userProfile:Forgot-password')}`, value: 'Forgot password' },
    { name: `${t('userProfile:Orders-history')}`, value: 'Orders history' },
    { name: `${t('userProfile:Delete-account')}`, value: 'Delete account' },
  ];

  return (
    <Box width={280}>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        orientation="vertical"
        value={settings}
        exclusive
      >
        {allSettings.map((item) => (
          <ToggleButton
            key={item.name}
            value={item.value}
            aria-label={item.name}
            onClick={() => handleClick(item.value)}
          >
            <Typography>{item.name}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default Sidebar;
