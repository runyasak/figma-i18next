import { h } from "preact";
import styles from "../style.css";
import { Language } from "../component/language";
import { Languages } from "../utility/languageStorage";
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
  width: "271px",
};

const Library = (props: {
  languageArray: Languages;
  onDetailClick: (language: string) => void;
}) => {
  const header = () => {
    return (
      <Container space='medium'>
        <VerticalSpace space='extraSmall' />
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
        <VerticalSpace space='extraSmall' />
      </Container>
    );
  };

  const languageList = () => {
    return props.languageArray.map((language) => (
      <Language
        status='enable'
        description={`${language.language} Language (5 Words)`}
        language={language.language}
        onDetailClick={props.onDetailClick}
      />
    ));
  };

  return (
    <div>
      {header()}
      {languageList()}
    </div>
  );
};

export { Library };
