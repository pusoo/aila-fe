import { Empty } from "antd";

const EmptyMedia = () => {
  return (
    <Empty
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 120 }}
      description={<span className="text-md">You have no projects yet</span>}
    ></Empty>
  );
};

export default EmptyMedia;
