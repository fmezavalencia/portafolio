# SGCD - Sistema de Gestion de Ciudadanos y Delitos

## Descripcion General

SGCD es una aplicacion web disenada para la gestion, registro y analisis de incidentes de seguridad en la region de Chancay/Huaral/Aucallama (Peru). El sistema permite a los operadores reportar incidentes, administrar camaras de vigilancia, registrar ciudadanos y generar reportes estadisticos detallados con exportacion a PDF.

---

## Stack Tecnologico

| Capa | Tecnologia |
|------|------------|
| Backend | Laravel 12.x, PHP 8.2+ |
| Frontend | Vue.js 3.4+, Inertia.js v2 |
| CSS | Tailwind CSS 3.x |
| Build | Vite 6.x |
| Base de datos | MySQL |
| Graficas | Chart.js 4.x + vue-chartjs |
| PDF | DomPDF (barryvdh/laravel-dompdf) |
| Roles/Permisos | Spatie Laravel Permission v6 |
| Autenticacion | Laravel Breeze + Sanctum |
| Rutas en JS | Ziggy v2 |

---

## Arquitectura del Sistema

### Estructura de Modelos y Relaciones

```
CategoriaIncidente
    └── SubcategoriaIncidente
            └── TipoIncidente

Zonas
    └── Ubicacion (localidad)
            ├── Distrito
            ├── Camara
            └── Incidentes
                    ├── Ciudadano (reportante)
                    ├── User (operador)
                    ├── TipoIncidente
                    └── Camara (asociada)
```

### Modelos Principales

| Modelo | Descripcion | Campo Clave |
|--------|-------------|-------------|
| **User** | Usuarios del sistema (operadores, admins, clientes) | name, email, roles |
| **Ciudadano** | Ciudadanos registrados (DNI como PK) | dni, nombre, apellidos |
| **Incidentes** | Registros de incidentes de seguridad | fecha_hora, ubicacion, tipo, estado, imagen |
| **Ubicacion** | Localidades dentro de distritos | localidad, distrito_id, zona_id |
| **Distrito** | Distritos geograficos | nombre (Chancay, Huaral, Aucallama) |
| **Zonas** | Zonas geograficas de agrupacion | nombre |
| **Camara** | Camaras de vigilancia CCTV | nombre, ubicacion_id |
| **TipoIncidente** | Catalogo de tipos de incidente | tipo_incidente, subcategoria_id, codigo |
| **SubcategoriaIncidente** | Subcategorias del catalogo | nombre, categoria_id |
| **CategoriaIncidente** | Categorias del catalogo | nombre |

---

## Modulos Funcionales

### 1. Autenticacion y Gestion de Usuarios

- Inicio de sesion y registro de usuarios
- Recuperacion y restablecimiento de contrasena
- Verificacion de correo electronico
- Sesion almacenada en base de datos

**Rutas de autenticacion:**
- `GET/POST /login` - Inicio de sesion
- `GET/POST /register` - Registro
- `GET/POST /forgot-password` - Solicitud de restablecimiento
- `POST /logout` - Cierre de sesion

### 2. Sistema de Roles y Permisos

El sistema implementa 3 roles con permisos granulares:

| Rol | Descripcion | Permisos |
|-----|-------------|----------|
| **Admin** | Acceso total al sistema | CRUD completo, eliminacion de usuarios, gestion de camaras |
| **Cliente** | Acceso a estadisticas y lectura | Ver incidentes, estadisticas, reportes PDF |
| **Usuario** | Operador de campo | Registrar incidentes desde camaras, ver sus propios registros |

**Permisos implementados (40+):**
- `incidentes.*` (index, create, show, store, edit, update, destroy)
- `ubicaciones.*`, `distritos.*`, `tipos-incidente.*`
- `camaras.*`, `subcategorias-incidente.*`
- `admin.usuarios.*` (solo Admin)
- `profile.*` (solo Admin)

### 3. Gestion de Incidentes

**Funcionalidades principales:**

- **Registro dual de incidentes:**
  - Formulario estandar (manual)
  - Formulario desde camara (con imagen pre-cargada)
- **Campos del incidente:**
  - Fecha y hora del incidente
  - Ubicacion (seleccion del catalogo)
  - Tipo de incidente
  - Descripcion detallada
  - Referencia geografica
  - Estado (pendiente por defecto)
  - Imagen asociada (almacenamiento privado)
  - Camara asociada (opcional)
  - Ciudadano reportante (DNI)
  - Telefono de contacto
- **Edicion y eliminacion** (solo Admin puede eliminar)
- **Busqueda y filtrado** por: reportante, ubicacion, fecha, usuario, tipo, camara
- **Paginacion** de 20 registros por pagina
- **Aislamiento de datos:** Los usuarios normales solo ven sus propios incidentes

**Rutas:**
- `GET /dashboard/listar-incidentes` - Listar incidentes
- `GET /dashboard/registrar-incidentes` - Formulario estandar
- `GET /dashboard/registrar-incidentes-camara` - Formulario desde camara
- `POST /dashboard/registrar-incidentes` - Guardar incidente
- `GET /dashboard/incidentes/{id}/editar` - Editar incidente
- `DELETE /dashboard/incidentes/{id}` - Eliminar (Admin)

### 4. Gestion de Ciudadanos

- Registro de ciudadanos por DNI (validacion de 8 caracteres)
- Actualizacion de datos personales
- Consulta por DNI
- Creacion automatica al reportar incidente con DNI nuevo

