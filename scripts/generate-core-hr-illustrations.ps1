Add-Type -AssemblyName System.Drawing

$root = Join-Path $PSScriptRoot "..\public\core-hr"
$root = [System.IO.Path]::GetFullPath($root)
New-Item -ItemType Directory -Force -Path $root | Out-Null

function New-RoundRectPath {
  param(
    [int]$X,
    [int]$Y,
    [int]$W,
    [int]$H,
    [int]$R
  )

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $R * 2
  $path.AddArc($X, $Y, $d, $d, 180, 90)
  $path.AddArc($X + $W - $d, $Y, $d, $d, 270, 90)
  $path.AddArc($X + $W - $d, $Y + $H - $d, $d, $d, 0, 90)
  $path.AddArc($X, $Y + $H - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Add-FillRoundRect {
  param(
    $Graphics,
    [System.Drawing.Brush]$Brush,
    [int]$X,
    [int]$Y,
    [int]$W,
    [int]$H,
    [int]$R
  )

  $path = New-RoundRectPath -X $X -Y $Y -W $W -H $H -R $R
  $Graphics.FillPath($Brush, $path)
  $path.Dispose()
}

function Add-StrokeRoundRect {
  param(
    $Graphics,
    [System.Drawing.Pen]$Pen,
    [int]$X,
    [int]$Y,
    [int]$W,
    [int]$H,
    [int]$R
  )

  $path = New-RoundRectPath -X $X -Y $Y -W $W -H $H -R $R
  $Graphics.DrawPath($Pen, $path)
  $path.Dispose()
}

function New-Canvas {
  param(
    [string]$Path,
    [string]$Title,
    [scriptblock]$Draw
  )

  $bmp = New-Object System.Drawing.Bitmap 1200, 840
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(1200, 840)),
    [System.Drawing.Color]::FromArgb(255, 247, 250, 255),
    [System.Drawing.Color]::FromArgb(255, 236, 244, 255)
  )
  $g.FillRectangle($bgBrush, 0, 0, 1200, 840)
  $bgBrush.Dispose()

  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(70, 225, 235, 255))), 96, 82, 170, 170)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(60, 193, 214, 255))), 962, 92, 150, 150)

  $panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
  Add-FillRoundRect $g $panelBrush 140 110 920 610 40
  $panelBrush.Dispose()
  Add-StrokeRoundRect $g (New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 217, 229, 245), 4)) 140 110 920 610 40

  $fontTitle = New-Object System.Drawing.Font('Segoe UI', 28, [System.Drawing.FontStyle]::Bold)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString($Title, $fontTitle, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 78, 216))), (New-Object System.Drawing.RectangleF(0, 24, 1200, 56)), $sf)

  & $Draw $g

  $g.Dispose()
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

function BlueBrush {
  return (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 78, 216)))
}

function PaleBrush {
  return (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 234, 242, 255)))
}

function SoftBrush {
  return (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 251, 255)))
}

function LightStroke {
  return (New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 217, 229, 245), 2))
}

New-Canvas (Join-Path $root 'organization-illustration.png') 'Organization management' {
  param($g)
  Add-FillRoundRect $g (PaleBrush) 320 154 560 550 36
  Add-StrokeRoundRect $g (LightStroke) 320 154 560 550 36
  Add-FillRoundRect $g (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 234, 242, 255))) 382 182 436 72 20
  $g.FillRectangle((BlueBrush), 412, 206, 116, 12)
  $g.FillRectangle((BlueBrush), 570, 206, 130, 12)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 209, 219, 245))), 412, 230, 220, 8)
  $g.FillRectangle((BlueBrush), 450, 292, 150, 110)
  $g.FillRectangle((BlueBrush), 640, 292, 150, 110)
  Add-FillRoundRect $g (SoftBrush) 450 444 340 118 24
  Add-StrokeRoundRect $g (LightStroke) 450 444 340 118 24
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 169, 195, 247))), 500, 490, 150, 10)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 220, 232, 251))), 500, 520, 220, 8)
  for ($i = 0; $i -lt 3; $i++) {
    $cy = 304 + ($i * 144)
    $g.FillEllipse((BlueBrush), 392, $cy, 22, 22)
    $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 169, 195, 247))), 402, $cy + 22, 2, 120)
  }
  $g.FillEllipse((BlueBrush), 480, 316, 42, 42)
  $g.FillEllipse((BlueBrush), 670, 316, 42, 42)
}

