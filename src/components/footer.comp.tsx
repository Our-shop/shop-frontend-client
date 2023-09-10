import React, { FC } from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';
import { colors } from '../themes';
import { useTranslation } from 'react-i18next';

const Component = styled('footer')({
  paddingTop: 20,
  paddingBottom: 10,
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.slightGrey,
});

const Copyright: FC = () => {
  const { t } = useTranslation();
  return (
    <Typography color="text.secondary">
      {t('footer:Copyright')}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const GitHubLinks: FC = () => {
  const { t } = useTranslation();

  const gitHubs = [
    { userName: `${t('footer:Dmitry')}`, href: 'https://github.com/DmitruKudr' },
    { userName: `${t('footer:Anastasya')}`, href: 'https://github.com/AnastasyMeleshko' },
  ];

  return (
    <Typography paddingLeft={3} color="text.secondary">
      {t('footer:GitHub-links')}
      {gitHubs.map((gitHub) => (
        <Link key={gitHub.href} paddingLeft={1} color="inherit" href={gitHub.href} target="_blank">
          {gitHub.userName}
          <IconButton size="small">
            <GitHubIcon />
          </IconButton>
        </Link>
      ))}
    </Typography>
  );
};

const FooterComp: FC = () => {
  return (
    <Component>
      <Copyright />
      <GitHubLinks />
    </Component>
  );
};

export default FooterComp;
