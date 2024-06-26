<script>
  // Definición de las propiedades del componente
  export let name = '';
  export let image = '';
  export let stars = 0;
  export let n_califications = 0;
  export let id = '';

  function handleClick() {
    window.location.href = `/serie/${id}`;
  }
</script>

<a href={`/serie/${id}`} on:click|preventDefault={handleClick}>
  <div class="card">
    <img src={`/images/${image}`} alt="Imagen de la serie" class="serie-img">
    <h3>{name}</h3>
    <div class="details">
      <p><span>Estrellas:</span> {stars} ({n_califications})</p>
    </div>
  </div>
</a>

<style>
  .card {
    background-color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 12px;
    max-width: 200px;
    max-height: 390px;
    margin: 16px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .card:hover {
    transform: scale(1.05); /* Aumenta la escala al 105% del tamaño original */
  }

  .card h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  .card p {
    font-size: 1rem;
    line-height: 1.4;
  }

  .card .details {
    margin-top: 12px;
  }

  .card .details span {
    font-weight: bold;
  }

  .serie-img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
  }
</style>
