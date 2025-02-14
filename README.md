# React + Vite
Soy Maxi Bondi.

Para poder ejecutar el proyecto, primero hay que instalar los paquetes con npm i, después crear un archivo .env y agregar VITE_OMDB_API_KEY=60c0c2f9.
Después de eso, se corre el programa de manera local con npm run dev --host para poder verlo desde el celular.
Primero necesitaba ver cómo funcionaba la API y conseguí una gratuita para este proyecto: OMDb. Tiene algunas limitaciones, pero logré conectarla para traer películas y darle diseño tanto para PC como para móvil. Luego consumí el endpoint y lo ajusté para traer solo películas del 2024, ordenadas en forma descendente por rating.
Lo que más tiempo me llevó fue hacer que el carrusel fuera infinito. Al principio lo logré sin animaciones, pero cuando las agregué, apareció un bug. Para solucionarlo, ajusté los estilos para que, al llegar al final, el carrusel volviera al inicio con la misma velocidad, logrando así un efecto de carrusel infinito.
En la página principal, la API solo devuelve 10 elementos por defecto, así que configuré la solicitud para que trajera hasta 50 y agregué paginación fluida. También hice que, al hacer clic en una película, se abra un modal con el título, detalles y rating.
Después de eso, me quedaba el buscador y los modos de visualización. El buscador lo hice dinámico, devolviendo un máximo de 40 resultados ordenados por fecha. La API tiene una limitación y es que no es muy flexible: si buscas "movie", solo te traerá películas que tengan esa palabra exacta en el título.
Con los géneros, no encontré una API que me permitiera filtrarlos bien.
Por último, agregué los modos claro y oscuro, y cuando se presiona el botón, cambian correctamente.
Muchas gracias por esta oportunidad.
