# Create a deployment directory with timestamp
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$deployDir = "deploy_$timestamp"

# Create deployment directory
New-Item -ItemType Directory -Force -Path $deployDir

# Copy production build
Copy-Item -Path dist/* -Destination $deployDir -Recurse -Force

# Copy .htaccess file
Copy-Item -Path .htaccess -Destination $deployDir -Force

# Copy backup.html
Copy-Item -Path backup.html -Destination $deployDir -Force

Write-Host "Deployment files prepared in: $deployDir"
Write-Host "Upload all files from this directory to your Uvitech hosting root directory"
Write-Host "The structure should be:"
Write-Host "- backup.html (upload first)"
Write-Host "- index.html"
Write-Host "- .htaccess"
Write-Host "- assets/ (directory)"
Write-Host "- images/ (directory)"
