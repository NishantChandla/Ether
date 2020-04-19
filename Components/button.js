import react, { Component } from 'react'
import {
    Button,
    Container,
    Form,
    Modal,
    Input,
    Label,
    Card
} from 'semantic-ui-react'
import contract from '../contractins'
import web3 from '../web3'
import firebase from 'firebase';

var items = [];
var x = 0;
var firebaseConfig = {
    apiKey: "AIzaSyD6XXxlARtwyxuIxV8hXfDGiIjQ3Ii6QIo",
    authDomain: "corona-web-273113.firebaseapp.com",
    databaseURL: "https://corona-web-273113.firebaseio.com",
    projectId: "corona-web-273113",
    storageBucket: "corona-web-273113.appspot.com",
    messagingSenderId: "940794642188",
    appId: "1:940794642188:web:6cde7565e09815638d1329",
    measurementId: "G-BPC7PGB4E5"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}





















class b extends Component {

    state = {
        amount: '',
        state: '',
        district: '',
        name: '',
        number: '',
        open: false,
        opend: false,
        opens: false

    }

    // renderShops=()=> {



    //     return
    // }







    componentDidMount() {

        window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                try {
                    // Request account access if needed
                    await ethereum.enable();
                    // Acccounts now exposed
                    // web3.eth.sendTransaction({/* ... */});
                    console.log("1")
                } catch (error) {
                    // User denied account access...
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
                // Acccounts always exposed
                console.log("2")
                //  web3.eth.sendTransaction({/* ... */});
            }
            // Non-dapp browsers...
            else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        });




    }


    onSubmit = async (event) => {

        event.preventDefault();
        this.setState({ opend: false })
        console.log("ckucj")
        const account = await web3.eth.getAccounts();
        //  console.log(account[0])
        await contract.methods.contribute().send({
            value: this.state.amount,
            from: account[0]

        });


        // .then(function(receipt){
        //     console.log(receipt)
        //     document.getElementById("dd").value='';
        // });


    };

    writeUserData = (event) => {
        event.preventDefault();
        this.setState({ open: false })
        var d = new Date();
        var timestamp = d.getTime();
        name = this.state.name
        var number = this.state.number
        var request = '0'
        var g=this;





        if (this.state.state != '' && this.state.district != '') {
            firebase.database().ref(this.state.state).child(this.state.district).once('value', function (snapshot) {
                //  console.log(snapshot.numChildren())


                for (var i = 0; i < snapshot.numChildren(); i++) {

                    console.log(snapshot.child(i).child('name').val(), snapshot.child(i).child('contact').val());
                    items.push({
                        header: snapshot.child(i).child('name').val(),
                        description: snapshot.child(i).child('contact').val(),
                        fluid: true
                    });

                }







                g.setState({opens:true});
             
            });


        }







        firebase.database().ref('Users/').once('value', function (snapshot) {
            x = snapshot.numChildren();
            //   console.log(snapshot.numChildren())




        });















        firebase.database().ref('Users/').child(x).set({
            name,
            number,
            request,
            timestamp
        }).then((data) => {
            //success callback
            //  console.log('data ', data)
        }).catch((error) => {
            //error callback
            // console.log('error ', error)
        })










    }

    handleClose = () => {
        this.setState({ open: false })
        this.setState({ opend: false })
        this.setState({ opens: false })


    }

    readUserDataR = (event) => {
        event.preventDefault();






    }



    handleChange = (e, { value }) => this.setState({ value })


    render() {



        //     {this.writeUserData('hhhtt', 'htthhh', 'htthhhh')};


        const { value } = this.state
        return (
            <div>
                {/* 
                <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js"></script> */}

                <script>
                </script>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />






                <Modal open={this.state.opend} onClose={this.handleClose} trigger={<Button primary size='huge' onClick={eventt => this.setState({ opend: true })} inverted color='black' style={{ marginTop: "60px" }}>
                    Donate
            <i name='heart' />
                </Button>} closeIcon>
                    <Modal.Header>Contribute</Modal.Header>
                    <div style={{ margin: "7%", marginLeft: '35%' }}>
                        <Input id="dd" labelPosition='right' type='text' placeholder='Amount' value={this.state.amount} onChange={event => this.setState({ amount: event.target.value })} >
                            <input />
                            <Label>wei</Label>
                        </Input>
                        <div>
                            <Button primary size='huge' color="google plus" style={{ margin: "1%" }} onClick={this.onSubmit}>Confirm Donation</Button>
                        </div>
                    </div>


                </Modal>




                <Modal open={this.state.open} onClose={this.handleClose} trigger={<Button primary size='huge' inverted color='black' onClick={event => this.setState({ open: true })} style={{ marginTop: "10px" }}>
                    Request
      <i name='heart' />
                </Button>} closeIcon>
                    <Container>
                        <Form style={{ margin: '5%' }} onSubmit={this.writeUserData} >
                            <h2>SIGN UP FORM</h2>


                            <Form.Field value={this.state.name} required={true} onChange={event => this.setState({ name: event.target.value })} >
                                <label>First Name</label>
                                <input placeholder='First Name' />
                            </Form.Field>
                            <Form.Field value={this.state.number} required={true} onChange={eventt => this.setState({ number: eventt.target.value })} >
                                <label>Phone Number</label>
                                <input placeholder='Phone Number' />
                            </Form.Field>
                            <Form.Field value={this.state.state} required={true} onChange={eventtt => this.setState({ state: eventtt.target.value })} >
                                <label>State</label>
                                <input placeholder='State' />
                            </Form.Field>
                            <Form.Field value={this.state.district} required={true} onChange={eventttt => this.setState({ district: eventttt.target.value })}>
                                <label>District</label>
                                <input placeholder='District' />
                            </Form.Field>
                            <Form.Group inline>
                                <label >Do you really need this service.</label>
                                <Form.Radio
                                    label='Yes'
                                    value='y'
                                    checked={value === 'y'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    label='No'
                                    value='n'
                                    checked={value === 'n'}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>


                            <Form.Button type='submit'>Get One-time Password</Form.Button>
                        </Form>
                    </Container >
                </Modal>
























                <Modal open={this.state.opens} onClose={this.handleClose} closeIcon>

                    <div>
                        
                    <Modal.Header>Visit these shops to Get you Groceries</Modal.Header>
                        <Card.Group items={items} />
                    </div>

                </Modal>





























                {/* {this.state.showResults ? <Results /> : null} */}

            </div>)
    }
}

export default b;