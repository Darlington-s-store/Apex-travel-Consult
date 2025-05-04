import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  isActive: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

const UserRolesPage: React.FC = () => {
  // Sample users data
  const [users, setUsers] = useState<User[]>([
    { 
      id: '1', 
      name: 'Admin User', 
      email: 'admin@bolteducation.com', 
      role: 'admin', 
      lastLogin: '2023-09-15 14:32:10',
      isActive: true
    },
    { 
      id: '2', 
      name: 'Editor User', 
      email: 'editor@bolteducation.com', 
      role: 'editor', 
      lastLogin: '2023-09-14 09:15:22',
      isActive: true
    },
    { 
      id: '3', 
      name: 'Viewer User', 
      email: 'viewer@bolteducation.com', 
      role: 'viewer', 
      lastLogin: '2023-09-10 16:45:08',
      isActive: true
    },
    { 
      id: '4', 
      name: 'Inactive User', 
      email: 'inactive@bolteducation.com', 
      role: 'editor', 
      lastLogin: '2023-08-25 11:20:45',
      isActive: false
    },
  ]);

  // Sample roles data
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'admin',
      description: 'Full access to all features',
      permissions: [
        { id: '1', name: 'view_dashboard', category: 'Dashboard', description: 'View dashboard' },
        { id: '2', name: 'manage_users', category: 'Users', description: 'Create, edit, and delete users' },
        { id: '3', name: 'manage_roles', category: 'Roles', description: 'Manage roles and permissions' },
        { id: '4', name: 'manage_content', category: 'Content', description: 'Create, edit, and delete content' },
        { id: '5', name: 'view_reports', category: 'Reports', description: 'View reports and analytics' },
        { id: '6', name: 'generate_reports', category: 'Reports', description: 'Generate custom reports' },
        { id: '7', name: 'manage_settings', category: 'Settings', description: 'Modify system settings' },
        { id: '8', name: 'manage_emails', category: 'Emails', description: 'Manage email templates and settings' },
      ]
    },
    {
      id: '2',
      name: 'editor',
      description: 'Can manage content but has limited admin access',
      permissions: [
        { id: '1', name: 'view_dashboard', category: 'Dashboard', description: 'View dashboard' },
        { id: '4', name: 'manage_content', category: 'Content', description: 'Create, edit, and delete content' },
        { id: '5', name: 'view_reports', category: 'Reports', description: 'View reports and analytics' },
      ]
    },
    {
      id: '3',
      name: 'viewer',
      description: 'Read-only access to content and reports',
      permissions: [
        { id: '1', name: 'view_dashboard', category: 'Dashboard', description: 'View dashboard' },
        { id: '9', name: 'view_content', category: 'Content', description: 'View content only' },
        { id: '5', name: 'view_reports', category: 'Reports', description: 'View reports and analytics' },
      ]
    }
  ]);

  // All available permissions
  const allPermissions: Permission[] = [
    { id: '1', name: 'view_dashboard', category: 'Dashboard', description: 'View dashboard' },
    { id: '2', name: 'manage_users', category: 'Users', description: 'Create, edit, and delete users' },
    { id: '3', name: 'manage_roles', category: 'Roles', description: 'Manage roles and permissions' },
    { id: '4', name: 'manage_content', category: 'Content', description: 'Create, edit, and delete content' },
    { id: '5', name: 'view_reports', category: 'Reports', description: 'View reports and analytics' },
    { id: '6', name: 'generate_reports', category: 'Reports', description: 'Generate custom reports' },
    { id: '7', name: 'manage_settings', category: 'Settings', description: 'Modify system settings' },
    { id: '8', name: 'manage_emails', category: 'Emails', description: 'Manage email templates and settings' },
    { id: '9', name: 'view_content', category: 'Content', description: 'View content only' },
    { id: '10', name: 'manage_inquiries', category: 'Inquiries', description: 'Manage user inquiries' },
    { id: '11', name: 'view_inquiries', category: 'Inquiries', description: 'View user inquiries' },
    { id: '12', name: 'manage_countries', category: 'Data', description: 'Manage countries and data' },
  ];

  const [activeTab, setActiveTab] = useState('users');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });
  
  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  // Handle user form changes
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [name]: value
      });
    }
  };

  // Handle user checkbox changes
  const handleUserCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [name]: checked
      });
    }
  };

  // Save user changes
  const saveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id ? editingUser : u
      ));
      setEditingUser(null);
      showNotification('User updated successfully!', 'success');
    }
  };

  // Add new user
  const addNewUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: '',
      email: '',
      role: 'viewer',
      lastLogin: 'Never',
      isActive: true
    };
    setEditingUser(newUser);
  };

  // Delete user
  const deleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      showNotification('User deleted successfully!', 'success');
    }
  };

  // Handle role form changes
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingRole) {
      setEditingRole({
        ...editingRole,
        [name]: value
      });
    }
  };

  // Toggle permission for a role
  const togglePermission = (permission: Permission) => {
    if (!editingRole) return;
    
    const hasPermission = editingRole.permissions.some(p => p.id === permission.id);
    let updatedPermissions;
    
    if (hasPermission) {
      // Remove permission
      updatedPermissions = editingRole.permissions.filter(p => p.id !== permission.id);
    } else {
      // Add permission
      updatedPermissions = [...editingRole.permissions, permission];
    }
    
    setEditingRole({
      ...editingRole,
      permissions: updatedPermissions
    });
  };

  // Save role changes
  const saveRole = () => {
    if (editingRole) {
      if (editingRole.id) {
        // Update existing role
        setRoles(roles.map(r => 
          r.id === editingRole.id ? editingRole : r
        ));
      } else {
        // Add new role
        const newRole = {
          ...editingRole,
          id: Date.now().toString()
        };
        setRoles([...roles, newRole]);
      }
      setEditingRole(null);
      showNotification('Role saved successfully!', 'success');
    }
  };

  // Add new role
  const addNewRole = () => {
    const newRole: Role = {
      id: '',
      name: '',
      description: '',
      permissions: []
    };
    setEditingRole(newRole);
  };

  // Delete role
  const deleteRole = (id: string) => {
    // Check if role is assigned to any users
    const usersWithRole = users.filter(u => u.role === roles.find(r => r.id === id)?.name);
    
    if (usersWithRole.length > 0) {
      showNotification(`Cannot delete role. ${usersWithRole.length} users are assigned this role.`, 'error');
      return;
    }
    
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== id));
      showNotification('Role deleted successfully!', 'success');
    }
  };

  // Get permissions by category
  const getPermissionsByCategory = () => {
    const categories: {[key: string]: Permission[]} = {};
    
    allPermissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    
    return categories;
  };

  // Check if permission is assigned to role
  const hasPermission = (permissionId: string) => {
    return editingRole?.permissions.some(p => p.id === permissionId) || false;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Roles & Permissions</h1>
      
      {notification.show && (
        <div className={`mb-6 p-4 rounded ${notification.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
          {notification.message}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="flex border-b">
          <button 
            className={`py-3 px-6 font-medium ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`py-3 px-6 font-medium ${activeTab === 'roles' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('roles')}
          >
            Roles & Permissions
          </button>
        </div>
        
        <div className="p-6">
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Users</h2>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                  onClick={addNewUser}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add User
                </button>
              </div>
              
              {editingUser ? (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">{editingUser.id ? 'Edit User' : 'Add New User'}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={editingUser.name}
                        onChange={handleUserChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Full Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={editingUser.email}
                        onChange={handleUserChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email Address"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={editingUser.role}
                        onChange={handleUserChange}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <input
                        id="isActive"
                        name="isActive"
                        type="checkbox"
                        checked={editingUser.isActive}
                        onChange={handleUserCheckboxChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-gray-700">
                        Active User
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={() => setEditingUser(null)} 
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={saveUser} 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Save User
                    </button>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.lastLogin}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => setEditingUser(user)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Roles & Permissions</h2>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                  onClick={addNewRole}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Role
                </button>
              </div>
              
              {editingRole ? (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">{editingRole.id ? 'Edit Role' : 'Add New Role'}</h3>
                  
                  <div className="mb-6">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Role Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={editingRole.name}
                        onChange={handleRoleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Role Name"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={editingRole.description}
                        onChange={handleRoleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Role Description"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-700 mb-4">Permissions</h4>
                    
                    {Object.entries(getPermissionsByCategory()).map(([category, permissions]) => (
                      <div key={category} className="mb-6">
                        <h5 className="font-medium text-gray-600 mb-2">{category}</h5>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {permissions.map(permission => (
                              <div key={permission.id} className="flex items-center">
                                <input
                                  id={`permission-${permission.id}`}
                                  type="checkbox"
                                  checked={hasPermission(permission.id)}
                                  onChange={() => togglePermission(permission)}
                                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor={`permission-${permission.id}`} className="ml-2 block text-sm text-gray-700">
                                  {permission.description} <span className="text-xs text-gray-500">({permission.name})</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={() => setEditingRole(null)} 
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={saveRole} 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Save Role
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {roles.map(role => (
                    <div key={role.id} className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{role.name}</h3>
                          <p className="text-gray-600">{role.description}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => setEditingRole(role)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteRole(role.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Permissions ({role.permissions.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map(permission => (
                            <span key={permission.id} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {permission.description}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRolesPage; 