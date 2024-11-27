import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const RoleManagement = (props) => {
    const allPermissions = ["Read", "Write", "Delete", "Manage Users", "Assign Roles"];
    const defaultRoles = ["guest", "user", "admin", "editor", "superadmin"];
    const { roles, setRoles } = props;

    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // Add a new role
    const addRole = () => {
        if (roleName) {
            setRoles([
                ...roles,
                { id: Date.now(), name: roleName, editable: [...permissions] },
            ]);
            setRoleName("");
            setPermissions([]);
        }
    };

    // Delete a role
    const deleteRole = (id) => {
        const roleToDelete = roles.find((role) => role.id === id);

        if (roleToDelete && defaultRoles.includes(roleToDelete.name)) {
            alert("Cannot delete default roles.");
        } else {
            setRoles(roles.filter((role) => role.id !== id));
        }
    };

    // Toggle permission checkbox
    const handlePermissionChange = (perm) => {
        if (permissions.includes(perm)) {
            setPermissions(permissions.filter((permission) => permission !== perm));
        } else {
            setPermissions([...permissions, perm]);
        }
    };

    const openEditModal = (role) => {
        if (defaultRoles.includes(role.name)) {
            alert("Cannot edit permissions for default roles.");
            return;
        }
        setSelectedRole(role);
        setPermissions(role.editable || []);
        setShowModal(true);
    };

    // Save the edited permissions for the selected role
    const savePermissions = () => {
        const updatedRoles = roles.map((role) =>
            role.id === selectedRole.id ? { ...role, editable: permissions } : role
        );
        setRoles(updatedRoles);
        setShowModal(false);
    };

    return (
        <div className="role-management">
            <h3 className="title">Manage Roles</h3>

            <div className="roles-form">
                <input
                    type="text"
                    className="input-role"
                    placeholder="Enter role name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                />
                <Button variant="primary" onClick={addRole}>
                    Add Role
                </Button>
            </div>

            <div className="permissions">
                <h4>Assign Permissions</h4>
                <div className="checkbox-grid">
                    {allPermissions.map((permission) => (
                        <div key={permission} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={permission}
                                name={permission}
                                value={permission}
                                onChange={() => handlePermissionChange(permission)}
                                checked={permissions.includes(permission)}
                            />
                            <label htmlFor={permission}>{permission}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="roles-list">
                {roles.map((role) => (
                    <div className="role-card" key={role.id}>
                        <h4 className="role-title">{role.name}</h4>
                        <div className="permissions-list">
                            {role.editable.length > 0 ? (
                                <ul>
                                    {role.editable.map((permission) => (
                                        <li key={permission}>{permission}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No permissions assigned</p>
                            )}
                        </div>
                        <div className="btns">
                            <Button
                                className="buttons"
                                variant="warning"
                                onClick={() => openEditModal(role)}>
                                Edit 
                            </Button>
                            <Button
                                className="buttons"
                                variant="danger"
                                onClick={() => deleteRole(role.id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedRole && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Permissions for {selectedRole.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {allPermissions.map((permission) => (
                                <Form.Check
                                    key={permission}
                                    type="checkbox"
                                    label={permission}
                                    value={permission}
                                    checked={permissions.includes(permission)}
                                    onChange={() => handlePermissionChange(permission)}
                                />
                            ))}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={savePermissions}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default RoleManagement;
