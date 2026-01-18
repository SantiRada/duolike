# Instrucciones para usar el Script de Procesamiento de Imágenes

## 📋 Requisitos Previos

1. **Python 3.7 o superior** instalado en tu PC
2. La biblioteca **Pillow** (se instala en el paso 3)

## 🚀 Pasos para Ejecutar

### 1. Guardar la imagen del degradado

**IMPORTANTE:** Guarda la imagen del mapa de degradado (la que me pasaste) con este nombre exacto:

```
gradient_map.png
```

**Ubicación:** En la **MISMA CARPETA** donde está el archivo `batch_image_grayscale.py`

### 2. Verificar las rutas

El script está configurado con estas rutas (ya las puse en el código):

- **Origen:** `D:\Games\Hytale My Mods\Tutorials\Assets\Common\BlockTextures`
- **Destino:** `C:\Users\santy\AppData\Roaming\Hytale\UserData\Saves\New Texture Pack\mods\Tenzinn.Black_And_White\Common\BlockTextures`

Si necesitas cambiarlas, edita las líneas 11-12 del archivo `batch_image_grayscale.py`

### 3. Instalar dependencias

Abre una terminal (CMD o PowerShell) en la carpeta del proyecto y ejecuta:

```bash
pip install -r requirements.txt
```

O directamente:

```bash
pip install Pillow
```

### 4. Ejecutar el script

En la misma terminal, ejecuta:

```bash
python batch_image_grayscale.py
```

## 📊 Qué hace el script

1. ✅ Carga el mapa de degradado `gradient_map.png`
2. ✅ Busca todas las imágenes en la carpeta origen (soporta PNG, JPG, BMP, TGA, GIF)
3. ✅ Convierte cada imagen a escala de grises
4. ✅ Aplica el mapa de degradado que proporcionaste
5. ✅ Guarda la imagen en la carpeta destino con el **mismo nombre, formato y tamaño**
6. ✅ Preserva la transparencia (canal alpha) si existe
7. ✅ Muestra el progreso cada 50 imágenes

## ⚠️ Notas Importantes

- El script creará automáticamente la carpeta destino si no existe
- No modifica las imágenes originales
- Mantiene el formato original (PNG sigue siendo PNG, JPG sigue siendo JPG, etc.)
- Conserva el tamaño exacto de cada imagen
- Si una imagen falla, continúa con las demás y muestra un reporte al final

## 🐛 Solución de Problemas

**Error: "No se encuentra el archivo 'gradient_map.png'"**
- Verifica que la imagen del degradado esté en la misma carpeta que el script
- Verifica que se llame exactamente `gradient_map.png`

**Error: "No se encuentra la carpeta origen"**
- Verifica que la ruta en el script coincida con la ubicación real de tus imágenes
- Asegúrate de que la carpeta existe y contiene las imágenes

**Error al instalar Pillow**
- Asegúrate de tener Python instalado: `python --version`
- Prueba con: `python -m pip install --upgrade pip` y luego `pip install Pillow`
