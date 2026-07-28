import "./StatusBadge.css";

interface Props{

    text:string;

    color?:"green"|"yellow"|"red"|"blue";

}

const StatusBadge=({text,color="blue"}:Props)=>{

    return(

        <span className={`status-badge ${color}`}>

            {text}

        </span>

    );

};

export default StatusBadge;