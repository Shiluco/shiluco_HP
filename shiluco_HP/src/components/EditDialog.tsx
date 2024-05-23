import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  options: string[];
  onSave: (newOptions: string[]) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, onClose, options, onSave }) => {
  const [editOptions, setEditOptions] = useState<string[]>(options);

  const handleChange = (index: number, newText: string) => {
    const newEditOptions = [...editOptions];
    newEditOptions[index] = newText;
    setEditOptions(newEditOptions);
  };

  const handleSave = () => {
    onSave(editOptions);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>駅名編集</DialogTitle>
      <DialogContent>
        {editOptions.map((option, index) => (
          <TextField
            key={index}
            label={`駅名 ${index + 1}`}
            value={option}
            onChange={(e) => handleChange(index, e.target.value)}
            fullWidth
            margin="normal"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
