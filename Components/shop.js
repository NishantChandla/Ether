import react, { Component } from 'react'
import {
    Button,
    Container,
    Form,
    Modal,
    Input,
    Label,
    Card,
    Menu
} from 'semantic-ui-react'
import contract from '../contractins'
import web3 from '../web3'
import firebase from 'firebase';

var items = [];
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





















class shop extends Component {


    state = {
        code: '',
        address: '',
        openm:false,
        openf:false
    }


    enter = async (event) => {

        event.preventDefault();

       // console.log(this.state.code,this.state.address)
        var coder= this.state.code;
        var check=false;
        var address =this.state.address;
        this.setState({ openm: false })

        //fewfwe1587287857096

  //      const account = await web3.eth.getAccounts();
        //  console.log(account[0])

        firebase.database().ref('Users/').once('value', function (snapshot) {
  

            for(var i=0;i<snapshot.numChildren();i++){
        //  console.log(snapshot.child(i).child('number').val()+snapshot.child(i).child('timestamp').val() )
                if(coder==snapshot.child(i).child('number').val()+snapshot.child(i).child('timestamp').val() ){
                    check=true;

                    break;

                   
                }
                          
        
        }

        if(check==true){
            firebase.database().ref('Pay/').set({
                address
            }).then((data) => {
                //success callback
                console.log('data ', data)
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            })
        }


        }

  




        );


     this.setState({ openf: true })


        // .then(function(receipt){
        //     console.log(receipt)
        //     document.getElementById("dd").value='';
        // });


    };
    handleClosem = () => {
        this.setState({ openm: false })
        this.setState({ openf: false })


    }

    writeUserData = (event) => {
        event.preventDefault();
        var d = new Date();
        var timestamp = d.getTime();
        name = this.state.name
        var number = this.state.number
        var request='0'
        firebase.database().ref('Code/').child(timestamp).set({
            name,
            number,
            request,
            timestamp
        }).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }




    render() {



        return (
            <div>


                <Modal open={this.state.openm} onClose={this.handleClosem}  trigger={<Menu.Item  onClick={event => this.setState({ openm: true })} as='a'>Shop Owner</Menu.Item>} closeIcon>
                    <Modal.Header>Enter Code</Modal.Header>
                    <div style={{ margin: "7%", marginLeft: '25%' }}>

                        <Input type='text' placeholder='Eth Address' value={this.state.address} onChange={event => this.setState({ address: event.target.value })} >
                            <input />
                        </Input>
                        <Input type='text' placeholder='Code' value={this.state.code} onChange={eventt => this.setState({ code: eventt.target.value })} >
                            <input />
                        </Input>
                        <div>
                            <Button primary size='huge' color="google plus" style={{ margin: "1%", marginLeft: "20%" }} onClick={this.enter}>Submit</Button>
                        </div>
                    </div>


                </Modal>
                

                <Modal open={this.state.openf} onClose={this.handleClosem}    onClick={eventy => this.setState({ openf: true })}>
                    <Modal.Header>Enter Code</Modal.Header>
                  <Container textAlign='center'>
                      <h3 style={{margin:'5%'}}>Payment Request Received. May take Some time to excute.</h3>
                  </Container>


                </Modal>
            </div>)
    }
}

export default shop;