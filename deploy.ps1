$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$deployDir = "deploy_$timestamp"

# Create deployment directory
New-Item -ItemType Directory -Force -Path $deployDir

# Copy production build
Copy-Item -Path dist/* -Destination $deployDir -Recurse -Force

# Create .htaccess file
$htaccessContent = "RewriteEngine On`nRewriteBase /`nRewriteRule ^index.html$ - [L]`nRewriteCond %{REQUEST_FILENAME} !-f`nRewriteCond %{REQUEST_FILENAME} !-d`nRewriteCond %{REQUEST_FILENAME} !-l`nRewriteRule . /index.html [L]"
$htaccessContent | Out-File -FilePath "$deployDir\.htaccess" -Encoding UTF8

# Create zip file
Compress-Archive -Path $deployDir/* -DestinationPath "apextravelconsult_deploy_$timestamp.zip" -Force

# Clean up
Remove-Item -Path $deployDir -Recurse -Force

Write-Host "Deployment package created: apextravelconsult_deploy_$timestamp.zip"
Write-Host "Upload this file to your Uvitech hosting root directory and extract it."
