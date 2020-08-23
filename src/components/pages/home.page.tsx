import React from "react"
import {
    Container,
    Header,
} from "semantic-ui-react"

const HomePage: React.FC = () => {
    return (
        <div>
            <Container text style={{marginTop: '3em'}}>
                <Header as='h1'>There's a test application</Header>
                <p>Please follow the links</p>
            </Container>
        </div>
    )
}
export {HomePage}