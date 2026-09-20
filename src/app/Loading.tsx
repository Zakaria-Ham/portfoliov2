import './loading.css';

export default function Loading() {
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        <p className="loader-text">Loading Application</p>
        
        <div className="loader-track">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
}
