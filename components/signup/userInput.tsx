import { useEffect, useState } from "react";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";

import authApis from "@/api/authentication";

type ButtonProps = {
  type: string;
};

const UserInput = ({
  label,
  placeholder,
  title,
  type,
  errors,
  handleChange,
  values,
  hasConfirmButton,
  handleErrors,
  handleConfirm,
  confirmInput,
}: any) => {
  const [confirmMessage, setConfirmMessage] = useState({
    email: "",
    nickname: "",
  });
  const handleEmailValidate = async () => {
    if (!errors[[label]] && values[[label]]) {
      const data = await authApis.validateEmail({ email: values[[label]] });
      if (data.ok) {
        handleConfirm((prev: any) => ({
          ...prev,
          email: values.email,
        }));
        setConfirmMessage(prev => ({
          ...prev,
          email: "사용 가능한 이메일이에요!",
        }));
      } else {
        handleErrors((prevState: any) => ({
          ...prevState,
          [label]: "이미 가입된 계정이에요.",
        }));
      }
    }
  };
  useEffect(() => {
    if (confirmInput !== values[[label]]) {
      setConfirmMessage(prev => ({
        ...prev,
        [label]: "",
      }));
    }
  }, [values]);
  const handleNickNameValidate = async () => {
    if (!errors[[label]] && values[[label]]) {
      const data = await authApis.validateNickname({
        nickname: values[[label]],
      });
      if (data.ok) {
        handleConfirm((prev: any) => ({
          ...prev,
          nickname: values.nickname,
        }));
        setConfirmMessage(prev => ({
          ...prev,
          nickname: "아주 멋진 닉네임이군요!",
        }));
      }
    }
  };
  const ValidateButton: React.FC<ButtonProps> = ({ type }) => {
    return (
      <Button
        h={"52px"}
        w={"56px"}
        ml={2}
        textStyle="subtitle1"
        color={!errors[[label]] && values[[label]] ? "primary.500" : "grey.500"}
        p={2}
        border={
          !errors[[label]] && values[[label]]
            ? "1px solid #3F52E4"
            : "1px solid #C8C9D0"
        }
        borderRadius={16}
        bgColor={"background1"}
        onClick={
          type === "이메일" ? handleEmailValidate : handleNickNameValidate
        }
      >
        {type === "이메일" ? "인증" : "확인"}
      </Button>
    );
  };

  return (
    <FormControl isInvalid={errors[[label]]}>
      <FormLabel
        fontSize={"12px"}
        fontWeight={"400"}
        lineHeight={"14px"}
        color={"#75788A"}
        htmlFor={label}
        display={"flex"}
        alignItems={"center"}
        gap={"4px"}
      >
        {title}
      </FormLabel>
      <Flex align={"center"}>
        <Input
          onChange={e => {
            handleChange(e, label);
          }}
          type={type}
          placeholder={placeholder}
          h={"52px"}
          fontSize={"16px"}
          fontWeight={"400"}
          lineHeight={"20px"}
          borderRadius={16}
          _placeholder={{
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
          id={label}
        />
        {hasConfirmButton && <ValidateButton type={title} />}
      </Flex>
      {confirmMessage[[label]] && (
        <Flex
          fontSize={"12px"}
          fontWeight={"400"}
          lineHeight={"14px"}
          color={"primary.500"}
          mt={"8px"}
          align={"flex-end"}
        >
          <AiOutlineCheckCircle style={{ marginRight: "6px" }} />
          {confirmMessage[[label]]}
        </Flex>
      )}
      {errors[[label]] && (
        <FormErrorMessage
          fontSize={"12px"}
          fontWeight={"400"}
          lineHeight={"14px"}
          color={"#F90B66"}
        >
          <IoCloseCircleOutline style={{ marginRight: "6px" }} />
          {errors[[label]]}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default UserInput;
