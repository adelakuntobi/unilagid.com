import styled, { keyframes } from "styled-components";

const appear = keyframes`

  from{
    opacity: 0;
    transform: translateX(-100%);
  }
  to{
    opacity: 1;
    transform: translateX(100%);
    width: 100%;
  }
`;


const hide = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 2rem ; */
  width: 100%;
  label{
    margin-bottom: 0.5rem;  
    font-size: 0.85rem;
    line-height: 1;
    letter-spacing: 0.02em;
    font-weight: 500;
    opacity: 0.7;
  }
  input,select,.input-div,.PhoneInput{
    padding: 0.65rem 1rem;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    font-size: 14px;
    width: 100%;
    background: transparent;
    outline: 0;
    input{
    box-shadow: none;
      padding: 0;
      border: 0;
    }

    .input-div,textarea{
      &:focus,&:focus-within{
        box-shadow: let(0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 #0000), let(--tw-ring-shadow, 0 0 #0000), let(--tw-shadow);
      }
    }
    &:focus,&:focus-within{
      box-shadow: let(0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 #0000), let(--tw-ring-shadow, 0 0 #0000), let(--tw-shadow);
    }


    @media (max-width: 768px) { 
      padding: 0.65rem 0.5rem;
    }	
  }
`;
export const Modalstyle = styled.div`
  background-color: rgba(0, 20, 17, 0.45);
  display: grid;
  place-items: center;
  backdrop-filter: blur(3px);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transition: width .1s;
  padding: 1rem;

  z-index: 100;

    &.show {
    animation: ${appear} 1s;
    }
    &.hide{
      animation: ${hide} 0.5s forwards;
    }
`;
