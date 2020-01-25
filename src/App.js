import React, { useState, useCallback } from 'react'
import Repo from './components/Repo'

const API_ENDPOINT = 'https://api.github.com/search/repositories'

const App = () => {
  const [input, setInput] = useState('')
  const [repos, setRepos] = useState([])

  const onSearch = useCallback(e => {
    setInput(e.target.value)
    fetch(`${API_ENDPOINT}?q=${e.target.value}`)
      .then(response => response.json())
      .then(json => {
        setRepos(json.items)
      })
  }, [])

  return (
    <div className="container">
      <div className="p-4 row justify-content-center">
        <div className="input-group col-12 col-md-6">
          <input
            className="form-control"
            placeholder="Search Repo..."
            type="text"
            value={input}
            onChange={onSearch}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="button">
              <i className="fa fa-search px-2" />
            </button>
          </div>
        </div>
      </div>
      <div className="search-result p-2 p-md-5">
        {
          repos.map(repo => <Repo key={repo.id} {...repo} />)
        }
      </div>
    </div>
  )
}

export default App
