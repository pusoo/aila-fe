import MediaCard from "./MediaCard";

const MediaList = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </div>
    </div>
  );
};

export default MediaList;