New-Canvas (Join-Path $root 'profiles-illustration.png') 'Unified employee profiles' {
  param($g)
  Add-FillRoundRect $g (SoftBrush) 184 144 276 540 28
  Add-StrokeRoundRect $g (LightStroke) 184 144 276 540 28
  $g.FillEllipse((BlueBrush), 252, 216, 140, 140)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)), 300, 238, 44, 44)
  $g.FillRectangle((BlueBrush), 282, 288, 80, 84)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 232, 241, 255))), 234, 368, 176, 14)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 217, 226, 246))), 234, 398, 124, 14)
  Add-FillRoundRect $g (PaleBrush) 234 446 176 84 18
  $g.FillRectangle((BlueBrush), 254, 478, 80, 10)
  $g.FillRectangle((BlueBrush), 254, 500, 110, 10)
  Add-FillRoundRect $g (PaleBrush) 518 168 494 110 26
  $g.FillRectangle((BlueBrush), 548, 200, 184, 18)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 208, 220, 247))), 548, 236, 250, 10)
  Add-FillRoundRect $g (SoftBrush) 518 306 214 178 28
  Add-StrokeRoundRect $g (LightStroke) 518 306 214 178 28
  $g.FillEllipse((BlueBrush), 562, 356, 62, 62)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 216, 228, 250))), 548, 436, 132, 12)
  Add-FillRoundRect $g (SoftBrush) 760 306 252 178 28
  Add-StrokeRoundRect $g (LightStroke) 760 306 252 178 28
  for ($i = 0; $i -lt 3; $i++) {
    $g.FillEllipse((BlueBrush), 800 + ($i * 58), 392, 18, 18)
  }
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 216, 228, 250))), 800, 342, 136, 12)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 233, 239, 251))), 800, 368, 92, 10)
}

New-Canvas (Join-Path $root 'workflow-illustration.png') 'No-code workflow automation' {
  param($g)
  foreach ($x in 184, 396, 608, 820) {
    Add-FillRoundRect $g (SoftBrush) $x 220 154 116 24
    Add-StrokeRoundRect $g (LightStroke) $x 220 154 116 24
  }
  $g.FillRectangle((BlueBrush), 316, 268, 88, 14)
  $g.FillRectangle((BlueBrush), 528, 268, 88, 14)
  $g.FillRectangle((BlueBrush), 740, 268, 88, 14)
  $g.DrawLine((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 175, 197, 244), 6)), 338, 282, 506, 282)
  $g.DrawLine((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 175, 197, 244), 6)), 550, 282, 718, 282)
  $g.DrawLine((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 175, 197, 244), 6)), 762, 282, 930, 282)
  $g.FillEllipse((BlueBrush), 560, 380, 80, 80)
  $g.DrawString('✓', (New-Object System.Drawing.Font('Segoe UI', 20, [System.Drawing.FontStyle]::Bold)), (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)), 585, 402)
  Add-FillRoundRect $g (SoftBrush) 226 460 220 122 24
  Add-FillRoundRect $g (PaleBrush) 486 430 220 182 28
  Add-FillRoundRect $g (SoftBrush) 746 460 220 122 24
  $g.FillRectangle((BlueBrush), 262, 494, 88, 14)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 210, 220, 247))), 262, 524, 124, 10)
  $g.FillRectangle((BlueBrush), 806, 494, 88, 14)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 210, 220, 247))), 806, 524, 124, 10)
}

New-Canvas (Join-Path $root 'compliance-illustration.png') 'Global compliance and security' {
  param($g)
  $shield = New-Object System.Drawing.Drawing2D.GraphicsPath
  $shield.AddBezier(600, 180, 690, 220, 710, 340, 600, 500)
  $shield.AddBezier(600, 500, 490, 340, 510, 220, 600, 180)
  $shield.CloseFigure()
  $g.FillPath((BlueBrush), $shield)
  $shield.Dispose()
  $g.DrawString('✓', (New-Object System.Drawing.Font('Segoe UI', 64, [System.Drawing.FontStyle]::Bold)), (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)), 542, 274)
  Add-FillRoundRect $g (SoftBrush) 260 530 220 110 24
  Add-FillRoundRect $g (SoftBrush) 720 530 220 110 24
  $g.FillRectangle((BlueBrush), 298, 566, 90, 14)
  $g.FillRectangle((BlueBrush), 758, 566, 90, 14)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 209, 219, 245))), 298, 596, 130, 10)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 209, 219, 245))), 758, 596, 130, 10)
}

