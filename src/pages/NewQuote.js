import QuoteForm from "../components/quotes/QuoteForm";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/hooks/use-http";
import { addQuote } from "../lib/lib/api";
import { useEffect } from "react";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote); // startWithPending je defaultne false.
  // udelame objekt destructuring a vytahneme si z useHttp jen ty data, co potrebujeme.
  // ve verzi 5 react-routeru-domu: const history = useHistory(); misto toho:
  const navigate = useNavigate();

  useEffect(()=> {
    if (status === 'completed') {
        //history.push("/quotes");
        navigate('/quotes');
    }
  },[status, navigate])

  const addQuoteHandler = (quoteData) => {
    //console.log(quoteData);
    sendRequest(quoteData);
  };

  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;

/*
Po tom, co zobrazime data, se chceme dostat zpet na hlavni stranku.
Muzeme pouzit hook useHistory. pak zapiseme:
const history = useHistory();
A na to history muzeme bud poslat history.push nebo history.replace
Push vytvari novou stranku a muzeme dat zpet pomoci back button, replace funguje jako redirecting.
Pri vyberu se rozhodujeme dle toho, jestli chceme uzivateli umoznit jit zpet nebo ne. tady mu to chceme umoznit => pouzijeme push.
*/
