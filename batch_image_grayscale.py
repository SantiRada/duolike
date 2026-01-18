#!/usr/bin/env python3
"""
Script para aplicar efecto blanco y negro a imágenes usando un mapa de degradado.
Procesa todas las imágenes de una carpeta y las guarda en otra ubicación.
"""

import os
from PIL import Image
import sys

# Configuración de rutas
ORIGEN = r"D:\Games\Hytale My Mods\Tutorials\Assets\Common\BlockTextures"
DESTINO = r"C:\Users\santy\AppData\Roaming\Hytale\UserData\Saves\New Texture Pack\mods\Tenzinn.Black_And_White\Common\BlockTextures"
GRADIENT_MAP = r"gradient_map.png"  # Debe estar en la misma carpeta que este script

def load_gradient_map(gradient_path):
    """Carga el mapa de degradado y crea una tabla de lookup."""
    try:
        gradient = Image.open(gradient_path).convert('L')
        width = gradient.width

        # Crear tabla de lookup de 256 valores
        lut = []
        for i in range(256):
            # Mapear el valor i (0-255) a una posición en el degradado
            x = int((i / 255.0) * (width - 1))
            lut.append(gradient.getpixel((x, 0)))

        return lut
    except Exception as e:
        print(f"Error al cargar el mapa de degradado: {e}")
        sys.exit(1)

def apply_gradient_map(image, lut):
    """Aplica el mapa de degradado a una imagen."""
    # Convertir a escala de grises
    grayscale = image.convert('L')

    # Aplicar la tabla de lookup
    mapped = grayscale.point(lut)

    # Si la imagen original tenía transparencia, preservarla
    if image.mode in ('RGBA', 'LA') or (image.mode == 'P' and 'transparency' in image.info):
        # Convertir la imagen original a RGBA para obtener el canal alpha
        original_rgba = image.convert('RGBA')
        alpha = original_rgba.split()[3]

        # Convertir el resultado mapeado a RGBA y aplicar el alpha original
        result = mapped.convert('RGBA')
        result.putalpha(alpha)
        return result
    else:
        return mapped

def process_images():
    """Procesa todas las imágenes de la carpeta origen."""
    # Verificar que existe el mapa de degradado
    script_dir = os.path.dirname(os.path.abspath(__file__))
    gradient_path = os.path.join(script_dir, GRADIENT_MAP)

    if not os.path.exists(gradient_path):
        print(f"ERROR: No se encuentra el archivo '{GRADIENT_MAP}'")
        print(f"Por favor, guarda la imagen del degradado como: {gradient_path}")
        sys.exit(1)

    # Cargar el mapa de degradado
    print(f"Cargando mapa de degradado desde: {gradient_path}")
    lut = load_gradient_map(gradient_path)

    # Verificar que existe la carpeta origen
    if not os.path.exists(ORIGEN):
        print(f"ERROR: No se encuentra la carpeta origen: {ORIGEN}")
        sys.exit(1)

    # Crear la carpeta destino si no existe
    os.makedirs(DESTINO, exist_ok=True)

    # Obtener lista de archivos de imagen
    extensiones = ('.png', '.jpg', '.jpeg', '.bmp', '.tga', '.gif')
    imagenes = [f for f in os.listdir(ORIGEN) if f.lower().endswith(extensiones)]

    total = len(imagenes)
    print(f"\nEncontradas {total} imágenes para procesar")
    print(f"Carpeta origen: {ORIGEN}")
    print(f"Carpeta destino: {DESTINO}\n")

    # Procesar cada imagen
    procesadas = 0
    errores = 0

    for i, filename in enumerate(imagenes, 1):
        try:
            # Ruta completa de origen y destino
            ruta_origen = os.path.join(ORIGEN, filename)
            ruta_destino = os.path.join(DESTINO, filename)

            # Abrir imagen
            img = Image.open(ruta_origen)

            # Guardar el formato original
            formato_original = img.format

            # Aplicar el mapa de degradado
            img_procesada = apply_gradient_map(img, lut)

            # Guardar la imagen con el mismo formato y nombre
            img_procesada.save(ruta_destino, format=formato_original)

            procesadas += 1

            # Mostrar progreso cada 50 imágenes
            if i % 50 == 0 or i == total:
                print(f"Progreso: {i}/{total} ({(i/total*100):.1f}%)")

        except Exception as e:
            errores += 1
            print(f"Error procesando '{filename}': {e}")

    # Resumen final
    print(f"\n{'='*50}")
    print(f"Proceso completado:")
    print(f"  ✓ Procesadas correctamente: {procesadas}")
    if errores > 0:
        print(f"  ✗ Errores: {errores}")
    print(f"{'='*50}")

if __name__ == "__main__":
    print("="*50)
    print("  BATCH IMAGE GRAYSCALE PROCESSOR")
    print("="*50)
    process_images()
