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
  const [value, setValue] = useState('Layers');


  /* Default: Don't know what it's */
  const [count, setCount] = useState<number | null>(5)
  const [countString, setCountString] = useState('5')
  const handleCreateRectanglesButtonClick = useCallback(
    function () {
      if (count !== null) {
        emit<CreateRectanglesHandler>('CREATE_RECTANGLES', count)
      }
    },
    [count]
  )
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>('CLOSE')
  }, [])
  /* End Default */

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    setValue(newValue)
  };

  const options: Array<TabsOption> = [{
      children: <Layers />,
      value: 'Layers'
    },{
      children: <Setup />,
      value: 'Setup'
    }]

  return (
    <Tabs onChange={handleChange} options={options} value={value} />
  )

  // return (
  //   <Container space="medium">
  //     <VerticalSpace space="large" />
  //     <Text muted>Count</Text>
  //     <VerticalSpace space="small" />
  //     <TextboxNumeric
  //       onNumericValueInput={setCount}
  //       onValueInput={setCountString}
  //       value={countString}
  //     />
  //     <VerticalSpace space="extraLarge" />
  //     <Columns space="extraSmall">
  //       <Button fullWidth onClick={handleCreateRectanglesButtonClick}>
  //         Create
  //       </Button>
  //       <Button fullWidth onClick={handleCloseButtonClick} secondary>
  //         Close
  //       </Button>
  //     </Columns>
  //     <VerticalSpace space="small" />
  //   </Container>
  // )
}

export default render(Plugin)
