import React from "react";
import SearchRepos from "../SearcRepos/SearchRepos";
import { useState, useEffect } from 'react';

const Repo = ({ repo, forks, stars, userInfo, }) => {
  const { name, html_url, description, language } = repo;
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState("");
  const handleQueryInput = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (query) {
      setRepos(value);
    } else {
      console.log("Your query is empty...");
    }
  };
  useEffect(() => {
    const displayUsersOnChange = async () => {
    };
    displayUsersOnChange();
  }, [query]);
  return (
    <div className="repo">
      <div className="repo_desc">
        <h3>
          <a href={html_url}>{name}</a>
        </h3>
        <p>{description}</p>
        {language && <small>Written in {language}</small>}
      </div>
      <div className="repo_additional_info">
        <p>
          {
            forks
          } Forks
        </p>
        <p>
          {
            stars
          } Stars
        </p>
      </div>
    </div>
  );
};

export default Repo;
