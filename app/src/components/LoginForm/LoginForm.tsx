// import React from "react";
// import { useEffect, useState } from "react";
// import  Input from '../Input';

// const LoginForm = ({onSubmit, isResetField = false}) => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLogin, setLogin] = useState(true);

//     useEffect(() => {
//         setEmail('');
//         setPassword('');
//     }, [isResetField])

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         onSubmit && onSubmit({
//             type: isLogin ? 'login' : 'signup',
//             email, 
//             password
//         });
//         setEmail('');
//         setPassword('');
//     }
//     const handleEmail = (event) => {
//         setEmail(event.target.value)
//     }

//     const handlePassword = (event) => {
//         setPassword(event.target.value)
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <Input
//                     type="email" 
//                     name="Email"
//                     value={email}
//                     onChange={handleEmail}
//                 />
//             </div>
//             <div>
//                 <Input 
//                     value={password}
//                     type="password" 
//                     name="Password" 
//                     onChange={handlePassword}/>
//             </div>
//             <div>
//                 <button>
//                     { isLogin? 'Login': 'Signup' }
//                 </button>
//                 <div 
//                     onClick={() => setLogin(!isLogin)}
//                 >
//                     { isLogin? 'Register': 'Login'}
//                 </div>
//                 </div>
//             </form>
//     )
// }
// export default LoginForm
export {}