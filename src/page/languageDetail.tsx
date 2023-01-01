import { h } from "preact";

const LanguageDetail = (props: {
  language: string;
  onDetailClick: (language: string) => void;
}) => {
  return (
    <div>
      <button onClick={() => props.onDetailClick("")}>Go Back</button>
      <br />
      <br />
      Detail {props.language}
    </div>
  );
};

export { LanguageDetail };
