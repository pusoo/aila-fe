import YouTube from "react-youtube";

const Note = ({ note }) => {
  if (!note) {
    return null;
  }

  switch (note.type) {
    case "pdf":
      return (
        <iframe
          src={note.url}
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      );
    case "url":
      return (
        <iframe
          src={note.url}
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      );

    case "video":
      return (
        <video width="100%" autoPlay={false} controls={true}>
          <source src={note.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    case "audio":
      return (
        <audio controls>
          <source src={note.url} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      );
    case "text":
      return <p>{note.transcription}</p>;
    case "youtube":
      const params = note.url.split("?")[1];
      const searchParams = new URLSearchParams(params);
      const videoId = searchParams.get("v");

      if (!videoId) {
        return null;
      }

      return (
        // <>
        //   <iframe
        //     width="560"
        //     height="315"
        //     src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"
        //     title="YouTube video player"
        //     frameborder="0"
        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //     allowfullscreen
        //   ></iframe>
        // </>

        <YouTube
          videoId={videoId}
          opts={{
            height: "390",
            width: "640",
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          }}
        />
      );
    case "default":
      return <pre>{JSON.stringify(note, null, 1)}</pre>;
  }
};

export default Note;
