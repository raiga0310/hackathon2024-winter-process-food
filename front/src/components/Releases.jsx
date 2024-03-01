import Bubble from './bubble/Bubble';

export function Releases({ releases }) {
    const releaseItems = releases.map(release => {
        return <Bubble title={release.title} url={release.url} image={release.main_image} />
    });
    return (
      <ul className="release-container">
        {releaseItems}
      </ul>
    )
  }