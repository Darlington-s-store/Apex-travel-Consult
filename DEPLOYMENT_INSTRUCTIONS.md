# Apex Travel Consult Deployment Instructions

## Prerequisites
- Access to Uvitech hosting control panel
- SSH access or FTP credentials
- Domain: apextravelconsult.com

## Deployment Steps

1. **Backup Current Website**
   - Download `backup.html` to your local machine
   - Upload `backup.html` to your root directory on Uvitech hosting
   - This will serve as a temporary backup page during deployment

2. **Prepare Deployment Package**
   - Run the build command: `npm run build`
   - Run the deployment script: `./deploy.sh`
   - This will create a deployment package named `apextravelconsult_deploy_YYYYMMDD_HHMMSS.zip`

3. **Upload to Uvitech Hosting**
   - Upload the deployment package to your root directory
   - Extract the contents in your root directory
   - The package includes:
     - All compiled React files
     - .htaccess file for proper routing
     - All necessary assets

4. **Verify Deployment**
   - Visit apextravelconsult.com
   - Ensure all pages load correctly
   - Test all navigation and functionality
   - Verify that the admin panel works properly

## Troubleshooting

If you encounter any issues:
1. Check the browser console for errors
2. Verify that all files were uploaded correctly
3. Ensure the .htaccess file is in place
4. If needed, restore from the backup by:
   - Removing the new files
   - Restoring the backup files
   - Deleting the backup.html

## Important Notes
- Make sure to back up your database if you have one
- Test the website thoroughly after deployment
- Keep the backup files for at least 24 hours
- Monitor the website for any issues after deployment
