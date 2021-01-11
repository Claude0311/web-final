import { Popconfirm, Button } from 'antd';
import { useState } from 'react';

export const LogoutButton = ({logout}) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await logout();
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <Popconfirm
        title="Title"
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <Button type="primary" onClick={showPopconfirm}>
          Log out
        </Button>
      </Popconfirm>
    </>
  );
};