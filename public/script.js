document.addEventListener("DOMContentLoaded", function() {
    // Función para formatear un número con punto de miles
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Función para calcular el dinero a recibir
    function calcularDineroRecibir() {
        let montoEnviar = parseFloat(document.getElementById("fieldname2_3").value.replace(/\./g, '').replace(',', '.'));
        let tipoCambio = parseFloat(document.getElementById("fieldname3_3").value);
        const selectedOption = document.getElementById("fieldname3_3").options[document.getElementById("fieldname3_3").selectedIndex].text;

        let monedaEnviar = "";
        let monedaRecibir = "";

        if (isNaN(montoEnviar)) {
            montoEnviar = 0; // Establecer monto a 0 si es NaN
        }

        if (selectedOption.includes("Colombia ► Argentina")) {
            monedaEnviar = "COP";
            monedaRecibir = "ARS";
        } else if (selectedOption.includes("Argentina ► Colombia")) {
            monedaEnviar = "ARS";
            monedaRecibir = "COP";
        }

        const dineroRecibir = Math.round(montoEnviar * tipoCambio);
        document.getElementById("fieldname2_3").value = formatNumberWithCommas(montoEnviar);
        document.getElementById("moneda_enviar_3").textContent = monedaEnviar;
        document.getElementById("fieldname6_3").value = formatNumberWithCommas(dineroRecibir); // Redondear a número entero
        document.getElementById("moneda_recibir_3").textContent = monedaRecibir;
    }

    // Evento input para el campo "Dinero a Enviar"
    document.getElementById("fieldname2_3").addEventListener("input", function() {
        if (this.value === "") {
            this.value = "0"; // Establecer el valor a 0 si está vacío
        }
        this.value = formatNumberWithCommas(parseFloat(this.value.replace(/\./g, '').replace(',', '.'))) || "";
        calcularDineroRecibir();
    });

    // Evento change para el campo "Tipo de cambio"
    document.getElementById("fieldname3_3").addEventListener("change", calcularDineroRecibir);

    // Llamar a la función calcularDineroRecibir al cargar la página
    calcularDineroRecibir();

    // Añadir un parámetro de tiempo único para evitar el caché de los datos
    function obtenerCotizaciones() {
        const url = '/ruta/a/tu/api/de/cotizaciones';  // URL de tu API
        const noCacheUrl = `${url}?t=${new Date().getTime()}`;

        fetch(noCacheUrl)
            .then(response => response.json())
            .then(data => {
                // Actualizar la información en la página
                document.getElementById("fieldname6_3").value = formatNumberWithCommas(data.cotizacion); // Ajustar según el formato de tu API
            })
            .catch(error => console.error('Error al obtener las cotizaciones:', error));
    }

    // Actualizar las cotizaciones cada cierto tiempo
    setInterval(obtenerCotizaciones, 60000); // Actualiza cada 60 segundos
});
