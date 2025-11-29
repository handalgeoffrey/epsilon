@echo off
echo ==========================================
echo Setting up Epsilon UI...
echo ==========================================

set "PATH=%PATH%;C:\Program Files\nodejs"

cd ui
if %errorlevel% neq 0 (
    echo Error: Could not find 'ui' directory.
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
echo Starting UI server...
echo The website will be available at http://localhost:3000
call npm run dev

pause
