import { FC, useEffect, useState } from 'react';
import storage from '../../../local-storage/storage';
import jwt_decode from 'jwt-decode';
import repository from '../../../repository';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { UserDto } from '../../user/types/user-dto.type';
import { OrderDto } from '../../carts/types/order.dto';
import { colors } from '../../../themes';

const StyledBox = styled(Box)`
  width: 100%;
`;

const StyledTable = styled(Table)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledTableHead = styled(TableHead)`
  background-color: ${colors.lightViolet};
`;

const StyledTableCell = styled(TableCell)`
  text-align: center;
`;

const OrdersHistoryComp: FC = () => {
  // const { t } = useTranslation();
  const [userName, setUserName] = useState<string | null>(null);
  const [history, setHistory] = useState<OrderDto[]>([]);

  const token = storage.get('access-token') as string;
  const payload: { id: string; email: string; roleId: string; permissions: [] } = jwt_decode(token);
  const userId = payload.id;

  useEffect(() => {
    // User Name
    repository
      .get<UserDto>(`/users/${userId}`)
      .then((result) => {
        setUserName(result.data.userName);
      })
      .catch((error) => {
        console.error(error);
      });
    // Order history
    repository
      .get<OrderDto[]>(`/orders/user/${userId}`)
      .then((result) => {
        setHistory(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <StyledBox>
      <Typography variant="h6" gutterBottom>
        Hi, {userName ? `${userName}` : 'friend!'}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Here are your orders:
      </Typography>
      <Paper elevation={3}>
        <StyledTable>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell width={'300px'}>Order ID</StyledTableCell>
              <StyledTableCell width={'100px'}>Status</StyledTableCell>
              <StyledTableCell width={'200px'}>Product Title</StyledTableCell>
              <StyledTableCell width={'250px'}>Product Quantity</StyledTableCell>
              <StyledTableCell width={'200px'}>Product Price</StyledTableCell>
              <StyledTableCell width={'400px'}>Product Amount</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {history.length !== 0 ? (
              history.map((order) => (
                <TableRow key={order.id}>
                  <StyledTableCell>{order.id}</StyledTableCell>
                  <StyledTableCell>In Progress</StyledTableCell>
                  <StyledTableCell colSpan={7}>
                    <Table>
                      <TableBody>
                        {order.orderItems?.map((orderItem) => (
                          <TableRow key={orderItem.id}>
                            <StyledTableCell width={'200px'}>
                              {orderItem.productTitle}
                            </StyledTableCell>
                            <StyledTableCell width={'200px'}>
                              {orderItem.productQuantity}
                            </StyledTableCell>
                            <StyledTableCell width={'300px'}>
                              ${Number(orderItem.productPrice).toFixed(2)}
                            </StyledTableCell>
                            <StyledTableCell width={'330px'}>
                              $
                              {(
                                Number(orderItem.productPrice) * Number(orderItem.productQuantity)
                              ).toFixed(2)}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </StyledTableCell>
                  <StyledTableCell>${order.totalAmount.toFixed(2)}</StyledTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography variant="subtitle1">No orders as of now</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </Paper>
    </StyledBox>
  );
};

export default OrdersHistoryComp;
