import { emit, once, on } from '@create-figma-plugin/utilities';
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { Layers } from './page/layers';
import { Setting } from './page/setting';
import { Library } from './page/Library';
import { Components } from './page/components';
import { render, Tabs, TabsOption } from '@create-figma-plugin/ui';
import { LanguageDetail } from './page/libraryDetail';
import { Languages, Language } from './utility/languageStorage';

function Plugin() {
  // const [currentTab, setCurrentTab] = useState("Layers");
  const [currentTab, setCurrentTab] = useState('Library');
  const [languageArray, setLanguageArray] = useState<Languages>([]);
  const [languagePage, setLanguagePage] = useState('');

  const handleLanguageSelect = (language: string): void => {
    setLanguagePage(language);
  };

  const language = (name: string): Language | undefined => {
    return languageArray.find((language) => language.language === name);
  };

  // Post message to main
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setCurrentTab(newValue);
    // emit("CHANGE_TAB", newValue);
  }

  // Receive message from main
  on('UPDATE_LANGUAGES', (languages: any) => {
    setLanguageArray(languages);
    console.log('Receive languages:', languages);
  });

  const options: Array<TabsOption> = [
    {
      children: <Layers />,
      value: 'Layers',
    },
    {
      children: <Components />,
      value: 'Component',
    },
    {
      children: (
        <Library
          languageArray={languageArray}
          onDetailClick={handleLanguageSelect}
        />
      ),
      value: 'Library',
    },
    {
      children: <Setting />,
      value: 'Setting',
    },
  ];

  if (languagePage !== '') {
    const currentLanguage = language(languagePage);

    if (currentLanguage !== undefined) {
      return (
        <LanguageDetail
          language={currentLanguage}
          onDetailClick={handleLanguageSelect}
        />
      );
    }
    return <div />;
  }

  return <Tabs onChange={handleChange} options={options} value={currentTab} />;
}

export default render(Plugin);
