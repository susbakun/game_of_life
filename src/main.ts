import "./style.css"
import { random_state, next_board_state } from "./state"


let app = document.getElementById("app")
let table = document.createElement("table")


function render(board: number[][]) {
  for (let row of board){
    let tr = document.createElement('tr')
    for (let val of row) {
      let td = document.createElement('td')
      if (val === 1) {
        td.style.backgroundColor = "black"
      }
      tr.append(td)
    }
    table.append(tr)
  }
}


function run(){
  // there are also some patterns in patterns.ts
  let a_random_state = random_state(50, 30)
  app?.append(table)
  render(a_random_state)
  
  setInterval(() => {
    a_random_state = next_board_state(a_random_state)
    table.innerHTML = ""
    render(a_random_state)
  }, 500)
}

run()