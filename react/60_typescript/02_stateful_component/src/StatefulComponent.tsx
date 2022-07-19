import React, {useState, useEffect} from "react";

interface State {
  seconds: number; 
  timer: ReturnType<typeof setInterval> | null
}

const StatefulComponent:React.FC<{}> = (props) => { 
    const [state, setState] = useState<State>({
      seconds: 0,
      timer: null
    })

    useEffect(()=>{
      let tempId = setInterval(startTimer, 1000);
      //joka kertaa kun startTimer vaihtaa 'state.second', useEffect() käynnistyy uudelleen.
      setState((state)=> {
        return {
          ...state,
          timer:tempId
        }
        
      })
      console.log("state.timer: ", state.timer);

      return () => {
        // kun lopetetaan, sit tyhjennetään timer. 
        if(state.timer){
          clearInterval(state.timer);
        }
      }
    }, []);

    const startTimer = ()=>{
      setState((state)=>{
        return {
          ...state,
          seconds:state.seconds+1
        }
      })
      console.log("State.timer in startTimer func: ", state.timer);
    }
    return (
      <h2>{state.seconds} seconds since page loaded</h2>
    )
}

export default StatefulComponent;