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
      setState((state)=> {
        return {
          ...state,
          timer:tempId
        }
      })

      return () => {
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
    }
    return (
      <h2>{state.seconds} seconds since page loaded</h2>
    )
}

export default StatefulComponent;