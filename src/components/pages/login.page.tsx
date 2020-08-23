import React, {useState} from "react"
import {Button, Form, Grid, Header, Icon, Loader, Segment} from "semantic-ui-react"
import {connect} from "react-redux"
import {ApplicationState} from "../index"

export interface LoginProps {
    backend_uri?: string,
    client_id?: string,
    scope?: string,
    generated_id?: string,
    loading?: boolean
}

const LoginPage: React.FC<LoginProps> = ({
                                             backend_uri,
                                             client_id,
                                             scope,
                                             generated_id,
                                             loading
                                         }) => {
    const [disabled, setDisabled] = useState(false)
    const link = `${backend_uri}/oauth2/authorization/github`
    return loading ? (<Loader active inline='centered'>Loading...</Loader>) : (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large' action={link}>
                    {/*<FormInput type="hidden" name="client_id" value={client_id}/>
                    <FormInput type="hidden" name="scope" value={scope}/>
                    <FormInput type="hidden" name="redirect_uri" value={window.origin}/>
                    <FormInput type="hidden" name="state" value={generated_id}/>*/}
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
    )
}

const connector = connect((state: ApplicationState) => ({
        backend_uri: state.env.backend_uri,
        client_id: state.env.client_id,
        scope: state.env.scope,
        generated_id: state.env.generated_id,
        loading: state.navigation.loading
    }), {}
)

export default connector(LoginPage)