import Con from '../contractins.js';
import PropTypes from 'prop-types'
import Head from 'next/head';
import React, { Component } from 'react'
import contract from '../contractins'
import web3 from '../web3';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Input,
    Label
} from 'semantic-ui-react'
import Web3 from 'web3';
import B from '../Components/button'
import Shop from '../Components/shop'



// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (



    <Container text>
        <Header
            as='h1'
            content='Support a family in your location'
            inverted
            style={{
                fontSize: mobile ? '1.7em' : '3em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as='h2'
            content='We aim to provide a Transparent System  by simplifying the interaction between
            users'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <B />
        {/* <Button primary size='huge' inverted color='black' style={{ marginTop: "60px" }}>
            Shop
      <i name='heart' />
        </Button>
    */}



    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}
// class Results extends Component {
//     render() {
//         return (
//             <div>
//                 <Input labelPosition='right' type='text' placeholder='Amount' style={{ marginTop: "10px", Visibility: hidden }}>
//                     <Label basic>$</Label>
//                     <input />
//                     <Label>.00</Label>
//                 </Input>
//             </div>
//         );
//     }
// }


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {

    // constructor(props){
    //     super(props);
    //     this.onSubmit = this.onSubmit.bind(this);
    //    }

    state = {
        activehome: true,
        activewhy: true,
        activestories: "",
        activeaboutus: "",
        amount: ''
    }
    inSingle = (post, e) => {
        this.setState({
            post: post,
            theposition: window.pageYOffset
        });
        console.log(theposition)
    }


    // onSubmit =async (event)=>{

    //     event.preventDefault();
    //     const account = await web3.eth.getAccounts();
    //     await contract.methods.contribute(this.state.amount).send({
    //         from: account[0]
    //     });



    // };

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
    // getInitialState = function () {
    //     return { showResults: false };
    // }
    // onClick = function () {
    //     this.setState({ showResults: true });
    // }


    render() {
        const { children } = this.props
        const { fixed } = this.state



        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>

                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em', background: "#000" }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>

                                <Menu.Item position='right'>
                                    <Menu.Item as='a' >
                                        Home
                </Menu.Item>

                                    <Menu.Item as='a' >Why Donate Here</Menu.Item>
                                    <Menu.Item as='a'>Stories</Menu.Item>
                                    <Shop />
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <HomepageHeading />
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >


                    <Menu.Item as='a' >
                        Home
                </Menu.Item>

                    <Menu.Item as='a' >Why Donate Here</Menu.Item>
                    <Menu.Item as='a'>Stories</Menu.Item>
                    <Shop />
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 350, padding: '1em 0em', background: "#000" }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile />
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

const HomepageLayout = () => (

    <ResponsiveContainer>
        <Head>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            <script
                src="https://code.jquery.com/jquery-3.5.0.js"
                integrity="sha256-r/AaFHrszJtwpe+tHyNi/XCfMxYpbsRg2Uqn0x3s2zc="
                crossorigin="anonymous"></script>            
                <script src="https://code.jquery.com/jquery-migrate-1.4.1.min.js"></script>
        </Head>
        <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Why Donate here?
            </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            We aim to provide a Transparent System  by simplifying the interaction between
                            users and the decentralized world. We want to make interaction with the decentralized
                            ecosystem so easy that anyone can do so without worrying about the complexity of the system.
                            We know when the thing comes of donation a question often arises in each one of us minds,that the money which
                            is being donated whether it is used effectively or is goin in vain . We all curious to know how much is donated till now
                            and how much is used for the wellfare and even the balance which is remaining .So if you are curious to know all these things
                            .then you are most welcome on are platform .Here you can see all this data .

            </p>
                        {/* <Header as='h3' style={{ fontSize: '2em' }}>
                            We Make Bananas That Can Dance
            </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                            bioengineered.
            </p> */}
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image rounded size='medium' src={require('../Art/ether.jpg')} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
            </Grid>
        </Segment>

        <Segment style={{ padding: '0em' }} vertical>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            "Stories"
            </Header>
                        <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                        <Button as='a' inverted style={{ marginLeft: '0.5em', color: "#000" }}>
                            Read More
                  </Button>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            "We’d love to have you on board."
            </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            With over 100000 contributors</p>
                        <Button as='a' inverted style={{ marginLeft: '0.5em', color: "#000" }}>
                            Join us
                  </Button>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em', background: "#000" }} vertical>
            <Container text style={{ color: "#B0B0B0" }}>
                <Header as='h3' style={{ fontSize: '2em', color: "#fff" }}>
                    Who We Work With
        </Header>
                <p style={{ fontSize: '1.33em' }}>
                    We partner with local Shopkeepers around you. As when the donation is requested the amount is donated
                    in the account of the Shopkeeper nearby and the details are provided to you. So this way you can purchase
                    your basic commodities from that shop .So in this way it is ensured that the amount donated is used effectively.
                    These  credits are thus claimable by people who have registered with us and want to request
                    a donation.
        </p>
                <Divider fitted />

                <Header as='h3' style={{ fontSize: '2em', color: "#fff" }}>
                    The people We Support
        </Header>
                <p style={{ fontSize: '1.33em' }}>

                    We  provide help to those who need it. Anyone who is currently
                    in need of support may request for donation. We assure that your request will
                    be processed as soon as posssible and help will reach to you the way described above.
                    During the time of pandemic the main problem for many people is to get food and basic
                    neccessities .So they can request here .
        </p>
            </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='About' />
                            <List link inverted>
                                <List.Item as='a'>Follow</List.Item>
                                <List.Item as='a'>Contact Us</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Services' />
                            <List link inverted>
                                <List.Item as='a'>Locate Cases</List.Item>
                                <List.Item as='a'>Shop</List.Item>
                            </List>
                        </Grid.Column>
                        {/* <Grid.Column width={3}>
                            <Header inverted as='h4' content='Cotributors' />
                            <List link inverted>
                                <List.Item as='a'>Locate Cases</List.Item>
                                <List.Item as='a'>Shop</List.Item>
                            </List>
                        </Grid.Column> */}
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </ResponsiveContainer>
)

export default HomepageLayout