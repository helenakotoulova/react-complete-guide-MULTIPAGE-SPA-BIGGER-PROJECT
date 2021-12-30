import { Fragment, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  //let isSortingAscending = queryParams.get('sort') === 'asc';
  //let isSortingAscending=true;
  const [isSortingAscending, setIsSortingAscending] = useState(true);

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    /*navigate(location.pathname, {
      search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
    });*/
    setIsSortingAscending(value => !value);
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;


/*import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

// sortovaci funkci pridame pred tu komponentu QuoteList
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1; // jestli je quoteA.id vetsi nez quoteB.id tak je to OK (1), jinak -1 a musi se prohodit.
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  //const history = useHistory(); // ve verzi 5
  const navigate = useNavigate();
  const location = useLocation(); // ma search parameter: search: '?sort=asc'

  // takhle extractneme ty query Params
  const queryParams = new URLSearchParams(location.search); // built in JS constructor function
  // console.log(queryParams) => vypise to takovy dlouhy objekt
  // abychom ziskali jen tu hodnotu query parameteru nazvanou sort, pouzijeme get metodu.
  const isSortingAscenging = queryParams.get("sort") === "asc"; // pokud to sort='asc', tak tohle bude true.
  // pomoci te const isSortingAscending pak muzeme nastavit ten button dynamically.

  const changeSortingHandler = () => {
    /*
    Mohli bychom tady pridat nejaky useState, aby se dalo nastavit jestli se to ma sortovat jako ascending nebo descending.
    A podle toho by se spustila nejaka sortovaci fce.
    My ale budeme ted pouzivat query parameters. Je to nejaky otaznik v url.
    Kdyz pak nekomu posleme odkaz na tu stranku, tak tam bude zachovane to sortovani.
    => ziskame tak sharable url.
    Pouzijeme hook useHistory, ktery nam umozni zmenit url (napr. pri navigovani jinam) => tzn. 
    to ze muzeme menit url, znamena, ze budeme moc pridat query parameters do naseho url. 
    Pouzijeme push, abychom mohli jit zpet k tomu poslednimu nastavenemu sorting.
    Ten query parameter je ten za tim OTAZNIKEM. Muzeme to zapsat jako /quotes?sort=asc ale pak tam budeme davat nejaky dynamic vyraz.
    Pak chceme precist ten query parameter, abychom to mohli podle nej seradit ascendingly nebo descendingly.
    Abychom to mohli precist pouzijeme useLocation hook, ktery nam umoznuje precist soucasnou url.
    */

    // pouzijeme tady taky more flexible routes code. nepotrebujeme ted ani useROuteMatch, staci nam useLocation.
    // Puvodni verze: history.push("/quotes?sort=" + (isSortingAscenging ? "desc" : "asc"));
    // Pak jsme to zapsali takhle: history.push(`${location.pathname}?sort=${(isSortingAscenging ? "desc" : "asc")}`);
    // Ale protoze se to tak blbe cte, napiseme to vice programatorsky:
    //history.push({ // misto toho navigate:
    /*
    navigate(location.pathname, {
      search: `?sort=${isSortingAscenging ? "desc" : "asc"}`,
    });
  };
/*
  // tady vytvorime ty sortedQuotes, ktera pak zobrazuje v tom QuotesList.
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscenging);
  // kdyz ted nekomu posleme tu url, tak tam bude ta informace o tom jestli je to asc nebo desc a taky se mu to tak seradi.

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscenging ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
*/