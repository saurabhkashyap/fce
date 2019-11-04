import React, { useState } from "react";
import PropTypes from "prop-types";
import * as AppSearch from "@elastic/app-search-javascript";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import SearchUIResults from "../SearchUIResults";
import SiegeFilter from "./Filters/SiegeFilter";
import StateFilter from "./Filters/StateFilter";
import NafFilter from "./Filters/NafFilter";
import LocationFilter from "./Filters/LocationFilter";
import Config from "../../services/Config";

import "./search.scss";

const client = AppSearch.createClient(Config.get("appSearch").client);

const defaultOptions = Config.get("appSearch").defaultOptions;

const SearchUI = ({ divisionsNaf, loadLocations }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultList, setResultList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    naf: null,
    location: null,
    siege: null,
    state: ["A", "F"]
  });

  const allFiltersOptions = {
    ...(filters.siege && { etablissementsiege: "true" }),
    ...(filters.state.length === 1 && {
      etatadministratifetablissement: filters.state[0]
    }),
    ...(filters.naf && { naf_division: filters.naf }),
    ...(filters.location &&
      (filters.location.value.length < 5
        ? {
            departement: filters.location.value
          }
        : {
            codecommuneetablissement: filters.location.value
          }))
  };

  const options = {
    ...defaultOptions,
    filters: {
      all: Object.entries(allFiltersOptions).map(([field, value]) => ({
        [field]: value
      })),
      none: {
        ...(filters.state.length === 0 && {
          etatadministratifetablissement: ["A", "F"]
        })
      }
    }
  };

  console.log({ resultList });
  console.log({ options });

  const sendRequest = (query, options) => {
    setIsLoading(true);
    setError(null);
    client
      .search(query, options)
      .then(resultList => {
        setResultList(resultList);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
        console.error(`error: ${error}`);
      });
  };

  const handlePageChange = nextCurrentPage =>
    sendRequest(searchTerm, {
      ...options,
      page: {
        ...options.page,
        current: nextCurrentPage
      }
    });

  const addFilters = (field, value) => {
    if (field === "state") {
      setFilters({
        ...filters,
        state: [...filters.state, value]
      });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  const removeFilters = (field, value) => {
    if (field === "state") {
      setFilters({
        ...filters,
        state: [...filters.state.filter(state => state !== value)]
      });
    } else {
      setFilters({ ...filters, [field]: null });
    }
  };

  return (
    <div className="App">
      <div className="app-search pb-4">
        <div className="columns app-search--container">
          <div className="column is-offset-2-desktop is-offset-2-tablet is-8-desktop is-8-tablet search">
            {error && (
              <div className="notification is-danger">
                Une erreur est survenue lors de la communication avec l{"'"}
                API
              </div>
            )}
            <form
              className="form search-form"
              onSubmit={e => {
                e.preventDefault();
                sendRequest(searchTerm, options);
              }}
            >
              <div className="field is-grouped is-grouped-centered">
                <div className="control is-expanded">
                  <input
                    type="text"
                    name="q"
                    id="term"
                    className="input is-medium"
                    placeholder="SIRET, SIREN, raison sociale, nom"
                    onChange={e => setSearchTerm(e.target.value)}
                    value={searchTerm}
                  />
                </div>
                <div className="control">
                  <button
                    type="submit"
                    className="action button is-outlined is-light is-medium"
                  >
                    {false ? (
                      <span className="icon">
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </span>
                    ) : (
                      "Rechercher"
                    )}
                  </button>
                </div>
              </div>
            </form>
            <div className="columns facets__checkboxes">
              <div className="column is-one-third">
                <SiegeFilter
                  filters={filters}
                  addFilters={addFilters}
                  removeFilters={removeFilters}
                />
              </div>
              <div className="column is-one-third">
                <StateFilter
                  filters={filters}
                  addFilters={addFilters}
                  removeFilters={removeFilters}
                />
              </div>
            </div>{" "}
            <div className="columns facets__selects">
              <div className="column is-one-third">
                <NafFilter
                  filters={filters}
                  addFilters={addFilters}
                  removeFilters={removeFilters}
                  divisionsNaf={divisionsNaf}
                />
              </div>
              <div className="column is-one-third">
                <LocationFilter
                  filters={filters}
                  addFilters={addFilters}
                  removeFilters={removeFilters}
                  loadLocations={loadLocations}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {resultList && (
        <SearchUIResults
          results={resultList.rawResults}
          pagination={{
            current: resultList.info.meta.page.current,
            handlePageChange,
            itemsPerPage: resultList.info.meta.page.size,
            pages: resultList.info.meta.page.total_pages,
            items: resultList.info.meta.page.total_results,
            searchTerm
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

SearchUI.propTypes = {
  divisionsNaf: PropTypes.array.isRequired,
  loadLocations: PropTypes.func.isRequired
};

export default SearchUI;
