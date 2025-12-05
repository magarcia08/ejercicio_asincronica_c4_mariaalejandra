
let departamentos = [];
let ciudades = [];

// formato CO
function formatoCO(num) {
  return new Intl.NumberFormat("es-CO").format(num);
}

async function cargarDatos() {
  const depResp = await fetch("https://api-colombia.com/api/v1/Department");
  departamentos = await depResp.json();

  const cityResp = await fetch("https://api-colombia.com/api/v1/City");
  ciudades = await cityResp.json();

  // Render lista general
  const cont = document.getElementById("lista_general");
  cont.innerHTML = "";
  departamentos.forEach(dep => {
    cont.innerHTML += `
      <div class="fila">
        <span>${dep.name}</span>
        <span>Población: ${formatoCO(dep.population)}</span>
      </div>
    `;
  });
}

async function buscarDepartamento() {
  const nombre = document.getElementById("busqueda").value.trim().toLowerCase();
  const cont = document.getElementById("resultado_principal");
  cont.innerHTML = "";

  if (!nombre) {
    cont.innerHTML = "<p>Escribe un departamento.</p>";
    return;
  }

  const dep = departamentos.find(d => d.name.toLowerCase() === nombre);
  if (!dep) {
    cont.innerHTML = "<p>Departamento no encontrado.</p>";
    return;
  }

  cont.innerHTML = `
    <div class="fila"><b>Departamento:</b> ${dep.name}</div>
    <div class="fila"><b>Población:</b> ${formatoCO(dep.population)}</div>
    <div class="fila"><b>Superficie:</b> ${formatoCO(dep.surface)} km²</div>
    <div class="subtitulo">Municipios:</div>
  `;

  // FILTRAR MUNICIPIOS POR DEP ID
  const municipios = ciudades.filter(c => c.departmentId === dep.id);

  municipios.forEach(m => {
    cont.innerHTML += `
      <div class="fila">
        <span>${m.name}</span>
        <span>Población: ${formatoCO(m.population)}</span>
      </div>
    `;
  });
}

cargarDatos();