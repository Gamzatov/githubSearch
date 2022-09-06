import React from 'react'
import { useState, useEffect } from 'react';
import axios from "../../axios";
import Repo from '../ui/Repo';

const SearchRepos = ({ repo, userInfo }) => {
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
    console.log('string>>>', repo)
    useEffect(() => {
        const displayUsersOnChange = async () => {
        };
        displayUsersOnChange();
    }, [query]);
    return (
        <div className="search-form">
            <form>
                <input value={query} onChange={handleQueryInput} type="text" placeholder="Search for User's Repositories" />
            </form>
            {repo.filter((val) => {
                if (query == "") {
                }
                else if (val.name.toLowerCase().includes(query.toLowerCase())) {
                    return val;
                }
            }).map((val, key) => {
                return <div>
                    {
                        <div className="repo">
                            <div className="repo_desc">
                                <h3>
                                    <a href={val.html_url}>{val.name}</a>
                                </h3>
                                <p>{val.description}</p>
                                {val.language && <small>Written in {val.language}</small>}
                            </div>
                            <div className="repo_additional_info">
                                <p>
                                    {
                                        val.forks
                                    } Forks
                                </p>
                                <p>
                                    {val.stars} Stars
                                </p>
                            </div>
                        </div>
                    }
                    {
                        val.stars
                    }
                </div>
            })}

        </div>
    )
}
export default SearchRepos;
