<script>
  import { onMount } from 'svelte';
  import Card from './Card.svelte';

  export let series = [];
  let filteredSeries = [];
  let filterText = '';
  let selectedCategory = '';
  let selectedStars = 0;
  let selectedService = '';

  let categoryOptions = ['Todos', 'Drama', 'Comedia', 'Romance', 'Ciencia Ficcion', 'Acción', 'Thriller', 'Documental', 'Fantasía', 'Animación', 'Infantil']
  let starsOptions = ['Todos', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  let serviceOptions = ['Todos', 'Netflix', 'Amazon Prime', 'HBO', 'Disney+', 'Apple TV+', 'Paramount+', 'HBO Max', 'Discovery+', 'Crunchyroll', 'Viki', 'Otro']

  // Función para filtrar las series según el texto de búsqueda
  function searchBarFilter(event) {
    filterText = event.target.value.toLowerCase();
    applyFilters();
  }

  // Función para filtrar las series según la categoría seleccionada
  function categoryFilter(category) {
    selectedCategory = category === 'Todos' ? '' : category;
    applyFilters();
  }

  // Función para filtrar las series según las estrellas seleccionadas
  function starsFilter(stars) {
    selectedStars = stars === 'Todos' ? 0 : parseInt(stars);
    applyFilters();
  }

  // Función para filtrar las series según el servicio seleccionado
  function serviceFilter(service) {
    selectedService = service === 'Todos' ? '' : service;
    applyFilters();
  }

  // Función para aplicar todos los filtros y actualizar la lista filtrada
  function applyFilters() {
    filteredSeries = series.filter(serie => {
      const categoryMatch = selectedCategory === '' || serie.categories.includes(selectedCategory);
      const starsMatch = selectedStars === 0 || serie.stars === selectedStars;
      const serviceMatch = selectedService === '' || serie.services.includes(selectedService);
      const textMatch = serie.name.toLowerCase().includes(filterText);

      return categoryMatch && starsMatch && serviceMatch && textMatch;
    });
  }

  onMount(() => {
    filteredSeries = series;
  });
</script>

<div>
  <div class="filters">
    
    <!-- Categoría -->
    <div class="filter">
      <label for="categoryFilter">Categoría:</label>
      <select id="categoryFilter" on:change={() => categoryFilter(event.target.value)}>
        {#each categoryOptions as option}
        <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
    
    <!-- Estrellas -->
    <div class="filter">
      <label for="starsFilter">Estrellas:</label>
      <select id="starsFilter" on:change={() => starsFilter(event.target.value)}>
        {#each starsOptions as option}
        <option value={option}>{option === 'Todos' ? option : option + ' estrellas'}</option>
        {/each}
      </select>
    </div>
    
    <!-- Servicio -->
    <div class="filter">
      <label for="serviceFilter">Servicio:</label>
      <select id="serviceFilter" on:change={() => serviceFilter(event.target.value)}>
        {#each serviceOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
  </div>
  
  <!-- Buscar -->
  <div class="filter">
    <label for="filterInput">Buscar:</label>
    <input type="text" id="filterInput" placeholder="Escribe un título" on:input={searchBarFilter}>
  </div>

  <ul class="card-container">
    {#each filteredSeries as serie}
      <Card
        id={serie.id}
        name={serie.name}
        image={serie.image}
        stars={serie.stars}
        n_califications={serie.n_califications}
      />
    {/each}
    {#if filteredSeries.length === 0}
      <li>No se encontraron series.</li>
    {/if}
  </ul>
</div>

<style>
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
  }

  .filter {
    flex: 1 1 200px; /* Tamaño mínimo y máximo de 200px para cada filtro */
  }

  input[type="text"],
  select {
    padding: 8px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box; /* Para incluir el padding en el ancho total */
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
