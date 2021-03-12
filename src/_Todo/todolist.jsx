import react from "react";
import { TodoItem } from "./todoitem";
import { Calendar } from "./calendar";
import { TodoHeader } from "./todoheader";

export class TodoList extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      // change 
      /*
        list: [
          { day: "14 February 2021",
            todos: [
              {
                id         : "14 February 2021 08:30",
                time       : "08:30",
                content    : "Visit relative houses",
                type       : "Routine",
                isCompleted: false,
                formMode   : false,
                colorBg    : "#333212",
              },
          ]},
        ]
      */
        //- Pros
        /* + 'day' don't reapeat, compare with other at least 1 time to
        access to todos.
           + 'day' becomes the large id for all todos in that day
           + Easy to get todos length of that day */
        //- Cond
        /* */
      list: [
        {
          id         : "14 February 2021 08:30",
          day        : "14 February 2021",
          time       : "08:30",
          content    : "Visit relative houses",
          type       : "Routine",
          isCompleted: false,
          formMode   : false,
          colorBg    : "#333212",
        },
      ],
      selectedDay : "",
      thisweek    : [],
      editMode    : false,
      delMode     : false,
      addMode     : false,
      error       : "",
    };
    
    this.setMode = this.setMode.bind(this);
    this.disableMode = this.disableMode.bind(this);
    this.setError = this.setError.bind(this);
  }

  componentDidMount() {
    // Init month and week due to Selected day here
    let now = new Date();
    let thisweek = [];
    let today = now.getDate(); // for checking is active or not
    
    for (let i = 0; i <= 6; i++) {
      let first = now.getDate() - now.getDay() + i;
      let dayinweek = new Date(now.setDate(first)).toString().slice(0, 15);
      let arr = dayinweek.split(" ");
      let day = {
        id: dayinweek,
        top:   arr[0], // Thu
        bot:   arr[2], // 11
        month: arr[1],
        // update number of todos 
        n: this.state.list.filter( (item) => 
        (new Date(item.day).toString() === new Date(dayinweek).toString())
        ).length
      };
      if (+day.bot === +today) {
        this.setState({ selectedDay: day });
      }
      thisweek.push(day);
    }
    this.setState({ thisweek: thisweek });
  }
  componentDidUpdate(){
    const thisweek = this.state.thisweek;
    // for each day in thisweek
    // is todos of that day increased
    let isChange = false;
    thisweek.forEach( day => {
      let n = this.state.list.filter( (item) => 
        (new Date(item.day).toString() === new Date(day.id).toString()) ).length
      if( day.n !== n ){
        isChange = true;
        day.n = n;
      }
    })
    if(isChange) this.setState({thisweek: thisweek})
    // console.log(this.state.delMode)
  }

  createTodo(){
    if(this.state.addMode || this.state.list.filter( item => item.formMode ).length){
      this.setError('Can\'t create more because existed one still creating ')
      return; 
    }
    let selectedDay = new Date(new Date().setDate(this.state.selectedDay.bot)); // selectedDay = "Fri Feb 12 2021 ...."
    const newTodo = 
      {
        id         : '', // getDayTimeFormat func
        day        : this.getDayFormat( selectedDay ), // getDayFormat func
        time       : this.getTime( selectedDay ), 
        content    : "",
        type       : "",
        isCompleted: false,
        formMode   : true,
        colorBg    : this.getRandomBgColor(50,200),
      }
    newTodo.id = newTodo.day + newTodo.time + newTodo.colorBg;
    this.setState( {addMode: true});
    this.setState( prevState => ( {list: [...prevState.list ,newTodo]} ))
  }

  getDayFormat( selectedDay ){
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];  
      return selectedDay.getDate() + // 12
      " " +
      months[selectedDay.getMonth()] + // February
      " " +
      new Date().getFullYear(); // 2021
      // day_format = "12 February 2021"
  }

  getDay( selectedDay ){
    const days = [
      "Monday",
      "Tuesday",
      "Webnesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return days[selectedDay.getDay() - 1 === -1 ? 6 : selectedDay.getDay() - 1]; // Fri : 6
  }

  getTime( selectedDay ){
    var hours  = selectedDay.getHours();
        hours  = (+hours - 10 >= 0) ? hours : "0"+hours;
    var minutes = selectedDay.getMinutes();
        minutes = (+minutes - 10 >= 0) ? minutes : "0"+minutes;
    return hours + ":" + minutes;
  }

  getRandomBgColor(from, to) {
    var r = Math.round(Math.random() * (to - from + 1) + from),
        g = Math.round(Math.random() * (to - from + 1) + from),
        b = Math.round(Math.random() * (to - from + 1) + from);
    return `rgb(${r},${g},${b})`;
  }

  setMode( mode, data){
    switch(mode.toString().toLowerCase().trim()){
      case 'add' : case 'a':
        this.setState({addMode : data})
        break;
      case 'edit': case 'e':
        this.setState({editMode : data})
        break;
      case 'delete': case 'd': case 'del':
        this.setState({delMode : data})
        break;
      default:
        alert("This mode didn't exist in setMode() ");
        break;
    }
  }

  setError( message ){
    this.setState({error: message});
    setTimeout(function(){
      this.setState({error: ''})
    }.bind(this),1500)
  }

  disableMode(){
    if(this.state.list.length === 0) {
      this.setState({addMode: false, editMode: false, delMode: false})
      return;
    }
    const isFormModeon = this.state.list.filter( item => item.formMode ).length;
    if(isFormModeon)
    {
      this.setError('Can\'t disable EditMode because it existed one being edited');
      return;
    }
    this.setState({addMode: false, editMode: false, delMode: false})
  }

  render() {
    // - Datetime ----------- //
    let selectedDay = new Date(new Date().setDate(this.state.selectedDay.bot)); // selectedDay = "Fri Feb 12 2021 ...."
    let day = this.getDay(selectedDay);  
    let day_format = this.getDayFormat( selectedDay );
    // ----------------------  //
    return (
      <div className="container h-100 d-flex flex-column align-items-center">
        {/* Header ( Nav ) include :
          - Back button
          - Title 
          - Add button
      */}
        <TodoHeader title="Schedule" 
            editMode={this.state.editMode}
            delMode ={this.state.delMode}
            createTodo={this.createTodo.bind(this)}/>
        {/* Aside ( Calendar ) include :
          - The first cell in row : Month
          - 7 cells stand for 7 days in that week.  
      */}
        <Calendar
          selectedDay={this.state.selectedDay}
          setSelectedDay={(day) => this.setState({ selectedDay: day })}
          thisweek={this.state.thisweek}
          todolist={this.state.list}
          getDayFormat={this.getDayFormat}
        />
        {/* Main ( To do list ) include : 
          - Date : full except hour, min, sec 
          - Todo list :
              + Todo items : isChecked ; hh:mm ; Thing 
                  !: Thing has random color for type 
      */}
        <main className="">
          {/* <!-- - Datetime header : later add time JS function --> */}
          <div className="datetime today row">
            <div className="date h5 col-3 font-weight-500">{day}</div>
            <div className="day col-5 font-weight-500">{day_format}</div>
            <div className="col-3 d-flex">
              {/* Enable EditTodo button */}
              <button
                className={"btn p-0 mx-1 btn-warning " + ((this.state.delMode || this.state.addMode? "d-none" : ""))}
                id="btn-editTodo"
                onClick={ () => this.setState({ editMode: true })}
              >
                <i className="fas fa-edit"></i>
              </button>

              {/* Enable DelTodo button */}
              <button
                className={"btn p-0 mx-1 btn-danger " + ((this.state.editMode || this.state.addMode? "d-none" : ""))}
                id="btn-delTodo"
                onClick={ () => this.setState({ delMode: true })}
              >
                <i className="fas fa-trash-alt"></i>
              </button>

              {/* Disable Cancel button */}
              <button
                className={"btn p-0 px-1 text-danger bg-transparent font-weight-500 "+
                           (this.state.editMode || this.state.delMode ? "": "d-none")}
                id="btn-cancel"
                onClick={this.disableMode}
              >
                Cancel
              </button>
            </div>
          </div>
          {/* <!-- ------------------- --> */}

          {/* <!-- Error --> */}
          { this.state.error ? 
          (<div className="error">{this.state.error}</div>) 
          : "" }
          
          {/* <!-- ----- --> */}

          {/* <!-- Todo list --> */}
          <div className="todo-list">
            {this.state.list.map((todo) =>
              todo.day === day_format ? (
                <TodoItem
                  key     ={todo.id}
                  todo    ={todo}
                  todolist={this.state.list}
                  addMode ={this.state.addMode}
                  editMode={this.state.editMode}
                  delMode ={this.state.delMode}
                  setList ={(list) => this.setState({ list: [...list] })}
                  setMode ={this.setMode}
                  setError={this.setError}
                />
              ) : (
                ""
              )
            )}
          </div>
          {/* <!-- ------------  --> */}
        </main>
      </div>
    );
  }
}
