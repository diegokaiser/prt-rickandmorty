import { useState } from 'react'
import { FaAngleLeft, FaAngleRight, FaEllipsis } from 'react-icons/fa6'

function Pagination({ pages, currentPage }) {
  const [page, setPage] = useState(currentPage)
  const prevPage = (e) => {
    e.preventDefault()
    if (page != 1) {
      setPage(page - 1)
    }
  }
  const nextPage = (e) => {
    e.preventDefault()
    setPage(page + 1)
  }
  const goTo = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }
  return (
    <div className="pagination">
      <ul>
        <li>
          <button 
            disabled={page == 1 ? 'disabled' : ''}
            onClick={prevPage}
          >
            <FaAngleLeft />
          </button>
        </li>

        {
          page != 1 &&
          <li>
            <button 
              type="button"
              onClick={goTo}
              value={page - 1}
            >
              {page - 1}
            </button>
          </li>
        }
        <li>
          <button 
            className='active'
            type="button"
            onClick={goTo}
            value={page}
          >
            {page}
          </button>
        </li>
        {
          page != 1 &&
          <li>
            <button 
              type="button"
              onClick={goTo}
              value={page + 1}
            >
              {page + 1}
            </button>
          </li>
        }

        <li>
          <button 
            type="button"
            onClick={nextPage}
          >
            <FaAngleRight />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination