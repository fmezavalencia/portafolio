# API - Gestor Web

Sistema de gestión integral desarrollado con **Laravel 12** + **Vue.js 3** + **Inertia.js**, orientado al registro y administración de personas, ciudades, localidades, oficinas e integraciones con aplicaciones externas. Diseñado para un contexto venezolano.

---

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | PHP (Laravel) | 8.2+ / 12.x |
| Frontend | Vue.js + Inertia.js | 3.x / 2.x |
| CSS | Tailwind CSS | 3.x |
| Build | Vite | 6.x |
| Base de datos | MySQL | 8.x |
| Autenticación | Laravel Sanctum | 4.x |
| Roles y permisos | Spatie Permission | 6.x |
| Exportación | Maatwebsite Excel | 3.x |

---

## Funcionalidades Principales

### 1. Gestión de Personas
- CRUD completo (Crear, Leer, Actualizar, Eliminar).
- Operaciones basadas en **DNI** en lugar de ID numérico.
- Búsqueda avanzada por múltiples campos: nombre, apellidos, DNI, teléfono, sexo, fecha de nacimiento, ciudad y localidad.
- Búsqueda específica por número de teléfono.
- Validación de formularios con expresiones regulares.
- Paginación (20 registros por página).

### 2. Gestión de Ciudades y Localidades
- CRUD de ciudades con relación uno-a-muchos con localidades.
- CRUD de localidades asociadas a una ciudad.
- Eliminación en cascada: al eliminar una ciudad se eliminan sus localidades y personas asociadas.
- Datos sembrados: 15 ciudades venezolanas y ~65 localidades/barrios.

### 3. Gestión de Oficinas
- CRUD independiente de oficinas.
- 10 oficinas corporativas pre-cargadas.

### 4. Gestión de Usuarios y Roles
- Administración de usuarios con paginación.
- Asignación de roles: **Admin** y **Usuario**.
- Cambio de contraseña y eliminación de usuarios.
- 10 permisos granulares distribuidos entre los roles.

| Rol | Permisos |
|-----|----------|
| Admin | CRUD completo de personas, gestión de usuarios, roles y API |
| Usuario | Lectura, creación, visualización y actualización (sin eliminación) |

### 5. Autenticación Dual

**Sesión (SPA Web):**
- Login con throttling (10 intentos/minuto).
- Solo usuarios con rol Admin pueden acceder al panel web.
- Sesiones almacenadas en base de datos.
- Duración de sesión: 120 minutos.

**Token (API Externa):**
- Autenticación Bearer token para integraciones server-to-server.
- Tokens hasheados con SHA-256 (nunca se almacena el token en texto plano).
- Tokens mostrados solo una vez al generarlos.
- Expiración de tokens: 24 horas.

### 6. Integración con Aplicaciones Externas
- Gestión de aplicaciones registradas con tokens de acceso.
- Niveles de permiso por aplicación:
  - **total**: Acceso completo (lectura, escritura, eliminación).
  - **escritura**: Lectura y escritura (sin eliminación).
  - **lectura**: Solo lectura (GET/HEAD/OPTIONS).
  - **solo_usuario**: Sin acceso API.
- Endpoints versionados (`/api/v1/`) para integraciones externas.

### 7. Exportación a Excel
- Exportación de personas con filtros avanzados.
- Conteo de registros filtrados en tiempo real.
- Sugerencias de autocompletado para nombre, apellidos y localidad.
- Formato profesional con anchos de columna personalizados y estilos.

### 8. Auditoría y Seguridad
- **Registro de auditoría** en canal dedicado con retención de 90 días.
- Captura de: usuario, acción, modelo, datos, estado, IP, user agent y timestamp ISO 8601.
- **Sanitización de entrada**: eliminación de caracteres NULL, codificación HTML, trim.
- **Headers de seguridad**: X-Content-Type-Options, X-XSS-Protection, X-Frame-Options, CSP, HSTS, Referrer-Policy, Permissions-Policy.
- **Rate limiting**: 30 requests por minuto por IP en endpoints sensibles.

---

## Base de Datos

### Diagrama de Relaciones

```
ciudades (1) ──── (*) localidad (1) ──── (*) personas
                          │
oficinas (independiente)
users (muchos a muchos vía roles/permisos)
aplicaciones (independiente — tokens externos)
```

### Tablas Principales

| Tabla | Campos Clave | Descripción |
|-------|-------------|-------------|
| `ciudades` | id, nombre | Ciudades venezolanas |
| `localidad` | id, nombre, ciudad_id (FK) | Localidades/barrios por ciudad |
| `personas` | id, nombre, apellidos, dni (único), telefono, sexo (M/F), direccion, fecha_nacimiento, id_localidad (FK) | Registro de personas |
| `oficinas` | id, nombre (único) | Oficinas corporativas |
| `users` | id, name, email (único), password | Usuarios del sistema |
| `aplicaciones` | id, nombre, permiso, token (SHA-256), estado | Aplicaciones externas |

