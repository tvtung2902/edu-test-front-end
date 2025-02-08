import React, { useState } from "react";
import { Modal } from "antd";

export default function CustomModal({
  open,
  title,
  onCancel,
  onOk,
  children,
  footer,
  width,
  loading = false
}) {

  return (
    <Modal
      title={title}
      open={open}
      footer={footer}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={loading}
      width={width} 
    >
      {children}
    </Modal>
  );
}
