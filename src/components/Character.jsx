import { useQuery } from '@tanstack/react-query'
import { getCharacter } from '../hooks/useFetch'
import Loading from './UI/Loading'
import Error from './UI/Error'
import { useParams } from 'react-router-dom'

function Character() {
  let { id } = useParams()
  const { isLoading, data, isError, error, isFetched } = useQuery(
    ['char', id], () => getCharacter(id))
  return (
    <>
      {
        isLoading && <Loading />        
      }
      {
        isError && <Error error={error} />
      }
      {
        isFetched &&
        <div className="char">
          <div className="char__avatar">
            <img src={data.image} alt="data.name" />
          </div>
          <div className="data">
            <div className="data__info">
              <h2>{data.name}</h2>
            </div>
            <div className="data__info">
              <strong>Status: </strong><span className={data.status.toLowerCase()}>{data.status}</span>
            </div>
            <div className="data__info">
              <strong>Species</strong> {data.species}
            </div>
            <div className="data__info">
              <strong>Origin: </strong>{data.origin.name}
            </div>
            <div className="data__info">
              <strong>Location: </strong>{data.location.name}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Character