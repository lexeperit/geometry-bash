# ⚡ Quick Start - Geometry Bash

## 🏃‍♂️ Inicio Rápido (5 minutos)

### Opción 1: Ver localmente (Más Rápido)

1. **Abre el archivo directamente**:
   - Navega a la carpeta del proyecto
   - Haz doble clic en `index.html`
   - ¡Listo! La página se abrirá en tu navegador predeterminado

### Opción 2: Servidor local (Recomendado para desarrollo)

Si tienes **Python** instalado:

```bash
# Python 3
python -m http.server 8000

# O Python 2
python -m SimpleHTTPServer 8000
```

Luego abre: http://localhost:8000

Si tienes **Node.js** instalado:

```bash
# Instalar http-server globalmente (solo una vez)
npm install -g http-server

# Ejecutar servidor
http-server -p 8000
```

Luego abre: http://localhost:8000

Si tienes **VS Code**:
- Instala la extensión "Live Server"
- Haz clic derecho en `index.html`
- Selecciona "Open with Live Server"

---

## 🚀 Desplegar en GitHub Pages

### Método Express (Comandos Rápidos)

```bash
# 1. Inicializar Git (si no lo has hecho)
git init

# 2. Configurar tu información (primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"

# 3. Agregar todos los archivos
git add .

# 4. Crear commit inicial
git commit -m "Initial commit: Geometry Bash interactive app"

# 5. Crear repositorio en GitHub (hazlo en github.com primero)
# Luego conecta el repositorio local:
git remote add origin https://github.com/TU-USUARIO/geometry-bash.git

# 6. Subir código
git branch -M main
git push -u origin main
```

### Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. **Source**: Branch `main`, folder `/ (root)`
4. **Save**
5. ¡Espera 2-3 minutos y visita tu enlace!

Tu sitio estará en: `https://TU-USUARIO.github.io/geometry-bash/`

---

## 🧪 Probar la Aplicación

### Flujo Completo

1. **Scroll o clic en "Aceptar el Reto"**
2. **Paso 1 - Entrenamiento**: Dibuja cuadrado (1→3→9→7)
3. **Paso 2 - Creación**: Crea tu patrón (mínimo 12 dígitos)
4. **Paso 3 - Verificación**: Repite tu patrón de memoria
5. **Conclusión**: ¡Lee los consejos de seguridad!

### Puntos a Verificar

- ✅ Las líneas neón se dibujan al hacer clic
- ✅ El medidor de fortaleza se actualiza en tiempo real
- ✅ Los tiempos de descifrado cambian según la longitud
- ✅ El patrón se oculta en el paso de verificación
- ✅ Animaciones y efectos visuales funcionan
- ✅ Responsive en móvil (usa DevTools F12 → Device Toolbar)

---

## 🔧 Solución Rápida de Problemas

**Las líneas no se dibujan**:
- Verifica que JavaScript esté habilitado
- Abre la consola del navegador (F12) y busca errores

**Los efectos visuales no se ven**:
- Prueba en un navegador moderno (Chrome, Firefox, Edge)
- Actualiza la página (Ctrl+R o Cmd+R)

**El CSS no se carga**:
- Verifica que `styles.css` esté en la misma carpeta que `index.html`
- Limpia la caché del navegador (Ctrl+Shift+R)

**GitHub Pages muestra 404**:
- Confirma que `index.html` está en la raíz del repositorio
- Espera 5-10 minutos después de activar Pages
- Verifica que el repositorio sea público

---

## 📱 Compartir con el Equipo

Una vez desplegado, comparte tu enlace:

```
🎮 Geometry Bash está en vivo!
🔗 https://TU-USUARIO.github.io/geometry-bash/

¡Prueba tu habilidad para crear contraseñas seguras usando geometría!
```

---

## 📚 Documentación Completa

- **README.md**: Info general del proyecto
- **DEPLOYMENT.md**: Guía detallada de despliegue
- **Informacion.md**: Especificaciones técnicas
- **Este archivo**: Inicio rápido

---

## 🆘 ¿Necesitas Ayuda?

- Revisa la [documentación completa](README.md)
- Lee la [guía de despliegue](DEPLOYMENT.md)
- Contacta al equipo: CCM-UNAM / ADRC

---

**¡Buena suerte con tu taller! 🚀**

CCM-UNAM & ADRC © 2025
