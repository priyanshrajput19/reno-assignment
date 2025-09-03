import "./PageHeader.css";

export default function PageHeader({ title, buttonText, onButtonClick, buttonClassName = "action-btn" }) {
  return (
    <div className="page-header">
      <div className="header-content">
        <h1 className="page-title">{title}</h1>
        <button className={buttonClassName} onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
      <div className="header-divider"></div>
    </div>
  );
}
