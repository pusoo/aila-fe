import { Button, Flex } from "antd";

const UploadImageForm = () => {
  const handleSubmitUploadImage = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmitUploadImage}>
      <label>Upload Image</label>
      <Flex>
        <input
          placeholder="Upload image"
          type="file"
          accept="image/*"
          name="image"
          disabled
        />
        <Button type="primary" htmlType="submit" disabled>
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default UploadImageForm;
