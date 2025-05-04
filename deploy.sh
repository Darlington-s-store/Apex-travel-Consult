#!/bin/bash

# Create backup directory
mkdir -p backup

# Copy current website to backup
rsync -av --exclude='node_modules' --exclude='.git' * backup/

# Create backup timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create zip archive of backup
zip -r "backup_${TIMESTAMP}.zip" backup/

# Remove backup directory after zipping
echo "Backup created successfully at backup_${TIMESTAMP}.zip"

# Prepare deployment files
mkdir -p deploy

# Copy production build to deploy folder
cp -r dist/* deploy/

# Add a .htaccess file for proper routing
echo "RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]" > deploy/.htaccess

# Create zip file for deployment
zip -r "apextravelconsult_deploy_${TIMESTAMP}.zip" deploy/

# Clean up temporary directories
rm -rf deploy backup

echo "Deployment package created: apextravelconsult_deploy_${TIMESTAMP}.zip"
echo "Upload this file to your Uvitech hosting root directory and extract it."

echo "IMPORTANT:"
echo "1. Upload the deployment package to your hosting root directory"
echo "2. Extract the contents in your root directory"
echo "3. Ensure your domain is properly configured in Uvitech control panel"
