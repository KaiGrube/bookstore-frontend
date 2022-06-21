import {useEffect, useState} from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ItemList({items, isEditable, onChangeItemQuantity, onDeleteItem}) {

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    items.forEach(item => total += item.quantity * item.price);
    setTotalPrice(total);
  }, [items])

  return (
    <Paper
      elevation={1}
      sx={{
        padding: "0rem",
      }}
      >
      {
        items.length > 0 &&
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>ISBN13</TableCell>
              <TableCell>Unit price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Sum Price</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>

          <TableBody>
            { items.map(item =>
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.isbn13}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>
                  {isEditable === true &&
                    <TextField type="number"
                               InputProps={{ inputProps: { min: 1, max: 1000 }}}
                               defaultValue={item.quantity}
                               onChange={e => onChangeItemQuantity(item.id, e.target.value)}
                    />
                  }
                  {isEditable === false &&
                    <div>
                      {item.quantity}
                    </div>
                  }
                </TableCell>

                <TableCell>
                  {(item.quantity * item.price).toFixed(2)}$
                </TableCell>

                {isEditable === true &&
                <TableCell onClick={() => onDeleteItem(item.id)}>
                  <DeleteForeverIcon color="warning"/>
                </TableCell>
                }
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            {/*<TableRow>*/}
            {/*  <TableCell/>*/}
            {/*  <TableCell/>*/}
            {/*  <TableCell/>*/}
            {/*  <TableCell>{items.length.toFixed(0)} (sum)</TableCell>*/}
            {/*  <TableCell>{totalPrice.toFixed(2)}$ (sum)</TableCell>*/}
            {/*  <TableCell/>*/}
            {/*</TableRow>*/}

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={10} // rows
              rowsPerPage={4}
              page={1}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              // onPageChange={handleChangePage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
            />

          </TableFooter>
        </Table>
      }
    </Paper>
  );
}