import {
  Button,
  Container,
  Divider,
  IconButton,
  IconChevronLeft32,
  IconTrash32,
  Textbox,
  TextboxMultiline,
  VerticalSpace,
} from '@create-figma-plugin/ui';
import style from '../style.css';
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { Language } from '../utility/languageStorage';
import { useEffect } from 'preact/hooks';
import { emit } from '@create-figma-plugin/utilities';

const LanguageDetail = (props: {
  language: Language;
  onDetailClick: (language: string) => void;
}) => {
  const [jsonText, setJsonText] = useState<string>('');
  const [languageName, setlanguageName] = useState<string>(
    props.language.language
  );

  useEffect(() => {
    setJsonText(
      JSON.stringify(props.language.resourceLanguage['translation'], null, 2)
    );
  }, []);

  // const updateLanguage = (lang: string, text: string) => {};

  const handleResourceInput = (
    event: JSX.TargetedEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.currentTarget.value;
    setJsonText(newValue);
  };

  const handleLanguageNameInput = (
    event: JSX.TargetedEvent<HTMLInputElement>
  ) => {
    const newValue = event.currentTarget.value;
    setlanguageName(newValue);
  };

  const handleDeleteClick = () => {
    console.log('Delete');
    emit('DELETE_LANGUAGE', languageName);
    props.onDetailClick('');
  };

  const handleSaveClick = () => {
    props.language.resourceLanguage['translation'] = JSON.parse(jsonText);
    emit('SAVE_LANGUAGE', props.language);
  };

  // create the editor

  const header = (
    <div class={style.applicationBar}>
      <IconButton onClick={() => props.onDetailClick('')}>
        <IconChevronLeft32 />
      </IconButton>
      <div class={style.text}>Language: {languageName}</div>
      <IconButton onClick={handleDeleteClick}>
        <IconTrash32 />
      </IconButton>
    </div>
  );

  const languageProperty = (
    <Container space="small">
      <div class={style.textField}>
        <div class={style.label}>Language</div>
        <div class={style.textBox}>
          <Textbox
            onInput={handleLanguageNameInput}
            value={languageName}
            variant="border"
          />
        </div>
      </div>
    </Container>
  );

  const languageCode = () => {
    // const obj = props.language.resourceLanguage["translation"];

    return (
      <div class={style.textArea}>
        <VerticalSpace space="extraSmall" />
        <div class={style.textArea2}>
          <TextboxMultiline
            onInput={handleResourceInput}
            value={jsonText}
            rows={21}
            variant="border"
          />
        </div>
        <VerticalSpace space="extraSmall" />
      </div>
    );
  };

  const footer = (
    <Container space="small">
      <VerticalSpace space="extraSmall" />
      <div class={style.footer}>
        <Button onClick={handleSaveClick}>Save</Button>
      </div>
      <VerticalSpace space="extraSmall" />
    </Container>
  );

  return (
    <div class={style.detailPage}>
      {header}
      <Divider />
      {languageProperty}
      <Divider />
      {languageCode()}
      <Divider />
      {footer}
    </div>
  );
};

export { LanguageDetail };
