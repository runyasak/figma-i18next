import { h } from "preact";
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

const pageTitle = {
  "justify-content": "unset",
  width: "268px",
};

const languageDescription = {
  "justify-content": "unset",
  width: "243px",
};

const Library = () => {
  return (
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
      <Columns>
        <IconCheckCircleFilled32 />
        <MiddleAlign style={languageDescription}>
          EN Language (4 Words)
        </MiddleAlign>
        <IconButton
          onClick={(e) => {
            console.log("abx");
          }}
        >
          <IconAdjust32 />
        </IconButton>
      </Columns>
    </Container>
  );
};

export { Library };
