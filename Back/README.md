# QR Generator API

API REST para generación de códigos QR con NestJS, Prisma y PostgreSQL.

## Tecnologías

- NestJS
- Prisma ORM
- PostgreSQL (NeonDB)
- QRCode
- TypeScript

## Requisitos previos

- Node.js 18 o superior
- Cuenta en NeonDB (https://neon.tech)
- npm o yarn

## Configuración

1. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

2. Configurar variables de entorno:
\`\`\`bash
cp .env.example .env
\`\`\`
Editar `.env` con tus credenciales de base de datos.

3. Generar cliente de Prisma:
\`\`\`bash
npm run prisma:generate
\`\`\`

4. Ejecutar migraciones:
\`\`\`bash
npm run prisma:migrate
\`\`\`

## Ejecución

Desarrollo:
\`\`\`bash
npm run start:dev
\`\`\`

Producción:
\`\`\`bash
npm run start:prod
\`\`\`

## Endpoints

- POST \`/api/qr/url\`: Generar QR de URL
- POST \`/api/qr/text\`: Generar QR de texto
- POST \`/api/qr/vcard\`: Generar QR de contacto (vCard)
- GET \`/api/qr/:id\`: Obtener QR por ID
- GET \`/api/qr\`: Listar QRs (paginado)
- DELETE \`/api/qr/:id\`: Eliminar QR

## Estructura

\`src/prisma\`: Configuración y servicio de base de datos
\`src/qr\`: Lógica de negocio para códigos QR
