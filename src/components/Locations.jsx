import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getLocations } from '../hooks/useFetch'
import Loading from './UI/Loading'
import Error from './UI/Error'
import { useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

function Locations() {
  const [currentPage, setCurrentPage] = useState(1)
  const { isLoading, data, isError, error, isFetched } = useQuery(
    ['locations', currentPage], () => getLocations(currentPage))
  let info 
  let results
  if (isFetched) {
    info = {...data.info}
    results = [...data.results]
  }
  const prevPage = (e) => {
    e.preventDefault()
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = (e) => {
    e.preventDefault()
    setCurrentPage(currentPage + 1)
  }
  return (
    <>
      {
        isLoading && <Loading />        
      }
      {
        isError && <Error error={error} />
      }
      <div className="locations">
        {
          isFetched &&
          results.map(result => (
            <Link to={`${result.id}`} className='location' key={result.id}>
              <div className="location__name">
                {result.name} - <span>{result.type}</span>
              </div>
            </Link>
          ))
        }
      </div>
      {
        isFetched &&
        <div className="pagination">
          <ul>
            <li>
              <button 
                type="button"
                disabled={currentPage == 1 ? 'disabled' : ''}
                onClick={prevPage}
              >
                <FaAngleLeft />
              </button>
            </li>
            <li>
              <button 
                type="button"
                disabled={currentPage == info.count ? 'disabled' : ''}
                onClick={nextPage}
              >
                <FaAngleRight />
              </button>
            </li>
          </ul>
        </div>
      }
    </>
  )
}

export default Locations