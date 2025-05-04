import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

// Sample data for charts
const visitData = [
  { name: 'Jan', visits: 4000, uniqueVisitors: 2400 },
  { name: 'Feb', visits: 3000, uniqueVisitors: 1398 },
  { name: 'Mar', visits: 2000, uniqueVisitors: 9800 },
  { name: 'Apr', visits: 2780, uniqueVisitors: 3908 },
  { name: 'May', visits: 1890, uniqueVisitors: 4800 },
  { name: 'Jun', visits: 2390, uniqueVisitors: 3800 },
  { name: 'Jul', visits: 3490, uniqueVisitors: 4300 },
  { name: 'Aug', visits: 4590, uniqueVisitors: 4800 },
  { name: 'Sep', visits: 5690, uniqueVisitors: 5300 },
  { name: 'Oct', visits: 6790, uniqueVisitors: 5800 },
  { name: 'Nov', visits: 7890, uniqueVisitors: 6300 },
  { name: 'Dec', visits: 8990, uniqueVisitors: 6800 },
];

const countryData = [
  { name: 'USA', value: 400 },
  { name: 'UK', value: 300 },
  { name: 'Canada', value: 300 },
  { name: 'Australia', value: 200 },
  { name: 'Germany', value: 100 },
  { name: 'France', value: 100 },
  { name: 'Italy', value: 100 },
  { name: 'Spain', value: 100 },
  { name: 'Portugal', value: 100 },
  { name: 'Greece', value: 100 },
  { name: 'Turkey', value: 100 },
  { name: 'Sweden', value: 100 },
  { name: 'Norway', value: 100 },
  { name: 'Denmark', value: 100 },
  { name: 'Finland', value: 100 },
  { name: 'Iceland', value: 100 },
  { name: 'Netherlands', value: 100 },
  { name: 'Belgium', value: 100 },
  { name: 'Switzerland', value: 100 },
  { name: 'Austria', value: 100 },
  { name: 'Poland', value: 100 },
  { name: 'Czech Republic', value: 100 },
  { name: 'Hungary', value: 100 },
  { name: 'Romania', value: 100 },
  { name: 'Bulgaria', value: 100 },
  { name: 'Croatia', value: 100 },
  { name: 'Slovakia', value: 100 },
  { name: 'Slovenia', value: 100 },
  { name: 'Lithuania', value: 100 },
  { name: 'Latvia', value: 100 },
  { name: 'Estonia', value: 100 },
  { name: 'Luxembourg', value: 100 },
  { name: 'Cyprus', value: 100 },
  { name: 'Malta', value: 100 },
  { name: 'Albania', value: 100 },
  { name: 'North Macedonia', value: 100 },
  { name: 'Serbia', value: 100 },
  { name: 'Montenegro', value: 100 },
  { name: 'Kosovo', value: 100 },
  { name: 'Moldova', value: 100 },
  { name: 'Belarus', value: 100 },
  { name: 'Macedonia', value: 100 },
  { name: 'Bosnia and Herzegovina', value: 100 },
  { name: 'Azerbaijan', value: 100 },
  { name: 'Georgia', value: 100 },
  { name: 'Armenia', value: 100 },
  { name: 'Azerbaijan', value: 100 },
  { name: 'Georgia', value: 100 },
  { name: 'Armenia', value: 100 },
  { name: 'Azerbaijan', value: 100 },
  { name: 'Georgia', value: 100 },
  { name: 'Armenia', value: 100 },
  { name: 'Azerbaijan', value: 100 },
  { name: 'Georgia', value: 100 },
  { name: 'Armenia', value: 100 },
  { name: 'Azerbaijan', value: 100 },
  { name: 'Georgia', value: 100 },
  { name: 'Armenia', value: 100 },
  { name: 'Azerbaijan', value: 100 },
  { name: 'Georgia', value: 100 },
  { name: 'Armenia', value: 100 },
  { name: 'Azerbaijan', value: 100 },
  { name: 'Georgia', value: 100 },
  { name: 'Armenia', value: 100 },
  { name: 'Azerbaijan', value: 100 },
  { name: 'Georgia', value: 100 },
  { name: 'Armenia', value: 100 },

  
  
  
  
  
];