---

## API Endpoints

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/logout` | Cerrar sesión |
| GET | `/api/auth/user` | Usuario autenticado |

### Recursos (con autenticación de sesión)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET/POST/PUT/DELETE | `/api/ciudades` | CRUD Ciudades |
| GET/POST/PUT/DELETE | `/api/localidades` | CRUD Localidades |
| POST/GET/PUT/DELETE | `/api/personas` | CRUD Personas |
| GET | `/api/personas/phone/{telefono}` | Buscar por teléfono |
| GET/POST/PUT/DELETE | `/api/oficinas` | CRUD Oficinas |
| GET | `/api/admin/users` | Listar usuarios |
| POST | `/api/admin/users` | Crear usuario |
| GET/PUT/DELETE | `/api/admin/users/{id}` | Gestionar usuario |
| POST | `/api/admin/users/{id}/roles` | Asignar roles |
| GET | `/api/admin/roles` | Listar roles |

### Integración Externa (Bearer Token)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET/POST/PUT/DELETE | `/api/v1/ciudades` | CRUD Ciudades |
| GET/POST/PUT/DELETE | `/api/v1/localidades` | CRUD Localidades |
| POST/GET/PUT/DELETE | `/api/v1/personas` | CRUD Personas |
| GET/POST/PUT/DELETE | `/api/v1/oficinas` | CRUD Oficinas |

---

## Frontend SPA (Páginas Vue)

| Página | Archivo | Descripción |
|--------|---------|-------------|
| Personas | `Menu/Personas.vue` | Panel de búsqueda, CRUD con modales, autocompletado |
| Ciudades | `Menu/Ciudades.vue` | Gestión de ciudades |
| Localidades | `Menu/Localidad.vue` | Gestión de localidades |
| Oficinas | `Menu/Oficinas.vue` | Gestión de oficinas |
| Aplicaciones | `Menu/Aplicaciones.vue` | Gestión de apps externas, generación de tokens |
| Exportar | `Menu/Exportar.vue` | Filtros avanzados, conteo en tiempo real, descarga Excel |
| Usuarios | `Menu/GestionUsuarios.vue` | Administración de usuarios y roles |
| Perfil | `Profile/UpdateProfileInformationForm.vue` | Gestión del perfil de usuario |

---

## Seguridad

- Autenticación dual: sesión (SPA) y token (API externa).
- Tokens hasheados con SHA-256, nunca almacenados en texto plano.
- Tokens mostrados solo una vez al generarlos.
- Throttling en endpoints de autenticación.
- Rate limiting en endpoints sensibles (30 req/min).
- Sanitización de entradas contra XSS y caracteres nulos.
- Headers de seguridad HTTP completos.
- CORS configurado para dominios de producción específicos.
- RBAC (Role-Based Access Control) con Spatie Permission.
- Sesiones con expiración de 120 minutos.
- Tokens API con expiración de 24 horas.

---

## Datos Iniciales (Seeders)

| Seeder | Contenido |
|--------|-----------|
| `RolePermissionSeeder` | 2 roles + 10 permisos |
| `UserSeeder` | 3 usuarios de prueba |
| `CiudadesSeeder` | 15 ciudades venezolanas |
| `LocalidadSeeder` | ~65 localidades/barrios |
| `PersonasSeeder` | 15 personas de ejemplo |
| `OficinasSeeder` | 10 oficinas corporativas |
| `AplicacionesSeeder` | 6 aplicaciones externas con tokens |

---

## Instalación y Ejecución

```bash
# Instalar dependencias
composer install
npm install

# Configurar entorno
cp .env.example .env
php artisan key:generate

# Base de datos
php artisan migrate --seed

# Compilar assets
npm run dev

# Ejecutar servidor de desarrollo
composer dev
```

El comando `composer dev` ejecuta simultáneamente:
- Servidor Laravel (`php artisan serve`)
- Worker de colas (`php artisan queue:listen`)
- Visor de logs en tiempo real (`php artisan pail`)
- Servidor de desarrollo Vite con HMR (`npm run dev`)

---

## Arquitectura

- **Inertia.js SPA**: No existe API separada para el frontend; las páginas Vue reciben props directamente desde los controladores Laravel.
- **Dual authentication**: Sesión para usuarios web, tokens para integraciones externas.
- **DNI como identificador**: Las personas se buscan, actualizan y eliminan por DNI en lugar de ID numérico.
- **Audit logging**: Canal de logs dedicado con retención de 90 días para cumplimiento normativo.
- **CORS**: Configurado para dominios de producción (alertafm.com, munichancay.com).
