import React, { Suspense } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
//import AllQuotes from "./pages/AllQuotes";
//import NewQuote from "./pages/NewQuote";
//import QuotesDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
//import NotFound from "./pages/NotFound";
import Comments from "./components/comments/Comments";
import LoadingSpinner from "./components/UI/LoadingSpinner";

//concept lazy loading. misto importu vyse udelame nasledujici:
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
// takhle se to bude donwloadovat jen kdyz to bude potreba.
// problem ale je ze ten download muze chvili trvat. proto pridame Susepnse komponentu,
// ktera bude obsahovat fallback function, ktera bude zobrazovat nejaky obsah na strance nez se to downloadne.
const QuotesDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate replace to="/quotes" />} />
            <Route path="/quotes" element={<AllQuotes />} />
            <Route path="/quotes/:quoteId" element={<QuotesDetail />}>
              <Route
                path=""
                element={
                  <div className="centered">
                    <Link className="btn--flat" to={`comments`}>
                      Load Comments
                    </Link>
                  </div>
                }
              />
              <Route path={`comments`} element={<Comments />} />
            </Route>
            <Route path="/new-quote" element={<NewQuote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Suspense>
    </div>
  );
}

export default App;

/*
DEPLOYING REACT APP:
- LAZY LOADING - load only the code which it's needed, tzn. 
pokud ja si rozkliknu tu stranku, na zacatku staci aby bylo downloadovane jen to allQuotes,
nemusi byt downloadovane i to addQuote - treba na to ani nikdy nekliknu.
- dame npm run build
- React single page app (SPA) je static website. tzn obsahuje jen html, css a JS, tzn jen client-side.
Nemame zadny backend API (server-side) se kterym by se to muselo propojovat. Misto backendu jsme pouzili dummy databazi na firebase.
Nyni tedy potrebujeme static site host - lze vyhledat ruzne na netu.
My pouzijeme treba tu od Firebase. Ale to ze pouzivame firebase databzi jeste enznamea ze musime pouzit i fireabse hosting site.
- pak dame: npm install -g firebase-tools
*/

/*
To bylo ve verzi 5:
Switch bude prochazet ty Routes a jestli zadna nebude matchovat, tak dojde na tuhle:
 <Route path='*'>
            <NotFound />
</Route>

To '*' znamena match all. takze kdyz nebude zadna path sedet, zobrazi se ta stranka NotFound.
*/
