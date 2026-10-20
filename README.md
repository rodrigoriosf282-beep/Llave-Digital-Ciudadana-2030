
# Llave Digital Ciudadana 2030

## Prototipo universitario de orientación ciudadana

**Institución:** Universidad Nacional Rosario Castellanos  
**Licenciatura:** Tecnologías de la Información y la Comunicación  
**Asignatura:** Aplicaciones Web  
**Actividad:** Actividad integradora final  
**Periodo:** 2026-2

---

## 1. Descripción del proyecto

Llave Digital Ciudadana 2030 es un prototipo web desarrollado
con fines académicos para facilitar la consulta de información
sobre trámites gubernamentales y servicios digitales en México.

Su propósito es proporcionar orientación clara, organizada
y accesible sobre los requisitos básicos, las modalidades
de atención y los enlaces oficiales de distintos trámites.

El proyecto responde al problema prototípico
"Llave Digital Ciudadana 2030" y al incidente crítico
"Orientación ciudadana para el uso de Llave MX".

El sitio está dirigido especialmente a personas con poca
experiencia en servicios digitales, personas adultas mayores
y usuarios de dispositivos móviles.

Este prototipo no representa una plataforma gubernamental
oficial y no permite realizar trámites.

## 2. Objetivo general

Desarrollar un prototipo web funcional de orientación
ciudadana mediante la integración de HTML, CSS, JavaScript
y XML, que facilite la consulta de información sobre tres
trámites gubernamentales, incorporando navegación clara,
búsqueda interactiva, diseño responsivo y recomendaciones
de seguridad digital.

## 3. Funcionalidades principales

El prototipo incorpora:

- Página de inicio con propósito y alcance.
- Logotipo académico propio.
- Ilustración sobre orientación digital.
- Información de tres trámites gubernamentales.
- Ilustración individual para cada trámite.
- Descripciones y requisitos básicos.
- Modalidades de atención.
- Enlaces a fuentes institucionales oficiales.
- Buscador interactivo mediante JavaScript.
- Filtro por modalidad de atención.
- Cinco preguntas frecuentes desplegables.
- Dos recomendaciones de seguridad digital.
- Avisos sobre el carácter académico del proyecto.
- Diseño adaptable a diferentes tamaños de pantalla.
- Manejo de errores durante la carga de información XML.
- Botón para reintentar la carga ante errores.

## 4. Trámites incluidos

### R001. Constancia de Antecedentes Penales Federales

Modalidad: En línea.

Documento oficial que informa sobre la existencia
o inexistencia de antecedentes penales federales.

### R002. Corrección de datos personales ante el IMSS

Modalidad utilizada: Presencial.

Procedimiento para solicitar la corrección o regularización
de información personal ante el Instituto Mexicano
del Seguro Social.

El IMSS también ofrece una alternativa digital.

### R003. Expedición del pasaporte mexicano por primera vez

Modalidad utilizada: Mixta (clasificación académica).

La clasificación mixta describe la combinación de
programación de cita por medios digitales y atención
presencial.

La Secretaría de Relaciones Exteriores clasifica
oficialmente este trámite como presencial.

Los requisitos, costos y procedimientos deben
verificarse en los sitios oficiales correspondientes.

## 5. Tecnologías utilizadas

### HTML5

Define la estructura de la página, el encabezado,
la navegación, las secciones informativas y los
elementos de interacción.

### CSS3

Establece los colores, la tipografía, la organización
visual, la distribución de tarjetas y las reglas
de adaptación a diferentes pantallas.

### JavaScript

Procesa la información XML, genera dinámicamente
las tarjetas, asigna las imágenes correspondientes
a cada trámite e implementa el buscador y los filtros.

También permite validar registros, presentar mensajes
de estado, detectar errores y reintentar la carga.

### XML

Almacena la información estructurada de los tres
trámites mediante identificadores, nombres,
descripciones, requisitos, modalidades y enlaces.

## 6. Estructura del proyecto

    Llave_Digital_Ciudadana_2030/
    |
    |-- index.html
    |
    |-- css/
    |   |-- estilos.css
    |
    |-- js/
    |   |-- aplicacion.js
    |
    |-- xml/
    |   |-- datos.xml
    |
    |-- imagenes/
    |   |-- logo-llave-digital.png
    |   |-- ilustracion-inicio.png
    |   |-- tramite-antecedentes.png
    |   |-- tramite-imss.png
    |   |-- tramite-pasaporte.png
    |
    |-- evidencias/
    |
    |-- README.md

La carpeta evidencias se utilizará para almacenar
las capturas de las pruebas definitivas.

## 7. Recursos gráficos

Se incorporaron cinco recursos gráficos
desarrollados para el prototipo académico.

### Logotipo

