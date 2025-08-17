import './AppHeader.css'
import { useAuth } from "../../auth/AuthContext";
function AppHeader() {
  const { user, logout } = useAuth();
  return (
    <header>
      <div className="product-name-wrapper">
        Admin App
      </div>
      <div className="user-info-wrapper">
        {user ? (
        <>
          <span>Hi {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <span>Hi Guest</span>
      )}
      </div>
    </header>
  );
}
export default AppHeader;