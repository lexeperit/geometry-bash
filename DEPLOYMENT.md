# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a desplegar **Geometry Bash** en GitHub Pages para que esté disponible públicamente en internet.

## 📋 Requisitos Previos

- Una cuenta de GitHub
- Git instalado en tu computadora
- Los archivos del proyecto en tu carpeta local

## 🔧 Paso 1: Crear el Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"New"** (Nuevo) o en el ícono **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Configura tu repositorio:
   - **Repository name**: `geometry-bash` (o el nombre que prefieras)
   - **Description**: "Interactive web app to teach password security using geometric patterns"
   - **Visibility**: Selecciona **Public** (público)
   - **NO marques** "Initialize this repository with a README" (ya tenemos uno)
5. Haz clic en **"Create repository"**

## 💻 Paso 2: Subir el Proyecto desde tu Computadora

Abre una terminal o línea de comandos en la carpeta del proyecto y ejecuta:

```bash
# Inicializar el repositorio Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Geometry Bash interactive web app"

# Agregar el repositorio remoto (reemplaza [tu-usuario] con tu nombre de usuario de GitHub)
git remote add origin https://github.com/[tu-usuario]/geometry-bash.git

# Cambiar a la rama main (si es necesario)
git branch -M main

# Subir los archivos a GitHub
git push -u origin main
```

## 🌐 Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **"Settings"** (Configuración)
3. En el menú lateral izquierdo, busca y haz clic en **"Pages"**
4. En la sección **"Source"** (Fuente):
   - Selecciona **"Deploy from a branch"**
   - En **"Branch"**: selecciona **"main"**
   - En la carpeta: selecciona **"/ (root)"**
5. Haz clic en **"Save"** (Guardar)

## ✅ Paso 4: Verificar el Despliegue

GitHub Pages tardará unos minutos en desplegar tu sitio. Verás un mensaje que dice:

> "Your site is ready to be published at `https://[tu-usuario].github.io/geometry-bash/`"

Cuando cambie a:

> "Your site is live at `https://[tu-usuario].github.io/geometry-bash/`"

¡Tu página estará en vivo! 🎉

## 🔗 Paso 5: Compartir tu Enlace

Tu sitio web estará disponible en:

```
https://[tu-usuario].github.io/geometry-bash/
```

Reemplaza `[tu-usuario]` con tu nombre de usuario de GitHub.

## 🛠️ Actualizaciones Futuras

Cada vez que quieras actualizar el sitio:

```bash
# Agregar los cambios
git add .

# Hacer commit con un mensaje descriptivo
git commit -m "Descripción de los cambios"

# Subir a GitHub
git push
```

GitHub Pages actualizará automáticamente tu sitio en unos minutos.

## 🎨 Personalización (Opcional)

### Agregar un Dominio Personalizado

Si tienes un dominio propio:

1. Ve a **Settings → Pages**
2. En **"Custom domain"**, ingresa tu dominio
3. Sigue las instrucciones para configurar los registros DNS

### Habilitar HTTPS

GitHub Pages habilita HTTPS automáticamente. Asegúrate de que la opción **"Enforce HTTPS"** esté marcada en Settings → Pages.

## 📱 Probar en Diferentes Dispositivos

Una vez desplegado, prueba tu sitio en:
- ✅ Computadora de escritorio
- ✅ Tablet
- ✅ Teléfono móvil (Android/iOS)
- ✅ Diferentes navegadores (Chrome, Firefox, Safari, Edge)

## 🐛 Solución de Problemas

### El sitio no se despliega

- Verifica que el repositorio sea público
- Asegúrate de que el archivo `index.html` esté en la raíz del proyecto
- Espera 5-10 minutos después de activar GitHub Pages

### Cambios no se reflejan

- Espera unos minutos (GitHub Pages tiene un pequeño retraso)
- Limpia la caché de tu navegador (Ctrl+Shift+R o Cmd+Shift+R)
- Verifica que los cambios estén en GitHub con `git log`

### Error 404

- Confirma que la rama y carpeta correctas están seleccionadas en Settings → Pages
- Verifica que `index.html` existe en la ubicación correcta

## 📞 Recursos Adicionales

- [Documentación oficial de GitHub Pages](https://docs.github.com/en/pages)
- [Guía de Git](https://git-scm.com/doc)
- [Tutorial de GitHub](https://guides.github.com/activities/hello-world/)

---

## 🎓 Ejemplo Completo de Comandos

```bash
# 1. Navegar a la carpeta del proyecto
cd "c:\Users\maste\OneDrive\Documentos\ADRC\Geometry Bash"

# 2. Inicializar Git
git init

# 3. Configurar tu información (primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"

# 4. Agregar archivos
git add .

# 5. Commit inicial
git commit -m "Initial commit: Geometry Bash - Password security web app"

# 6. Conectar con GitHub (reemplaza [tu-usuario])
git remote add origin https://github.com/[tu-usuario]/geometry-bash.git

# 7. Cambiar a rama main
git branch -M main

# 8. Subir a GitHub
git push -u origin main
```

¡Listo! Tu sitio debería estar en vivo en unos minutos. 🚀

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o contacta al equipo de CCM-UNAM/ADRC.
