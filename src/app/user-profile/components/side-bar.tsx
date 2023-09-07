import React, { FC } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';

const allSettings = [
  { name: 'Edit user details', value: 'Edit user details' },
  { name: 'Delivery details', value: 'Delivery details' },
  { name: 'Forgot password', value: 'Forgot password' },
  { name: 'Orders history', value: 'Orders history' },
  { name: 'Delete account', value: 'Delete account' },
];

interface SidebarProps {
  settings: string;
  handleClick: (next: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ settings, handleClick }) => {
  return (
    <Box width={220}>
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
