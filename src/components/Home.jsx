import portal from '../assets/images/portal.gif'

function Home() {
  return (
    <>
      <div className="home">
        <p>
          This is a simply React exercise fetching data from The Rick and Morty API.
          <br />
          See all the characters from Characters section (duh!), locations and episodes.
          <br />
          All data was provided by The Rick and Morty API.
        </p>
        <p>
          Esto es un ejercicio simple en React consumiendo data desde el API de Rick and Morty.
          <br />
          Mira todos los personajes en la sección Characters (obvio!), ubicaciones y episodios.
          <br />
          Toda la data ha sido proveída por The Rick and Morty API.
        </p>
        <img src={portal} alt="Portal" />
      </div>
    </>
  )
}

export default Home