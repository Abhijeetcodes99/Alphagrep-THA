import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

const TagInput = ({ tags, onUpdate }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTag = () => {
        if (inputValue.trim() !== '') {
            onUpdate([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        onUpdate(tags.filter(tag => tag !== tagToDelete));
    };

    return (
        <div className="tag-input">
<div style={{
    display:"flex",
    flexWrap:"nowrap",
    overflowX:"auto",
    paddingBottom:"8px"
}}>
            <TextField
                variant="standard"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleAddTag();
                        e.preventDefault();
                    }
                }}
                placeholder="Add tag"
                size="small"
                style={{
                    minWidth:"100px",
                    flexShrink:0
                }}
            />
          
            {tags?.map((tag, index) => (
                <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    style={{ margin: '2px' }}
                />
            ))}
            </div>
        </div>
    );
};

export default TagInput;