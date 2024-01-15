import { useState } from 'react';
import { Button, Modal, Flex, Card, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import authAxios from '../api/authAxios';
import { API_URL } from '../config';

const { Meta } = Card;

const GenerateMediaModal = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false)

  const { data: voices } = useQuery({
    queryKey: ["avatars"],
    queryFn: async () => {
      const { data } = await authAxios.get(`${API_URL}/avatars/voices`);
      return data;
    },
    staleTime: Infinity,
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Generate Media
      </Button>
      <Modal
        title="Generate Media"
        open={open}
        onCancel={handleCancel}
        cancelButtonProps={{
          disabled: true,
          hidden: true
        }}
        footer={null}
        width='80%'
      >
        <Flex gap="25px">
          <Flex style={{ justifyContent: 'center', alignItems: 'center', flex: '1', border: '1px dashed #d9d9d9', borderRadius: '2px', }}>
            <div style={{ padding: '20px' }}>
              <label htmlFor="file-upload" className="custom-file-upload" style={{ cursor: 'pointer' }}>
                Select Image
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              {image && (
                <Card style={{ width: 300, marginTop: '20px' }}>
                  <Meta
                    title="Preview"
                    description={<img src={image} alt="Uploaded Image" />}
                  />
                </Card>
              )}
            </div>
          </Flex>
          <div style={{ flex: 1 }}>
            <Typography.Title level={5}>Select Voice</Typography.Title>
            <div style={{ display: 'flex', marginTop: '20px', gap: '20px', flexWrap: 'wrap', height: '400px', overflowY: 'scroll' }}>
              {Array.isArray(voices) && voices.map((voice) => (
                <Card
                  style={{ width: '45%', display: 'flex', flexDirection: 'column' }}
                  key={voice.voice_id}
                >
                  <Flex style={{ justifyContent: 'space-between', alignItems: "center", marginBottom: '10px' }}>
                    <Typography.Text>{voice.display_name}</Typography.Text>
                    <img src={voice.flag} alt={voice.display_name} style={{ borderRadius: '50%' }} height={25} width={25} />
                  </Flex>
                  <audio controls style={{ width: '100%' }}>
                    <source src={voice.preview.movio} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </Card>
              ))}
            </div>
          </div>

        </Flex>
      </Modal>
    </>
  );
};
export default GenerateMediaModal;