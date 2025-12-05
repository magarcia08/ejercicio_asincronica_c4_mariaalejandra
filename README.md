1. Variables principales
        let departamentos = [];
        let ciudades = [];


Aquí se guardan:

departamentos → todos los departamentos del API

ciudades → todos los municipios de Colombia

Esto se llena una sola vez al cargar la página.

2. Formato colombiano de números
        function formatoCO(num) {
        return new Intl.NumberFormat("es-CO").format(num);
        }


Sirve para que los números aparezcan así:

10000 → 10.000

8405837 → 8.405.837

Formato colombiano.

3. Cargar datos desde el API
            async function cargarDatos() {
            const depResp = await fetch("https://api-colombia.com/api/v1/Department");
            departamentos = await depResp.json();

            const cityResp = await fetch("https://api-colombia.com/api/v1/City");
            ciudades = await cityResp.json();


Aquí se usan fetch + async/await para traer datos reales del servidor:

/Department  trae la lista completa de departamentos

/City  trae la lista completa de municipios

4. Mostrar los departamentos al inicio
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


Por cada departamento, crea una fila estilo tarjeta:

Santander             Población: 2.184.837
Meta                  Población: 555.503


Todo se escribe directamente en el HTML usando innerHTML.

 5. Buscar un departamento
            async function buscarDepartamento() {
            const nombre = document.getElementById("busqueda").value.trim().toLowerCase();


Aquí tomamos lo que el usuario escribió y lo pasamos a minúsculas para que no falle.

 6. Validaciones
            if (!nombre) {
                cont.innerHTML = "<p>Escribe un departamento.</p>";
                return;
            }


Esto evita que el usuario deje el campo vacío.

 7. Encontrar el departamento dentro del arreglo

            const dep = departamentos.find(d => d.name.toLowerCase() === nombre);


Aquí NO usamos el endpoint roto /Department/name/….

Buscamos nosotros mismos el departamento dentro del arreglo ya cargado.

Si no existe:

  if (!dep) {
    cont.innerHTML = "<p>Departamento no encontrado.</p>";
    return;
  }

 8. Mostrar la información principal del departamento
        cont.innerHTML = `
            <div class="fila"><b>Departamento:</b> ${dep.name}</div>
            <div class="fila"><b>Población:</b> ${formatoCO(dep.population)}</div>
            <div class="fila"><b>Superficie:</b> ${formatoCO(dep.surface)} km²</div>
            <div class="subtitulo">Municipios:</div>
        `;


Muestra:

Nombre

Población

Superficie

Título "Municipios"

9. Filtrar los municipios del departamento
        const municipios = ciudades.filter(c => c.departmentId === dep.id);




En este proyecto uso JavaScript, async/await y Fetch API para obtener datos reales de Colombia.
Primero cargo todos los departamentos y ciudades desde la API.
Luego muestro una lista general con población formateada en estilo colombiano.
Si el usuario escribe un departamento, busco ese departamento dentro del arreglo ya cargado.
Después muestro su población, su superficie y todos los municipios que le pertenecen, con su población.
Para el diseño uso HTML y CSS con tarjetas blancas sobre un fondo amarillo, parecido a la imagen dada.
Este ejercicio me ayuda a practicar consumo de APIs, manipulación del DOM y manejo de datos.