import { useParams, Outlet } from "react-router-dom";
import { Fragment, useEffect } from "react";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuotesDetail = () => {
  const params = useParams();
  const { quoteId } = params; // object destructuring
  //const match = useRouteMatch(); // to ted uz ve v6 nebudeme potrebovat
  //console.log(match) // isExact: false, params: {quoteId: 'q2'}, path: "/quotes/:quoteId", url: "/quotes/q2"

  // takhle jsme to meli, kdyz jsme tu meli vypsane ty DUMMY_QUOTES
  //const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  // pokud uzivatel zada do url napr. quotes/q3, ktery nemame, tak se displayn tahle fallback hlaska.
  //if (!quote) {
  //return <p>No Quote Found.</p>;
  //}

  /*
  GETTING CREATED WITH NESTED ROUTES
  Pridali jsme Link na loadovani commentu. Ale ten odkaz Load Comments tam zusrava i po kliknuti na nej.
  Tzn. bud muzeme vytorit nejakou const, ktera bude zjistovat jestli uz jsem na strance /quotes/quoteId/comments a podle toho
  to Load Comments bude bud skryvat nebo odkryvat. Nebo to load comments pridame do samostatne Route,
  ktera bude mit path jen quotes/quoteId EXACT. Tazke kdyz budeme na quotes/quoteId, tak tam bude Link LoadComments,
  ale jakmile se dostaneme na quotes/quoteId/comments, uz to tam nebude, protoze budeme v jine Route.
 */

  /*
WRITING MORE FLEXIBLE ROUTING CODE
Ted kdyz bychom chteli zmenit route path z napr. '/quotes' na '/quote', tak bychom to pak museli spravit ve vsech
nested routes a taky v Links. Tzn na hodne mistech.
Proto pouzijeme dalsi react router dom hook => useRouteMatch. Je to podobne jako useLocation, ale dava nam to vic info o te konkretni Route.
const match = useRouteMatch();
//console.log(match) // isExact: false, params: {quoteId: 'q2'}, path: "/quotes/:quoteId", url: "/quotes/q2"
Tzn misto: <Route path={`/quotes/${params.quoteId}/comments`}>
Pak muzeme psat: <Route path={`${match.path}/comments`}>
A misto: <Route path={`/quotes/${params.quoteId}`} exact>
Muzeme psat: <Route path={match.path} exact>
A misto: <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
Napisu: <Link className="btn--flat" to={`${match.url}/comments`}>
*/

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "error") {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Outlet />
    </Fragment>
  );
};

export default QuotesDetail;

/*
VE VERZI 5 REACT-ROUTER-DOMU:
return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
*/

// ta className='centered' je nadefinovana primo v index.css a ne v zadnem modulu.css
// i ta className v Linku je nadef. primo v index.css

/*
PRIPADNE: 
Protoze tady definujeme route a ne link, mohli bychom taky nastavit path jako:
path='/quotes/:quoteId/comments'
*/

/*
DYNAMIC ROUTES AND PARAMS:
-dynamic routes jsou pro zobrazovani detailu nejakeho produktu, na ktery jsme klikli.
tu route pak zapiseme jako: 
<Route path="/quotes/:quoteId">
            <QuotesDetail />
</Route>

Ale abychom vedeli, ktery ten QuoteDetail mame zobrazit (tzn. pro ktere id quote to mame zobrazit), potrebujeme zjisit to quoteId.
To udelame pomoci useParams v QuoteDetail:
const params=useParams();
 <Route path={`/quotes/${params.quoteId}/comments`}>
            <Comments />
</Route>
*/

/*
ABYCHOM SE ALE DOSTALI NA TY JEDNOTLIVE ODKAZY, POTREBUJEME LINKS
Napr. v MainHeaderu - zde je to hardcoded.
<NavLink to="/quotes" activeClassName={classes.active}>
              All Quotes
 </NavLink>

 Nebo v QuoteItem - zde je to dynamic. protoze pro kazdy ten quote se nacte jina "stranka" fullscreen. - podle id.
 <Link to={`/quotes/${props.id}`} className='btn'>
        View Fullscreen
</Link>


*/
