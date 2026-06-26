# Orbit AI Windows Installer
# One-liner: irm https://orbitdev.org/install.ps1 | iex

param(
    [string]$InstallPath = "$env:LOCALAPPDATA\Programs\Orbit AI",
    [string]$Version = "latest",
    [switch]$Uninstall
)

$ErrorActionPreference = "Stop"
$RepoOwner = "Metaforse3534"
$RepoName = "OrbitAI"
$InstallerAssetPattern = "^Orbit-ai-Setup-.*\.exe$"

function Write-Status {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "[..] $Message" -ForegroundColor Cyan
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[!!] $Message" -ForegroundColor Yellow
}

function Write-Fail {
    param([string]$Message)
    Write-Host "[XX] $Message" -ForegroundColor Red
}

function Get-OrbitRelease {
    $headers = @{ "User-Agent" = "Orbit-AI-Installer" }

    if ($Version -eq "latest") {
        $url = "https://api.github.com/repos/$RepoOwner/$RepoName/releases/latest"
    }
    else {
        $tag = $Version
        if ($tag -notmatch "^v") {
            $tag = "v$tag"
        }
        $url = "https://api.github.com/repos/$RepoOwner/$RepoName/releases/tags/$tag"
    }

    Write-Info "Fetching Orbit AI release metadata..."
    return Invoke-RestMethod -Uri $url -Headers $headers -UseBasicParsing
}

function Get-InstallerAsset {
    param([object]$Release)

    $asset = $Release.assets |
        Where-Object { $_.name -match $InstallerAssetPattern } |
        Sort-Object name -Descending |
        Select-Object -First 1

    if (-not $asset) {
        throw "No Orbit AI setup executable was found on release '$($Release.tag_name)'. Expected an asset like Orbit-ai-Setup-0.0.19.exe."
    }

    return $asset
}

function Download-Installer {
    param([object]$Asset)

    $safeName = $Asset.name -replace "[^A-Za-z0-9._-]", "_"
    $target = Join-Path $env:TEMP $safeName

    Write-Info "Downloading $($Asset.name)..."
    $ProgressPreference = "SilentlyContinue"
    Invoke-WebRequest -Uri $Asset.browser_download_url -OutFile $target -UseBasicParsing
    $ProgressPreference = "Continue"

    if (-not (Test-Path $target)) {
        throw "Download failed: $target was not created."
    }

    Write-Status "Downloaded installer to $target"
    return $target
}

function Install-OrbitAI {
    param([string]$InstallerPath)

    Write-Info "Installing Orbit AI to $InstallPath..."

    $arguments = @("/S", "/D=$InstallPath")
    $process = Start-Process -FilePath $InstallerPath -ArgumentList $arguments -Wait -PassThru

    if ($process.ExitCode -ne 0) {
        throw "Installer exited with code $($process.ExitCode)."
    }

    $exePath = Join-Path $InstallPath "Orbit AI.exe"
    if (-not (Test-Path $exePath)) {
        throw "Installation verification failed: $exePath was not found."
    }

    Write-Status "Orbit AI installed successfully."
    return $exePath
}

function Uninstall-OrbitAI {
    $uninstaller = Join-Path $InstallPath "Uninstall Orbit AI.exe"

    if (Test-Path $uninstaller) {
        Write-Info "Running Orbit AI uninstaller..."
        $process = Start-Process -FilePath $uninstaller -ArgumentList "/S" -Wait -PassThru
        if ($process.ExitCode -ne 0) {
            throw "Uninstaller exited with code $($process.ExitCode)."
        }
    }
    elseif (Test-Path $InstallPath) {
        Write-Warn "Uninstaller not found; removing install directory directly."
        Remove-Item -LiteralPath $InstallPath -Recurse -Force
    }
    else {
        Write-Warn "Orbit AI is not installed at $InstallPath."
    }

    Write-Status "Uninstall completed."
}

function Main {
    Write-Host ""
    Write-Host "Orbit AI Windows Installer" -ForegroundColor Cyan
    Write-Host "==========================" -ForegroundColor Cyan

    if ($Uninstall) {
        Uninstall-OrbitAI
        return
    }

    $release = Get-OrbitRelease
    Write-Status "Selected release $($release.tag_name)"

    $asset = Get-InstallerAsset -Release $release
    $installerPath = Download-Installer -Asset $asset

    try {
        $exePath = Install-OrbitAI -InstallerPath $installerPath
    }
    finally {
        Remove-Item -LiteralPath $installerPath -Force -ErrorAction SilentlyContinue
    }

    Write-Info "Launching Orbit AI..."
    Start-Process -FilePath $exePath
}

try {
    Main
}
catch {
    Write-Fail $_.Exception.Message
    exit 1
}
