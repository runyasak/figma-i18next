import {h} from 'preact';
import { useCallback } from 'preact/hooks';
import { emit } from '@create-figma-plugin/utilities';
import { Container, VerticalSpace, Text, Columns, Button} from '@create-figma-plugin/ui';
import { CloseHandler } from '../types'

const handleCreateRectanglesButtonClick = () => {
  console.log("Create")
  return "A"
}

const handleCloseButtonClick = () => {
  console.log("Close")
  emit<CloseHandler>('CLOSE')
  return "B"
}

// const handleCreateRectanglesButtonClick1 = useCallback(() => {
//   console.log("in Update Page");h
// }, [])

// const handleCloseButtonClick1 = useCallback(
//   function () {
//     console.log("in Update All");
//     // emit<CloseHandler>('CLOSE')
//   }, []
// )

const Layers = () => {
  return (
     <Container space="medium">
       <VerticalSpace space="large" />
       <Text muted>Layers</Text>
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