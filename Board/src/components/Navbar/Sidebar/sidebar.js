import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessBoard } from '@fortawesome/free-solid-svg-icons'
import './styles/sidebar.css'

export default class Sidebar extends React.Component {
    constructor(){
        super();
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }
    toggleSidebar(){
        if(document.getElementById("mySidebar").style.width === "250px"){
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft = "0"
            const element = document.getElementById('icon')
            element.classList.remove('fa-spin-front'); // reset animation
            element.classList.remove('fa-spin-back'); // reset animation
            void element.offsetWidth; // trigger reflow
            element.classList.add('fa-spin-back'); // start animation
        }
        else{
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("main").style.marginLeft= "250px";
            const element = document.getElementById('icon')
            element.classList.remove('fa-spin-front'); // reset animation
            element.classList.remove('fa-spin-back'); // reset animation
            void element.offsetWidth; // trigger reflow
            element.classList.add('fa-spin-front'); // start animation
        }
    }
    createRoom() {
        fetch("http://localhost:9993/ChessAPI/createRoom/" + this.props.getUserId, {
          method: 'GET',
          headers: {
            "Content-type": "application/json"
          }
        })
      }
    render() {  
    let icon = <FontAwesomeIcon size="2x" icon={faChessBoard} />
    return (<React.Fragment>
        <div id="mySidebar" className="sidebar" onClick={this.toggleSidebar}>
            <Link className="" to="/chess"><span className="button">Your Room</span> </Link>
            <Link className="" to="/chess"><span className="button" onClick={this.createRoom}> Create Room </span></Link>
            <Link className="" to="/lobby"><span className="button">Lobby</span> </Link>
        </div>
        <div id="main">
            <button id="icon" className="openbtn" onClick={this.toggleSidebar}>
                {icon}
            </button>
        </div>
      </React.Fragment>
    );//fa-spin 2s infinite cubic-bezier(0, 0, 0.07, 1.25)
  }
}