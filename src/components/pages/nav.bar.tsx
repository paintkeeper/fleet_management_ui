import React, {useState} from "react"
import {connect, MapDispatchToProps, MapStateToProps} from "react-redux"
import {ApplicationState, AuthAction, authLogoutAction} from "../index"
import {
    Container, ContainerProps,
    Header, Loader,
    Menu,
    Visibility,
} from 'semantic-ui-react'
import {Link} from "react-router-dom"
import {bindActionCreators, Dispatch} from "redux"

interface NavProps extends ContainerProps {
    user?: any,
    logout?: () => void
}

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '1em',
    marginTop: '4em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

const overlayStyle = {
    float: 'left',
    margin: '0em 3em 1em 0em',
}


const Navbar: React.FC<NavProps> = ({
                                        loading,
                                        user,
                                        logout,
                                        children
                                    }) => {
    const [menuFixed, setMenuFixed] = useState(false)
    const [overlayFixed, setOverlayFixed] = useState(false)
    const stickTopMenu = () => setMenuFixed(true)
    const unStickTopMenu = () => setMenuFixed(false)
    const unStickOverlay = () => setOverlayFixed(false)
    const stickOverlay = () => setOverlayFixed(true)

    return loading ? (<Loader active inline='centered'>Loading...</Loader>) : (
        <div>
            <style>
                {`
          html, body {
            background: #fff
          }
        `}
            </style>

            <Container text style={{marginTop: '2em'}}>
                <Header as='h1'>Hello {user.name}, Welcome to Fleet Management</Header>
            </Container>
            <Visibility
                onBottomPassed={stickTopMenu}
                onBottomVisible={unStickTopMenu}
                once={false}
            >

                <Menu
                    borderless
                    fixed={menuFixed ? 'top' : undefined}
                    style={menuFixed ? fixedMenuStyle : menuStyle}
                >
                    <Container text>
                        <Menu.Item as={Link} to='/cars'>Cars</Menu.Item>
                        <Menu.Item as={Link} to='/notfound'>Drivers</Menu.Item>
                    </Container>

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            onClick={logout}
                        />
                    </Menu.Menu>
                </Menu>
            </Visibility>
            <Container>
                <Visibility
                    offset={80}
                    once={false}
                    onTopPassed={stickOverlay}
                    onTopVisible={unStickOverlay}
                    style={overlayFixed ? {...overlayStyle} : {}}
                />
                {children}
            </Container>
        </div>
    )
}

const mapStateToProps: MapStateToProps<NavProps, NavProps, ApplicationState> = ({auth, navigation}: ApplicationState) => ({
    user: auth.user
})

const mapDispatchProps: MapDispatchToProps<NavProps, AuthAction> = (dispatch: Dispatch<AuthAction>) =>
    bindActionCreators(
        {
            logout: authLogoutAction
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchProps)(Navbar)