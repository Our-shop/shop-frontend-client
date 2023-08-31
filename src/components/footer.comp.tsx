import React, { FC } from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';

const Component = styled('footer')({
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Copyright: FC = () => {
  return (
    <Typography color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Pet's Shop
      </Link>{' '}
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
        <Link paddingLeft={1} color="inherit" href={gitHub.href}>
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
