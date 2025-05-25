// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const idNoticia = url.searchParams.get('idNoticia');
  
    if (idNoticia) {
      // Página de detalhes
      const noticia = dados.noticias.find(n => n.id === +idNoticia);
      const container = document.getElementById('detalhes-container');
  
      if (noticia) {
        container.innerHTML = `
          <h1>${noticia.titulo}</h1>
          <p><em>Por ${noticia.autor} - ${noticia.data}</em></p>
          <img src="${noticia.imagem_principal}" class="img-fluid mb-3" alt="${noticia.titulo}">
          <p>${noticia.descricao}</p>
          <p>${noticia.conteudo}</p>
  
          <div id="carouselDetalhes" class="carousel slide mt-4" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${noticia.imagens_complementares.map((img, idx) => `
                <div class="carousel-item${idx === 0 ? ' active' : ''}">
                  <img src="${img.src}" class="d-block w-100" alt="${img.descricao}">
                  <div class="carousel-caption d-none d-md-block">
                    <p>${img.descricao}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselDetalhes" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselDetalhes" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Próximo</span>
            </button>
          </div>
        `;
      } else {
        container.innerHTML = '<h2>Notícia não encontrada.</h2>';
      }
  
    } else {
      // Página inicial
      const carouselInner = document.getElementById('carousel-inner');
      const cardsContainer = document.getElementById('cards-container');
  
      // Carousel de destaques
      dados.noticias.filter(n => n.destaque).forEach((n, idx) => {
        const active = idx === 0 ? ' active' : '';
        carouselInner.innerHTML += `
          <div class="carousel-item${active}">
            <img src="${n.imagem_principal}" class="d-block w-100" alt="${n.titulo}">
            <div class="carousel-caption d-none d-md-block">
              <h5>${n.titulo}</h5>
              <p>${n.descricao}</p>
            </div>
          </div>
        `;
      });
  
      // Cards
      dados.noticias.forEach(n => {
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
    }
  });