import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleButtonGroup, ToggleButton, styled } from '@mui/material';
import { colors } from '../themes';
import storage from '../local-storage/storage';

const StyledButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
    backgroundColor: colors.lightGrey,
    color: colors.darkGrey,
    '&.Mui-selected': {
      backgroundColor: colors.lightViolet,
      color: colors.white,
      '&:hover': {
        backgroundColor: colors.darkViolet,
      },
    },
    '&:hover': {
      backgroundColor: colors.lightGrey,
    },
  },
}));

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(`${i18n.language}`);

  const handleLanguageChange = (_: React.MouseEvent<HTMLElement>, newLanguage: 'en' | 'ru') => {
    if (!newLanguage) return;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    storage.set('active-language', newLanguage);
  };

  return (
    <StyledButtonGroup
      value={language}
      exclusive
      onChange={handleLanguageChange}
      aria-label="Platform"
      size="small"
      sx={{ marginLeft: '30px' }}
    >
      <ToggleButton value="en">En</ToggleButton>
      <ToggleButton value="ru">Ru</ToggleButton>
    </StyledButtonGroup>
  );
};

export default LanguageSwitcher;
