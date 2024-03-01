import Bubble from './bubble/Bubble';

export function Releases({ releases }) {
    releases = releases.map((item, index) => ({
      id: index,
      ...item,
    }));
    const releaseItems = releases.map(release => {
        return <Bubble key={release[0]} title={release[1][0].title} url={release[1][0].url} image={release[1][0].main_image} />
    });
    return (
      <ul className="release-container">
        {releaseItems}
      </ul>
    )
  }