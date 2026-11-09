@echo off
rem Chạy bot và tự khởi động lại nếu bot dừng. Log ghi vào out\bot\bot.log.
cd /d "%~dp0\..\.."
if not exist out\bot mkdir out\bot
:loop
echo [%date% %time%] Khoi dong bot >> out\bot\bot.log
node tools\bot\bot.mjs >> out\bot\bot.log 2>&1
echo [%date% %time%] Bot dung, khoi dong lai sau 15 giay >> out\bot\bot.log
timeout /t 15 /nobreak > nul
goto loop
