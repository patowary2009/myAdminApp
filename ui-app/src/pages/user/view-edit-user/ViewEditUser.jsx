import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {Button} from '@mui/material';

function ViewEditUser() {
  const { id } = useParams();
  const { search } = useLocation();
  console.log("ViewEditUser", search);
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const mode = query.get("mode") || "view";
  const navigate = useNavigate();
  const updateQueryParams = () => {
    query.set("mode", mode === "view" ? "edit" : "view");
    navigate({ search: query.toString() });
  };
  return (
    <div>
      <h2>{mode === "view" ? "View" : "Edit"} User</h2>
      id: {id}

       <Button onClick={() => updateQueryParams()} variant="contained">Update Query Params</Button>
    </div>
  );
}

export default ViewEditUser;