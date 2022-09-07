import * as React from "react";
import Layout from "../../components/Layout/Layout";

import {
  Box,
  Button,
  Paper,
  Grid,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  dashboardSelector,
  getPositions,
  getPets,
} from "../../store/slices/dashboardSlice";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Dashboard() {
  const dispatch = useDispatch();

  const dashboard = useSelector(dashboardSelector);

  React.useEffect(() => {
    try {
      dispatch(getUser());
      dispatch(getPositions());
      dispatch(getPets());
    } catch (error) {
      alert(error);
    }
  }, [dispatch]);

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput
              .split(",")
              .map((value) => value.trim())
              .filter((value) => value !== "")
          }
        />
      </Box>
    );
  }

  const CustomToolbar = ({ setFilterButtonEl }) => (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
  );

  const columnsUsers = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "type",
      headerName: "Type",
      width: 100,
    },
    {
      field: ".",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className="" style={{ cursor: "pointer" }}>
            <DeleteIcon index={params.row.id} />
          </div>
        );
      },
    },
  ];
  const columnsLocations = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "locationName",
      headerName: "Location Name",
      width: 130,
    },
    { field: "locationType", headerName: "Location Type", width: 130 },
    { field: "locationLat", headerName: "Latitude", width: 130 },
    { field: "locationLong", headerName: "Longitude", width: 130 },
    { field: "locationDesc", headerName: "Location Desctiption", width: 200 },
    {
      field: ".",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div className="" style={{ cursor: "pointer" }}>
            <DeleteIcon index={params.row.id} />
          </div>
        );
      },
    },
  ];

  // const columns = [
  //   { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "firstName",
  //     headerName: "First name",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "lastName",
  //     headerName: "Last name",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
  //   {
  //     field: ".",
  //     headerName: "Actions",
  //     sortable: false,
  //     width: 140,
  //     disableClickEventBubbling: true,
  //     renderCell: (params) => {
  //       return (
  //         <div className="" style={{ cursor: "pointer" }}>
  //           <DeleteIcon index={params.row.id} />
  //         </div>
  //       );
  //     },
  //   },
  // ];

  // const rows = [
  //   {
  //     id: 1,
  //     lastName: "Snow",
  //     firstName: "Jon",
  //     age: 35,
  //   },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  //   { id: 10, lastName: "Roxie", firstName: "Dong", age: 65 },
  // ];
  // console.log(dashboard.petsList.length);
  return (
    <Layout>
      <Box className="mb-6">
        <Grid
          container
          spacing={2}
          className=" xl:flex-row lg:flex-row md:flex-row sm:flex-row "
        >
          <Grid item xs={12} md={4} lg={4} xl={4}>
            <Box className="w-3/3 h-52 bg-red-300 shadow-lg shadow-red-500/100 rounded-xl flex flex-col items-center justify-center">
              <Typography className="font-bold text-6xl mb-3">
                {dashboard.userList.length ?? ไม่พบผู้ใช้}
              </Typography>
              <Typography>จำนวนผู้ใช้</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4} xl={4}>
            <Box className="w-3/3 h-52  bg-green-300 shadow-lg shadow-green-500/100 rounded-xl  flex flex-col items-center justify-center">
              <Typography className="font-bold text-6xl mb-3">
                {dashboard.locationList.length ?? ไม่มีสถานที่}
              </Typography>
              <Typography>จำนวนสถานที่</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4} xl={4}>
            <Box className="w-3/3 h-52  bg-blue-300 shadow-lg shadow-blue-500/100 rounded-xl  flex flex-col items-center justify-center">
              <Typography className="font-bold text-6xl mb-3">
                {dashboard.petsList.length ?? ไม่พบโลเคชั่น}
              </Typography>
              <Typography>จำนวนสัตว์เลี้ยง</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="flex xl:flex-row lg:flex-row  md:flex-row sm:flex-col xs:flex-col">
        <Box style={{ height: 600, width: "100%" }}>
          <DataGrid
            components={{ Toolbar: QuickSearchToolbar }}
            rows={dashboard.userList.map((item, index) => ({
              id: index,
              username: item["username"],
              email: item["email"],
              type: item["type"],
            }))}
            // rows={rows}
            columns={columnsUsers}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
        <Box className="mx-3"></Box>
        <Box style={{ height: 600, width: "100%" }}>
          <DataGrid
            components={{ Toolbar: CustomToolbar }}
            rows={dashboard.locationList.map((item, index) => ({
              id: item["locationId"],
              locationName: item["locationName"],
              locationType: item["locationType"],
              locationLat: item["locationLat"],
              locationLong: item["locationLong"],
              locationDesc: item["locationDesc"],
            }))}
            // rows={rows}
            columns={columnsLocations}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Box>
    </Layout>
  );
}
