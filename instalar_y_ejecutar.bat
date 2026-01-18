@echo off
echo ========================================
echo   INSTALADOR Y EJECUTOR DE SCRIPT
echo ========================================
echo.

echo [1/3] Verificando Python...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python no esta instalado o no esta en PATH
    pause
    exit /b 1
)
echo Python OK!
echo.

echo [2/3] Instalando/Verificando pip y Pillow...
python -m pip install --upgrade pip
python -m pip install Pillow
if %errorlevel% neq 0 (
    echo ERROR: No se pudo instalar Pillow
    pause
    exit /b 1
)
echo Pillow instalado correctamente!
echo.

echo [3/3] Verificando que exista gradient_map.png...
if not exist "gradient_map.png" (
    echo.
    echo ========================================
    echo   ATENCION: Falta el archivo gradient_map.png
    echo ========================================
    echo.
    echo Por favor, guarda la imagen del degradado como:
    echo   gradient_map.png
    echo.
    echo En esta misma carpeta: %CD%
    echo.
    pause
    exit /b 1
)
echo gradient_map.png encontrado!
echo.

echo ========================================
echo   TODO LISTO! Ejecutando script...
echo ========================================
echo.

python batch_image_grayscale.py

echo.
echo ========================================
echo   Proceso finalizado
echo ========================================
pause
