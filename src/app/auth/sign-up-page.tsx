import React, { FC, useState } from 'react';
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { colors } from '../../themes';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)`
  padding: 20px;
  min-height: 50vh;
  width: 400px;
  margin: 50px auto 20px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.lightViolet};
  margin-bottom: 10px;
`;

const SignUpPage: FC = () => {
  const [userRole, setUserRole] = useState<string>('');

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setUserRole(event.target.value);
  };

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            Sign Up
          </Typography>
        </Grid>
        <TextField
          label="UserName"
          placeholder="Enter name"
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Confirm password"
          placeholder="Confirm password"
          type="password"
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <FormControl fullWidth>
          <InputLabel id="selectRole">Register as:</InputLabel>
          <Select
            labelId="selectRole"
            id="roleSelect"
            value={userRole}
            label="Register as:"
            onChange={handleRoleChange}
            required
          >
            <MenuItem value={'user'}>user</MenuItem>
            <MenuItem value={'admin'}>admin</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ margin: '8px 0' }}
        >
          Sign Up
        </Button>
        <Typography sx={{ marginTop: '5px' }}>Already registered?</Typography>
        <Typography>
          <Link component={RouterLink} to="/auth/sign-in">
            Sign in
          </Link>
        </Typography>
      </StyledPaper>
    </Grid>
  );
};

export default SignUpPage;
