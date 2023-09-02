import React, { FC } from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';
import { colors } from '../themes';

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
  return (
    <Typography color="text.secondary">
      {"Copyright ©  Pet's Shop "}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const gitHubs = [
  { userName: 'Dmitry', href: 'https://github.com/DmitruKudr' },
  { userName: 'Anastasya', href: 'https://github.com/AnastasyMeleshko' },
];

const GitHubLinks: FC = () => {
  return (
    <Typography paddingLeft={3} color="text.secondary">
      GitHub Links:
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
