import React from "react";

interface Props{
  name?:string
}
// käytetään interface:a typea 
const HelloWorld: React.FC<Props> = (props:Props) => {
  let name: string = "World";
  if(props.name){
    name = props.name;
  }
  return (
    <h2>Hellow {name}</h2>
  )
}

export default HelloWorld;