// espera que el DOM este cargdo
$(function () {

    // variables
    const btnBuscar = $("#formulario")
    const textForm = $("#textForm")
    const resultado = $("#resultado")

    // boton de busqueda
    btnBuscar.on("submit", function (e) {
        e.preventDefault()

        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${textForm.val()}`,

            method: "GET",
            success(data) {
                // datos para SuperHero
                $("#heroInfo").html(`

                <h3 class="text-center">Super Héroe Encontrado</h3>
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.image.url}"
                                class="img-fluid rounded-start" alt="Imagen de la tarjeta">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">

                                <h5 class="card-title">Nombre : ${data.name}</h5>
                                <p class="card-text">Conexiones: ${data.connections["group-affiliation"]}
                                ${data.connections["relatives"]}</p>
                                <div class="ms-4">
                                    <p>Publicado por: ${data.biography.publisher}</p>
                                    <hr>
                                    <p>Ocupación : ${data.work.occupation}</p>
                                    <hr>
                                    <p>Primera Aparición : ${data.biography["first-appearance"]}</p>
                                    <hr>
                                    <p>Altura: ${data.appearance.height}</p>
                                    <hr>
                                    <p>Peso: ${data.appearance.weight}</p>
                                    <hr>
                                    <p>Alianza: ${data.biography.aliases}</p>

                                </div>
                            </div>
                        </div>
                    </div>
            `);

                // grafico
                const dataPoints = [
                    { y: data.powerstats.intelligence, label: "intelligence" },
                    { y: data.powerstats.strength, label: "strength" },
                    { y: data.powerstats.speed, label: "speed" },
                    { y: data.powerstats.durability, label: "durability" },
                    { y: data.powerstats.power, label: "power" },
                    { y: data.powerstats.combat, label: "combat" },
                ]

                let config = {
                    theme: "light1",
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de Poder para ${data.name}`,
                    },
                    data: [
                        {
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}",
                            showInLegend: "true",
                            legendText: "{label} - {y}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}",
                            dataPoints: dataPoints,
                        },
                    ],
                }

                // Grafico
                let chart = new CanvasJS.Chart("chartContainer", config)

                chart.render()

            },
            error(e) {
                console.log(e)
            },

            // cierre de ajax
        })
        // cierre del form
    })

    // cierre del DOM cargado
})