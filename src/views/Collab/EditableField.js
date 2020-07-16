import React, { Component, Fragment } from 'react';

class EditableField extends Component {
  constructor(props) {
    super(props);
    this.ESCAPE_KEY = 27;
    this.ENTER_KEY = 13;
    // console.log("Editable: " + props.editable);
    this.state = {
      editText: props.value,
      editable: props.editable,
      pk: props.primaryKey,
      editing: false
    };
    this.element = {};
  }
  componentWillReceiveProps(newProps) {
    
    
    // console.log("Prop changs: " + newProps.primaryKey + "/" + this.state.pk);
    if (newProps.proposed) {
      this.setState({edited: true});
    } else {
      this.setState({edited: false});
    }
    this.setState({ editable: newProps.editable, pk: newProps.primaryKey })
  }

  handleEdit(e) {

    // // var myModalInstance = new BSN.Modal("#person-picker", {
    // //   backdrop: 'static',
    // // });
    // myModalInstance.show();
    console.log("Clicked ...");
    console.log(this.props);
    this.props.onFieldClicked(this.element, this, this.props.fieldDef);

    return (e) => {
      this.setState({
        editing: !this.state.editing
      })
    };
  }


  _saveRef(el) {
    // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
    if (!el) return;

    // console.log(el.getBoundingClientRect()); // prints 200px
    this.element = el;
  }

  renderValue() {
    if (this.props.proposed) {
      console.log(this.props.proposed);
      if (this.props.fieldDef.type === "person")
        return this.props.proposed.value.c_name_chn;
      else {
        console.log(this.props.proposed);
        return this.props.proposed.value;
      }

    } else {
      return this.props.value
    }
  }

  render() {
    if (this.state.editable) {

      return (
        <div className={!this.state.edited ? 'editable-col' : 'editable-col editable-col-edited'} id={this.props.id} onClick={this.handleEdit.bind(this)}>
          <label ref={this._saveRef.bind(this)} className='editable-field' id={"_f_" + this.props.id}>
            {this.renderValue()}
          </label>
        </div>
      )
    } else {
      return (
        <div>
          {
            <label>{this.props.value}</label>
          }

        </div>
      )
    }
  }
}

export default EditableField;