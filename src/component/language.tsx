import {
  Columns,
  Container,
  IconAdjust32,
  IconButton,
  IconCheckCircleFilled32,
  MiddleAlign,
} from "@create-figma-plugin/ui";
import { h, JSX } from "preact";
import styles from "../style.css";

const languageDescription = {
  "justify-content": "unset",
  width: "243px",
};

const Language = (props: {
  status: string;
  description: string;
  language: string;
  onDetailClick: (language: string) => void;
}) => {
  return (
    <Container space='extraSmall'>
      <Columns>
        <div class={styles.enableIcon}>
          <IconCheckCircleFilled32 class={styles.enableIcon} />
        </div>
        <MiddleAlign style={languageDescription}>
          {props.description}
        </MiddleAlign>
        <IconButton
          onClick={() => props.onDetailClick(props.language) }
        >
          <IconAdjust32 />
        </IconButton>
      </Columns>
    </Container>
  );
};

export { Language };
