import { Button, Checkbox, Form, Input } from "antd";
import { loginIn } from "../../stores/loginSlice.js";
import "./Login.css";
import { useDispatch } from "react-redux";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Login() {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(loginIn(values))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-page">
      <div className="form-login-container">
        <div className="form-login-top">
          <div className="form-login-header">登录</div>
        </div>
        <div className="form-login-main">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 328 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Login;
