import { h, JSX } from 'preact';
import { useCallback } from 'preact/hooks';
import { emit } from '@create-figma-plugin/utilities';
import { CloseHandler } from '../types'
import { Container, VerticalSpace, Text, Columns, Button} from '@create-figma-plugin/ui';
import { Textbox, IconLayerFrame16, IconStyles32, IconComponent32, IconButton } from '@create-figma-plugin/ui';
import { useState } from 'preact/hooks';

const Layers = () => {
  const [value, setValue] = useState<string>('Text')
  const [inputFields, setInputFields] = useState([
    { name: 'Abc', age: '20' },
    { name: 'Abc', age: '20' }
  ])
  const [textLayers, setTextLayers] = useState([
    { name: 'TT', value: 'Text 1' },
    { name: 'BB', value: 'Text 2' }
  ])

  const handleCreateRectanglesButtonClick = useCallback(() => {
    console.log("in Update Page");h
  }, [])

  const handleCloseButtonClick = useCallback(
    function () {
      // console.log("in Update All");
      emit<CloseHandler>('CLOSE')
    }, []
  )

  function handleInput(index: number, e: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }

  // const handleCreateComponent = (event: JSX.MouseEventHandler<HTMLButtonElement>) => {
  const handleCreateComponent = (index: number, e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    console.log("create Component")
  }

  const handleFormChange = (index: number, e: JSX.TargetedEvent<HTMLInputElement>) => {
    let data = [...inputFields];
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    if (name === "name" || name === "age"){
      data[index][name] = value
    }
    setInputFields(data)
  }

  return (
     <Container space="medium">
       <VerticalSpace space="large" />
       <Text muted>Layers</Text>
       <VerticalSpace space="small" />
       <form>
         {textLayers.map((textLayer, index) => {
          return (
            <div key={index}>
              <Columns space="extraSmall">
                <Textbox icon={<IconLayerFrame16 />} value={textLayer.name} onChange={e => handleInput(index, e)}/>
                <Textbox value={textLayer.value} onChange={e => handleInput(index, e)}/>
                <IconButton onClick={e => handleCreateComponent(index, e)}>
                  <IconComponent32 />
                </IconButton>
              </Columns>
            </div>
          )
         })}
       </form>
       <VerticalSpace space="small" />
       <Columns space="extraSmall">
         <Button fullWidth onClick={handleCreateRectanglesButtonClick}>
           Create
         </Button>
         <Button fullWidth onClick={handleCloseButtonClick} secondary>
           Close
         </Button>
       </Columns>
       <VerticalSpace space="small" />
     </Container>
  )
}

export { Layers }