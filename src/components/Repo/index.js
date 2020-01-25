
import React from 'react'

const Repo = ({
  html_url, full_name, description, stargazers_count, language,
}) => (
  <div className="repo card border-0">
    <div className="card-body">
      <h4 className="card-title">
        <a href={html_url} target="_blank" rel="noopener noreferrer">{ full_name }</a>
      </h4>
      <p className="card-text">{ description }</p>
      <div>
        <span className="mr-2">
          <i className="fas fa-star" />
          <span className="pl-2">{ stargazers_count }</span>
        </span>
        <span className="mr-2">
          <i className="fas fa-circle" />
          <span className="pl-2">{ language }</span>
        </span>
      </div>
    </div>
  </div>
)

export default Repo
