import { auth } from "../../firebase";
import AddProducts from "./AddProducts";


function AdminPage() {
    return (
      <div className="main">
        <h1>Admin Page</h1>
        {auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN ? (
          <AddProducts />
        ) : (
          "Sem Acesso"
        )}
      </div>
    );
  }
  
  export default AdminPage;