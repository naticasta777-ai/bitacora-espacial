
# Bitácora Espacial

Proyecto web creado con React y Vite (JavaScript) que reúne noticias sobre el mundo de la exploración espacial. Permite consultar publicaciones por diferentes categorías y acceder a su contenido. La interfaz utiliza estilos CSS desarrollados especialmente para el proyecto, sin depender de frameworks externos.

## Instalación y uso

1. Clona el repositorio e instala los paquetes necesarios:

   ```bash
   npm install
   ```

2. Crea el archivo de configuración `.env` tomando como referencia `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Levanta el servidor local con el siguiente comando:

   ```bash
   npm run dev
   ```

4. Abre el proyecto en tu navegador desde:

   `http://localhost:5173`

## API utilizada

Para obtener las noticias se utiliza [Spaceflight News API](https://api.spaceflightnewsapi.net/v4/docs/), un servicio gratuito que permite acceder a información espacial sin necesidad de utilizar una clave de autenticación.

La URL de conexión se establece en el archivo `.env` mediante la variable `VITE_API_URL`.
