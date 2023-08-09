import { useEffect, useState } from "react";
import SearchProps from "../SearchProps";
import "./SearchArea.css";
interface Occurence {
  current: number;
  end: number;
}
type Text = string | JSX.Element;
const SearchArea = (props: SearchProps) => {
  const [occurrences, setOccurrences] = useState<Occurence>({
    current: 0,
    end: 0,
  });
  const findSearches = (text: string, searched: string) => {
    let res: Text[] = [];
    let unparsedText = "";
    let occurs = 0;
    for (let i = 0; i < text.length - 7; i++) {
      const subsStr = text.substring(i, i + 7);
      if (subsStr === searched) {
        res.push(unparsedText);
        res.push(<b id={`#occurrence-${occurs}`}>{searched}</b>);
        occurs += 1;
        i += 6;
        unparsedText = "";
      } else {
        unparsedText += text[i];
      }
    }
    unparsedText += text.substring(text.length - 7);
    res.push(unparsedText);
    return res;
  };
  useEffect(() => {
    setOccurrences({
      current: 0,
      end: getoccurrences(props.file, props.searchedColor),
    });
    const element = document.getElementById(`#occurrence-0`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.file, props.searchedColor]);
  const getoccurrences = (text: string, searched: string) => {
    let searchRegex = new RegExp(searched, "gi");

    return (text.match(searchRegex) || []).length;
  };
  function updateOccurrence(inc: number): void {
    let updatedOccurrence = occurrences.current + inc;

    if (updatedOccurrence === -1) {
      updatedOccurrence = occurrences.end - 1;
    } else if (updatedOccurrence === occurrences.end) {
      updatedOccurrence = 0;
    }

    const element = document.getElementById(`#occurrence-${updatedOccurrence}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOccurrences((occur) => {
      return { current: updatedOccurrence, end: occur.end };
    });
  }

  return (
    <div className={`SearchAreaContainer ${props.active ? "active" : ""}`}>
      <img
        className="closeIcon"
        src="icon-menu-close-light.svg"
        alt="close"
        onClick={() => props.close()}
      />
      <div className="SearchArea">
        <div className="searchHeader">
          <span>{props.searchedColor}</span>
          <div className="searchNav">
            <span className="occurrences">
              {occurrences.current + 1}/{occurrences.end}
            </span>
            <button onClick={() => updateOccurrence(-1)}>
              <img src="icon-previous.svg" alt="previous" />
            </button>
            <button onClick={() => updateOccurrence(1)}>
              <img src="icon-next.svg" alt="next" />
            </button>
          </div>
        </div>
        <div className="textArea">
          <pre>
            <code>{...findSearches(props.file, props.searchedColor)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
