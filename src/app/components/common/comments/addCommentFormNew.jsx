import { Avatar, Button, Comment, Form, Input, List } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/slices/userSlice";
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Добавить комментарий
      </Button>
    </Form.Item>
  </>
);
const AddCommentFormNew = ({ onSubmit }) => {
  const user = useSelector(getCurrentUserData());
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState({ content: "" });

  const handleSubmit = (e) => {
    setSubmitting(true);
    onSubmit(data);
    setSubmitting(false);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setData({ content: e.target.value });
  };
  return (
    <>
      <Comment
        avatar={<Avatar src={user.image} alt="user photo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default AddCommentFormNew;
