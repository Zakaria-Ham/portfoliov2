import "../styles/projectDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export interface projectDetailesProps {
  hash: string;
  title: string;
  date: string;
  description: string;
  onClose?: () => void;
  appUrl?: string;
  githubUrl?: string;
}

export default function projectDetailes({
  hash,
  title,
  date,
  description,
  onClose,
  appUrl,
  githubUrl,
}: projectDetailesProps) {
  return (
    <div className="container">
      <div className="detailsContainer">
        <div className="leftSide">
          <div className="prints">
            <p className="dev-git-prints">
              <span className="hashText">{hash}</span> -{" "}
              <span className="dateText">{date}</span>
            </p>
          </div>

          <div className="titles">
            <h1 className="dev-repo-title">{title}</h1>
          </div>
        </div>

        <div className="rightSide">
          <div className="closeContainer" onClick={onClose}>
            <h2 className="closeText">X</h2>
          </div>
        </div>
      </div>

      <div className="descriptionContainer">
        <p className="descriptionText">
          {description || "No description yet."}
        </p>
      </div>

      <div className="linksContainer">
        <button
          className="projectLinkButton"
          onClick={() => appUrl && window.open(appUrl, "_blank")}
          disabled={!appUrl}
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          <span>Open App</span>
        </button>

        <button
          className="projectLinkButton"
          onClick={() => githubUrl && window.open(githubUrl, "_blank")}
          disabled={!githubUrl}
        >
          <FontAwesomeIcon icon={faGithub} />
          <span>GitHub Repo</span>
        </button>
      </div>
    </div>
  );
}
