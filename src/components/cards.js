import { useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * Fade in fade out cards that display movie details.
 * @returns {JSX.Element}
 * @constructor Cards
 */
export function Cards() {
  const navigate = useNavigate();

  /**
   * Static movies for the card, intending to make this non-static
   */
  const [movies, setMovies] = useState([
    {
      Title: "Moonlight",
      Desc: "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
      Poster:
        "https://filmmakermagazine.com/wp-content/uploads/2016/11/Moonlight-3.jpg",
      imdbID: "tt0232500",

      Title_2: "The Fast and Furious",
      Desc_2:
        "Los Angeles police officer Brian O'Conner must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy.",
      Poster_2:
        "https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2021/02/Fast-Furious-Tokyo-Drift-Via-TimeOut.jpg",
      imdbID_2: "tt0232500",
    },
  ]);

  return (
    <>
      {movies.map((movie, index) => (
        <div>
          <div>
            <div className=" cardContainer">
              <div className="gallery">
                <div
                  className="card"
                  style={{ background: `url(${movie.Poster})` }}
                >
                  <h2 className="card_subtitle">spotlight</h2>
                  <h1 className="card_title">{movie.Title}</h1>
                  <p className="card_about"> {movie.Desc}</p>
                  <div className="card_actions">
                    <div className="card_action">
                      <button
                        className="card_btn"
                        onClick={() =>
                          navigate(`/movie?imdbID=${movie.imdbID}`)
                        }
                      >
                        See Movie Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card2">
                  <div
                    className="card"
                    style={{ background: `url(${movie.Poster_2})` }}
                  >
                    <h2 className="card_subtitle">spotlight</h2>
                    <h1 className="card_title">{movie.Title_2}</h1>
                    <p className="card_about">{movie.Desc_2}</p>
                    <div className="card_actions">
                      <div className="card_action">
                        <button
                          className="card_btn"
                          onClick={() =>
                            navigate(`/movie?imdbID=${movie.imdbID}`)
                          }
                        >
                          See Movie Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
