import styled from 'styled-components'
export default styled.div`

padding-top: 14vh;
padding-bottom: 1rem;
 .main{
    box-shadow: 10px 10px 20px 4px rgba(0,0,0,0.5);
   position: relative;
   width: 50%;
   margin: auto;
   background: white;
   border-radius: 8px;
   .upperPart{
       height: 180px;
       width: 100%;
       position: relative;
       .heading{
           font-size: 2rem;
           color: white;
           text-transform: uppercase;
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
       }
       img{
           height: 100%;
           width: 100%;
           border-top-left-radius: 8px;
           border-top-right-radius: 8px;
           
       }
   }

   .lowerPart{
      padding: 0.5rem 4rem;
      margin: 2rem 0;
      margin-bottom: 0;
      .form{
          .formInput{
              display: flex;
              margin-bottom: 1rem;
              span{
                  color: #808080;
                  font-size: 1rem;
                  width: ${props => props.type === 'login' ? '20%' : '35%'};
              }
              .inputForm{
                  width: ${props => props.type === 'login' ? '80%' : '65%'};
                  position: relative;
                 input{
                  width: 90%;
                  border: none;
                  outline: none;
                  font-size: 1rem;
                  position: relative;
              } 
              input:focus + .line{
                  background: #57b846;
              }
              .line{
                  position: absolute;
                  bottom: -30px;
                  height: 1px; 
                  background: #808080;
                  width: 90%;
              }
              }
            }
            .btns{
                display: flex;
                justify-content: space-between;
                width: 70%;
                margin-left:  ${props => props.type === 'login' ? '20%' : '35%'};
                button{
                 background: #ff5200;
                 border: none;
                 color: white; 
                 padding: 0.5rem ${props => props.type === 'login' ? '3rem' : '2rem'};
                 margin-top: 0.5rem;
                 border-radius: 25px;
                 cursor: pointer;
                 outline: none;
                 &:hover{
                     opacity: 0.8;
                 }
                }

            }
             
      }
      .link{
          margin-left: ${props => props.type === 'login' ? '20%' : '35%'};
      }
   }
   .accountAlert{
       position: absolute;
       top: -20px;
       left: 50%;
       background: red;
       display: flex;
       padding: 0.5rem 2rem;
       justify-content: space-between;
       transform: translate(-50%, 0);
       border-radius: 3px;
       color: white;
       align-items: center;
       width: 50%;
       margin: auto;
       z-index: 1;
       .errorMessage{
           text-align: center;
           width: 100%;
           margin: auto;
       }
   }
 }

 @media(max-width: 1200px) {
     .main {
         width: 60%;
     }
 }

 @media(max-width: 900px) {
    .main {
        width: 70%;
    }
}

@media(max-width: 900px) {
    .main {
        width: 80%;
    }
}

@media(max-width: 600px) {
    .main {
        width: 90%;
        .lowerPart{
            padding: 0.5rem 2rem;
        }
    }
}
@media(max-width: 525px) {
    background: white;
    padding-top: 9vh;
    .main {
        width: 100%;
        height: 100%;
        border-radius: 0;
        box-shadow: none;
        .upperPart{
            img{
              border-radius: 0;
            }
        }
        .lowerPart{
            padding: 0.5rem 1rem;
            .form{
                .formInput{
                    flex-direction: column;
                    span{
                        padding-left: 0.2rem;
                        width: 100%;
                    }
                    .inputForm{
                        width: 100%;
                        margin-bottom: 1rem;
                        input{
                            width: 100%;
                            padding: 0.5rem 0.2rem;
                        }
                        .line{
                            width: 100%;
                        }
                    }
                }
                .btns{
                    width: 100%;
                    flex-direction: column;
                    margin-left: 0;
                     button{
                    width: 50%;
                }
                }
               
            }
            .link{
                margin-left: 0;
            }
        }
    .accountAlert{
        top: 20px;
        // left: 10%;
        width: 80%;
    }
}
}
`