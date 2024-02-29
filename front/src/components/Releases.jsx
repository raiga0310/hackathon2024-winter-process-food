import Bubble from './bubble/Bubble';

export function Releases({ releases }) {
    const releaseItems = releases.map(release => {
        console.log(release.title);
        return <Bubble title={release.title} url={release.url} image={release.main_image} />
    });
    return (
      <ul>
        {releaseItems}
      </ul>
    )
  }