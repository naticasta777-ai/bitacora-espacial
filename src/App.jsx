import { useEffect, useState } from "react"
import NoticiaCard from "./components/NoticiaCard/NoticiaCard.jsx"

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [noticias, setNoticias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [termino, setTermino] = useState("")

  useEffect(() => {
    const controlador = new AbortController()

    const parametros = new URLSearchParams({ limit: 12 })
    if (termino) {
      parametros.set("search", termino)
    }

    fetch(`${API_URL}/articles/?${parametros}`, { signal: controlador.signal })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}`)
        }
        return respuesta.json()
      })
      .then((datos) => {
        setNoticias(datos.results)
        setError(null)
        setCargando(false)
      })
      .catch((err) => {
        if (err.name === "AbortError") return
        setError("No pudimos cargar las noticias. Intenta de nuevo más tarde.")
        setCargando(false)
      })

    return () => controlador.abort()
  }, [termino])

  function buscar(evento) {
    evento.preventDefault()
    const texto = new FormData(evento.currentTarget).get("q").trim()
    if (texto !== termino) {
      setCargando(true)
    }
    setTermino(texto)
  }

  const sinResultados = !cargando && !error && noticias.length === 0

  return (
    <>
      <header className="contenedor cabecera">
        <p>Bitácora Espacial</p>
        <nav aria-label="Principal">
          <a href="#noticias">Noticias</a>
          <a href="#blogs">Blogs</a>
          <a href="#acerca">Acerca</a>
        </nav>
      </header>

      <main className="contenedor">
        <h1>Noticias de exploración espacial</h1>

        <form className="buscador" onSubmit={buscar}>
          <label htmlFor="busqueda">Buscar por tema</label>
          <input
            id="busqueda"
            name="q"
            type="search"
            placeholder="Ej.: Mars, Artemis, SpaceX"
          />
          <button type="submit">Buscar</button>
        </form>

        <section aria-labelledby="titulo-resultados">
          <h2 id="titulo-resultados">Últimas noticias</h2>

          {cargando && <p role="status">Cargando noticias...</p>}
          {error && <p role="alert">{error}</p>}
          {sinResultados && (
            <p role="status">No hay noticias para "{termino}".</p>
          )}

          <div className="grid-noticias">
            {noticias.map((noticia) => (
              <NoticiaCard
                key={noticia.id}
                titulo={noticia.title}
                resumen={noticia.summary}
                imagen={noticia.image_url}
                fuente={noticia.news_site}
                fecha={noticia.published_at}
                enlace={noticia.url}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="contenedor">
        <p>Datos: Spaceflight News API</p>
      </footer>
    </>
  )
}

export default App