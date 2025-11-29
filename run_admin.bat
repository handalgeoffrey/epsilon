@echo off
echo ==========================================
echo Setting up Epsilon Admin Panel...
echo ==========================================

set "PATH=%PATH%;C:\Program Files\nodejs"

cd admin-panel
if %errorlevel% neq 0 (
    echo Error: Could not find 'admin-panel' directory.
    pause
    exit /b
)

echo.
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed. Please make sure Node.js is installed.
    pause
    exit /b
)

echo.
echo Starting Admin Panel server...
echo The admin panel will be available at http://localhost:3001
call npm run dev -- -p 3001

pause
