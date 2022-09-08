const seccion = document.querySelector("section#contenido")
const loader = document.querySelector("section.loader")
const URL = "/traileflix.json" //cambiar el nombre o ruta para probar cardError()
  let tf = [] //Array vacío, nos permite cargar la respuesta de FETCH, nuestro "Servidor Remoto"

const peticionFetch = async ()=> {
    const response = await fetch(URL)
    const data = await response.json()
          return data
}

const retornoCardContenido = (content)=> {
    const {id, titulo, poster} = content
    return `<div class="card">
                <img class="poster" id="${id}" src="${poster}" alt="${titulo}" title="${titulo}" loading="lazy" onclick="guardarContenidoEnLS('${id}')">
            </div>`
}

const retornoCardError = ()=> {
    return `<div class="error-contenido">
                <div class="emoji-cine">🎬</div>
                <p>Parece que hubo un error :(</p>
                <p>Intenta nuevamente en unos segundos...</p>
            </div>`
}

const cargarContenido = async ()=> {
    let contenidoHTML = ""
        try {
            tf = await peticionFetch()
            tf.forEach(content => {
                contenidoHTML += retornoCardContenido(content)
            })
            seccion.innerHTML = contenidoHTML
        } catch (error) {
            seccion.innerHTML = retornoCardError()
        } finally {
            loader.innerHTML = ""
        }
}
cargarContenido()    

const guardarContenidoEnLS = (id)=> {
    let resultado = tf.find((contenido)=> contenido.id == id)
        if (resultado) {
            localStorage.setItem("detalle", JSON.stringify(resultado))
            location.href = "detalle.html"
        }
}