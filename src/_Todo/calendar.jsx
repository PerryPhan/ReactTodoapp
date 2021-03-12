import react from "react";

export class Calendar extends react.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="row">
        <div className="calendar-items mon">{this.props.selectedDay.month}</div>
        {this.props.thisweek.map((data) => (
          <div
            key={data.id}
            className={
              "calendar-items" +
              (+data.bot === +this.props.selectedDay.bot ? " active" : "")
            }
            onClick={() => this.props.setSelectedDay(data)}
          >
            <div className="top">{data.top}</div>
            <div className="bot">{data.bot}</div>
            {data.n > 0 ? ( data.n > 10 ? <div className="list-len">10+</div> :<div className="list-len">{data.n}</div> ) : ""}
          </div>
        ))}
      </aside>
    );
  }
}
