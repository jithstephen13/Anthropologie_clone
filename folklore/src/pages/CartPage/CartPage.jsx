// import { Box, Heading, Text } from "@chakra-ui/react"
// import axios from "axios"
// import { useEffect, useState } from "react"
// import SingleCartProduct from "./SingleCartProduct"
// // import {sbt} from "./SingleCartProduct"
// import style from "./CartPage.module.css"



// const Data=[{
//     "img1": "https://ii2.pepperfry.com/media/catalog/product/m/i/494x544/miranda-3-seater-sofa-in-navy-blue-colour-by-woodsworth-miranda-3-seater-sofa-in-navy-blue-colour-by-2vzyyg.jpg",
//     "img2": "https://ii2.pepperfry.com/media/catalog/product/m/i/90x99/miranda-1-seater-sofa-in-navy-blue-colour-by-woodsworth-miranda-1-seater-sofa-in-navy-blue-colour-by-5o0ads.jpg",
//     "img3": "https://ii2.pepperfry.com/media/catalog/product/m/i/198x99/miranda-2-seater-sofa-in-navy-blue-colour-by-woodsworth-miranda-2-seater-sofa-in-navy-blue-colour-by-4rxwiv.jpg",
//     "img4": "https://ii2.pepperfry.com/media/catalog/product/m/i/90x99/miranda-1-seater-sofa-in-navy-blue-colour-by-woodsworth-miranda-1-seater-sofa-in-navy-blue-colour-by-5o0ads.jpg",
//     "name": "Miranda 3 Seater Sofa In Navy Blue Colour",
//     "brand": "Woodsworth",
//     "lowprice": 43299,
//     "highprice": 60999,
//     "rating": 4.1,
//     "id": 1
// }
// ]


// const CartData=({Subtotal})=>{
//     // const [Data,setData]=useState();
//     const [total,setTotal]=useState(0)
//     let s=0
//     // useEffect(()=>{
//     //     axios.get("https://fakestoreapi.com/products")
//     // .then(res=>setData(res.data))
//     // .catch(err=>{
//     //     console.log(err);
//     // })
//     // },[])

//     // {
//     //     Data?.map((el)=>{
//     //         s+=el.price
//     //     })
//     // }

//     const handelTotal=(tot)=>{
//         setTotal(tot)
//     }
  
  
//    console.log(total);
//     return <Box> 
//                 <Box className={style.container} >
//                     {
//                         Data.map((el)=>{
//                         return <SingleCartProduct HandelTotal={handelTotal} S={s}  key={el.id} data={el} />
//                         })
//                     }
//                 </Box>
//                 {/* <Box>{s}</Box> */}
//                 {/* <Box>{sbt}</Box> */}
//                 {/* <Box>
//                     <Heading>Order Summary</Heading>
//                     {
//                         Data?.map((el)=>{
//                             return (
//                             <Box key={el.id}>
//                                 <Box>
//                                     <Text>Subtotal</Text>
//                                     <Text>₹{el.price}</Text>
//                                 </Box>
//                                 <Box>
//                                     <Text></Text>
//                                     <Text></Text>
//                                 </Box>
//                                 <Box>
//                                     <Text></Text>
//                                     <Text></Text>
//                                 </Box>
//                                 <Box>
//                                     <Text></Text>
//                                     <Text></Text>
//                                 </Box> 
//                             </Box>
//                             )
//                         })
//                     }
                    
//                 </Box> */}
//            </Box>
    
// }

// export default CartData


import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Divider,
  Image,
  Text,
  Button,
  Input,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  Collapse,
  Badge,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

// const CartManualData=[
//   {
//     "_id":"63fa0fb14a326ab9afba6b9a",
//     "img1": "https://ii2.pepperfry.com/media/catalog/product/m/i/494x544/miranda-3-seater-sofa-in-navy-blue-colour-by-woodsworth-miranda-3-seater-sofa-in-navy-blue-colour-by-2vzyyg.jpg",
//     "img2": "https://ii2.pepperfry.com/media/catalog/product/m/i/90x99/miranda-1-seater-sofa-in-navy-blue-colour-by-woodsworth-miranda-1-seater-sofa-in-navy-blue-colour-by-5o0ads.jpg",
//     "img3": "https://ii2.pepperfry.com/media/catalog/product/m/i/198x99/miranda-2-seater-sofa-in-navy-blue-colour-by-woodsworth-miranda-2-seater-sofa-in-navy-blue-colour-by-4rxwiv.jpg",
//     "img4": "https://ii2.pepperfry.com/media/catalog/product/m/i/90x99/miranda-1-seater-sofa-in-navy-blue-colour-by-woodsworth-miranda-1-seater-sofa-in-navy-blue-colour-by-5o0ads.jpg",
//     "name": "Miranda 3 Seater Sofa In Navy Blue Colour",
//     "brand": "Woodsworth",
//     "lowprice": 43299,
//     "highprice": 60999,
//     "rating": 4.1,
//     "quantity": 1,
// }
// ]
import {getItem} from "../../utility/localStorage"
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

