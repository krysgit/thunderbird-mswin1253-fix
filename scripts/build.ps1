$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Manifest = Get-Content (Join-Path $Root "manifest.json") -Raw | ConvertFrom-Json
$Version = $Manifest.version
$OutDir = Join-Path $Root "dist"
$Out = Join-Path $OutDir "mswin1253-greek-fix-v$Version.xpi"
$TempZip = Join-Path $OutDir "mswin1253-greek-fix-v$Version.zip"

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
Remove-Item $Out -Force -ErrorAction SilentlyContinue
Remove-Item $TempZip -Force -ErrorAction SilentlyContinue

$Items = @(
    (Join-Path $Root "manifest.json"),
    (Join-Path $Root "background.js"),
    (Join-Path $Root "messageDisplay")
)

Compress-Archive -Path $Items -DestinationPath $TempZip -CompressionLevel Optimal
Move-Item $TempZip $Out
Write-Host "Built $Out"
