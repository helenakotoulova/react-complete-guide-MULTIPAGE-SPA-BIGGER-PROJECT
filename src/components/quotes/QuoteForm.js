import { useRef, useState } from "react";
//import { Prompt } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false); // kdyz ted nemame ve v6 ten Prompt, tak tohle uz nevyuzijeme.
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  /*
  Nyni chceme pridat warning, kde se budeme uzivatele ptat, jestli chce opravdu opustit stranku (kde vypisuje data do form) kdyz omylem klikne na go back button.
  Protoze nechceme aby tim ze omylem klikne ztratil ty data, co tam uz napsal.
  Proto pridame formFocusHandler (ve form je implemented prop onFocus), kde nastavime, ze uzivatel zacat vypisovat form. 
  */
  const formFocusHandler = () => {
    setIsEntering(true);
  };
  /*
  pak => React router dom ma komponentu PROMPT, ktera pozna, ze chceme navigovat pryc. A pri urcite podmince vypise warning.
  Ma dve props: when - to je true nebo false. My tam dame to isEntering. takze kdyz je isEntering true a uzivatel pak chce navigvoat pryc, vypise se ten warning, resp. message.
  Ta message je function - ma informaci o location, coz je stranka, na kterou se uzivatel snazi dostat. My to ted ale nebudeme potrebovat.
  Tzn. output te funkce bude proste jen string.
  Ted tedy se vypise ta hlaska, kdyz zacneme vypisovat form, a pak se snazime odejit.
  Jenomze mame problem => pri pridani quote se ta hlaska vypise taky. proto k button Add Quote pridame onClick funkci,
  ktera nam nastavi isEntering na false.
  */

  const finishedEnteringHandler = () => {
    setIsEntering(false);
  }

  return (
    <Fragment>
      {/*Prompt is not supported by v6 of react-router-dom*/}
      {/*<Prompt when={isEntering} message={(location) => 'Are you sure you want to leave? All your entered data will be lost!'}/>*/}
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishedEnteringHandler} className="btn">Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