const conversionData = [
  { name: 'Jan', rate: 0.4 },
  { name: 'Feb', rate: 0.3 },
  { name: 'Mar', rate: 0.5 },
  { name: 'Apr', rate: 0.8 },
  { name: 'May', rate: 0.4 },
  { name: 'Jun', rate: 0.3 },
  { name: 'Jul', rate: 0.6 },
];

const serviceData = [
  { name: 'Study Abroad', inquiries: 240, conversions: 70 },
  { name: 'Visa Services', inquiries: 300, conversions: 90 },
  { name: 'IELTS', inquiries: 200, conversions: 60 },
  { name: 'Recruitment', inquiries: 180, conversions: 40 },
  { name: 'English Prof.', inquiries: 120, conversions: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Card component for key metrics
const MetricCard = ({ title, value, change, isPositive }: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-gray-500 text-sm uppercase font-semibold mb-2">{title}</h3>
      <div className="flex items-end">
        <span className="text-3xl font-bold">{value}</span>
        <span className={`ml-2 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {change}
        </span>
      </div>
    </div>
  );
};

const AnalyticsDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate data loading when date range changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [dateRange]);

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center space-x-4">
          <label htmlFor="date-range" className="text-sm font-medium text-gray-700">
            Date Range
          </label>
          <select
            id="date-range"
            value={dateRange}
            onChange={handleDateRangeChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 3 months</option>
            <option value="year">Last 12 months</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard title="Total Visitors" value="13,549" change="12%" isPositive={true} />
            <MetricCard title="Conversion Rate" value="3.2%" change="0.5%" isPositive={true} />
            <MetricCard title="Avg. Time on Site" value="3m 42s" change="8%" isPositive={false} />
            <MetricCard title="Inquiries" value="1,274" change="15%" isPositive={true} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Visitor Traffic</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="visits" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="uniqueVisitors" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Visitors by Country</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={countryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => {
                        const percent = Number(props.percent);
                        return `${props.name}: ${(percent * 100).toFixed(0)}%`;
                      }}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {countryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Conversion Rate</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value: any) => `${(Number(value) * 100).toFixed(0)}%`} />
                    <Tooltip formatter={(value: any) => [`${(Number(value) * 100).toFixed(1)}%`, 'Conversion Rate']} />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Inquiries by Service</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inquiries" fill="#8884d8" />
                    <Bar dataKey="conversions" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Top Referral Sources</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitors</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Google</td>
                    <td className="px-6 py-4 whitespace-nowrap">4,235</td>
                    <td className="px-6 py-4 whitespace-nowrap">3.8%</td>
                    <td className="px-6 py-4 whitespace-nowrap">2m 45s</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Facebook</td>
                    <td className="px-6 py-4 whitespace-nowrap">1,987</td>
                    <td className="px-6 py-4 whitespace-nowrap">2.6%</td>
                    <td className="px-6 py-4 whitespace-nowrap">1m 30s</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Direct</td>
                    <td className="px-6 py-4 whitespace-nowrap">1,568</td>
                    <td className="px-6 py-4 whitespace-nowrap">4.2%</td>
                    <td className="px-6 py-4 whitespace-nowrap">3m 15s</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Instagram</td>
                    <td className="px-6 py-4 whitespace-nowrap">1,024</td>
                    <td className="px-6 py-4 whitespace-nowrap">2.1%</td>
                    <td className="px-6 py-4 whitespace-nowrap">1m 20s</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Email</td>
                    <td className="px-6 py-4 whitespace-nowrap">892</td>
                    <td className="px-6 py-4 whitespace-nowrap">5.7%</td>
                    <td className="px-6 py-4 whitespace-nowrap">4m 10s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsDashboardPage; 