import React, { useState } from 'react';
import { 
  PDFDownloadLink, 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet
} from '@react-pdf/renderer';

// Sample data for reports
const reportTypes = [
  { id: 'visitor', name: 'Visitor Analytics Report' },
  { id: 'inquiry', name: 'Inquiry Summary Report' },
  { id: 'conversion', name: 'Conversion Rate Report' },
  { id: 'service', name: 'Service Performance Report' },
  { id: 'country', name: 'Country Distribution Report' },
];

const dateRanges = [
  { id: 'week', name: 'Last 7 days' },
  { id: 'month', name: 'Last 30 days' },
  { id: 'quarter', name: 'Last 3 months' },
  { id: 'year', name: 'Last 12 months' },
  { id: 'custom', name: 'Custom date range' }
];

interface ReportOptions {
  title: string;
  type: string;
  dateRange: string;
  includeCharts: boolean;
  includeRawData: boolean;
  startDate: string;
  endDate: string;
}

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529'
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
    color: '#6c757d'
  },
  section: {
    margin: 10,
    padding: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    borderBottomStyle: 'solid',
    paddingTop: 5,
    paddingBottom: 5
  },
  column: {
    width: '25%'
  },
  tableHeader: {
    backgroundColor: '#F8F9FA',
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#6c757d'
  },
  logo: {
    width: 80,
    height: 40,
    marginBottom: 10
  }
});

// PDF Document Component
const ReportDocument: React.FC<{ options: ReportOptions }> = ({ options }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{options.title}</Text>
        <Text style={styles.subtitle}>
          {`Generated on ${new Date().toLocaleDateString()} - ${
            options.dateRange === 'custom' 
              ? `${options.startDate} to ${options.endDate}` 
              : dateRanges.find(range => range.id === options.dateRange)?.name
          }`}
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.text}>
          This report provides a comprehensive analysis of the selected metrics for the specified time period.
          Key insights and trends are highlighted to help make data-driven decisions.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        
        {options.type === 'visitor' && (
          <>
            <View style={[styles.row, styles.tableHeader]}>
              <Text style={styles.column}>Metric</Text>
              <Text style={styles.column}>Current</Text>
              <Text style={styles.column}>Previous</Text>
              <Text style={styles.column}>Change</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.column}>Total Visitors</Text>
              <Text style={styles.column}>13,549</Text>
              <Text style={styles.column}>12,102</Text>
              <Text style={styles.column}>+12%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.column}>Unique Visitors</Text>
              <Text style={styles.column}>9,283</Text>
              <Text style={styles.column}>8,456</Text>
              <Text style={styles.column}>+9.8%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.column}>Avg. Time on Site</Text>
              <Text style={styles.column}>3m 42s</Text>
              <Text style={styles.column}>4m 02s</Text>
              <Text style={styles.column}>-8%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.column}>Bounce Rate</Text>
              <Text style={styles.column}>42.3%</Text>
              <Text style={styles.column}>46.7%</Text>
              <Text style={styles.column}>-9.4%</Text>
            </View>
          </>
        )}
        
        {options.type === 'conversion' && (
          <>
            <View style={[styles.row, styles.tableHeader]}>
              <Text style={styles.column}>Metric</Text>
              <Text style={styles.column}>Current</Text>
              <Text style={styles.column}>Previous</Text>
              <Text style={styles.column}>Change</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.column}>Conversion Rate</Text>
              <Text style={styles.column}>3.2%</Text>
              <Text style={styles.column}>2.7%</Text>
              <Text style={styles.column}>+18.5%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.column}>Total Conversions</Text>
              <Text style={styles.column}>433</Text>
              <Text style={styles.column}>327</Text>
              <Text style={styles.column}>+32.4%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.column}>Cost per Conversion</Text>
              <Text style={styles.column}>$42.18</Text>
              <Text style={styles.column}>$51.35</Text>
              <Text style={styles.column}>-17.9%</Text>
            </View>
          </>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <Text style={styles.text}>
          Based on the data analysis, we recommend focusing on the following areas:
        </Text>
        <Text style={styles.text}>
          • Optimize the website for better mobile user experience
        </Text>
        <Text style={styles.text}>
          • Increase marketing efforts for high-converting services
        </Text>
        <Text style={styles.text}>
          • Target underperforming regions with specialized campaigns
        </Text>
      </View>
      
      <Text style={styles.footer}>
        © {new Date().getFullYear()} Bolt Education. All rights reserved.
        This report is confidential and intended for internal use only.
      </Text>
    </Page>
  </Document>
);

const ReportGeneratorPage: React.FC = () => {
  const [options, setOptions] = useState<ReportOptions>({
    title: 'Analytics Report',
    type: 'visitor',
    dateRange: 'month',
    includeCharts: true,
    includeRawData: false,
    startDate: '',
    endDate: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOptions({
      ...options,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setOptions({
      ...options,
      [name]: checked
    });
  };
  
  const handleReportTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setOptions({
      ...options,
      type,
      title: `${reportTypes.find(rt => rt.id === type)?.name || 'Analytics'} Report`
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Report Generator</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Report Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Report Type
            </label>
            <select
              id="type"
              name="type"
              value={options.type}
              onChange={handleReportTypeChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateRange">
              Date Range
            </label>
            <select
              id="dateRange"
              name="dateRange"
              value={options.dateRange}
              onChange={handleInputChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {dateRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {options.dateRange === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={options.startDate}
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={options.endDate}
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Report Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={options.title}
            onChange={handleInputChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex items-center">
            <input
              id="includeCharts"
              name="includeCharts"
              type="checkbox"
              checked={options.includeCharts}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="includeCharts" className="ml-2 block text-gray-700">
              Include Charts
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="includeRawData"
              name="includeRawData"
              type="checkbox"
              checked={options.includeRawData}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="includeRawData" className="ml-2 block text-gray-700">
              Include Raw Data
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Preview & Download</h2>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="font-bold text-lg">{options.title}</h3>
          <p className="text-gray-600 mb-2">
            Type: {reportTypes.find(type => type.id === options.type)?.name}
          </p>
          <p className="text-gray-600 mb-2">
            Date Range: {
              options.dateRange === 'custom' 
                ? `${options.startDate || 'Not set'} to ${options.endDate || 'Not set'}` 
                : dateRanges.find(range => range.id === options.dateRange)?.name
            }
          </p>
          <p className="text-gray-600 mb-2">
            Includes: {[
              options.includeCharts ? 'Charts' : null,
              options.includeRawData ? 'Raw Data' : null
            ].filter(Boolean).join(', ')}
          </p>
        </div>
        
        <div className="flex justify-end">
          <PDFDownloadLink
            document={<ReportDocument options={options} />}
            fileName={`${options.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded flex items-center"
          >
            Download PDF
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default ReportGeneratorPage; 