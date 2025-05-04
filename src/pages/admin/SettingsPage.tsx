import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'Bolt Education',
    contactEmail: 'admin@bolteducation.com',
    enableBlog: true,
    enableComments: true,
    maintenanceMode: false,
    analyticsId: 'UA-123456789-1',
    maxUploadSize: '10'
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked
    });
  };

  const handleSave = () => {
    // Here you would save settings to your backend
    console.log('Saving settings:', settings);
    
    // Show success message
    setNotification({
      show: true,
      message: 'Settings saved successfully!',
      type: 'success'
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({
        ...notification,
        show: false
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Site Settings</h1>
        
        {notification.show && (
          <div className={`mb-4 p-4 rounded ${notification.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
            {notification.message}
          </div>
        )}
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">General Settings</h2>
          <div className="border-b border-gray-200 mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="siteName">
                Site Name
              </label>
              <input
                id="siteName"
                name="siteName"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={settings.siteName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactEmail">
                Contact Email
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={settings.contactEmail}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="analyticsId">
                Google Analytics ID
              </label>
              <input
                id="analyticsId"
                name="analyticsId"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={settings.analyticsId}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxUploadSize">
                Max Upload Size (MB)
              </label>
              <input
                id="maxUploadSize"
                name="maxUploadSize"
                type="number"
                min="1"
                max="100"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={settings.maxUploadSize}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Feature Settings</h2>
          <div className="border-b border-gray-200 mb-6"></div>
          
          <div className="ml-4 space-y-3">
            <div className="flex items-center">
              <input
                id="enableBlog"
                name="enableBlog"
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                checked={settings.enableBlog}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="enableBlog" className="ml-2 block text-gray-700">
                Enable Blog
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="enableComments"
                name="enableComments"
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                checked={settings.enableComments}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="enableComments" className="ml-2 block text-gray-700">
                Enable Comments
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="maintenanceMode"
                name="maintenanceMode"
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                checked={settings.maintenanceMode}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="maintenanceMode" className="ml-2 block text-gray-700">
                Maintenance Mode
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            onClick={handleSave}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 