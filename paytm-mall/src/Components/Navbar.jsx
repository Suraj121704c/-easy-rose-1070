import "./Navbar.css";
import React from "react";
import { Image, Flex, Text, Input, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const menulogo =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX/////AAD/4OD/ODj/uLj/XFz/oKD/nZ3/mZn/7+//qan/LCz/29v/tbX/VVX/l5fHVi3UAAAA2klEQVR4nO3cyW0DQQwAwZUt614p/2yVgj+LQc9URcB+E+S2AQAA8A/X09yu22X0CAe7KMxT2KewT2Gfwj6FfQr7FPYp7FPYp7BPYd8KhbfRIxzstt1/5nYfvRgCAAAAAAAAAAAAAIDpPJ6/M3s+/InKW+HuSWGdwj6FfQr7FPYp7FPYp7BPYZ/CPoV9KxTO/0XptZ9ntr9GL4YAAAAAAAAAAAAAAICc/f03s/fuT1TeCpddCusU9insU9insE9hn8I+hX0K+xT2KexbofAzeoSDfUavTQAAABq+5cdYJXrPEpoAAAAASUVORK5CYII=";
const searchlogo =
  "data:image/png;base64,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";
const orderlogo =
  "data:image/png;base64,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";
const cartlogo =
  "https://www.kindpng.com/picc/m/12-123316_paytm-mall-icon-png-image-free-download-searchpng.png";
const loginlogo =
  "data:image/png;base64,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";

const category = [
  "Jewellery",
  "Electronics",
  "Fashion",
  "Decoration",
  "Glasses"
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const menuref = React.useRef();

  React.useEffect(() => {
    let handler = (e) => {
      if (!menuref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });
  return (
    <Box>
      <Image
        className="Logo"
        src="data:image/png;base64,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"
        alt="Paytm-mall"
      />
      <Flex p={"0 1%"} gap="1%" h={"40px"} fontSize={"16px"} mt={"-2vh"}>
        <Flex
          align="center"
          border={"1px solid gray"}
          p="0 0.5%"
          borderRadius={"5px"}
          className="flex-class"
          onClick={() => {
            setOpen(!open);
          }}
          ref={menuref}
        >
          <Image src={menulogo} alt="" w="25px" h="20px" />
          <Text w={"12vw"}>Shop by category</Text>
        </Flex>
        <Flex className="flex-class">
          <Input
            type="search"
            border={"1px solid gray"}
            placeholder="Search for a Product,Brand or Category"
            w={"48vw"}
            h="100%"
          />
          <Image src={searchlogo} h="25px" ml={"-6%"} mt={"1.5%"} />
        </Flex>
        <Flex align={"center"} gap="0.8vw" ml={"-2%"} className="flex-class">
          <Image src={orderlogo} h={"25px"} />
          <Text>My Orders</Text>
        </Flex>
        <Flex align={"center"} gap="0.8vw" className="flex-class">
          <Image src={cartlogo} h={"25px"} />
          <Text w={"7vw"} lineHeight="18px">
            No Items in the Bag
          </Text>
        </Flex>
        <Flex align={"center"} gap="0.8vw" className="flex-class">
          <Image src={loginlogo} h={"25px"} />
          <Text>Log In/Sign Up</Text>
        </Flex>
      </Flex>
      <Flex
        padding={"1% 5%"}
        backgroundColor="white"
        width={"80vw"}
        className={`category-menu ${open ? `active` : `inactive`}`}
      >
        {/* <Box  lineHeight="30px">
          <Flex align="center" border={"1px solid gray"} p="0 1%" borderRadius={"5px"} className="flex-class">
            <Image src={menulogo} alt="" w="25px" h="20px"/>
            <Text w={"12vw"}>Shop by category</Text>            
          </Flex>
          
        </Box> */}
        <Text color={"red"} textAlign="left">
          GIFT CARDS
        </Text>

        <Box paddingLeft={"10%"} textAlign="left" lineHeight={"30px"}>
          {category.map((ele) => (
            <p>{ele}</p>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;

const ShopCategory = () => {
  return <div></div>;
};
