import React from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div className="main">
      <h1>Admin Page</h1>
      {auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN_UID ? (
        <ul>
          <li >
            <Link to="/addProducts" style={{color:'#f00'}}> Add Products </Link>
          </li>
           <li>
            <Link to="/addImage" style={{color:'#f00'}}> Add Image </Link>
          </li>
        </ul>
      ) : (
        "Sem Acesso"
      )}
    </div>
  );
}

export default AdminPage;
