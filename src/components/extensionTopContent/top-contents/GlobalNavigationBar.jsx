import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

import UrlInfoContext from "../../../context/UrlInfoContext";

function GnbButton({ iconShapeType }) {
  return (
    <button className="w-8 text-lg">
      <FontAwesomeIcon icon={iconShapeType} />
    </button>
  );
}

export default function GlobalNavigationBar() {
  const [urlNewList] = useContext(UrlInfoContext);

  return (
    <div className="w-full text-white flex mb-3 items-center">
      <p className="grow">
        <span className="text-2xl">{urlNewList.length}</span>
        <span className="text-sm">개의 북마크</span>
      </p>
      <div className="flex text-white">
        <GnbButton iconShapeType={faDesktop} />
      </div>
    </div>
  );
}
