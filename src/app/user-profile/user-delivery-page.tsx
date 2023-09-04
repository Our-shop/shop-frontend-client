import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { colors } from '../../themes';
import { deleteAddress, getAddress, getAllActive, GetDeliveryData } from './api/ user-address';
import UserEditAddress from './components/user-edit-address';
import { NavLink as RouterLink } from 'react-router-dom';

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

  const getAllActiveDeliveries = async () => {
    try {
      const response = await getAllActive();
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
    getAllActiveDeliveries();
  };

  useEffect(() => {
    getAllActiveDeliveries();
  }, [showModal, handleDeleteClick]);

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
          {addresses?.map((address, index) => (
            <TRow key={index + 1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{address.city}</TableCell>
              <TableCell>{address.address}</TableCell>
              <TableCell>{address.phone}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  onClick={() => handleEditClick(address.id)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
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
