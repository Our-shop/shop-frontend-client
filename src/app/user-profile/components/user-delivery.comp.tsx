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
import { AppDispatch } from '../../../store';
import { deliveryItemsSelector } from '../../delivery/store/delivery.selectors';
import { deleteDeliveryItem, getActiveDeliveries } from '../../delivery/store/delivery.actions';
import { DeliveryDto } from '../../delivery/types/delivery-dto.type';
import UserAddAddressComp from './user-add-address.comp';
import { useTranslation } from 'react-i18next';

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  //i18n
  const { t } = useTranslation();

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
            <TableCell>{t('userProfile:City')}</TableCell>
            <TableCell>{t('userProfile:Address')}</TableCell>
            <TableCell>{t('userProfile:Phone')}</TableCell>
            <TableCell>{t('userProfile:Options')}</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {addresses.length === 0 ? (
            <TRow sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
              <TableCell>
                <Typography style={{ marginRight: 30 }}>{t('userProfile:No-addresses')}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(event) => handleAddClick(event)}
                >
                  {t('userProfile:Add-address')}
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
                    {t('userProfile:Add')}
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={(event) => handleEditClick(event, address.id)}
                  >
                    {t('userProfile:Edit')}
                  </Button>
                  <Button
                    style={{ backgroundColor: colors.delete }}
                    variant="contained"
                    onClick={(event) => handleDeleteClick(event, address.id)}
                  >
                    {t('userProfile:Delete')}
                  </Button>
                </TableCell>
              </TRow>
            ))
          )}
        </TableBody>
      </StyledTable>
      <UserEditAddressComp
        setShowModal={setShowEditModal}
        showModal={showEditModal}
        addressForEditId={addressForEditId}
      />
      <UserAddAddressComp setShowAddModal={setShowAddModal} showAddModal={showAddModal} />
    </>
  );
};

export default UserDeliveryComp;
