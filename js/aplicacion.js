
/*
  ==================================================
  LLAVE DIGITAL CIUDADANA 2030
  Aplicación web de orientación ciudadana
  Proyecto académico - Aplicaciones Web
  ==================================================

  Funcionalidades:
  - Carga y procesamiento de información XML.
  - Validación de registros.
  - Generación dinámica de tarjetas.
  - Ilustraciones individuales de los trámites.
  - Búsqueda por palabras clave.
  - Filtrado por modalidad.
  - Manejo de errores.
  - Reintento de carga.
*/

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. REFERENCIAS A ELEMENTOS HTML
    // =========================================

    const listaTramites = document.getElementById("lista-tramites");
    const buscarTramite = document.getElementById("buscar-tramite");
    const filtroModalidad = document.getElementById("filtro-modalidad");
    const estadoTramites = document.getElementById("estado-tramites");

    let tramites = [];

    // =========================================
    // 2. ILUSTRACIONES DE LOS TRÁMITES
    // =========================================

    const imagenesTramites = {
        "R001": "imagenes/tramite-antecedentes.png",
        "R002": "imagenes/tramite-imss.png",
        "R003": "imagenes/tramite-pasaporte.png"
    };

    // =========================================
    // 3. FUNCIONES AUXILIARES
    // =========================================

    function obtenerTexto(elemento, etiqueta) {
        const nodo = elemento.querySelector(etiqueta);

        return nodo ? nodo.textContent.trim() : "";
    }

    function normalizarTexto(texto) {
        return String(texto)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    function obtenerCategoria(categoria) {
        const valor = normalizarTexto(categoria);

        const categorias = {
            "en linea": "categoria-en-linea",
            "presencial": "categoria-presencial",
            "mixta": "categoria-mixta"
        };

        return categorias[valor] || "";
    }

    function crearElemento(etiqueta, texto, clase = "") {
        const elemento = document.createElement(etiqueta);

        elemento.textContent = texto;

        if (clase) {
            elemento.className = clase;
        }

        return elemento;
    }

    function activarControles(activar) {
        buscarTramite.disabled = !activar;
        filtroModalidad.disabled = !activar;
    }

    function mostrarEstado(mensaje) {
        estadoTramites.textContent = mensaje;
    }

    // =========================================
    // 4. VALIDACIÓN DE REGISTROS
    // =========================================

    function validarTramite(tramite) {

        const camposObligatorios = [
            tramite.id,
            tramite.nombre,
            tramite.descripcion,
            tramite.categoria,
            tramite.institucion,
            tramite.modalidad,
            tramite.enlaceOficial
        ];

        const datosCompletos = camposObligatorios.every(
            (campo) =>
                typeof campo === "string" &&
                campo.trim().length > 0
        );

        const requisitosValidos =
            Array.isArray(tramite.requisitos) &&
            tramite.requisitos.length > 0 &&
            tramite.requisitos.every(
                (requisito) =>
                    typeof requisito === "string" &&
                    requisito.trim().length > 0
            );

        const categoriaValida =
            obtenerCategoria(tramite.categoria) !== "";

        let enlaceValido = false;

        try {
            const url = new URL(tramite.enlaceOficial);

            enlaceValido =
                url.protocol === "https:" &&
                url.hostname.length > 0;

        } catch (error) {
            enlaceValido = false;
        }

        return (
            datosCompletos &&
            requisitosValidos &&
            categoriaValida &&
            enlaceValido
        );
    }

    // =========================================
    // 5. CREACIÓN DE TARJETAS
    // =========================================

    function crearTarjeta(tramite) {

        const tarjeta = document.createElement("article");

        tarjeta.className =
            "tarjeta-tramite " +
            obtenerCategoria(tramite.categoria);

        // -------------------------------------
        // Ilustración correspondiente al trámite
        // -------------------------------------

        const rutaImagen = imagenesTramites[tramite.id];

        if (rutaImagen) {

            const imagen = document.createElement("img");

            imagen.src = rutaImagen;
            imagen.alt = "";
            imagen.className = "imagen-tramite";
            imagen.loading = "lazy";
            imagen.decoding = "async";
            imagen.width = 300;
            imagen.height = 180;

            tarjeta.appendChild(imagen);
        }

        // -------------------------------------
        // Nombre del trámite
        // -------------------------------------

        tarjeta.appendChild(
            crearElemento("h3", tramite.nombre)
        );

        // -------------------------------------
        // Modalidad
        // -------------------------------------

        tarjeta.appendChild(
            crearElemento(
                "span",
                tramite.categoria,
                "etiqueta-modalidad"
            )
        );

        // -------------------------------------
        // Descripción
        // -------------------------------------

        tarjeta.appendChild(
            crearElemento("p", tramite.descripcion)
        );

        // -------------------------------------
        // Institución responsable
        // -------------------------------------

        tarjeta.appendChild(
            crearElemento(
                "p",
                "Institución responsable: " +
                tramite.institucion
            )
        );

        // -------------------------------------
        // Requisitos básicos
        // -------------------------------------

        tarjeta.appendChild(
            crearElemento("h4", "Requisitos básicos")
        );

        const listaRequisitos = document.createElement("ul");

        tramite.requisitos.forEach((requisito) => {
            listaRequisitos.appendChild(
                crearElemento("li", requisito)
            );
        });

        tarjeta.appendChild(listaRequisitos);

        // -------------------------------------
        // Modalidad de atención
        // -------------------------------------

        tarjeta.appendChild(
            crearElemento("h4", "Modalidad de atención")
        );

        tarjeta.appendChild(
            crearElemento("p", tramite.modalidad)
        );

        // -------------------------------------
        // Enlace a la institución oficial
        // -------------------------------------

        const enlace = crearElemento(
            "a",
            "Consultar información oficial",
            "enlace-oficial"
        );

        enlace.href = tramite.enlaceOficial;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";

        tarjeta.appendChild(enlace);

        return tarjeta;
    }

    // =========================================
    // 6. PRESENTACIÓN DE RESULTADOS
    // =========================================

    function mostrarTramites(resultados) {

        listaTramites.replaceChildren();

        if (resultados.length === 0) {

            mostrarEstado(
                "No se encontraron trámites con esos criterios."
            );

            return;
        }

        const fragmento = document.createDocumentFragment();

        resultados.forEach((tramite) => {
            fragmento.appendChild(
                crearTarjeta(tramite)
            );
        });

        listaTramites.appendChild(fragmento);

        const cantidad = resultados.length;

        if (cantidad === 1) {
            mostrarEstado("Se encontró 1 trámite.");
        } else {
            mostrarEstado(
                "Se encontraron " +
                cantidad +
                " trámites."
            );
        }
    }

    // =========================================
    // 7. BÚSQUEDA Y FILTRADO
    // =========================================

    function filtrarTramites() {

        const busqueda = normalizarTexto(
            buscarTramite.value
        );

        const modalidadSeleccionada =
            filtroModalidad.value;

        const resultados = tramites.filter((tramite) => {

            const contenido = normalizarTexto(
                tramite.nombre + " " +
                tramite.descripcion + " " +
                tramite.institucion + " " +
                tramite.modalidad
            );

            const coincideBusqueda =
                contenido.includes(busqueda);

            const categoria =
                obtenerCategoria(tramite.categoria)
                    .replace("categoria-", "");

            const coincideModalidad =
                modalidadSeleccionada === "todos" ||
                categoria === modalidadSeleccionada;

            return (
                coincideBusqueda &&
                coincideModalidad
            );
        });

        mostrarTramites(resultados);
    }

    // =========================================
    // 8. PROCESAMIENTO DEL ARCHIVO XML
    // =========================================

    function procesarXML(contenidoXML) {

        const analizador = new DOMParser();

        const documentoXML = analizador.parseFromString(
            contenidoXML,
            "application/xml"
        );

        if (documentoXML.querySelector("parsererror")) {
            throw new Error(
                "El archivo XML contiene errores de sintaxis."
            );
        }

        if (
            documentoXML.documentElement.tagName !==
            "registros"
        ) {
            throw new Error(
                "La estructura principal del XML no es válida."
            );
        }

        const registros = documentoXML.querySelectorAll(
            "registros > registro"
        );

        if (registros.length === 0) {
            throw new Error(
                "El archivo XML no contiene trámites."
            );
        }

        const registrosProcesados =
            Array.from(registros).map((registro) => {

                const requisitos = Array.from(
                    registro.querySelectorAll(
                        "requisitos > requisito"
                    )
                ).map(
                    (elemento) =>
                        elemento.textContent.trim()
                );

                return {
                    id: registro.getAttribute("id"),
                    nombre: obtenerTexto(
                        registro,
                        "nombre"
                    ),
                    descripcion: obtenerTexto(
                        registro,
                        "descripcion"
                    ),
                    categoria: obtenerTexto(
                        registro,
                        "categoria"
                    ),
                    institucion: obtenerTexto(
                        registro,
                        "institucion"
                    ),
                    requisitos: requisitos,
                    modalidad: obtenerTexto(
                        registro,
                        "modalidad"
                    ),
                    enlaceOficial: obtenerTexto(
                        registro,
                        "enlaceOficial"
                    )
                };
            });

        // Comprobar que los registros estén completos.
        const registrosValidos =
            registrosProcesados.filter(validarTramite);

        if (
            registrosValidos.length !==
            registrosProcesados.length
        ) {
            throw new Error(
                "Uno o más registros XML contienen " +
                "datos incompletos o incorrectos."
            );
        }

        // Comprobar identificadores duplicados.
        const identificadores = registrosValidos.map(
            (tramite) => tramite.id
        );

        if (
            new Set(identificadores).size !==
            identificadores.length
        ) {
            throw new Error(
                "El archivo XML contiene " +
                "identificadores duplicados."
            );
        }

        return registrosValidos;
    }

    // =========================================
    // 9. CARGA DE INFORMACIÓN XML
    // =========================================

    async function cargarTramites() {

        activarControles(false);

        listaTramites.replaceChildren();

        mostrarEstado(
            "Cargando información de los trámites..."
        );

        try {

            const respuesta = await fetch(
                "xml/datos.xml",
                {
                    cache: "no-store"
                }
            );

            if (!respuesta.ok) {
                throw new Error(
                    "No fue posible obtener el archivo XML."
                );
            }

            const contenidoXML = await respuesta.text();

            const registros = procesarXML(contenidoXML);

            tramites = registros;

            activarControles(true);

            filtrarTramites();

        } catch (error) {

            console.error(
                "Error al cargar los trámites:",
                error
            );

            tramites = [];

            mostrarEstado(
                "No fue posible cargar los trámites. " +
                "Comprueba el archivo XML e intenta nuevamente."
            );

            mostrarBotonReintentar();
        }
    }

    // =========================================
    // 10. RECUPERACIÓN ANTE ERRORES
    // =========================================

    function mostrarBotonReintentar() {

        const boton = crearElemento(
            "button",
            "Reintentar carga"
        );

        boton.type = "button";
        boton.className = "boton-reintentar";

        boton.addEventListener("click", () => {
            cargarTramites();
        });

        listaTramites.appendChild(boton);
    }

    // =========================================
    // 11. EVENTOS DE INTERACCIÓN
    // =========================================

    buscarTramite.addEventListener(
        "input",
        filtrarTramites
    );

    filtroModalidad.addEventListener(
        "change",
        filtrarTramites
    );

    // Iniciar la carga de información.
    cargarTramites();

});
