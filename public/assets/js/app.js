document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'http://localhost:3000/noticias';

  const detalhesContainer = document.getElementById('detalhes-container');

  if (detalhesContainer) {
    // Página de detalhes
    const id = new URLSearchParams(window.location.search).get('idNoticia');

    fetch(`${apiUrl}/${id}`)
      .then(res => res.json())
      .then(noticia => {
        detalhesContainer.innerHTML = `
          <h1>${noticia.titulo}</h1>
          <p><em>Por ${noticia.autor} - ${noticia.data}</em></p>
          <img src="${noticia.imagem_principal}" class="img-fluid mb-3" alt="${noticia.titulo}">
          <p>${noticia.descricao}</p>
          <p>${noticia.conteudo}</p>

          <div id="carouselDetalhes" class="carousel slide mt-4" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${noticia.imagens_complementares.map((img, i) => `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                  <img src="${img.src}" class="d-block w-100" alt="${img.descricao}">
                  <div class="carousel-caption d-none d-md-block">
                    <p>${img.descricao}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselDetalhes" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselDetalhes" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>
          </div>
        `;
      });

  } else {
    // Página inicial
    const carouselInner = document.getElementById('carousel-inner');
    const indicators = document.getElementById('carousel-indicators');
    const cardsContainer = document.getElementById('cards-container');

    fetch(apiUrl)
      .then(res => res.json())
      .then(noticias => {
        let destaques = noticias.filter(n => n.destaque);
        //Carrossel
        destaques.forEach((n, i) => {
          carouselInner.innerHTML += `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
              <img src="${n.imagem_principal}" class="d-block w-100" alt="${n.titulo}">
              <div class="carousel-caption d-none d-md-block">
                <h5>${n.titulo}</h5>
                <p>${n.descricao}</p>
              </div>
            </div>
          `;
          indicators.innerHTML += `
            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="${i}"
              class="${i === 0 ? 'active' : ''}" aria-current="${i === 0}" aria-label="Slide ${i + 1}">
            </button>
          `;
        });

        noticias.forEach(n => {
          cardsContainer.innerHTML += `
            <div class="card col-12 col-md-4 mb-4">
              <img src="${n.imagem_principal}" class="card-img-top" alt="${n.titulo}">
              <div class="card-body">
                <h5 class="card-title">
                  <a href="detalhes.html?idNoticia=${n.id}">${n.titulo}</a>
                </h5>
                <p class="card-text">${n.descricao}</p>
                <p><small>Por ${n.autor} - ${n.data}</small></p>
              </div>
            </div>
          `;
        });
      });
  }
});