document.addEventListener("DOMContentLoaded", function() {
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function calcularDineroRecibir() {
        let montoEnviar = parseFloat(document.getElementById("fieldname2_3").value.replace(/\./g, '').replace(',', '.'));
        let tipoCambio = parseFloat(document.getElementById("fieldname3_3").value);
        const selectedOption = document.getElementById("fieldname3_3").options[document.getElementById("fieldname3_3").selectedIndex].text;

        let monedaEnviar = "";
        let monedaRecibir = "";

        if (isNaN(montoEnviar)) {
            montoEnviar = 0;
        }

        if (selectedOption.includes("Colombia ► Argentina")) {
            monedaEnviar = "COP";
            monedaRecibir = "ARS";
