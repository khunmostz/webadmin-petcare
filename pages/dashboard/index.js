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

import app from "../../utils/firebaseConfig";
import { getAuth } from "firebase/auth";
import Router from "next/router";
import withAuth from "../../components/withAuth";

const Dashboard = () => {
  const dispatch = useDispatch();

  const auth = getAuth(app);

  const dashboard = useSelector(dashboardSelector);

  // const withAuth = async () => {
  //   if (!auth.currentUser) {
  //     return Router.replace("/");
  //   } else {
  //     dispatch(getUser());
  //     dispatch(getPositions());
  //     dispatch(getPets());
  //   }
  // };

  React.useEffect(() => {
    dispatch(getUser());
    dispatch(getPositions());
    dispatch(getPets());
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
  ];

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
};
export default Dashboard;
