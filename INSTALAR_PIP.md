# Cómo instalar pip en Windows

## Opción 1: Verificar si ya tienes pip (más común)

Abre CMD o PowerShell y ejecuta:

```bash
python -m pip --version
```

Si aparece la versión, ¡ya tienes pip! Salta al paso final.

## Opción 2: Instalar pip manualmente

### Paso 1: Descargar get-pip.py

1. Descarga el archivo desde: https://bootstrap.pypa.io/get-pip.py
2. Guárdalo en una carpeta accesible (por ejemplo, Descargas)

### Paso 2: Instalar pip

Abre CMD o PowerShell en la carpeta donde guardaste `get-pip.py` y ejecuta:

```bash
python get-pip.py
```

## Opción 3: Reinstalar Python con pip incluido

Si las opciones anteriores no funcionan:

1. Ve al Panel de Control → Programas → Desinstalar un programa
2. Busca Python 3.14.2 y haz clic en "Modificar"
3. Selecciona "Modify" → Asegúrate de que esté marcado "pip"
4. Haz clic en "Next" e "Install"

O reinstala Python desde: https://www.python.org/downloads/
- **IMPORTANTE:** Durante la instalación, marca la casilla "Add Python to PATH"
- Y asegúrate de marcar "pip" en las opciones de instalación

## Verificar que pip funciona

Después de cualquiera de las opciones, ejecuta:

```bash
pip --version
```

O:

```bash
python -m pip --version
```

Deberías ver algo como: `pip 24.x from C:\...`

## Actualizar pip (opcional pero recomendado)

```bash
python -m pip install --upgrade pip
```

## ¡Listo para instalar Pillow!

Una vez que pip funcione, ejecuta:

```bash
pip install Pillow
```

O usando el archivo requirements.txt:

```bash
pip install -r requirements.txt
```

## Problemas comunes

### "pip no se reconoce como comando"

Usa en su lugar:
```bash
python -m pip install Pillow
```

### Error de permisos

Ejecuta CMD o PowerShell **como Administrador** (clic derecho → "Ejecutar como administrador")

### Python no está en PATH

Agrega Python al PATH manualmente:
1. Busca donde está instalado Python (normalmente `C:\Users\TuUsuario\AppData\Local\Programs\Python\Python314`)
2. Copia la ruta
3. Panel de Control → Sistema → Configuración avanzada del sistema
4. Variables de entorno → Path → Editar → Nuevo
5. Pega la ruta de Python y también `ruta\Scripts` (donde está pip)
