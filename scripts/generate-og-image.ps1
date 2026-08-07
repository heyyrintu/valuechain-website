# Generates the Open Graph / Twitter social card at public/images/og-default.png
#
# Why a committed asset instead of Next's app/opengraph-image.jsx file
# convention: that route uses @vercel/og, which calls fileURLToPath() on its own
# bundled WASM asset. When the project sits at a path containing spaces — as it
# does here, under "OneDrive - DRONA LOGITECH PRIVATE LIMITED" — that call
# throws "Invalid URL" and fails the whole static export.
#
# The card changes only when branding changes, so generating it once and
# committing the PNG costs nothing per build and removes the failure mode.
#
# Run from the website/ directory:
#   powershell -ExecutionPolicy Bypass -File scripts/generate-og-image.ps1

Add-Type -AssemblyName System.Drawing

$width  = 1200
$height = 630
$out    = Join-Path $PSScriptRoot '..\public\images\og-default.png'

$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Brand gradient background (deep navy -> brand blue), matching tailwind.config.js
$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$c1   = [System.Drawing.ColorTranslator]::FromHtml('#0f172a')
$c2   = [System.Drawing.ColorTranslator]::FromHtml('#3f6cc4')
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 35.0)
$g.FillRectangle($brush, $rect)

# Soft accent glow, bottom right
$glow = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow.AddEllipse(880, 380, 520, 460)
$glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow)
$glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(70, 251, 191, 36)
$glowBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 251, 191, 36))
$g.FillPath($glowBrush, $glow)

# ── Logo lockup ──
$sun = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#fbbf24'))
$markPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$markPath.AddEllipse(80, 74, 58, 58)
$g.FillPath($sun, $markPath)

$ink = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#0f172a'))
$markFont = New-Object System.Drawing.Font('Segoe UI', 26, [System.Drawing.FontStyle]::Bold)
$g.DrawString('D', $markFont, $ink, 95, 88)

$white     = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$brandFont = New-Object System.Drawing.Font('Segoe UI Semibold', 22)
$g.DrawString('Drona Valuechain', $brandFont, $white, 156, 92)

# ── Headline ──
$h1 = New-Object System.Drawing.Font('Segoe UI', 46, [System.Drawing.FontStyle]::Bold)
$g.DrawString('Integrated Logistics &', $h1, $white, 76, 250)
$g.DrawString('Supply Chain Solutions', $h1, $white, 76, 320)

# ── Sub-line ──
$slate   = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#cbd5e1'))
$subFont = New-Object System.Drawing.Font('Segoe UI', 19)
$g.DrawString('In-plant services  /  Warehousing  /  Inventory  /  Packaging  /  Last-mile delivery', $subFont, $slate, 80, 410)

# ── Footer rule + meta ──
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(46, 255, 255, 255), 1)
$g.DrawLine($pen, 80, 500, 1120, 500)

$muted     = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#94a3b8'))
$smallFont = New-Object System.Drawing.Font('Segoe UI', 17)
$g.DrawString('Empowering People', $smallFont, $muted, 80, 528)

$domain = 'dronavaluechain.com'
$size   = $g.MeasureString($domain, $smallFont)
$g.DrawString($domain, $smallFont, $muted, (1120 - $size.Width), 528)

$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

Write-Host "Wrote $out ($width x $height)"
