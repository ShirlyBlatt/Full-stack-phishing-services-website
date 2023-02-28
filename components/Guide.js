import styles from "../styles/Guide.module.css"

const Guide = ({guide}) => {
    const slash = "./"
    return (
        <div className = {styles.box}>
            <h1>{guide.title}</h1>
            <p>{guide.guide}</p>
            <div className = {styles.imageBox}>
                {guide.img.map((data) => (
                    <img key = {data} src = {slash + data}/>
                ))}
            </div>
        </div>
    );
}
 
export default Guide;