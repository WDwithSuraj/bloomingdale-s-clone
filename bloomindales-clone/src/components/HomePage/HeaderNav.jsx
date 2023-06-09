import logoImage from '../../Image/Vastra.jpg'
import {Box, Button, Flex, Image, Input, Spacer, Text, Circle} from '@chakra-ui/react'
import {Link} from 'react-router-dom';
import {auth} from '../../firebase'
import React, {useEffect, useState, useContext} from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { productOnSearch } from '../../api/api';
import Swal from 'sweetalert2'
import { CartContext } from '../../context/CartContextProvider';
function HeaderNav(){
    const {setSearchProduct,setIsAuth} = useContext(CartContext)
    const [authUser, setAuthUser] = useState(null);
    const [userNameFirstLetter, setUserNameFirstLetter] = useState('')
    const userName = userNameFirstLetter.toUpperCase()
    // const [productData, setProductData] = useState([])
    const [query, setQuery] = useState('')
    useEffect(()=> {
        const listen = onAuthStateChanged(auth, (user)=> {
            if(user){
                setUserNameFirstLetter(user.email[0])
                setAuthUser(user)
                setIsAuth(true)
            }else{
                setAuthUser(null)
            }
        })
        return () => {
            listen()
        }
    },[])
    const logOut = () => {
         Swal.fire({
             title: 'Are you sure?',
             text: "You want to log out!",
             icon: 'warning',
            showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, log out!'
            }).then((result) => {
        if (result.isConfirmed) {
            signOut(auth).then(()=> {
            setAuthUser(null)
            setIsAuth(false) 
            Swal.fire(
                'Logged Out!',
                 'You have been logged out!',
                     'success'
                    )
        })
  }
  
    })
     
    } 
    
      const fetchData = async (query) => {
        productOnSearch(query)
        .then((res)=> {
            res = res.data;
         setSearchProduct(res)
        })
    }

  const handleSearch = () => {
    fetchData(query)
  } 
 
 return <Flex align="center" h='70px'marginBottom={'0'}>
        <Box>
       <Link to='/'> <Image src={logoImage} w="120px" ml="20px"/></Link>
        </Box>
        <Spacer/>
        <Box mr="50px" display="flex" gap="10px" alignItems="center">
         { authUser?<Box display="flex" gap="10px" alignItems={"center"} justifyContent={'center'}> <Circle size='40px' bg='tomato' color='white' ><Text>{userName}</Text> </Circle><Button onClick={logOut} colorScheme='red'>Log Out</Button> </Box>  : <Link to='/login'><i  className="fa-solid fa-user-tie" style={{fontSize:'25px',marginRight:'10px'}}></i></Link>}
            <Input type='text' onChange={(e)=> setQuery(e.target.value)} placeholder='Search Product here...'/>
            <Button onClick={handleSearch} colorScheme="green">Search</Button>
           <Link to='/cart'> <i className="fa-sharp fa-solid fa-bag-shopping" style={{fontSize:'25px',marginLeft:"5px"}}></i></Link>
        </Box>
    </Flex> 
}

export default HeaderNav;