Archivo: imagenes/logo-llave-digital.png

Identifica visualmente el proyecto y aparece
en el encabezado de la página.

### Ilustración de inicio

Archivo: imagenes/ilustracion-inicio.png

Representa el uso de dispositivos digitales
para consultar información sobre trámites.

### Ilustraciones de trámites

- tramite-antecedentes.png
- tramite-imss.png
- tramite-pasaporte.png

Las imágenes se relacionan con los identificadores
R001, R002 y R003 mediante JavaScript.

Su finalidad es facilitar la identificación
visual de los trámites y mantener una presentación
uniforme.

Las ilustraciones no representan documentos
oficiales ni reproducen interfaces gubernamentales.

## 8. Instrucciones de ejecución local

Para ejecutar el prototipo:

1. Abrir la carpeta en Visual Studio Code.
2. Instalar la extensión Live Server, si es necesario.
3. Abrir el archivo index.html.
4. Seleccionar "Open with Live Server".
5. Acceder al sitio desde el navegador.

La dirección local puede ser:

http://127.0.0.1:5500/index.html

El puerto puede variar según la configuración.

No se recomienda abrir index.html directamente
mediante file://, debido a las restricciones
de los navegadores al cargar archivos XML
mediante JavaScript.

## 9. Funcionamiento del prototipo

Durante las pruebas locales, Live Server
entrega los archivos mediante HTTP.

El navegador interpreta HTML, aplica los
estilos CSS y ejecuta JavaScript.

JavaScript solicita el archivo xml/datos.xml,
interpreta sus registros y genera dinámicamente
las tarjetas informativas.

Cada registro XML contiene un identificador
que permite asociarlo con su ilustración.

El buscador localiza trámites mediante palabras
clave y el filtro permite seleccionar
una modalidad de atención.

No se utiliza una base de datos ni un backend
de procesamiento de trámites.

## 10. Accesibilidad y diseño responsivo

El prototipo incorpora:

- Estructura HTML semántica.
- Navegación organizada por secciones.
- Etiquetas descriptivas en los controles.
- Indicadores visuales de enfoque.
- Preguntas frecuentes desplegables.
- Textos legibles y colores diferenciados.
- Nombres visibles para las modalidades.
- Imágenes con tratamiento alternativo adecuado.
- Adaptación a computadoras, tabletas y móviles.
- Compatibilidad con preferencias de movimiento reducido.

Estas características representan medidas básicas
de accesibilidad y no constituyen una certificación
formal de cumplimiento de WCAG.

## 11. Comprobaciones realizadas

Durante el desarrollo se efectuaron pruebas de:

- Carga y visualización de los tres trámites.
- Búsqueda mediante palabras clave.
- Filtrado por modalidad.
- Búsquedas sin resultados.
- Restablecimiento de resultados.
- Visualización responsiva.
- Navegación mediante teclado.
- Lectura y procesamiento del archivo XML.
- Recuperación ante errores de carga.
- Funcionamiento de los enlaces oficiales.

Las dos evidencias definitivas solicitadas
para la actividad integradora se documentarán
en la presentación ejecutiva.

## 12. Alcance y limitaciones

El proyecto tiene un alcance exclusivamente
académico e informativo.

No permite realizar trámites oficiales.
No solicita contraseñas ni credenciales de Llave MX.
No recopila ni almacena datos personales.
No cuenta con autenticación administrativa.
No utiliza bases de datos.
No está vinculado oficialmente con dependencias
gubernamentales.

Los requisitos y procedimientos pueden cambiar,
por lo que deben confirmarse en las fuentes oficiales.

## 13. Posibles mejoras futuras

En una implementación posterior podrían incorporarse:

- Panel administrativo de contenidos.
- Backend desarrollado con PHP.
- Base de datos para la gestión de información.
- Autenticación de personas administradoras.
- Actualización periódica de los contenidos.
- Evaluaciones de accesibilidad más exhaustivas.

Estas características no forman parte
del prototipo académico actual.

## 14. Fuentes institucionales

### Constancia de Antecedentes Penales Federales

https://constancias.oadprs.gob.mx/

### Corrección de datos personales ante el IMSS

https://www.imss.gob.mx/tramites/imss02012

### Pasaporte mexicano por primera vez

https://www.gob.mx/tramites/ficha/pasaporte-ordinario-para-personas-mayores-de-edad/SRE112

## 15. Aviso académico

Llave Digital Ciudadana 2030 es un proyecto
universitario de orientación ciudadana.

No representa un servicio oficial del Gobierno
de México ni sustituye los canales institucionales.

---

**Universidad Nacional Rosario Castellanos**  
**Licenciatura en Tecnologías de la Información y la Comunicación**  
**Aplicaciones Web | 2026**
