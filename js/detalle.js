const detalle = document.querySelector("section#detalle")
const volver = document.querySelector("div.emoji-volver")

const retornoDetalle = (detalle)=> {
    const {titulo, poster, categoria, genero, resumen, reparto, trailer} = detalle
      let trailerHTML = ""
      /* Desde aquí resuelvo si el contenido incluye la propiedad trailer. Si la tiene, 
         creo un Template String que agrega un <iframe>.
         Tal como pasa con los videos EMBED de Youtube, al usarlos en un IFRAME, debes resolver
         El ALTO y ANCHO y pasarlos al IFRAME como atributos. Para ello, aprovecho BOM JS
         y tomo el ancho de la pantalla, y con ello calculo el alto. Finalmente armo el Template
         String con todos los parámetros que éste espera. */
          if (trailer) {
             const ancho = parseInt(window.innerWidth * 0.8)
             const alto = parseInt(ancho * 0.6)
                   console.log("ancho", ancho, "Alto", alto, "Trailer", trailer)
                   trailerHTML = `<div id="trailer">
                                      <iframe src="${trailer}" 
                                              frameborder="0" 
                                              width="${ancho}" 
                                              height="${alto}"></iframe>
                                  </div>`
          }
      // Todo esto, me asegura que el video se muestre de acuerdo al ancho de la pantalla dnd se carga.
      // Fin del código para agregar un TRAILER solo si está disponible.
    return `<section id="contenido">
                <h2>${titulo}</h2>
                <img src="${poster}" alt="${titulo}" title="${titulo}">
                <p class="info">SINOPSIS</p>
                <p>${resumen}</p>
                <p class="info">CATEGORÍA</p>
                <p>${categoria}</p>
                <p class="info">GÉNERO</p>
                <p>${genero}</p>
                <p class="info">REPARTO</p>
                <p>${reparto}</p>
            </section>
            ${trailerHTML}`
}

const retornoCardError = ()=> {
    return `<div class="error-contenido">
                <div class="emoji-cine">🎬</div>
                <p>Parece que hubo un error :(</p>
                <p>Intenta nuevamente en unos segundos...</p>
            </div>`
}

const recuperoInfo = ()=> {
    if (localStorage.detalle) {
        const objDetalle = JSON.parse(localStorage.getItem("detalle"))
              detalle.innerHTML = retornoDetalle(objDetalle)
    } else {
        detalle.innerHTML = retornoCardError()
    }
}
recuperoInfo()

volver.addEventListener("click", ()=> location.href = "index.html")