import "./SectionHeader.css";

interface Props{
    title:string;
    subtitle?:string;
}

const SectionHeader = ({title,subtitle}:Props)=>{

    return(

        <div className="section-header">

            <h2>{title}</h2>

            {subtitle &&

                <p>{subtitle}</p>

            }

        </div>

    );

};

export default SectionHeader;