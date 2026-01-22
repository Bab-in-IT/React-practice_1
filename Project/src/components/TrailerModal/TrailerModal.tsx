import { useRef, useState } from "react";

import styles from "./TrailerModal.module.scss";
import "../../art/styles/button.scss";
import ReactPlayer from "react-player";
import sprite from "../../art/sprite.svg";

interface TrailerModalProps {
  isTrailer: boolean;
  closeModal: () => void;
  trailerURL: string | null;
}

export const TrailerModal = ({
  isTrailer,
  closeModal,
  trailerURL,
}: TrailerModalProps) => {
  const [isPlay, setIsPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false); // Состояние наведения

  const playerRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => setIsPlay(true);
  const handlePause = () => setIsPlay(false);

  // Обработчики наведения
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (trailerURL) {
    return (
      <dialog className={styles.modal} open={isTrailer}>
        <div
          className={styles["modal__wrapper"]}
          ref={playerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ReactPlayer
            src={trailerURL}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            light={true}
            playing={isPlay}
            onPlay={handlePlay}
            onPause={handlePause}
          />

          {!isPlay && (
            <button
              className="btn btn--player"
              type="button"
              aria-label=""
              onClick={isPlay ? handlePause : handlePlay}
            >
              {isHovered ? (
                <svg
                  className={styles["icon__icon"]}
                  width="40"
                  height="40"
                  aria-hidden="true"
                >
                  <use href={`${sprite}#icon-play`} />
                </svg>
              ) : (
                <svg
                  className={styles["icon__icon"]}
                  width="40"
                  height="40"
                  aria-hidden="true"
                >
                  <use href={`${sprite}#icon-pause`} />
                </svg>
              )}
            </button>
          )}

          <button
            className="btn btn--form-close"
            type="button"
            onClick={closeModal}
            aria-label={isPlay ? "Пауза" : "Воспроизвести"}
          >
            <svg
              className={styles["icon__icon-close"]}
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href={`${sprite}#icon-close`} />
            </svg>
          </button>
        </div>
      </dialog>
    );
  }
};