**Rutas:**
- `GET /ciudadano/{dni}` - Consultar ciudadano
- `POST /ciudadano/registrar` - Registrar ciudadano
- `PUT /ciudadano/{dni}` - Actualizar ciudadano

### 5. Gestion de Camaras de Vigilancia

- CRUD completo de camaras
- Asociacion con ubicaciones geograficas
- Listado de camaras disponibles
- Vinculacion de camaras con incidentes

**Rutas:**
- `GET /camaras` - Listar camaras
- `POST /camaras` - Crear camara
- `PUT /camaras/{id}` - Actualizar camara
- `DELETE /camaras/{id}` - Eliminar camara

### 6. Catalogos de Clasificacion

#### Categorias de Incidente
- `CategoriaIncidente` -> `SubcategoriaIncidente` -> `TipoIncidente`
- CRUD completo para cada nivel
- Cada tipo de incidente puede tener un codigo unico

#### Tipos de Incidente precargados (19 tipos):
Asalto, Robo, Secuestros, Extorsion, Accidentes viales, Incendios y otros delitos catalogados.

### 7. Gestion Geografica

**Jerarquia geografica:**
- **Zonas** -> Agrupaciones geograficas amplias
- **Distritos** -> Chancay, Huaral, Aucallama
- **Ubicaciones (Localidades)** -> 26 localidades en Chancay (Peralvillo, Buena Vista, Chancayllo, Cerro La Culebra, etc.)

**CRUD completo para:**
- Zonas (`/zonas`)
- Distritos (`/distritos`)
- Ubicaciones (`/ubicaciones`)

### 8. Dashboard y Estadisticas

Panel de analisis estadistico accesible para roles Admin y Cliente.

**Metricas disponibles:**

| Estadistica | Descripcion |
|-------------|-------------|
| **Incidentes por zona** | Cantidad de incidentes agrupados por zona geografica |
| **Tipos mas reportados** | Ranking de tipos de incidente con mas registros |
| **Top 10 lugares** | Lugares con mayor cantidad de incidentes |
| **Total de incidentes** | Conteo global con filtro mensual |
| **Lugares por zona** | Desglose de localidades dentro de una zona |
| **Tipos por ubicacion** | Tipos de incidente mas frecuentes en una localidad |
| **Incidentes por usuario** | Rendimiento por operador |
| **Incidentes por camara** | Incidentes asociados a cada camara |
| **Incidentes por mes** | Analisis temporal con top 10 de localidades |
| **Incidentes por zona y tipo** | Cruce geografico-clasificatorio |

**Filtros disponibles:**
- Por anio y mes
- Por zona geografica
- Por ubicacion/localidad
- Por tipo de incidente

**Drill-down interactivo:**
- Zonas -> Lugares -> Tipos de incidente
- Navegacion jerarquica en las graficas

### 9. Exportacion a PDF

**Dos tipos de reporte PDF:**

1. **Ficha individual de incidente** (`/incidentes/{id}/exportar-pdf`)
   - Datos completos del incidente
   - Correccion automatica de orientacion EXIF en imagenes
   - Formato A4 vertical

2. **Reporte masivo filtrado** (`/estadisticas/reporte-pdf`)
   - Hasta 2000 registros
   - Formato A4 horizontal (landscape)
   - Filtros aplicados previamente en el dashboard

### 10. Gestion de Perfil

- Edicion de nombre y correo electronico
- Cambio de contrasena
- Eliminacion de cuenta (requiere confirmacion)

---

## Acesso por Ruta

| Ruta | Admin | Cliente | Usuario |
|------|:-----:|:-------:|:-------:|
| Dashboard | Incidentes | Incidentes | Formulario Camara |
| Listar incidentes | Total | Total | Solo propios |
| Registrar incidente | Si | Si | Si |
| Editar incidente | Si | Si | Si |
| Eliminar incidente | Si | No | No |
| Estadisticas | Si | Si | No |
| Reportes PDF | Si | Si | No |
| Gestionar usuarios | Si | No | No |
| Gestionar camaras | Si | No | No |
| Gestionar catalogos | Si | Parcial | No |

---

## Caracteristicas Tecnicas Destacadas

- **Almacenamiento privado de imagenes:** Las imagenes de incidentes se guardan en disco local privado y se sirven a traves de un controlador con verificacion de autenticacion
- **Normalizacion de texto:** Las localidades y descripciones se almacenan automaticamente en minusculas
- **Correccion EXIF:** Las imagenes en PDF se orientan automaticamente segun sus metadatos EXIF
- **Sesiones en BD:** Las sesiones se almacenan en base de datos para mayor seguridad
- **Cache de permisos:** Los permisos se cachean por 24 horas con invalidacion automatica
- **Timezone America/Lima:** Todas las fechas se gestionan en zona horaria de Peru
- **Ziggy:** Integracion de rutas Laravel en JavaScript para el frontend Vue.js

---

## Configuracion del Entorno

| Variable | Valor |
|----------|-------|
| APP_NAME | SGCD |
| DB | MySQL (sgcd) |
| SESSION_DRIVER | database |
| CACHE_STORE | database |
| QUEUE_CONNECTION | database |
| FILESYSTEM_DISK | local |

---

## Datos Iniciales (Seeders)

- **Roles:** Admin, Cliente, Usuario
- **Usuario admin:** admin@gmail.com / 2025
- **19 tipos de incidente:** Asalto, Robo, Secuestros, Extorsion, Accidentes viales, Incendios, etc.
- **3 distritos:** Chancay, Huaral, Aucallama
- **26 localidades** en Chancay (Peralvillo, Buena Vista, Chancayllo, Cerro La Culebra, Centro de Chancay, etc.)
