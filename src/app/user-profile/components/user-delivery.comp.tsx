import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { colors } from '../../../themes';
import UserEditAddressComp from './user-edit-address.comp';
import storage from '../../../local-storage/storage';
import LoaderComp from '../../../components/loader.comp';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { deliveryItemsSelector } from '../../delivery/store/delivery.selectors';
import { deleteDeliveryItem, getActiveDeliveries } from '../../delivery/store/delivery.actions';
import { DeliveryDto } from '../../delivery/types/delivery-dto.type';
import UserAddAddressComp from './user-add-address.comp';

const StyledTable = styled(Table)`
  background-color: ${colors.lightGrey};
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: ${colors.darkGrey};
    color: ${colors.white};
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const UserDeliveryComp: FC = () => {
  const [addressForEditId, setAddressForEditId] = useState<string>('');
  const [activeAddress, setActiveAddress] = useState<any>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const token = storage.get('access-token') as string;
  const payload: { id: string; email: string; roleId: string; permissions: [] } = jwt_decode(token);
  const userId = payload.id;

  const dispatch = useDispatch<AppDispatch>();
  const addresses = useSelector(deliveryItemsSelector);

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    setAddressForEditId(id);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    event.stopPropagation();
    await dispatch(deleteDeliveryItem({ deliveryItemId: id })).then(() => {
      dispatch(getActiveDeliveries({ userId: userId }));
    });
  };

  const handleAddClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowAddModal(true);
  };

  useEffect(() => {
    dispatch(getActiveDeliveries({ userId: userId }));
  }, [showEditModal, showAddModal, dispatch]);

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
            <TableCell>Options</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {addresses.length === 0 ? (
            <TRow sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
              <TableCell>
                <Typography style={{ marginRight: 30 }}>No addresses as of now</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(event) => handleAddClick(event)}
                >
                  Add address
                </Button>
              </TableCell>
            </TRow>
          ) : (
            addresses.map((address: DeliveryDto, index: number) => (
              <TRow key={address.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.address}</TableCell>
                <TableCell>{address.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: 10 }}
                    onClick={(event) => handleAddClick(event)}
                  >
                    Add
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={(event) => handleEditClick(event, address.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ backgroundColor: colors.delete }}
                    variant="contained"
                    onClick={(event) => handleDeleteClick(event, address.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TRow>
            ))
          )}
        </TableBody>
      </StyledTable>
      <UserEditAddressComp
        activeAddress={activeAddress}
        setShowModal={setShowEditModal}
        showModal={showEditModal}
        addressForEditId={addressForEditId}
      />
      <UserAddAddressComp
        activeAddress={activeAddress}
        setShowAddModal={setShowAddModal}
        showAddModal={showAddModal}
        addressForEditId={addressForEditId}
      />
    </>
  );
};

export default UserDeliveryComp;