const CartData = () => {
  
  const [Cart_Data, set_Cart_Data] = useState([]);
  const [pin, setPin] = useState("");
  const toast = useToast();
 const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [total, settotal] = useState(0);
  const [coupon, setcoupon] = useState("");
  const [couponCount, setcouponCount] = useState(0);
  const user=getItem("userData")||{}
  const token=user.token;

  const navigate = useNavigate();

  // colapse function for price details
  const Get_All_Cart_Data = async () => {
    // console.log("data")
    let res = await axios
      .get(`https://vast-puce-mussel-tie.cyclic.app/carts`,
      {
        headers: {
          Authorization:  token,
         
        },
      }
      )
      .then((res) => {
        set_Cart_Data(res.data);
        console.log(res);
      });
  };
  useEffect(() => {
    Get_All_Cart_Data();
  }, []);

  const handleTotal = () => {
    let Total = 0;
    Cart_Data.map((ele) => {
      let addgst = (ele.lowprice / 100) * 18;
      let singleprice = addgst + ele.lowprice;
      Total += Math.floor(singleprice * ele.quantity);
    });
    settotal(Total);
  };
  useEffect(() => {
    handleTotal();
  }, [Cart_Data]);

  const handleDecrease = (item) => {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    const GSTIN = JSON.parse(localStorage.getItem("GSTIN")) || "";
    if (item.quantity > 1) {
      let newdata = Cart_Data.map((ele) => {
        if (ele._id === item._id) {
          return { ...ele, quantity: ele.quantity - 1 };
        } else return ele;
      });
      axios
      .patch(
        `https://vast-puce-mussel-tie.cyclic.app/carts/update/${item.id}`,
        item,
        {
          headers: {
            Authorization:  token,
          
          },
        }
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      set_Cart_Data(newdata);
    } else {
      toast({
        title: "Quantity",
        description: "Minimum Quantity Is 1.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleIncrease = (item) => {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    const GSTIN = JSON.parse(localStorage.getItem("GSTIN")) || "";
    if (item.quantity < 5) {
      let newdata = Cart_Data.map((ele) => {
        if (ele._id === item._id) {
          return { ...ele, quantity: ele.quantity + 1 };
        } else {
          return ele;
        }
      });
      axios
        .patch(
          `https://vast-puce-mussel-tie.cyclic.app/carts/update/${item.id}`,
          item,
          {
            headers: {
              Authorization:  token,
             
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      set_Cart_Data(newdata);
    } else {
      toast({
        title: "Quantity",
        description: "Maximum Quantity Is 5 .",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
//   const findDelivery = () => {
//     let length = pin.length;
//     if (length === 6) {
//       setError("");
//     } else if (length < 6) {
//       setError("Please enter valid 6-digit pincode.");
//     }
//   };
  const handleRemove = (item) => {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    const GSTIN = JSON.parse(localStorage.getItem("GSTIN")) || "";
    const removedata = Cart_Data.filter((ele) => ele._id !== item._id);
    set_Cart_Data(removedata);
    axios
      .delete(
        `https://vast-puce-mussel-tie.cyclic.app/carts/delete/${item._id}`,
        {
          headers: {
            Authorization: token,
            
          },
        }
      )
      .then((res) => {
        toast({
          title: "Remove Data",
          description: "Remove Succesfully",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
  };
//   const handleRedirected = () => {
//     // navigate("/cart/checkout");
//   };
  const handleDiscount = () => {
    if (couponCount == 1) {
      toast({
        title: "Offers",
        description: "Coupon Already Applied.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else if (
      (coupon == "DUBAM300" && couponCount == 0) ||
      (coupon == "APP300" && couponCount == 0)
    ) {
      setcouponCount(1);
      settotal((tota) => tota - 300);
      toast({
        title: "Offers",
        description: "Coupon Added Succesfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Quantity",
        description: "Enter Valid Coupon.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handeltotalPrice=()=>{

    localStorage.setItem("totalPrice",JSON.stringify({total}))
    navigate("/checkoutpage")
  }

  
  return (
    <>

    <Navbar/>

      <Box mt="20px">
        <Box
          display="flex"
          bgColor="#566573"
          w="67%"
          h="50px"
          alignItems={"center"}
          borderBottom={"0.5px solid RGBA(0, 0, 0, 0.08)"}
          borderTop="0.5px solid RGBA(0, 0, 0, 0.08)"
          ml="10px"
          mb="30px"
          // mt="70px"
        >
          {/* cart page startting from here */}
          <Text  fontWeight={"semibold"} color="white" align="center" ml="30px" fontSize={"30px"}>
            My Cart
          </Text>
          
        </Box>

        <Box display="flex" mb="30px">
          <Box w="70%">
            <Box
              style={{ height: "500px", overflowY: "scroll" }}
              w="98%"
              m="10px"
            >
              <Box
                justifyContent="space-between"
                display="flex"
                w="100%"
                px="50px"
                py="10px"
                bgColor="#566573"
                m="auto"
                
              >
                <Text color='white'>Item</Text>
                <Text color='white'>Quantity</Text>
                <Text color='white'>Price (Inclusive of GST)</Text>
              </Box>
              {/*  mapping all the cart data */}
              {Cart_Data.map((item, index) => (
                <div key={item._id}>
                  <SingleItem
                    key={item._id}
                    item={item}
                    handleDecrease={handleDecrease}
                    handleIncrease={handleIncrease}
                    handleRemove={handleRemove}
                  />
                  <Divider />
                </div>
              ))}
            </Box>
            <Box
              w="98%"
              alignItems={"center"}
              h="70px"
              display="flex"
              m="auto"
              boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
              justifyContent={"space-between"}
              px="20px"
            >
              <Button
                h="46px"
                borderRadius={0}
                bgColor={"white"}
                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                // onClick={() => navigate("/")}
              >
                + CONTINUE SHOPPING
              </Button>
              <Button
                h="45px"
                _hover={{ backgroundColor: "#566573", color: "grey" }}
                color="white"
                borderRadius={0}
                px="30px"
                bgColor="#566573"
                onClick={handeltotalPrice}
              >
                PLACE ORDER
              </Button>
            </Box>
          </Box>
          <VStack  w="30%" my="10px" mx="10px">
            <Box
              mt="-85px"
              h="auto"
              pb="20px"
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              w="100%"
            >
              {/*  pincode added and shiping section */}
              <Box
                bgColor={"#566573"}
                w="100%"
                h="40px"
                mb={"10px"}
                display="flex"
                px="7px"
                justifyContent="space-between"
              >
                <Text
                  color="white"
                  alignItems={"center"}
                  textAlign="left"
                  pt="5px"
                >
                  Payment Summary
                </Text>
                {/* <Image
                  filter={"invert(100%)"}
                  w="20px"
                  src="https://www.industrybuying.com/static/desktop-payment/assets/svg/rupee-circle-icon.svg"
                /> */}
              </Box>
              <Text
                color="RGBA(0, 0, 0, 0.48)"
                pl="20px"
                pb="10px"
                textAlign={"left"}
              >
                Estimate shipping charges
              </Text>
              <HStack px="20px" w="100%">
                <Input
                  fontSize={"12px"}
                  w="100%"
                  placeholder="ENTER YOUR PINCODE"
                  _hover={{ border: "none" }}
                //   value={pin}
                //   onChange={(e) => setPin(e.target.value)}
                />
                <Button
                  position={"relative"}
                  left="-77px"
                  verticalAlign="middle"
                  zIndex="10"
                //   onClick={findDelivery}
                >
                  CHECK
                </Button>
              </HStack>
              <Text
                pl="20px"
                fontSize={"13px"}
                color="#de2511"
                py="3px"
                textAlign={"left"}
              >
                {/* {error} */}
              </Text>
              {!error ? (
                <VStack>
                  <Box
                    display={"flex"}
                    h="30px"
                    justifyContent="space-between"
                    w="90%"
                    margin="auto"
                    py="20px"
                  >
                    <Text>Subtotal:</Text>
                    <Text>₹{total.toLocaleString()}</Text>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    h="30px"
                    w="90%"
                    margin="auto"
                    py="20px"
                  >
                    <Text>Shipping Charges</Text>
                    <Text color="#3da73a">FREE</Text>
                  </Box>
                  <Box
                    fontWeight={"bold"}
                    display={"flex"}
                    h="30px"
                    justifyContent="space-between"
                    w="90%"
                    margin="auto"
                    py="20px"
                    fontSize={"20px"}
                  >
                    <Text>Total Price: </Text>
                    <Text>₹{total.toLocaleString()}</Text>
                  </Box>
                  <HStack
                    w="100%"
                    px="10px"
                    mt="10px"
                    borderTop={"0.5px solid RGBA(0, 0, 0, 0.36)"}
                  >
                    <Image
                      w="30px"
                      h="30px"
                      src="https://www.industrybuying.com/static/desktop-payment/assets/svg/delivery-truck.svg"
                      alt="Free Shipping"
                    />
                    <Text color={"grey"} fontSize="12px">
                      Shipping charges applicable as per your pincode {pin}
                    </Text>
                  </HStack>
                </VStack>
              ) : null}
            </Box>
            {/* Partner offer section */}
            <Box
              h="auto"
              pb="20px"
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              w="100%"
            >
              <Box
                bgColor={"#566573"}
                w="100%"
                h="40px"
                mb={"10px"}
                display="flex"
                px="7px"
                justifyContent="space-between"
              >
                <Text
                  color="white"
                  alignItems={"center"}
                  textAlign="left"
                  pt="5px"
                >
                  Partner Offers
                </Text>
                <Image
                  filter={"invert(100%)"}
                  w="20px"
                  src="https://www.industrybuying.com/static/desktop-payment/assets/svg/discount-icon.svg"
                />
              </Box>
              <VStack
                textAlign={"left"}
                lineHeight="20px"
                align="flex-start"
                borderRadius={"7px"}
                px="20px"
                h="80px"
                bgColor={"#fffaef"}
                border="1px dashed #e3daad"
                w="90%"
                m="auto"
              >
                <Text fontWeight={"semibold"}>
                  Get GST invoice and save up to 28% on Business Purchases.
                </Text>
                <Link
                  onClick={onOpen}
                  color={"#046699"}
                  textDecoration="underline"
                >
                  View More
                </Link>
                <OverlayModel
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                />
              </VStack>
            </Box>

            <Box
              h="auto"
              pb="20px"
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              w="100%"
            >
              <Box
                bgColor={"#566573"}
                w="100%"
                h="40px"
                mb={"10px"}
                display="flex"
                px="7px"
                justifyContent="space-between"
              >
                <Text
                  color="white"
                  alignItems={"center"}
                  textAlign="left"
                  pt="5px"
                >
                  Offers Available
                </Text>
                <Image
                  filter={"invert(100%)"}
                  w="20px"
                  src="https://www.industrybuying.com/static/desktop-payment/assets/svg/discount-icon.svg"
                />
              </Box>
              <HStack px="20px" w="100%">
                <Input
                  fontSize={"12px"}
                  w="100%"
                  placeholder="ENTER YOUR PINCODE"
                  _hover={{ border: "none" }}
                  value={coupon}
                  onChange={(e) => setcoupon(e.target.value)}
                />
                <Link
                  as={Link}
                  position={"relative"}
                  left="-60px"
                  // color="#fb8869"
                  verticalAlign="middle"
                  zIndex="20"
                  onClick={() => handleDiscount()}
                >
                  Apply
                </Link>
              </HStack>
            </Box>
            {/* first coupon box */}
            <Box
              px="10px"
              alignItems="flex-start"
              w="100%"
              pl="10px"
              h="100px"
              fontSize={"14px"}
              overflowY="scroll"
              scrollPadding={"10px"}
              scrollbarColor="white blue"
            >
              <Box>
                <Box display={"flex"}>
                  <Badge
                    bgColor={"#566573"}
                    alignItems="flex-start"
                    color="white"
                  >
                    Avalable
                  </Badge>
                </Box>
                <Flex w="100%" justifyContent={"space-between"}>
                  <Text>DUBAM300</Text>
                  <Link onClick={() => setcoupon("DUBAM300")} color={"#3498DB"} >
                    Apply Now
                  </Link>
                </Flex>
                <Flex mt="20px" w="100%" justifyContent={"space-between"}>
                  <h6>Get Flat Rs. 300 Off.</h6>
                  <Link>T&C Apply</Link>
                </Flex>
              </Box>
              {/* second coupon box */}
              <Box>
                <Box display={"flex"} pt="30px" pb="4px">
                  <Badge
                    bgColor={"#566573"}
                    alignItems="flex-start"
                    color="white"
                  >
                    Avalable
                  </Badge>
                </Box>
                <Flex w="100%" justifyContent={"space-between"}>
                  <Text>APP300</Text>
                  <Link onClick={() => setcoupon("APP300")} color={"#3498DB"}>
                    Apply Now
                  </Link>
                </Flex>
              </Box>
              <Flex w="100%" mt="20px" justifyContent={"space-between"}>
                <h6>Get Flat Rs. 300 Off.</h6>
                <Link>T&C Apply</Link>
              </Flex>
            </Box>
          </VStack>
        </Box>
      </Box>
      {/* <Footer/> */}
    </>
  );
};
export default CartData;

export const SingleItem = ({
    item,
    handleDecrease,
    handleIncrease,
    handleRemove,
    dd,
  }) => {
    const toast = useToast();
    const [show, setShow] = React.useState(true);
    const totalPrice = (item) => {
      let tax = Math.floor(item.lowprice / 100) * 18;
      let totaltax = tax * item.quantity;
      let total = item.lowprice * item.quantity + totaltax;
      return { total, tax: totaltax };
    };
    // colapse function for price details
    const handleToggle = () => setShow(!show);
    return (
      <Box h="250px" key={item._id}>
        {/* initial sec item quantity */}
        <Text
          mb="10px"
          textAlign={"left"}
          w="300px"
          fontSize="15px"
          display="flex"
          pl="10px"
          mt="20px"
        >
          {item.name}
        </Text>
  
        <Box display="flex"  w="95%" justifyContent="space-between" m="auto">
          <Box mt="20px"  display="flex" fontSize="14px">
            <Box py="10px"  px="10px" w="30%">
              <Image
                // src={item.images[0].image_url}
                src={item.img1}
                style={{
                  marginTop:"-20px",
                  width: "500px",
                  // border:"solid red",
                  height: "200px",
                  // objectFit: "cover",
                }}
              />
            </Box>
            <Box textAlign={"left"} w="200px">
              <Text> Brand:{item.brand}</Text>
              {/* <Text> category:{item.category}</Text> */}
              {/* <Text> {item.Spindle_Speed}</Text> */}
              {!dd ? (
                <Button
                  style={{
                    textAlign: "left",
                    display: "flex",
                    fontSize: "13px",
                  }}
                  pl="0px"
                  bg="white"
                  color="blue.300"
                  _hover={{ backgroundColor: "background", color: "blue.400" }}
                  onClick={() => handleRemove(item)}
                >
                  <DeleteIcon color="blue.300" />
                  Remove
                </Button>
              ) : null}
            </Box>
          </Box>
          {dd ? null : (
            <Box
              style={{
                width: "70px",
                display: "flex",
                height: "33px",
                color: "grey",
                alignItems: "center",
                border: "0.5px solid RGBA(0, 0, 0, 0.16)",
              }}
            >
              <button
                style={{
                  alignItems: "center",
                  fontSize: "18px",
                  height: "30px",
                  margin: "auto",
  
                  backgroundColor: "white",
                  borderRight: "0.5px solid RGBA(0, 0, 0, 0.16)",
                  cursor: "pointer",
                }}
                onClick={() => handleDecrease(item)}
              >
                <MinusIcon py="1" />
              </button>
              <input
                type="text"
                value={item.quantity}
                style={{
                  width: "30px",
                  height: "30px",
                  fontSize: "20px",
                  textAlign: "center",
                  margin: "auto",
                }}
              />
              <button
                style={{
                  alignItems: "center",
                  fontSize: "18px",
                  backgroundColor: "white",
                  border: "none",
                  borderLeft: "0.5px solid RGBA(0, 0, 0, 0.16)",
                  cursor: "pointer",
                  margin: "auto",
                }}
                onClick={() => handleIncrease(item)}
              >
                <AddIcon py="1" />
              </button>
            </Box>
          )}
  
          <Box w="30%">
            <HStack w="50%" m="auto" justifyContent={"space-between"}>
              <span>₹{totalPrice(item).total.toLocaleString()}</span>
              <Button
                fontSize={"14px"}
                color="#4299E1"
                w="40px"
                m="auto"
                background={"Background"}
                _hover={{ backgroundColor: "white" }}
                variantColor="blue"
                onClick={handleToggle}
              >
                Details{" "}
                {show ? (
                  <AddIcon
                    borderRadius={"50%"}
                    w="15px"
                    h="15px"
                    border="1px solid #4299E1"
                    color={"blue.400"}
                  />
                ) : (
                  <MinusIcon
                    color={"blue.400"}
                    w="15px"
                    h="15px"
                    borderRadius={"50%"}
                    border="1px solid #4299E1"
                  />
                )}
              </Button>
            </HStack>
            <Collapse color="black" mt={4} in={show}>
              <VStack
                w="200px"
                fontSize="12px"
                display="flex"
                justifyContent="space-between"
                p="10px"
                lineHeight="0.7"
                m="auto"
                bgColor="#F5F5F5"
              >
                <Box display="flex" w="95%" justifyContent="space-between">
                  <span> Price ₹</span>
                  <span>{item.lowprice.toLocaleString()}</span>
                </Box>
                <Box
                  display="flex"
                  w="95%"
                  justifyContent="space-between"
                  m="auto"
                >
                  <span> GST@{18}%</span>
                  <span>+₹{totalPrice(item).tax.toLocaleString()}</span>
                </Box>
                <Box
                  display="flex"
                  w="95%"
                  justifyContent="space-between"
                  m="auto"
                >
                  <span>Final Price</span>
                  <span>{totalPrice(item).total.toLocaleString()}</span>
                </Box>
              </VStack>
            </Collapse>
            <HStack w="70%" my="20px">
              <Image
                w="30px"
                h="30px"
                src="https://www.industrybuying.com/static/svg/delivery-truck-afterdiscount.svg"
                alt="Free Shipping"
              />
              <Text color={"#4c993e"}>Free shipping</Text>
            </HStack>
          </Box>
        </Box>
      </Box>
    );
  };
  
  // model for t&c checking
  function OverlayModel({ isOpen, onClose }) {
    return (
      <>
        <Modal
          blockScrollOnMount={false}
          styles={{ width: "700px", maxWidth: "700px" }}
          isOpen={isOpen}
          onClose={onClose}
          borderRadius="10px"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bgColor="#232f3e" color={"white"}>
              <Text fontSize={"16px"}>
                Get GST invoice and save up to 28% on business purchases
              </Text>
              <Text fontSize={"16px"}>
                We allow registered users to purchase products for their business
                use. You will receive business(GST) invoice with your company name
                and GST number.
              </Text>
            </ModalHeader>
            <ModalCloseButton
              w="40px"
              h="40px"
              bgColor={"#232f3e"}
              border="1px solid white"
              borderRadius={"50%"}
              position={"absolute"}
              top="-20px"
              right="-20px"
              color={"#000"}
            />
            <ModalBody color={"gray"}>
              <Text fontWeight="bold" mb="1rem">
                Here's How:
              </Text>
              <ul>
                <li>Create your free IndustryBuying user account with us</li>
                <li>Add the products in your cart and proceed to checkout</li>
                <li>
                  During Checkout, select 'Use GSTIN for Business Purchase'
                  checkbox
                </li>
                <li>
                  Add your shipping and billing details in the address section
                </li>
                <li>
                  Complete the order and you shall receive business(GST) invoice
                  along with your delivered orders
                </li>
                <li>
                  Your billing details will be saved with us for quicker checkout
                  on your next purchase.
                </li>
                <li>
                  You can edit the billing details any time later for your next
                  purchase
                </li>
                <li>
                  Please note that currently GST is mandatory for getting business
                  Invoices
                </li>
                <li>Kindly provide correct billing details during checkout</li>
              </ul>
            </ModalBody>
          </ModalContent>
        </Modal>
  
  
      <Footer/>
      </>
    );
  }