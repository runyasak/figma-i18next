import { h } from "preact";
import styles from "../style.css";
import { Language } from "../component/language";
import { Languages } from "../utility/languageStorage";
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

  const handleItemClick = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <div>
      {currentLanguage === "" ? (
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
          <Language
            status='enable'
            description='EN Language (5 Words)'
            language='th'
            onDetailClick={handleItemClick}
          />
        </div>
      ) : (
        <div>
          Detail
          <button onClick={() => handleItemClick("")}>th</button>
        </div>
      )}
    </div>
  );
};

export { Library };
