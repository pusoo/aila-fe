import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Typography.Title>{data.name}</Typography.Title>
      <Typography.Paragraph>{data.description}</Typography.Paragraph>
    </div>
  );
}

export default Example;
