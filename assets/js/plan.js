document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const planId = urlParams.get("id");

  if (!planId) {
    alert("No se especificó un plan.");
    return;
  }

  fetch("assets/json/plan.json")
    .then(response => response.json())
    .then(planes => {
      const plan = planes.find(p => p.id === planId);

      if (!plan) {
        alert("Plan no encontrado.");
        return;
      }


document.getElementById("titulo-principal").innerHTML = `Detalles de "<strong>${plan.titulo}</strong>"`;
document.getElementById("detalle-plan").textContent = plan.detalle;
document.getElementById("descripcion").textContent = plan.descripcion;
document.getElementById("tipo").textContent = plan.tipo;
document.getElementById("costo").textContent = plan.costo;
document.getElementById("tiempo").textContent = plan.tiempo;
document.getElementById("herramientas").textContent = plan.herramientas.join(", ");


      const imagen = document.querySelector(".left-image img");
      if (imagen) {
        imagen.src = plan.imagen;
        imagen.alt = `Imagen del ${plan.titulo}`;
      }

      // Opcional: agregar detalles en columnas si quieres mostrar herramientas, costo y tiempo
      const columnas = document.querySelectorAll(".row .col-3, .col-4, .col-5");
      if (columnas.length >= 3) {
        columnas[0].innerHTML = `<span class="bid">Costo<br><strong>${plan.costo}</strong></span>`;
        columnas[1].innerHTML = `<span class="owner">Tiempo<br><strong>${plan.tiempo}</strong></span>`;
        columnas[2].innerHTML = `<span class="ends">Herramientas<br><strong>${plan.herramientas.join(", ")}</strong></span>`;
      }
    })
    .catch(error => {
      console.error("Error al cargar los datos del plan:", error);
    });
});
