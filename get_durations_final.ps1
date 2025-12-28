$shell = New-Object -ComObject Shell.Application

function Get-Duration-Final {
    param($fPath)
    if (-not (Test-Path $fPath)) { return "NOT_FOUND" }
    
    $fName = Split-Path $fPath -Leaf
    $fDir = Split-Path $fPath -Parent
    $folder = $shell.Namespace($fDir)
    $file = $folder.ParseName($fName)
    
    # Try multiple common indices for Duration
    # 27, 43, 166 are common
    $indices = @(27, 43, 166)
    
    # Or search for the one named "Duration"
    $durationIndex = -1
    for ($i = 0; $i -lt 320; $i++) {
        $name = $folder.GetDetailsOf($null, $i)
        if ($name -eq "Duration") {
            $durationIndex = $i
            break
        }
    }
    
    if ($durationIndex -eq -1) { $durationIndex = 27 } # fallback
    
    $dStr = $folder.GetDetailsOf($file, $durationIndex)
    
    # Clean the string from hidden characters (RLM, LRM, etc)
    $cleanDStr = $dStr -replace '[^0-9:]', ''
    
    if ($cleanDStr -match '(\d+):(\d+):(\d+)') {
        $h = [int]$matches[1]
        $m = [int]$matches[2]
        $s = [int]$matches[3]
        return ($h * 3600) + ($m * 60) + $s
    } elseif ($cleanDStr -match '(\d+):(\d+)') {
        $m = [int]$matches[1]
        $s = [int]$matches[2]
        return ($m * 60) + $s
    }
    
    return $cleanDStr
}

$files = @(
    "e:\melody-cards\public\audio\Nididhyasan.mp3",
    "e:\melody-cards\public\audio\Shangar_Arti_with_Nididhyasan.mp3",
    "e:\melody-cards\public\audio\Sandhya_Arti_with_Nididhyasan.mp3",
    "e:\melody-cards\public\audio\MSM_Dhun.mp3",
    "e:\melody-cards\public\audio\PSM_Dhun.mp3",
    "e:\melody-cards\public\audio\Chesta_PSM.mp3",
    "e:\melody-cards\public\audio\instrumental\Instrumental Divinity 2.mp3",
    "e:\melody-cards\public\audio\prabhatiya\Prabhatiya.mp3",
    "e:\melody-cards\public\audio\thal kirtan\Gwal bal lal.mp3",
    "e:\melody-cards\public\audio\thal kirtan\Jamo Jamo re mara thakariya.mp3",
    "e:\melody-cards\public\audio\thal kirtan\Jamo ne jamadu.mp3",
    "e:\melody-cards\public\audio\thal kirtan\Jamo ne thal jivan.mp3",
    "e:\melody-cards\public\audio\thal kirtan\Leta jao re.mp3",
    "e:\melody-cards\public\audio\thal kirtan\Rudi randhi me.mp3",
    "e:\melody-cards\public\audio\thal kirtan\Vasyo chee.mp3"
)

$results = @()
foreach ($f in $files) {
    $sec = Get-Duration-Final $f
    $results += "$f|$sec"
}

$results | Out-File -FilePath "e:\melody-cards\durations_final.txt" -Encoding ascii
