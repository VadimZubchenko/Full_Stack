import React, {ReactNode} from "react";


interface Props {
  header:ReactNode;
  media?:ReactNode;
  content:ReactNode;
  vadim?:ReactNode;
}

const NamedChildren:React.FC<Props> = (props:Props) => {
  
  let cardStyle:React.CSSProperties = {
    backgroundColor:"lightgreen",
    height:200,
    width:150,
    textAlign:"center",
    margin:10
  }
  return(
    <div style={cardStyle}>
      <div>{props.header}</div>
        {props.media ? <div>{props.media}</div> : <></>}
      <div>{props.content}</div>
      <div>{props.vadim}</div>
    </div>
  )
}
export default NamedChildren;