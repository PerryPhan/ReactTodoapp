import react from "react";

export class TodoHeader extends react.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <header className="row">
        {/* Left : Back button */}
        <div className="left-header col-1 d-flex justify-content-center align-items-center">
          <button type="button" className="btn bg-transparent back-button">
            <i className="fas fa-chevron-left"></i>
          </button>
        </div>

        {/* Middle : Title */}
        <div className="title col-10 d-flex justify-content-center align-self-center font-weight-bold">
          {this.props.title}
        </div>

        {/* Right : Add Todos button */}
        <div className="right-header col-1 d-flex justify-content-center align-items-center ">
          <button
            type="button"
            className={"btn bg-transparent add-button "+((this.props.editMode || this.props.delMode)? "d-none": "")}
            onClick={() => this.props.createTodo()}
            id="addTodo"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </header>
    );
  }
}
