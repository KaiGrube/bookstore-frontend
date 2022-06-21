import axios from "axios";
import {selectToken} from "../../_store/slice/authSlice.js";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Alert, Box, Button, Fade, Paper, Typography} from "@mui/material";
import ItemList from "../basket/ItemList.jsx";

export default function UserList() {

  const [users, setUsers] = useState(undefined);
  const token = useSelector(selectToken);

  useEffect(() => {
    async function fetchUsers() {
      const config = {
        url: `http://localhost:3001/users`,
        method: 'get',
        headers: { "Authorization": token },
        validateStatus: status => true,
      }
      const response = await axios(config);
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    }
    fetchUsers();
  }, [token])

  const columns = [
    {
      field: 'id',
      headerName: 'id',
      // width: 90
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: false,
    },
    {
      field: 'street',
      headerName: 'Street',
      width: 150,
      editable: false,
    },
    {
      field: 'houseNumber',
      headerName: 'House',
      description: 'This column has a value getter and is not sortable.',
      width: 150,
    },
    {
      field: 'zipCode',
      headerName: 'Zip code',
      width: 150,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
    },
    {
      field: 'eMail',
      headerName: 'E-mail',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
    },
  ];

  return (
    <Fade in transition={300}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>

        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
          height: "100%",
          flexGrow: true,
        }}>

          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              width: "100vw",
              height: "100%",
            }}>

            <Typography variant="h4">
              Users
            </Typography>

            { 1 > 0 &&
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}>

                {users === undefined &&
                  <div>Fetching users</div>
                }

                {users !== undefined &&
                  <DataGrid
                    components={{
                      Toolbar: GridToolbar,
                    }}

                    rows={users.map(user =>  {
                      return {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        street: user.street,
                        houseNumber: user.houseNumber,
                        zipCode: user.zipCode,
                        city: user.city,
                        eMail: user.eMail,
                        role: user.role,
                      }
                    })}
                    columns={columns}
                    autoPageSize
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    autoHeight
                    // isCellEditable
                    // checkboxSelection
                    disableSelectionOnClick
                  />
                }
              </Box>
            }
          </Paper>
        </Box>
      </Box>
    </Fade>
  )
}