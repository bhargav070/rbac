import React, { useState } from "react";
import UserManagement from "./Users";
import RoleManagement from "./Roles";

const ROLE_PERMISSIONS = [
  { name: "superadmin",
    editable: ["Read", "Write", "Delete", "Manage Users", "Assign Roles"],
    restricted: [],
  },
  { name: "admin",
    editable: ["Read", "Write", "Delete", "Manage Users"],
    restricted: ["Assign Roles"],
  },
  { name: "editor",
    editable: ["Read", "Write"],
    restricted: ["Delete", "Manage Users", "Assign Roles"],
  },
  { name: "user",
    editable: ["Read"],
    restricted: ["Write", "Delete", "Manage Users", "Assign Roles"],
  },
  { name: "guest",
    editable: ["Read"],
    restricted: ["Write", "Delete", "Manage Users", "Assign Roles"],
  },
];

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(ROLE_PERMISSIONS);

  return (
    <div>
      <h1 className="main-heading">Admin Dashboard</h1>
      <div className="dashboard">
        <UserManagement users={users} setUsers={setUsers} roles={roles} />
        <RoleManagement roles={roles} setRoles={setRoles} />
      </div>
    </div>
  );
};

export default Dashboard;
