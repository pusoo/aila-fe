import { Flex, Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
const { Title } = Typography;

const Policies = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header className="sticky top-0 flex items-center justify-center bg-quaternary shadow">
        <div className="logo absolute left-8  mr-5 flex items-center">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate("/notes");
            }}
          ></Button>
        </div>
        <Title level={4} style={{ color: "white" }}>
          Terms & Policies
        </Title>
      </Header>

      <Flex className="py-7 px-12 justify-center gap-10 items-center" vertical>
        <Flex className="w-full sm:w-3/5" vertical gap={40}>
          <Flex vertical>
            <p className="font-semibold text-xl mb-3">Legal</p>
            <ul className="flex flex-col gap-1 text-base">
              <li>
                <span className="underline underline-offset-2">
                  Terms of Use:
                </span>
                &nbsp; Terms that control how AILA is used, including the tools
                for creating material, chatbot interactions, and educational
                services.
              </li>
              <li>
                <span className="underline underline-offset-2">
                  Privacy Policy:
                </span>
                &nbsp; Procedures for gathering, using, and safeguarding
                user-provided personal data, including passwords, email
                addresses, and names.
              </li>
              <li>
                <span className="underline underline-offset-2">
                  Service Terms:
                </span>
                &nbsp; Additional terms that regulate the usage of particular
                AILA services, like media creation and content uploads.
              </li>
              <li>
                <span className="underline underline-offset-2">
                  Data Processing Addendum:
                </span>
                &nbsp; Ensuring that personal data is handled securely and
                suitably in compliance with the applicable laws.
              </li>
              <li>
                <span className="underline underline-offset-2">
                  Service Credit Terms:
                </span>
                &nbsp; Terms governing any credits redeemable for AILA&apos;s
                services.
              </li>
              <li>
                <span className="underline underline-offset-2">
                  Business Terms:
                </span>
                &nbsp; Conditions that apply to businesses, developers, and
                educational institutions using AILA&apos;s services.
              </li>
            </ul>
          </Flex>
          <Flex vertical>
            <p className="font-semibold text-xl mb-3">Policies</p>
            <ul className="flex flex-col gap-1 text-base">
              <li>
                <span className="underline underline-offset-2">
                  Usage Policies:
                </span>
                &nbsp; Rules to guarantee the ethical and responsible usage of AILA&apos;s technology.
              </li>
              <li>
                <span className="underline underline-offset-2">
                  Privacy Practices:
                </span>
                &nbsp; Specific guidelines on the management of user data, particularly for enterprise and educational users.
              </li>
              <li>
                <span className="underline underline-offset-2">
                  Sharing & Publication Policy:
                </span>
                &nbsp; Guidelines for sharing, publishing, and research access that are relevant to the services provided by AILA.
              </li>
              <li>
                <span className="underline underline-offset-2">
                  Vulnerability Disclosure Policy:
                </span>
                &nbsp; Definition of good faith in finding and reporting
                security vulnerabilities in AILA&apos;s systems.
              </li>
            </ul>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default Policies;
