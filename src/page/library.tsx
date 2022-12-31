import { h } from "preact";
import styles from "../style.css";
import { Language } from "../component/language";
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

const Library = () => {
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
      <Language
        status='enable'
        description='EN Language (5 Words)'
        language='th'
      />
    </div>
  );
};

export { Library };
