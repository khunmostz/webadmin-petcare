import * as React from "react";
import Layout from "../../components/Layout/Layout";

import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  dashboardSelector,
  resetName,
} from "../../store/slices/dashboardSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const dash = useSelector(dashboardSelector);

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  return (
    <Layout>
      from admin store
      <Box className="flex xl:flex-row lg:flex-col  md:flex-col sm:flex-col">
        <div style={{ height: 600, width: "100%", margin: "20px" }}>
          <DataGrid
            rows={dash.dashboard ?? []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <div style={{ height: 600, width: "100%", margin: "20px" }}>
          <DataGrid
            rows={[]}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Box>
    </Layout>
  );
}
