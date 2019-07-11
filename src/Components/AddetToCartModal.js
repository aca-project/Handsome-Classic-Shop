import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class AddedToCartModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      render: false
    };
  }


  handleClose = () => {
    this.setState({
      open: false
    });
  };

  renderRedirect = () => {
    if (this.state.render) {
      return <Redirect to="/cart" />;
    }
  };
  handleClick = () => {
    this.setState({ render: true });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" className="modal-title">
            Thank you for shoping!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have already added this product.
              <br />
              You can manage it on your cart.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <span
              className="register-form_close main-transition"
              onClick={this.handleClose}
            >
              <ClearIcon />
            </span>
            {this.renderRedirect()}
            <Button
              className="shp-btn shp-btn--dark"
              variant="contained"
              onClick={this.handleClick}
            >
              Go to cart
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
