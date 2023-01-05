import {
  Button,
  Container,
  Divider,
  Dropdown,
  DropdownOption,
  IconButton,
  IconChevronLeft32,
  IconTrash32,
  Textbox,
  TextboxMultiline,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import style from "../style.css";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import { Languages } from "../utility/languageStorage";
import { ResourceKey } from "i18next";

const LanguageDetail = (props: {
  languageName: string;
  languageArray: Languages;
  onDetailClick: (language: string) => void;
}) => {
  const [value, setValue] = useState<null | string>(null);
  const [textValue, setTextValue] = useState<string>("");
  const [jsonObject, setJsonObject] = useState<any>({});
  const [languageName, setlanguageName] = useState<string>(props.languageName);

  const resource = props.languageArray.find((language) => language.language === props.languageName);
  setTextValue(JSON.stringify(resource?.resourceLanguage.translation, null, 2));
  setJsonObject(resource?.resourceLanguage.translation);

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setTextValue(newValue);
  }

  function handleInput(event: JSX.TargetedEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
  }

  function handleInput2(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    console.log(newValue);
    setValue(newValue);
  }

  function handleClick(event: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    console.log(event);
  }

  // function editorDidMount(editor: any, monaco: any) {
  //   console.log("editorDidMount", editor);
  //   editor.focus();
  // }
  // function onChange(newValue: any, e) {
  //   console.log("onChange", newValue, e);
  // }

  // create the editor

  return (
    <div class={style.detailPage}>
      <div class={style.applicationBar}>
        <IconButton onClick={() => props.onDetailClick("")}>
          <IconChevronLeft32 />
        </IconButton>
        <div class={style.text}>Language ({props.languageName})</div>
        <IconButton onClick={handleClick}>
          <IconTrash32 />
        </IconButton>
      </div>
      <Divider />
      {/* <VerticalSpace space='extraSmall' /> */}
      <Container space="small">
        <div class={style.textField}>
          <div class={style.label}>Language</div>
          <div class={style.textBox}>
            <Textbox onInput={handleInput2} value={languageName} variant="border" />
          </div>
        </div>
      </Container>
      <Divider />
      <div class={style.textArea}>
        <VerticalSpace space="small" />
        Detail {props.languageName}
        <VerticalSpace space="extraSmall" />
        <div class={style.textArea2}>
          <TextboxMultiline onInput={handleInput} value={textValue} rows={20} variant="border" />
        </div>
        <VerticalSpace space="extraSmall" />
      </div>
      <Divider />
      <Container space="small">
        <VerticalSpace space="extraSmall" />
        <div class={style.footer}>
          <Button onClick={handleClick}>Update</Button>
        </div>
        <VerticalSpace space="extraSmall" />
      </Container>
    </div>
  );
};

export { LanguageDetail };
