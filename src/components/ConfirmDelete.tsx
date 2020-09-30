import React from 'react';
import { Modal } from 'antd';

export default function ConfirmDelete({confirmDelete, setConfirmDelete, removeCSVData}: {confirmDelete: boolean, setConfirmDelete: Function, removeCSVData: Function}){
  return(
    <Modal
      visible={confirmDelete}
      onCancel={()=>setConfirmDelete(false)}
      okButtonProps={{type:'primary', danger: true}}
      centered
    >
      <p>Are you sure you want to replace the file?</p>
    </Modal>
  )
}