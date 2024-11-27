import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UserManagement = (props) => {
  const { users, setUsers, roles } = props; 

  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [status, setStatus] = useState("Active");
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addUser = () => {
    if (userName && userRole) {
      setUsers([
        ...users,
        { id: Date.now(), name: userName, role: userRole, status },
      ]);
      setUserName("");
      setUserRole("");
      setStatus("Active");
      setShowModal(false);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  const openEditModal = (user) => {
    setUserName(user.name);
    setUserRole(user.role);
    setStatus(user.status);
    setEditingUser(user);
    setShowModal(true);
  };

  const editUser = () => {
    setUsers(
      users.map((user) =>
        user.id === editingUser.id
          ? { ...user, name: userName, role: userRole, status }
          : user
      )
    );
    setShowModal(false);
  };

  return (
    <div className="user-management">
        <h3 className="title">Manage Users</h3>

        <div className="add-user-btn-container">
            <Button variant="primary" onClick={() => setShowModal(true)} className="add-user-btn">
            Add User
            </Button>
        </div>

        <div className="table-container">
            <table className="table table-striped user-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td className="action-buttons">
                    <Button
                        variant="warning"
                        onClick={() => openEditModal(user)}
                        className="mr-2"
                    >
                        Edit
                    </Button>
                    <Button variant="danger" onClick={() => deleteUser(user.id)}>
                        Delete
                    </Button>
                    <Button
                        variant="info"
                        onClick={() => toggleStatus(user.id)}
                        className="ml-2"
                    >
                        Toggle Status
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
            <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter user's name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                </Form.Group>

                <Form.Group controlId="formUserRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                    as="select"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                >
                    <option value="">Select Role</option>
                    {roles.map((role, index) => (
                    <option key={index} value={role.name}>
                        {role.name}
                    </option>
                    ))}
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="formUserStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </Form.Control>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={editingUser ? editUser : addUser}>
                {editingUser ? "Save" : "Add User"}
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
  );
};

export default UserManagement;
