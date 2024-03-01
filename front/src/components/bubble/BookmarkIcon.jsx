

export default function BookmarkIcon({ isBookmarked }) {
    return (
        <div>
            {isBookmarked ? <img src={bookmarked}/> : <img src={bookmark}/>}
        </div>
    );
}