import { h } from "preact";
import styles from "../style.css";
import { Language } from "../component/language";
import { Languages } from "../utility/languageStorage";
import { LanguageDetail } from "./languageDetail";
import {
  Columns,
  Container,
  VerticalSpace,
  IconButton,
  IconPlus32,
  MiddleAlign,
} from "@create-figma-plugin/ui";
import { useState } from "preact/hooks";

const pageTitle = {
  "justify-content": "unset",
  width: "268px",
};

const Library = (props: { languages: Languages }) => {
  const [currentLanguage, setCurrentLanguage] = useState("");

  const handleItemClick = (language: string): void => {
    setCurrentLanguage(language);
  };

  const header = () => {
    return (
      <Container space='medium'>
        <VerticalSpace space='small' />
        <Columns space='extraSmall'>
          <MiddleAlign style={pageTitle}>Local library</MiddleAlign>
          <IconButton
            onClick={(e) => {
              console.log("abcx");
            }}
          >
            <IconPlus32 />
          </IconButton>
        </Columns>
      </Container>
    );
  };

  const languageList = () => {
    return props.languages.map((language) => (
      <Language
        status='enable'
        description={`${language.language} Language (5 Words)`}
        language={language.language}
        onDetailClick={handleItemClick}
      />
    ));
  };

  if (currentLanguage === "") {
    return (
      <div>
        {header()}
        {languageList()}
      </div>
    );
  } else {
    return (
      <LanguageDetail
        language={currentLanguage}
        onDetailClick={handleItemClick}
      />
    );
  }
};

export { Library };
