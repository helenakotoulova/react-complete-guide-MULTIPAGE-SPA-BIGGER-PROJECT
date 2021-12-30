import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/hooks/use-http";
import { getAllQuotes } from "../lib/lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true); // zde nastavime true, protoze zaciname v loading state

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  // pripad, kdy je loadovani dokonceni, ale nemame loadedQuotes (tzn: !loadedQuotes) nebo jsou prazdne, tzn jejich length === 0.
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
