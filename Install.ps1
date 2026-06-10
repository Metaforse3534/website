# Orbit AI Windows Installer
# One-liner installation: irm https://start.orbitdev.org/install.ps1 | iex

# Or: (Invoke-WebRequest -Uri "https://start.orbitdev.org/install.ps1" -UseBasicParsing).Content | Invoke-Expression

param(
    [string]$InstallPath = "C:\Program Files\Orbit AI",
    [string]$Version = "latest"
)

# Color output functions
function Write-Status {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "→ $Message" -ForegroundColor Cyan
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

# Check admin rights
function Test-AdminRights {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Get latest release from GitHub
function Get-LatestRelease {
    try {
        Write-Info "Fetching latest Orbit AI release..."
        $releases = @(Invoke-RestMethod -Uri "https://api.github.com/repos/OrbitAI/orbit-ai/releases" -UseBasicParsing)
        
        if ($releases.Count -eq 0) {
            Write-Error-Custom "No releases found"
            return $null
        }
        
        # Get latest non-pre-release
        $latest = $releases | Where-Object { -not $_.prerelease } | Select-Object -First 1
        if (-not $latest) {
            $latest = $releases[0]
        }
        
        return $latest
    }
    catch {
        Write-Error-Custom "Failed to fetch releases: $_"
        return $null
    }
}

# Download installer
function Download-Installer {
    param([object]$Release)
    
    Write-Info "Downloading Orbit AI v$($Release.tag_name)..."
    
    # Look for Windows installer in assets
    $asset = $Release.assets | Where-Object { $_.name -match "Orbit-AI.*\.exe$" } | Select-Object -First 1
    
    if (-not $asset) {
        Write-Error-Custom "No Windows installer found in release"
        return $null
    }
    
    $downloadUrl = $asset.browser_download_url
    $tempFile = "$env:TEMP\Orbit-AI-Installer.exe"
    
    try {
        $ProgressPreference = 'SilentlyContinue'
        Invoke-WebRequest -Uri $downloadUrl -OutFile $tempFile -UseBasicParsing
        $ProgressPreference = 'Continue'
        
        if (Test-Path $tempFile) {
            Write-Status "Downloaded: $($asset.name)"
            return $tempFile
        }
    }
    catch {
        Write-Error-Custom "Download failed: $_"
        return $null
    }
}

# Run installer
function Install-OrbitAI {
    param([string]$InstallerPath)
    
    Write-Info "Installing Orbit AI..."
    
    try {
        # Run NSIS installer with silent mode
        & $InstallerPath /S /D=$InstallPath
        
        # Wait for installer to complete
        Start-Sleep -Seconds 5
        
        if (Test-Path "$InstallPath\Orbit AI.exe") {
            Write-Status "Installation completed successfully!"
            return $true
        }
        else {
            Write-Error-Custom "Installation verification failed"
            return $false
        }
    }
    catch {
        Write-Error-Custom "Installation failed: $_"
        return $false
    }
}

# Create desktop shortcut
function Create-Shortcut {
    Write-Info "Creating desktop shortcut..."
    
    try {
        $desktopPath = [Environment]::GetFolderPath([Environment+SpecialFolder]::Desktop)
        $shortcutPath = "$desktopPath\Orbit AI.lnk"
        $exePath = "$InstallPath\Orbit AI.exe"
        
        if (Test-Path $exePath) {
            $WshShell = New-Object -ComObject WScript.Shell
            $shortcut = $WshShell.CreateShortcut($shortcutPath)
            $shortcut.TargetPath = $exePath
            $shortcut.IconLocation = $exePath
            $shortcut.Description = "Orbit AI Desktop Assistant"
            $shortcut.Save()
            
            Write-Status "Shortcut created on desktop"
        }
    }
    catch {
        Write-Warning-Custom "Failed to create shortcut: $_"
    }
}

# Add to PATH
function Add-ToPATH {
    Write-Info "Adding Orbit AI to PATH..."
    
    try {
        $currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
        
        if ($currentPath -notlike "*$InstallPath*") {
            $newPath = "$currentPath;$InstallPath"
            [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
            Write-Status "Added to PATH"
        }
        else {
            Write-Status "Already in PATH"
        }
    }
    catch {
        Write-Warning-Custom "Failed to add to PATH: $_"
    }
}

# Uninstall option
function Uninstall-OrbitAI {
    param([string]$InstallPath)
    
    Write-Info "Uninstalling Orbit AI..."
    
    # Find uninstaller
    $uninstaller = Get-ChildItem -Path "$InstallPath\.." -Filter "Uninstall Orbit AI.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    
    if ($uninstaller) {
        & $uninstaller.FullName
    }
    else {
        Write-Info "Removing Orbit AI directory..."
        Remove-Item -Path $InstallPath -Recurse -Force -ErrorAction SilentlyContinue
    }
    
    Write-Status "Uninstall completed"
}

# Main installation flow
function Main {
    Clear-Host
    Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║       Orbit AI Windows Installer      ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    
    # Check admin rights
    if (-not (Test-AdminRights)) {
        Write-Warning-Custom "This installer requires administrator rights."
        Write-Info "Relaunching with admin privileges..."
        $arguments = "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -Command `"irm https://start.orbitdev.org/install.ps1 | iex`"' -Verb RunAs"
        Start-Process powershell -ArgumentList $arguments -Verb RunAs
        exit
    }
    
    Write-Status "Running with administrator rights"
    Write-Info "Installation path: $InstallPath"
    Write-Host ""
    
    # Get latest release
    $release = Get-LatestRelease
    if (-not $release) {
        Write-Error-Custom "Failed to get latest release"
        exit 1
    }
    
    Write-Status "Latest version: $($release.tag_name)"
    
    # Download installer
    $installerPath = Download-Installer -Release $release
    if (-not $installerPath) {
        exit 1
    }
    
    # Install
    if (Install-OrbitAI -InstallerPath $installerPath) {
        Create-Shortcut
        Add-ToPATH
        
        # Cleanup
        Remove-Item $installerPath -Force -ErrorAction SilentlyContinue
        
        Write-Host ""
        Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
        Write-Host "║   Orbit AI installed successfully!    ║" -ForegroundColor Green
        Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
        Write-Host ""
        
        Write-Info "Launching Orbit AI..."
        Start-Sleep -Seconds 2
        
        & "$InstallPath\Orbit AI.exe"
    }
    else {
        exit 1
    }
}

# Handle uninstall flag
if ($args -contains "-uninstall") {
    Uninstall-OrbitAI -InstallPath $InstallPath
    exit 0
}

# Run main installation
Main
