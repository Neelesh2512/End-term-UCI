import styles from "./login.module.css";
import {
  NumberInput,
  NumberInputField,
  Button,
  Link,
  Container,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Router, useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useColorModeValue } from "@chakra-ui/react";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const textColor = useColorModeValue("#636363", "#fff");
  // Setting the input value
  const handleNumber: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput(e.target.value);
  };

  const handleOTPPage: React.MouseEventHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (input.length !== 10) {
      alert("Enter a 10 digit number");
    } else {
      fetch(
        // `${process.env.NEXT_PUBLIC_OTP_BASE_URL}uci/sendOTP?phone=${input}`,
        `http://143.110.183.73:3089/uci/sendOTP?phone=${input}`,
        { method: "GET" }
      ).then((response) => {
        if (response.status === 200) {
          router.push({ pathname: "/otp", query: { state: input } });
        } else {
          alert("OTP not sent");
        }
      });
    }
  };

  return (
    <div className="box-center">
      <Container
        className={styles.container}
        style={{ maxWidth: "390px", background: "white" }}
      >
        <div style={{ padding: "55px 18px" }}>
          <Box
            fontWeight="700"
            fontSize="24px"
            marginBottom="7px"
            textAlign={"center"}
            color="#000"
          >
            Login Account <FontAwesomeIcon icon={faUser} />
          </Box>
          <Box
            fontWeight="400"
            fontSize="13px"
            color="#000"
            textAlign={"center"}
          >
            Hello , welcome back to our account !
          </Box>
          <NumberInput style={{ margin: "80px 0px 30px 0px" }}>
            <NumberInputField
              height="55px"
              padding="18px 16px"
              border="3px solid #818181"
              filter="drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))"
              borderRadius="12px"
              fontWeight="400"
              fontSize="14px"
              color="#6f6f6f"
              placeholder="Enter your phone number"
              value={input}
              onChange={handleNumber}
              boxShadow="0 2.8px 2.2px rgba(0, 0, 0, 0.034),
              0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
              0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
              0 100px 80px rgba(0, 0, 0, 0.12);"
            />
          </NumberInput>
          <Button
            width="100%"
            background="#080664"
            borderRadius="12px"
            height="55px"
            marginBottom="27px"
            color="#fff"
            fontWeight="600"
            fontSize="18px"
            onClick={handleOTPPage}
          >
            Send OTP
          </Button>
          <div className={styles.signup}>
            <div>-------------&nbsp;&nbsp;</div>
            <div>Or sign up with</div>
            <div>&nbsp;&nbsp;-------------</div>
          </div>
          <div className={styles.createAccount} style={{ marginTop: "50px" }}>
            Not register yet?{" "}
            <b>
              <Link style={{ textDecoration: "none", color: "black" }}>
                Create Account
              </Link>
            </b>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
