const ProgressBar = ({ size }) => {
    // Syling is done in index.css
    return (
        <div className="progress-bar" style={{scale: `${size}`}}></div>
    );
};
export default ProgressBar;