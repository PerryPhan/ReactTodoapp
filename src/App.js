import React from 'react';
import {TodoList} from './_Todo/index'
export class App extends React.Component{

    render(){
        return (     
            <TodoList />
        );
    }
        
}





















/*_Login_v2: Try my best  */
// import './_Login_v2/App.scss'
// import imgpath from './_Login_v2/img/background3.jpg'
// import {Login, Register} from "./_Login_v2/index" 

// const LeftSide = props => {
//     return(
//         <div className="leftside">
//             <div className="Imgbox">
//                 <img src={props.imgsrc} alt={props.imgalt}/>
//             </div>
//         </div>
//     )
// }

// export class App extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             username : "",
//             password : "",
//             savingPassword: false,
//             isLogin  : true,
//         }
//         this.currentRef = "Login";
//         this.changeisLogin = this.changeisLogin.bind(this)
//     }
//     changeisLogin(e){
//         e.preventDefault()
//         this.setState( prevState => ({isLogin : !prevState.isLogin}))
//     }
//     render(){
//         console.log( "IsLogin : ",this.state.isLogin)
//         const imgsrc = imgpath
//         const imgalt = "HeroImage"
//         console.log("Saving Password: ",this.state.savingPassword)
//         return(
//           <div className="App">
//               <LeftSide imgsrc={imgsrc} imgalt={imgalt}/>
//               { this.state.isLogin ? 
//                 <Login 
//                     username={this.state.username}
//                     password={this.state.password}
//                     savingPassword={this.state.savingPassword}
//                     setUsername={(text) => {this.setState({username : text}); console.log("Username: ",this.state.username)}}
//                     setPassword={(text) => {this.setState({password : text}); console.log("Password: ",this.state.password)}}
//                     toggleSavingPassword={() => {this.setState(state => ({savingPassword : !state.savingPassword}) );}}
//                     toggleSignup={this.changeisLogin} 
//                     containerRef={(ref) => {this.currentRef = ref}}/> 
//                     : 
//                 <Register containerRef={(ref) => {this.currentRef = ref}} toggleSignup={this.changeisLogin} />}
//           </div>
          
//         )
//     }
// }












/* _Login : Example from Youtube */
//import './_Login/App.scss'
// import {Login, Register} from "./_Login/index"

// const RightSide = props =>{
//   return <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
//     <div className="inner-container">
//       <div className="text">{props.current}</div>
//     </div>
//   </div>
// }

// export class App extends React.Component{
//     constructor(props){
//       super(props);
//       this.state = {
//         isLogginActive: true
//       }
//     }
//     componentDidMount() {
//       //Add .right by default
//       this.rightSide.classList.add("right");
//     }
//     changeState(){
//       const { isLogginActive } = this.state;
//       if( isLogginActive ){
//         this.rightSide.classList.remove("right")
//         this.rightSide.classList.add("left")
//       } else {
//         this.rightSide.classList.remove("left")
//         this.rightSide.classList.add("right")
//       }

//       this.setState((prevState) => ({isLogginActive: !prevState.isLogginActive}))
//     }

//     render(){
//       const { isLogginActive } = this.state
//       const current = isLogginActive ? "Register" : "Login"
//       const currentActive = isLogginActive ? "login" : "register"
//       return (
//         <div className="App">
//           <div className="login">
//             <div className="container">
//                {isLogginActive && <Login containerRef={(ref) =>{this.current = ref;  }} />}
//                {!isLogginActive && <Register containerRef={(ref) => {this.current = ref; }}/>}
//             </div>
//             <RightSide current={current} currentActive={currentActive} containerRef = {ref => (this.rightSide = ref)} onClick={this.changeState.bind(this)}/>
//           </div>
//         </div>
//       )
//     }
// };
