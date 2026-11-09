# Đăng ký bot chạy ngầm mỗi khi đăng nhập Windows.
#   npm run bot:install     (cài và chạy ngay)
#   npm run bot:uninstall   (gỡ)
param([switch]$Uninstall)
$name = "NoiVayMaKhongPhaiVay-Bot"
$vbs = Join-Path $PSScriptRoot "run-hidden.vbs"

if ($Uninstall) {
  Unregister-ScheduledTask -TaskName $name -Confirm:$false -ErrorAction SilentlyContinue
  Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
    Where-Object { $_.CommandLine -like "*tools\bot\bot.mjs*" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
  Get-CimInstance Win32_Process -Filter "Name='cmd.exe'" |
    Where-Object { $_.CommandLine -like "*run-bot.cmd*" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
  Write-Host "Da go task $name va dung bot."
  exit 0
}

$action = New-ScheduledTaskAction -Execute "wscript.exe" -Argument "`"$vbs`""
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
  -ExecutionTimeLimit ([TimeSpan]::Zero) -MultipleInstances IgnoreNew
Register-ScheduledTask -TaskName $name -Action $action -Trigger $trigger -Settings $settings `
  -Description "Bot Telegram duyet kich ban va tao video" -Force | Out-Null
Start-ScheduledTask -TaskName $name
Write-Host "Da cai task $name. Bot dang chay ngam, log: out\bot\bot.log"
