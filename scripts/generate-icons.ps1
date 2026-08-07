# Generates the full favicon / app-icon set from public/images/logo-mark.png
#
# Google's favicon guidance that this satisfies:
#   - The icon must be a square whose side is a multiple of 48px. The previous
#     single app/icon.png was 512x512 — square, but 512 is not a multiple of 48,
#     so it did not meet the stated requirement.
#   - A /favicon.ico at the site root is still the most reliably discovered
#     location; Google falls back to it regardless of <link> tags.
#   - The icon must be visually recognisable at 16px. The source mark carries
#     transparent padding, which shrinks the artwork to near-invisibility at
#     favicon size, so the padding is trimmed to the artwork bounding box first.
#
# Run from the website/ directory:
#   powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1

Add-Type -AssemblyName System.Drawing

$root   = Join-Path $PSScriptRoot '..'
$source = Join-Path $root 'public\images\logo-mark.png'

if (-not (Test-Path $source)) { throw "Source not found: $source" }

$src = [System.Drawing.Bitmap]::FromFile($source)
Write-Host "Source: $($src.Width)x$($src.Height)"

# ── Trim transparent / near-white padding ──
# Sampled every 2px: enough to find the bounding box, ~4x faster than a full
# per-pixel scan through GetPixel.
$minX = $src.Width; $minY = $src.Height; $maxX = 0; $maxY = 0
for ($y = 0; $y -lt $src.Height; $y += 2) {
  for ($x = 0; $x -lt $src.Width; $x += 2) {
    $p = $src.GetPixel($x, $y)
    $isBlank = ($p.A -lt 24) -or ($p.R -gt 244 -and $p.G -gt 244 -and $p.B -gt 244)
    if (-not $isBlank) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

if ($maxX -le $minX -or $maxY -le $minY) {
  # Nothing detected — fall back to the untrimmed image rather than crop to nothing.
  $minX = 0; $minY = 0; $maxX = $src.Width - 1; $maxY = $src.Height - 1
}

# Square the crop around the artwork so nothing is distorted, plus a small
# breathing margin so the mark doesn't touch the icon edge.
$cx = ($minX + $maxX) / 2.0
$cy = ($minY + $maxY) / 2.0
$side = [Math]::Max($maxX - $minX, $maxY - $minY) * 1.10
$cropX = [int][Math]::Max(0, $cx - $side / 2)
$cropY = [int][Math]::Max(0, $cy - $side / 2)
$cropW = [int][Math]::Min($side, $src.Width  - $cropX)
$cropH = [int][Math]::Min($side, $src.Height - $cropY)
$crop  = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
Write-Host "Trimmed to: $cropW x $cropH at ($cropX,$cropY)"

function New-Icon([int]$size) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $dest = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
  $g.DrawImage($src, $dest, $crop, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  return $bmp
}

function Save-Png([System.Drawing.Bitmap]$bmp, [string]$path) {
  $dir = Split-Path $path -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Host "  wrote $path"
}

# ── PNG variants ──
# 48 / 96 / 192 are the multiples of 48 Google asks for. 180 is Apple's
# touch-icon size. 512 backs the web app manifest.
$targets = @(
  @{ size = 192; path = (Join-Path $root 'app\icon.png') },
  @{ size = 180; path = (Join-Path $root 'app\apple-icon.png') },
  @{ size = 512; path = (Join-Path $root 'public\images\icon-512.png') },
  @{ size = 192; path = (Join-Path $root 'public\images\icon-192.png') },
  @{ size =  96; path = (Join-Path $root 'public\images\icon-96.png') }
)
foreach ($t in $targets) {
  $b = New-Icon $t.size
  Save-Png $b $t.path
  $b.Dispose()
}

# ── favicon.ico (PNG-in-ICO, 16 + 32 + 48) ──
# Every browser since IE11 reads PNG-compressed ICO entries, and PNG keeps the
# alpha channel clean at small sizes where a BMP entry would fringe.
$icoSizes = @(16, 32, 48)
$pngBlobs = @()
foreach ($s in $icoSizes) {
  $b  = New-Icon $s
  $ms = New-Object System.IO.MemoryStream
  $b.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
  $pngBlobs += ,$ms.ToArray()
  $ms.Dispose(); $b.Dispose()
}

$icoPath = Join-Path $root 'app\favicon.ico'
$fs = [System.IO.File]::Create($icoPath)
$bw = New-Object System.IO.BinaryWriter($fs)

# ICONDIR: reserved=0, type=1 (icon), image count
$bw.Write([UInt16]0); $bw.Write([UInt16]1); $bw.Write([UInt16]$icoSizes.Count)

# ICONDIRENTRY is 16 bytes; data begins after the 6-byte header + all entries.
$offset = 6 + (16 * $icoSizes.Count)
for ($i = 0; $i -lt $icoSizes.Count; $i++) {
  $s = $icoSizes[$i]
  $bw.Write([Byte]$s)          # width  (0 would mean 256)
  $bw.Write([Byte]$s)          # height
  $bw.Write([Byte]0)           # palette size, 0 = truecolour
  $bw.Write([Byte]0)           # reserved
  $bw.Write([UInt16]1)         # colour planes
  $bw.Write([UInt16]32)        # bits per pixel
  $bw.Write([UInt32]$pngBlobs[$i].Length)
  $bw.Write([UInt32]$offset)
  $offset += $pngBlobs[$i].Length
}
foreach ($blob in $pngBlobs) { $bw.Write($blob) }

$bw.Flush(); $bw.Close(); $fs.Close()
Write-Host "  wrote $icoPath ($((Get-Item $icoPath).Length) bytes, sizes: $($icoSizes -join ', '))"

$src.Dispose()
Write-Host "Done."
