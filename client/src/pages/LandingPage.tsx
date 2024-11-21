import { Card, Form, Input, Button, Tabs, TabsProps, Avatar, FormProps } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Logo from '../assets/Site_Logo.png'
import Auth from "../utils/auth";
// import { FormEvent, useState } from "react";
import { LOGIN_USER, ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";

type FieldType = {
  username: string;
  password: string;
  email: string;
}

const LandingPage: React.FC = () => {
  // const [validated] = useState(false);
  const [login] = useMutation(LOGIN_USER);
  const [addUser] = useMutation(ADD_USER);

  const [form] = Form.useForm();

  const handleLogin: FormProps<FieldType>['onFinish'] = async (values: any) => {


    try {
      const { data } = await login({
        variables: { ...values },
      });

      if (!data.ok) {
        throw new Error('something went wrong!');
      }

      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleSignup: FormProps<FieldType>['onFinish'] = async (values: any) => {
    try {
      const { data } = await addUser({
        variables: { input: { ...values } },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
    }
  };


  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Login',
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Username required" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Password required" },
              { min: 5, message: "Password must be at least 6 characters long" }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      ),
    }, {
      key: '2',
      label: 'Sign-up',
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSignup}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Username required" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email required" },
              { type: "email", message: "Enter valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Password required" },
              { min: 5, message: "Password must be at least 6 characters long" }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form.Item>
        </Form>
      )
    }
  ]

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 400,
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Avatar
          size={{ xs: 20, sm: 50, md: 100, lg: 150, xl: 200, xxl: 250 }}
          src={`${Logo}`}
          alt="Logo"
          style={{ marginBottom: 20 }}
        />
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </div>
  );
};

export default LandingPage;
