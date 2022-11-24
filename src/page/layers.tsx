import { h, JSX } from 'preact';
import { Container, VerticalSpace, Text, Columns, Button} from '@create-figma-plugin/ui';
import { Textbox, IconLayerFrame16 } from '@create-figma-plugin/ui';
import { useState } from 'preact/hooks';

const handleCreateRectanglesButtonClick = () => {
  return ""
}

const handleCloseButtonClick = () => {
  return ""
}

const Layers = () => {

  const [value, setValue] = useState<string>('Text')

  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }


  const [inputFields, setInputFields] = useState([
    { name: 'Abc', age: '20' }
  ])

  const handleFormChange = (index: number, event: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    let data = [...inputFields];
    console.log(data);
  }

  return (
     <Container space="medium">
       <VerticalSpace space="large" />
       <Text muted>Layers</Text>
       <VerticalSpace space="small" />
       <form>
         {inputFields.map((input, index) => {
          return (
            <div key={index}>
            <Textbox icon={<IconLayerFrame16 />} onInput={handleInput} value={value} />
            <input name='name' placeholder='Name' value={input.name} onChange={event => handleFormChange(index, event)}/>
            <input name='age' placeholder='Age' value={input.age} />
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