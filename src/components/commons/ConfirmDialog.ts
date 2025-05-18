export const ConfirmDialog = ({
  open,
  title = "Xác nhận",
  message = "Bạn có chắc chắn không?",
  onConfirm,
  onCancel,
  confirmText = "Đồng ý",
  cancelText = "Hủy",
}) => {
  const actions = (
    <>
      <Button onClick={onCancel} color="inherit">
        {cancelText}
      </Button>
      <Button onClick={onConfirm} variant="contained" color="primary">
        {confirmText}
      </Button>
    </>
  );

  return (
    <GenericDialog
      open={open}
      title={title}
      content={<Typography>{message}</Typography>}
      onClose={onCancel}
      actions={actions}
    />
  );
};
