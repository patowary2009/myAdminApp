import { useParams } from "react-router-dom";

function ViewEditUser() {
  const { id, mode } = useParams();
  console.log(process.env.NODE_ENV);
  return (
    <div>
      <h2>{mode === "view" ? "View" : "Edit"} User</h2>
      id: {id}
    </div>
  );
}

export default ViewEditUser;