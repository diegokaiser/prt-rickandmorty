import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getCharacters } from './../hooks/useFetch'
import Loading from './UI/Loading'
import Error from './UI/Error'
import { useLayoutEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { gsap } from 'gsap'

function Characters() {
  const [currentPage, setCurrentPage] = useState(1)
  const { status, data, error, isFetched } = useQuery(
    ['chars', currentPage], () => getCharacters(currentPage))
  let info 
  let results
  if (isFetched) {
    info = {...data.info}
    results = [...data.results]
  }

  const cardsRef = useRef(null)
  const ctx = useRef(null)

  useLayoutEffect(() => {
    if (status === 'success') {
      ctx.current = gsap.context(() => {
        const cards = gsap.utils.toArray('.card')
        cards.map((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              scale: 0.9
            },
            {
              opacity: 1,
              scale: 1,
              delay: .01 + (i / 10)
            }
          )
        })
      }, cardsRef)
      return () => ctx.current.revert()
    }
  }, [status])

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
        status === 'loading' && <Loading />
      }
      {
        status === 'error' && <Error error={error} />
      }
      <div className="cards" ref={cardsRef}>
        {
          status === 'success' &&
          results.map(result => (
            <Link 
              to={`${result.id}`} 
              className="card" 
              key={result.id}
            >
              <div className="card__avatar">
                <img src={result.image} alt={result.name} />
              </div>
              <div className="card__name">
                <h4>{result.name}</h4>
              </div>
              <div className="card__status">
                <span className={result.status.toLowerCase()}>{result.status}</span>
              </div>
              <div className="card__species">
                {result.species}
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

export default Characters