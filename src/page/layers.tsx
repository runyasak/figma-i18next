import {h} from 'preact';
import { Container, VerticalSpace, Text, Columns, Button} from '@create-figma-plugin/ui';

const handleCreateRectanglesButtonClick = () => {
  return ""
}

const handleCloseButtonClick = () => {
  return ""
}

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