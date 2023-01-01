import { h } from "preact";
import styles from "../style.css";
import { Language } from "../component/language";
import { Languages } from "../utility/languageStorage";
import { LanguageDetail } from "./languageDetail";
import {
  Columns,
  Container,
  VerticalSpace,
  Text,
  IconButton,
  IconPlus32,
  MiddleAlign,
  IconCheckCircleFilled32,
  IconAdjust32,
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

  const languageList = () => {
    const list = props.languages.map((language) => {
      return (
        <Language
          status='enable'
          description={`${language.language} Language (5 Words)`}
          language={language.language}
          onDetailClick={handleItemClick}
        />
      );
    });
    return list;
  };

  const libraryPage = () => {
    return (
      <div>
        <Container space='medium'>
          <VerticalSpace space='small' />
          <Columns space='extraSmall'>
            <MiddleAlign style={pageTitle}>Local library</MiddleAlign>
            <IconButton
              onClick={(e) => {
                console.log("abc");
              }}
            >
              <IconPlus32 />
            </IconButton>
          </Columns>
        </Container>
        {languageList()}
      </div>
    );
  };

  return (
    <div>
      {currentLanguage === "" ? (
        libraryPage()
      ) : (
        <LanguageDetail
          language={currentLanguage}
          onDetailClick={handleItemClick}
        />
      )}
    </div>
  );
};

export { Library };
