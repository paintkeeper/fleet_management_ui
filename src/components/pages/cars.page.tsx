import React, {useEffect, useState} from "react"
import {List, Loader} from "semantic-ui-react"
import {EnvProps, pagesMapStateToProps} from "./index"
import {connect} from "react-redux";
import {CarsList} from "../fetch";

const CarsPage: React.FC<EnvProps> = (props) => {
    const [cars, setCars] = useState<CarsList>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`${props.backend_uri}/${props.api_version}/cars`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${props.jwt}`
            }
        })
            .then(response => response.json())
           // .then(json => json as CarsList)
            .then(setCars)
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [props])

    return loading ? (<Loader active inline='centered'>Loading...</Loader>) : (
        <List divided relaxed>
            {cars?.cars.map(value =>
                (<List.Item key={value.id}>
                    <List.Icon name='github' size='large' verticalAlign='middle'/>
                    <List.Content>
                        <List.Header as='a'>{`${value.manufacturer} ${value.model}`}</List.Header>
                        <List.Description as='a'>{value.vin}</List.Description>
                    </List.Content>
                </List.Item>)
            )}
        </List>
    )
}

export default connect(pagesMapStateToProps, {})(CarsPage)