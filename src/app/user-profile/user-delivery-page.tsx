import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { colors } from '../../themes';
import { DeliveryData, getAllAddresses, GetDeliveryData } from './api/ user-address';
import { useNavigate } from 'react-router-dom';
import UserEditAddress from './components/user-edit-address';

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
  const [showModal, setShowModal] = useState(false);

  const userId = '6c221a3c-38bc-43fb-91ba-4a88fb17f4f4';

  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  //
  // const deleteUserData = async (id) => {
  //   await deleteAddress(id);
  //   getAllAddresses();
  // }
  //

  const getAll = async () => {
    const response = await getAllAddresses(userId);
    const res = response.data;
    setAddresses(res);
  };

  console.log(addresses);

  const handleEditClick = (id: string) => {
    setAddressForEditId(id);
    setShowModal(true);
    console.log(id);
  };

  const handleDeleteClick = (id: string) => {
    console.log(id);
  };

  console.log('showModal', showModal);

  // useEffect(() => {
  //   setShowModal(true);
  //   console.log(showModal);
  // }, [handleEditClick]);

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
        addressId={addressForEditId}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

export default UserDeliveryPage;
