import React, { useState, useEffect } from 'react';

interface Country {
  id: string;
  name: string;
  code: string;
  continent: string;
}

const CountriesPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([
    { id: '1', name: 'United States', code: 'US', continent: 'North America' },
    { id: '2', name: 'United Kingdom', code: 'UK', continent: 'Europe' },
    { id: '3', name: 'Canada', code: 'CA', continent: 'North America' },
    { id: '4', name: 'Australia', code: 'AU', continent: 'Oceania' },
    { id: '5', name: 'Germany', code: 'DE', continent: 'Europe' },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    continent: ''
  });

  useEffect(() => {
    // Here you would fetch countries from your API
    // For now we're using the mock data defined above
  }, []);

  const handleOpenModal = (country?: Country) => {
    if (country) {
      setCurrentCountry(country);
      setFormData({
        name: country.name,
        code: country.code,
        continent: country.continent
      });
    } else {
      setCurrentCountry(null);
      setFormData({
        name: '',
        code: '',
        continent: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    if (currentCountry) {
      // Edit existing country
      setCountries(countries.map(c => 
        c.id === currentCountry.id 
          ? { ...c, ...formData } 
          : c
      ));
    } else {
      // Add new country
      const newCountry = {
        id: Date.now().toString(),
        ...formData
      };
      setCountries([...countries, newCountry]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setCountries(countries.filter(country => country.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Countries Management</h1>
        
        <div className="flex justify-end mb-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            onClick={() => handleOpenModal()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Country
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Continent</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {countries.map((country) => (
                <tr key={country.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{country.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{country.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{country.continent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleOpenModal(country)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(country.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Country Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentCountry ? 'Edit Country' : 'Add Country'}
            </h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Country Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                Country Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.code}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="continent">
                Continent
              </label>
              <input
                id="continent"
                name="continent"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.continent}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountriesPage; 