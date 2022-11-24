import {
  Button,
  Columns,
  Container,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
  Tabs,
  TabsOption
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import { Layers } from './page/layers'
import { Setup } from './page/setup'

import { CloseHandler, CreateRectanglesHandler } from './types'

function Plugin() {
  const [currentTab, setCurrentTab] = useState('Layers');

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    setCurrentTab(newValue)
  };

  const options: Array<TabsOption> = [{
      children: <Layers />,
      value: 'Layers'
    },{
      children: <Setup />,
      value: 'Setup'
    }]

  return (
    <Tabs onChange={handleChange} options={options} value={currentTab} />
  )


}

export default render(Plugin)
