import * as React from "react"
import * as styles from "../components/index.module.css"
import Seo from "../components/seo"

import mainMinion from "../images/main-minion.gif"
import rejectionMinion from "../images/rejection-minion.webp"
import mistHeart from "../images/minions-mist-heart.gif"
import fireworksHeart from "../images/fireworks-exploding-heart.webp"

const IndexPage = () => {
  const [noCount, setNoCount] = React.useState(0)
  const [hasAccepted, setHasAccepted] = React.useState(false)
  const [currentImage, setCurrentImage] = React.useState(mainMinion)
  const [acceptedIndex, setAcceptedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!hasAccepted) return
    const intervalId = setInterval(() => {
      setAcceptedIndex(index => (index + 1) % 2)
    }, 2000)
    return () => clearInterval(intervalId)
  }, [hasAccepted])

  const handleNoClick = () => {
    if (hasAccepted) return
    setNoCount(count => count + 1)
    setCurrentImage(rejectionMinion)
  }

  const handleYesClick = () => {
    if (hasAccepted) return
    setHasAccepted(true)
    setCurrentImage(mistHeart)
  }

  let noLabel = "No"
  if (noCount >= 8) {
    noLabel = "is it because im not Josh Allen"
  } else if (noCount >= 6) {
    noLabel = "Are you deadass ?!?! "
  } else if (noCount >= 4) {
    noLabel = "Last chance"
  } else if (noCount > 0) {
    noLabel = "Are you sure you're sure?"
  }
  const yesScale = Math.min(1 + noCount * 0.18, 8)

  const acceptedImages = [mistHeart, fireworksHeart]

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <img
          className={styles.mainImage}
          src={hasAccepted ? acceptedImages[acceptedIndex] : currentImage}
          alt="Minion"
        />
        {hasAccepted ? (
          <h1 className={styles.question}>YAYYY!</h1>
        ) : (
          <>
            <h1 className={styles.question}>Will you be my valentine?</h1>
            <div className={styles.buttonRow}>
              <button
                className={styles.yesButton}
                style={{ "--scale": yesScale }}
                type="button"
                onClick={handleYesClick}
                disabled={hasAccepted}
              >
                Yes
              </button>
              <button
                className={styles.noButton}
                type="button"
                onClick={handleNoClick}
                disabled={hasAccepted}
              >
                {noLabel}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export const Head = () => <Seo title="Valentine" />

export default IndexPage
