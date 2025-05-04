import React, { useState } from 'react';

// Email template types
interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  isActive: boolean;
}

// Email notification settings
interface NotificationSetting {
  id: string;
  event: string;
  description: string;
  template: string;
  recipients: string[];
  isEnabled: boolean;
}

const EmailNotificationsPage: React.FC = () => {
  // Sample email templates
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to Bolt Education',
      body: `<p>Dear {name},</p>
<p>Welcome to Bolt Education! We're excited to have you join us.</p>
<p>Here are some resources to help you get started:</p>
<ul>
  <li><a href="{dashboard_url}">Your Dashboard</a></li>
  <li><a href="{services_url}">Our Services</a></li>
  <li><a href="{contact_url}">Contact Support</a></li>
</ul>
<p>If you have any questions, please don't hesitate to reach out.</p>
<p>Best regards,<br>The Bolt Education Team</p>`,
      isActive: true
    },
    {
      id: '2',
      name: 'Inquiry Confirmation',
      subject: 'Your Inquiry Has Been Received',
      body: `<p>Dear {name},</p>
<p>Thank you for your inquiry about {service}. We have received your request and will get back to you within 24 hours.</p>
<p>Your inquiry reference number is: <strong>{reference_number}</strong></p>
<p>Best regards,<br>The Bolt Education Team</p>`,
      isActive: true
    },
    {
      id: '3',
      name: 'Password Reset',
      subject: 'Password Reset Request',
      body: `<p>Dear {name},</p>
<p>We received a request to reset your password. Please click the link below to create a new password:</p>
<p><a href="{reset_url}">Reset Your Password</a></p>
<p>If you didn't request a password reset, you can ignore this email.</p>
<p>Best regards,<br>The Bolt Education Team</p>`,
      isActive: true
    }
  ]);

  // Sample notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      event: 'user_registration',
      description: 'When a new user registers',
      template: '1',
      recipients: ['user'],
      isEnabled: true
    },
    {
      id: '2',
      event: 'new_inquiry',
      description: 'When a user submits an inquiry',
      template: '2',
      recipients: ['user', 'admin@bolteducation.com'],
      isEnabled: true
    },
    {
      id: '3',
      event: 'password_reset',
      description: 'When a user requests a password reset',
      template: '3',
      recipients: ['user'],
      isEnabled: true
    },
    {
      id: '4',
      event: 'inquiry_follow_up',
      description: 'Send a follow-up email 3 days after inquiry',
      template: '2',
      recipients: ['user'],
      isEnabled: false
    }
  ]);

  // Email server settings
  const [emailSettings, setEmailSettings] = useState({
    fromEmail: 'notifications@bolteducation.com',
    fromName: 'Bolt Education',
    replyToEmail: 'support@bolteducation.com',
    smtpServer: 'smtp.bolteducation.com',
    smtpPort: '587',
    smtpUsername: 'smtp_user',
    smtpPassword: '********',
    encryption: 'tls'
  });

  const [activeTab, setActiveTab] = useState('templates');
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  // Preview template with sample data
  const getPreviewTemplate = (template: EmailTemplate) => {
    let preview = template.body;
    preview = preview.replace(/{name}/g, 'John Doe');
    preview = preview.replace(/{service}/g, 'Study Abroad Consultation');
    preview = preview.replace(/{reference_number}/g, 'INQ-12345');
    preview = preview.replace(/{dashboard_url}/g, 'https://example.com/dashboard');
    preview = preview.replace(/{services_url}/g, 'https://example.com/services');
    preview = preview.replace(/{contact_url}/g, 'https://example.com/contact');
    preview = preview.replace(/{reset_url}/g, 'https://example.com/reset-password');
    return preview;
  };

  // Handle template form changes
  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        [name]: value
      });
    }
  };

  // Save template changes
  const saveTemplate = () => {
    if (editingTemplate) {
      if (editingTemplate.id) {
        // Update existing template
        setTemplates(templates.map(t => 
          t.id === editingTemplate.id ? editingTemplate : t
        ));
      } else {
        // Add new template
        const newTemplate = {
          ...editingTemplate,
          id: Date.now().toString(),
          isActive: true
        };
        setTemplates([...templates, newTemplate]);
      }
      setEditingTemplate(null);
      showNotification('Template saved successfully!', 'success');
    }
  };

  // Delete template
  const deleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id));
      showNotification('Template deleted successfully!', 'success');
    }
  };

  // Create a new template
  const newTemplate = () => {
    setEditingTemplate({
      id: '',
      name: 'New Template',
      subject: 'Subject Line',
      body: '<p>Enter your email content here.</p>',
      isActive: true
    });
  };

  // Toggle notification setting
  const toggleNotification = (id: string) => {
    setNotificationSettings(notificationSettings.map(n => 
      n.id === id ? { ...n, isEnabled: !n.isEnabled } : n
    ));
  };

  // Save email settings
  const saveEmailSettings = () => {
    // In a real app, you would send these settings to your backend
    showNotification('Email settings saved successfully!', 'success');
  };

  // Send test email
  const sendTestEmail = () => {
    // In a real app, you would call an API to send a test email
    showNotification('Test email sent successfully!', 'success');
  };

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Email Notifications</h1>
      
      {notification.show && (
        <div className={`mb-6 p-4 rounded ${notification.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
          {notification.message}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="flex border-b">
          <button 
            className={`py-3 px-6 font-medium ${activeTab === 'templates' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('templates')}
          >
            Email Templates
          </button>
          <button 
            className={`py-3 px-6 font-medium ${activeTab === 'notifications' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notification Triggers
          </button>
          <button 
            className={`py-3 px-6 font-medium ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('settings')}
          >
            Email Settings
          </button>
        </div>
        
        <div className="p-6">
          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Email Templates</h2>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                  onClick={newTemplate}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  New Template
                </button>
              </div>
              
              {editingTemplate ? (
                <div>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Template Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editingTemplate.name}
                        onChange={handleTemplateChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={editingTemplate.subject}
                        onChange={handleTemplateChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email Body (HTML)
                      </label>
                      <textarea
                        name="body"
                        value={editingTemplate.body}
                        onChange={handleTemplateChange}
                        rows={10}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Available variables: {'{name}'}, {'{service}'}, {'{reference_number}'}, {'{dashboard_url}'}, {'{services_url}'}, {'{contact_url}'}, {'{reset_url}'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold mb-2">Preview</h3>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="font-bold mb-2">{editingTemplate.subject}</h4>
                        <div 
                          dangerouslySetInnerHTML={{ __html: getPreviewTemplate(editingTemplate) }} 
                          className="prose max-w-none"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <button 
                        onClick={() => setEditingTemplate(null)} 
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={saveTemplate} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Save Template
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {templates.map(template => (
                        <tr key={template.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{template.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{template.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${template.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {template.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button 
                              onClick={() => setEditingTemplate(template)} 
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => deleteTemplate(template.id)} 
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
          
          {/* Notification Triggers Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Notification Triggers</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {notificationSettings.map(notification => (
                      <tr key={notification.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{notification.event}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{notification.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {templates.find(t => t.id === notification.template)?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {notification.recipients.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <label className="inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={notification.isEnabled} 
                              onChange={() => toggleNotification(notification.id)}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Email Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Email Server Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Reply-To Email
                  </label>
                  <input
                    type="email"
                    value={emailSettings.replyToEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, replyToEmail: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    SMTP Server
                  </label>
                  <input
                    type="text"
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Encryption
                  </label>
                  <select
                    value={emailSettings.encryption}
                    onChange={(e) => setEmailSettings({...emailSettings, encryption: e.target.value})}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="none">None</option>
                    <option value="ssl">SSL</option>
                    <option value="tls">TLS</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={sendTestEmail} 
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Send Test Email
                </button>
                <button 
                  onClick={saveEmailSettings} 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailNotificationsPage; 