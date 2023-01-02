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

const LanguageDetail = (props: {
  language: string;
  onDetailClick: (language: string) => void;
}) => {
  const [value, setValue] = useState<null | string>(null);
  const [textValue, setTextValue] = useState<string>("");

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

  const options: Array<DropdownOption> = [
    { value: "th" },
    { value: "en" },
    { value: "jp" },
  ];

  return (
    <div class={style.detailPage}>
      <div class={style.applicationBar}>
        <IconButton onClick={() => props.onDetailClick("")}>
          <IconChevronLeft32 />
        </IconButton>
        <div class={style.text}>Language ({props.language})</div>
        <div class={style.ghost32x32}></div>
      </div>
      <Divider />
      <Container space='small'>
        <div class={style.textField}>
          <div class={style.label}>Language</div>
          <div class={style.textBox}>
            <Textbox
              onInput={handleInput2}
              value={textValue}
              variant='border'
            />
          </div>
        </div>
      </Container>
      <Container space='small'>
        <div class={style.textField}>
          <div class={style.label}>Fall back</div>
          <div class={style.textBox}>
            <Dropdown
              onChange={handleChange}
              options={options}
              value={"th"}
              variant='border'
            />
          </div>
        </div>
      </Container>
      <Divider />
      <div class={style.textArea}>
        <VerticalSpace space='small' />
        Detail {props.language}
        <VerticalSpace space='extraSmall' />
        <div class={style.textArea2}>
          <TextboxMultiline
            onInput={handleInput}
            value={textValue}
            rows={17}
            variant='border'
          />
        </div>
        <VerticalSpace space='extraSmall' />
      </div>
      <Divider />
      <Container space='small'>
        <VerticalSpace space='extraSmall' />
        <div class={style.footer}>
          <IconButton onClick={handleClick}>
            <IconTrash32 />
          </IconButton>
          <Button onClick={handleClick}>Update</Button>
        </div>
        <VerticalSpace space='extraSmall' />
      </Container>
    </div>
  );
};

export { LanguageDetail };
