import React, { useState } from "react";

import {
  Grid,
  GridItem,
  HStack,
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Center,
  Spinner,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Navbar2 from "../../Components/Navbar2";
import { Footer2 } from "../../Components/Fotter2";
import { MdDelete } from "react-icons/md";
// const url = `https://growup.onrender.com/orders`
const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [homestate, setHomestate] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");

  const getCartItems = async () => {
    try {
      return axios({
        method: "get",
        url: `https://growup.onrender.com/orders`,
      }).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    } catch (error) {
      console.log("err");
    }
  };

  const handleDelete = async (id) => {
    return axios({
      method: "delete",
      url: `https://growup.onrender.com/orders/${id}`,
    }).then(() => getCartItems());
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // Total
  useEffect(() => {
    let Total = 0;
    data?.forEach(
      (item) => (Total += Number(item.price) * Number(item.quantitiy))
    );
    setTotal(Total);
    console.log(typeof Total);
  }, [data]);

  const handleQuantity = (id, quantitiy, val) => {
    data.map((item, index) =>
      item.id === id ? (quantitiy = quantitiy + val) : quantitiy
    );
    axios
      .patch(`https://growup.onrender.com/orders/${id}`, {
        quantitiy: quantitiy,
      })
      .then(() => getCartItems());
  };

  return (
    <>
      <Navbar2 />
      <div>
        <Box
          display={"flex"}
          justifyContent="space-between"
          bg="#F5F7F7"
          p={"2.5%"}
          gap="5px"
          flexDir={{ base: "column", md: "row" }}>
          <Box
            width={"65%"}
            overflowY="scroll"
            boxSize={"borderBox"}
            bg="white"
            p={"30px"}>
            <Box
              display={["none","flex"]}
              flexDir={"row"}
              alignItems="center"
              columnGap={4}
              pb="30px"
              w="100%">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2940/2940522.png"
                w={"35px"}
              />
              <Text
                fontWeight="400"
                fontSize={{ base: "md", md: "xl", lg: "2xl" }}>
                <Text as={"span"}></Text> Item in your Bag
              </Text>
            </Box>

            <Grid gap={5}>
              {data.length === 0 ? (
                <Center>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Center>
              ) : (
                data?.map((cart) => (
                  <GridItem
                    key={cart.id}
                    m={"auto"}
                    display={["inline","flex"]}
                    boxSizing="border-box">
                    <HStack gap={4}>
                      <Box>
                        <Image
                          src={cart.image1}
                          alt="cart image"
                          f
                          h={150}
                          w={150}
                        />
                      </Box>
                      <Box>
                        <Text fontSize={20}>{cart.title}</Text>
                        <Text fontSize={18}>{cart.Category}</Text>
                        <Text fontSize={18}>Rating : {cart.rating}</Text>
                        <Text fontSize={15}>
                          Discounted Price :{`${cart.price}`}
                        </Text>
                        <Text fontSize={15}>Sold by: Smart Shop </Text>
                        {/* Buttons Quantity */}
                      </Box>
                    </HStack>
                    <HStack gap={10}>
                      <Box ml={10}>
                        <Button
                          bg={"#F25B22"}
                          isDisabled={cart.quantitiy === 1}
                          onClick={() =>
                            handleQuantity(cart.id, cart.quantitiy, -1)
                          }>
                          -
                        </Button>

                        <Button isDisabled>{cart.quantitiy}</Button>

                        <Button
                          bg={"#F25B22"}
                          onClick={() =>
                            handleQuantity(cart.id, cart.quantitiy, 1)
                          }>
                          +
                        </Button>
                      </Box>
                      <Box>
                        <Text fontSize={16}>{`₹ ${cart.price}`}</Text>
                      </Box>
                      <Box>
                        <Button
                          textColor={"whi"}
                          onClick={() => handleDelete(cart.id)}>
                          <MdDelete />
                        </Button>
                      </Box>
                    </HStack>
                  </GridItem>
                ))
              )}
            </Grid>
          </Box>
          <Box
            w={{ base: "100%", sm: "80%", md: "35%" }}
            left={{ sm: 0, md: 0 }}
            display={"flex"}
            flexDir="column"
            bg="#F5F7F7"
            rowGap={"25px"}>
            <Box p={"20px"} bg="white">
              <Box
                display="flex"
                flexDir={"row"}
                alignItems="center"
                columnGap={4}
                pb="10px"
                borderBottom={"1px solid black"}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png"
                  w={"35px"}
                />
                <Text fontWeight="400" fontSize={"1rem"}>
                  Delivery Address
                </Text>
              </Box>
              <Box
                display="flex"
                flexDir={"row"}
                alignItems="center"
                justifyContent={"space-between"}
                columnGap={4}
                p="10px"
                border={"1px solid black"}
                mt="15%">
                <Text fontWeight="400" fontSize={"1rem"}>
                  Delivery to{" "}
                  <Text as={"span"} fontWeight="600">
                    800020
                  </Text>
                </Text>
                <Text color={"#F25B22"} fontWeight="400" fontSize={"1rem"}>
                  Change
                </Text>
              </Box>
            </Box>
            <Box p={"20px"} bg="white">
              <Box
                display="flex"
                flexDir={"row"}
                alignItems="center"
                columnGap={4}
                pb="10px">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/7324/7324863.png"
                  w={"35px"}
                />
                <Text fontWeight="400" fontSize={"1rem"}>
                  Payment Summary
                </Text>
              </Box>
              <Box
                display="flex"
                flexDir={"row"}
                alignItems="center"
                justifyContent={"space-between"}
                columnGap={4}
                p="10px">
                <Text fontWeight="400" fontSize={"1rem"}>
                  Bag Total
                </Text>
                <Text color={"#F25B22"} fontWeight="400" fontSize={"1rem"}>
                  ₹{total}
                </Text>
              </Box>
              <Box
                display="flex"
                flexDir={"row"}
                alignItems="center"
                justifyContent={"space-between"}
                columnGap={4}
                p="10px">
                <Text fontWeight="400" fontSize={"1rem"}>
                  Shopping Charges
                </Text>
                <Text color={"#F25B22"} fontWeight="400" fontSize={"1rem"}>
                  Free
                </Text>
              </Box>
              <Box
                display="flex"
                flexDir={"row"}
                alignItems="center"
                justifyContent={"space-between"}
                columnGap={4}
                p="10px">
                <Text fontWeight="400" fontSize={"1rem"}>
                  Amount Payable : {total}
                </Text>
                <Text color={"#F25B22"} fontWeight="400" fontSize={"1rem"}>
                  ₹ {total}
                </Text>
              </Box>
              <Box>
                <Link to={"/paymentDetails"}>
                  {" "}
                  <Button
                    width={"100%"}
                    bg={"#F25B22"}
                    color="white"
                    fontWeight={"bold"}
                    fontSize={"1rem"}>
                    CHECKOUT
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* {products.map((el)=>{
      return (
          <div key={el.id}>
            
      <img src={el.image1} alt="image1" />
            </div>
    )})} */}
      </div>
      {/* <Footer2 /> */}
    </>
  );
};
// "image1": "https://assetscdn1.paytm.com/images/catalog/product/J/JE/JEWVIGHNAHARTA-VIGH1196979EA0CDD9/1562708763888_0..jpg?imwidth=282&impolicy=hq",
// "Brand": "Vighnaharta",
// "title": "Silver Brass Ring",
// "price": 249,
// "MRP": "1163",
// "Category": "jewellary",
// "rating": 4.7,
// "quantitiy": 1,
// "id": 1

export default Cart;
