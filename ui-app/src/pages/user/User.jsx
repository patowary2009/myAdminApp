import "./User.css";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack, Paper } from "@mui/material";
import AddUser from "./add-user/AddUser";
import { useNavigate, createSearchParams } from "react-router-dom";
import {API_BASE_URL} from "../../config/api.config";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 200,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 220,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={1} sx={{ paddingTop: "10px" }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => onViewClick(params.row)}
        >
          View
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => onEditClick(params.row)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => console.log("Delete", params.row)}
        >
          Delete
        </Button>
      </Stack>
    ),
  },
];
const paginationModel = { page: 0, pageSize: 5 };

const onViewClick = (row) => {
  navigate({ pathname: `/user/${row.id}`, search: `?${createSearchParams({ mode: "view" })}` });
};

const onEditClick = (row) => {
  navigate({ pathname: `/user/${row.id}`, search: `?${createSearchParams({ mode: "edit" })}` });
};

let navigate = null;

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  navigate = useNavigate();

 

  const openAddUserPopup = () => {
    setIsDialogOpen(true);
  };

  const handleDiaglogClosed = (isSaved) => {
     setIsDialogOpen(false)
     if(isSaved) {
      fetchUsers();
     }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="user-page">
      <div className="title-wrapper">
        <div className="title">
          <h1>User List</h1>
        </div>
        <Button variant="contained" color="primary" onClick={openAddUserPopup}>
          Add User
        </Button>
      </div>
      {loading && <p>Loading users...</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}
      {!loading && users.length > 0 && (
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{ border: 0 }}
          />
        </Paper>
      )}
      {isDialogOpen && <AddUser isDialogOpen={isDialogOpen} handleDiaglogClosed={handleDiaglogClosed} />}
    </div>
  );
}

export default User;
