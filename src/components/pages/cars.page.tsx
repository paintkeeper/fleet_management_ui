import React, {useEffect, useState} from "react"
import {List, Loader} from "semantic-ui-react"
import {connector, PageProps} from "./index"
import {apiFetchAction, CarsList} from "../fetch";
import CarDialog from "../dialogs/car.dialog";
import {useDispatch} from "react-redux";

const CarsPage: React.FC<PageProps> = () => {
    const [cars, setCars] = useState<CarsList>()
    const [loading, setLoading] = useState(true)
    const [selectedKey, setSelectedKey] = useState<string>()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(apiFetchAction({
            path: "cars",
            onSuccess: setCars,
            onError: console.log,
            finally: () => setLoading(false)
        }))
    }, [dispatch])
    return loading ? (<Loader active inline='centered'>Loading...</Loader>) : (
        <>
            <List divided relaxed>
                {cars?.cars.map(value =>
                    (<List.Item key={value.id}>
                        <List.Icon name='github' size='large' verticalAlign='middle'/>
                        <List.Content onClick={() => setSelectedKey(value.id)}>
                            <List.Header as='a'>{`${value.manufacturer} ${value.model}`}</List.Header>
                            <List.Description as='a'>{value.vin}</List.Description>
                        </List.Content>
                    </List.Item>)
                )}
            </List>
            <CarDialog carId={selectedKey}/>
        </>
    )
}

export default connector(CarsPage)