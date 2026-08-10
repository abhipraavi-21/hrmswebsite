param(
  [Parameter(Mandatory = $true)]
  [string]$Path
)

$zip = [System.IO.Path]::ChangeExtension($Path, ".zip")
Copy-Item $Path $zip -Force

$extract = [System.IO.Path]::Combine([System.IO.Path]::GetDirectoryName($Path), ([System.IO.Path]::GetFileNameWithoutExtension($Path) + "_extracted"))
if (Test-Path $extract) {
  Remove-Item $extract -Recurse -Force
}

Expand-Archive -Path $zip -DestinationPath $extract -Force

[xml]$xml = Get-Content (Join-Path $extract "word/document.xml")
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

$paras = $xml.SelectNodes("//w:p", $ns) | ForEach-Object {
  ($_.SelectNodes(".//w:t", $ns) | ForEach-Object { $_."#text" }) -join ""
}

$paras | Where-Object { $_ -and $_.Trim() -ne "" }
