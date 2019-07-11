import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase'
import {Redirect} from 'react-router-dom'

export default class EndToBuy extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        redirectToHome: false
    }
  }

   handleClickOpen=() =>{
    this.setState({open: true})
  }

  handleClick=()=> {
    
    const db = firebase.firestore();
    let docRef = db.collection("users").doc(firebase.auth().currentUser.uid).collection("basket");
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
          docRef.doc(doc.id).update({ count: 1}); 
          docRef.doc(doc.id).delete();
      })
    })
    this.setState({
        open: false,
        redirectToHome: true
    })
}

handleClose = () => {
    this.setState({
        open: false,
    })
}

renderRedirectToHome = () => {
    if(this.state.redirectToHome){
        return <Redirect to= '/home' />
    }
}

render() {
    
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Buy
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title"> Thank you for shopping</DialogTitle>
            <DialogContent>
              <DialogContentText>

              You have to pay {this.props.totalPrice}$ from your card. Do you agree to pay for it?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Disagree
              </Button>
              {this.renderRedirectToHome()}
              <Button onClick={this.handleClick} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}
 
}

