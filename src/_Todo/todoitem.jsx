import react from "react";

export class TodoItem extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      content : '',
      type    : '',
    }
    this.toggleComplete = this.toggleComplete.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onDelClick = this.onDelClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.doEditTodo = this.doEditTodo.bind(this);
    this.cancelEditTodo = this.cancelEditTodo.bind(this);
  }

  componentDidMount(){
    let {content, type} = {...this.props.todo}
    if(content){
      this.setState({content: content})
    }
    if(type){
      this.setState({type: type})
    }
  }

  toggleComplete() {
    this.props.setList(
      this.props.todolist.map((item) =>
        item.id === this.props.todo.id
          ? { ...item, isCompleted: !item.isCompleted }
          : { ...item }
      )
    );
  }

  onContentChange(e){
    this.setState({content : e.target.value})
  }

  onTypeChange(e){
    this.setState({type : e.target.value})
  }

  onDelClick(){
    this.props.setList(
      this.props.todolist.filter( item =>
        (item.id !== this.props.todo.id )
      )
    );
  }

  onEditClick(){
    if( !this.props.todo.isCompleted )
      this.props.setList(
        this.props.todolist.map( item =>
          (item.id === this.props.todo.id )
          ? {...item, formMode: true} : {...item}
        )
      );
    else
      this.props.setError('Can\'t edit Todo when completed')
  }

  handleFormSubmit(e){
    e.preventDefault();
    // 1 Todo is 
    // -  Key        |      Value                 | Check
      //* id         : "12 February 2021 08:30",  |  yes
      //* day        : "12 February 2021",        |  yes
      //* time       : "08:30",                   |  yes
      //! content    : "Visit relative houses",   |  no
      //! type       : "Routine",                 |  no
      //* isCompleted: false,                     |  yes
      //* formMode   : true,                      |  yes
      //* colorBg    : "#333212",                 |  yes
  }
  
  doEditTodo(){
    this.props.setList(
      this.props.todolist.map( (item) => (
        ( item.id === this.props.todo.id) ? 
        {...item, content: this.state.content ? this.state.content : 'No content' , type: this.state.type ? this.state.type : 'No type', formMode: false}
        :{...item}
      ))
    )
    if(this.props.addMode) this.props.setMode('add',false);
  }

  cancelEditTodo(){
    if(this.props.addMode){
      this.onDelClick();
      this.props.setMode('add',false);
    }else{
      this.props.setList(
        this.props.todolist.map( (item) => (
          ( item.id === this.props.todo.id) ? 
          {...item, formMode: false}
          :{...item}
        ))
      )
    }
  }
  
  render() {
    const {
      id,
      day,
      time,
      content,
      type,
      isCompleted,
      formMode,
      colorBg,
    } = this.props.todo;
    return (
      <div id={id} className={"todo-items row mt-3 "+( (formMode) ? "created":"" ) + ( (isCompleted) ? "completed":"")}>
        <div className="ischecked col-1">
          <input
            onChange={this.toggleComplete}
            type="checkbox"
            name="complete"
            value={isCompleted}
            className={ ((formMode) ? "d-none" : "") }
          />
          <span className="checkmark" day={day}>
            <i className="fas fa-check"></i>
          </span>
        </div>
        <div className="time text-secondary col-2 mx-2 d-flex align-self-center">
          {time}
        </div>

        <div
          className="text-box ml-2 text-light "
          style={{ backgroundColor: `${colorBg}` }}
        >
          <div className={"text "+ ( (formMode) ? "d-none":"" ) }>
            <div className="content">{content}</div>
            <div className="type">{type}</div>
          </div>
          {/* Form to Edit */}
          <form className={"editTodo "+( (formMode) ? "": "d-none")}
                onSubmit={(e) => this.handleFormSubmit(e)}>
            <div className="content">
              <input type="text" name="content" value={this.state.content} placeholder="Content" onChange={(e) => this.onContentChange(e)}/>
            </div>
            <div className="type">
              <input type="text" name="type" value={this.state.type} placeholder="Type" onChange={(e)=> this.onTypeChange(e)}/>
              <button
                onClick={this.doEditTodo}
                className="btn bg-success text-white"
              >
                <i className="fas fa-check"></i>
              </button>
              <button
                onClick={this.cancelEditTodo}
                className="btn bg-danger text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </form>
          <button
            className={"btn btn-editTodo " + ((this.props.editMode && !formMode)? "": "d-none")}
            onClick={this.onEditClick}
          >
            <i className="fas fa-pen"></i>
          </button>
          <button
            className={"btn btn-delTodo " + ((this.props.delMode )? "": "d-none")}
            onClick={this.onDelClick}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  }
}
