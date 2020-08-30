import React, {useState} from "react"
import {Button, Form, Grid, Header, Icon, Segment} from "semantic-ui-react"
import {connector, PageProps} from "./index"


const LoginPage: React.FC<PageProps> = ({
                                            backend_uri
                                        }) => {
    const [disabled, setDisabled] = useState(false)
    const link = `${backend_uri}/oauth2/authorization/github`
    return (<>
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large' action={link}>
                    <Segment>
                        <Button color='teal' fluid size='large' type='submit'
                                disabled={disabled}
                                onClick={() => setDisabled(true)}>
                            <Icon name='github'/>Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </>)
}

export default connector(LoginPage)