New-Canvas (Join-Path $root 'extensibility-illustration.png') 'Extensibility ecosystem' {
  param($g)
  Add-FillRoundRect $g (BlueBrush) 510 210 180 180 30
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)), 548, 246, 104, 18)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 220, 230, 251))), 548, 280, 74, 10)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 220, 230, 251))), 548, 304, 126, 10)
  Add-FillRoundRect $g (PaleBrush) 286 256 150 150 28
  Add-FillRoundRect $g (SoftBrush) 764 256 150 150 28
  Add-FillRoundRect $g (SoftBrush) 220 500 210 118 24
  Add-FillRoundRect $g (PaleBrush) 486 476 228 150 28
  Add-FillRoundRect $g (SoftBrush) 772 500 210 118 24
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 175, 197, 244), 6)
  $g.DrawLine($pen, 436, 330, 510, 330)
  $g.DrawLine($pen, 690, 330, 764, 330)
  $g.DrawLine($pen, 600, 390, 600, 476)
  $g.FillEllipse((BlueBrush), 592, 382, 16, 16)
  $g.FillRectangle((BlueBrush), 250, 538, 92, 14)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 209, 219, 245))), 250, 566, 126, 10)
  $g.FillRectangle((BlueBrush), 804, 538, 92, 14)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 209, 219, 245))), 804, 566, 126, 10)
  $pen.Dispose()
}

New-Canvas (Join-Path $root 'analytics-illustration.png') 'Reports and visual analytics' {
  param($g)
  Add-FillRoundRect $g (PaleBrush) 184 172 832 92 24
  $g.FillRectangle((BlueBrush), 222, 202, 178, 18)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 207, 220, 247))), 222, 232, 244, 10)
  Add-FillRoundRect $g (SoftBrush) 186 290 374 392 32
  Add-FillRoundRect $g (SoftBrush) 594 290 362 182 32
  Add-FillRoundRect $g (SoftBrush) 594 498 362 184 32
  $bars = @(236, 308, 380, 452)
  $heights = @(90, 140, 204, 128)
  $fills = @(
    [System.Drawing.Color]::FromArgb(255, 169, 195, 247),
    [System.Drawing.Color]::FromArgb(255, 175, 197, 244),
    [System.Drawing.Color]::FromArgb(255, 30, 78, 216),
    [System.Drawing.Color]::FromArgb(255, 127, 160, 234)
  )
  for ($i = 0; $i -lt 4; $i++) {
    $brush = New-Object System.Drawing.SolidBrush($fills[$i])
    $g.FillRectangle($brush, $bars[$i], 580 - $heights[$i], 48, $heights[$i])
    $brush.Dispose()
  }
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 30, 78, 216), 7)
  $g.DrawLine($pen, 236, 478, 284, 446)
  $g.DrawLine($pen, 284, 446, 356, 470)
  $g.DrawLine($pen, 356, 470, 428, 388)
  $g.DrawLine($pen, 428, 388, 500, 418)
  foreach ($pt in @(@(276,438), @(348,462), @(420,380), @(492,410))) {
    $g.FillEllipse((BlueBrush), $pt[0], $pt[1], 10, 10)
  }
  Add-FillRoundRect $g (PaleBrush) 632 330 108 108 22
  Add-FillRoundRect $g (SoftBrush) 776 330 138 108 22
  $g.FillRectangle((BlueBrush), 660, 398, 44, 8)
  $g.FillRectangle((BlueBrush), 804, 384, 82, 8)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 175, 197, 244))), 804, 408, 58, 8)
  Add-FillRoundRect $g (PaleBrush) 632 526 244 122 24
  $g.FillRectangle((BlueBrush), 664, 560, 88, 14)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 207, 220, 247))), 664, 590, 156, 10)
  $pen.Dispose()
}

Write-Output "generated to $root"
