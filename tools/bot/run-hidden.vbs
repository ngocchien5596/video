' Chạy run-bot.cmd không hiện cửa sổ (Task Scheduler gọi file này khi đăng nhập).
Set fso = CreateObject("Scripting.FileSystemObject")
dir = fso.GetParentFolderName(WScript.ScriptFullName)
CreateObject("WScript.Shell").Run "cmd /c """ & dir & "\run-bot.cmd""", 0, False
