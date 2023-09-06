import React, { FC, useEffect, useState } from 'react';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { colors } from '../../themes';
import { deleteAddress, getAddress, getAllActiveByUserId } from './api/ user-address';
import UserEditAddress from './components/user-edit-address';
import { GetDeliveryData } from './types/get-delivery-data.type';
import storage from '../../local-storage/storage';
import LoaderComp from '../../components/loader.comp';
import jwt_decode from 'jwt-decode';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px;
  background-color: ${colors.lightGrey};
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: ${colors.white};
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const UserDeliveryPage: FC = () => {
  const [addresses, setAddresses] = useState<GetDeliveryData[]>([]);
  const [addressForEditId, setAddressForEditId] = useState<string>('');
  const [activeAddress, setActiveAddress] = useState<any>();
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const token = storage.get('access-token') as string;
  const payload: { id: string; email: string; roleId: string; permissions: [] } = jwt_decode(token);
  const userId = payload.id;

  const getAllActiveUserDeliveries = async (userId: string) => {
    try {
      const response = await getAllActiveByUserId(userId);
      const res = response.data;
      setAddresses(res);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id: string) => {
    const fetchData = async () => {
      try {
        const currentAddress = await getAddress(id);
        setActiveAddress(currentAddress.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setShowModal(true);
    setAddressForEditId(id);
  };

  const handleDeleteClick = (id: string) => {
    const deleteAddressById = async () => {
      try {
        await deleteAddress(id);
      } catch (error) {
        console.error(error);
      }
    };
    deleteAddressById();
    getAllActiveUserDeliveries(userId ? userId : '');
  };

  useEffect(() => {
    getAllActiveUserDeliveries(userId ? userId : '');
  }, [showModal, handleDeleteClick]);

  if (!addresses) return <LoaderComp />;

  return (
    <>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>№</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Link component={RouterLink} to="/profile">
                <Button type="submit" color="primary" variant="contained">
                  Go back
                </Button>
              </Link>
            </TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {addresses.length === 0 ? (
            <TRow sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
              <Typography variant="h5" style={{ marginRight: 30 }}>
                No addresses as of now
              </Typography>
              <Link
                component={RouterLink}
                to="/profile/add-address"
                sx={{ textDecoration: 'none' }}
              >
                <Button variant="contained" color="secondary">
                  Add address
                </Button>
              </Link>
            </TRow>
          ) : (
            ''
          )}
          {addresses?.map((address, index) => (
            <TRow key={index + 1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{address.city}</TableCell>
              <TableCell>{address.address}</TableCell>
              <TableCell>{address.phone}</TableCell>
              <TableCell>
                <Link
                  component={RouterLink}
                  to="/profile/add-address"
                  sx={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" color="secondary" style={{ marginRight: 10 }}>
                    Add
                  </Button>
                </Link>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  onClick={() => handleEditClick(address.id)}
                >
                  Edit
                </Button>
                <Button
                  style={{ backgroundColor: colors.delete }}
                  variant="contained"
                  onClick={() => handleDeleteClick(address.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
      <UserEditAddress
        activeAddress={activeAddress}
        setShowModal={setShowModal}
        showModal={showModal}
        addressForEditId={addressForEditId}
      />
    </>
  );
};

export default UserDeliveryPage;
