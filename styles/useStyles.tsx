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
    border-radius: 4px;
    height: 46px;
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
      padding: 0.65rem 0.85rem;
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

export const AllSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #fefefe;

  section{
    background: #FFFFFF;
    box-shadow: 0px 2px 24px rgba(146, 146, 146, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    h2{
      /* padding-top: 1rem; */
      padding-bottom: 1rem;
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
    }
    
    .cards{
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      row-gap: 1.25rem;
      background-color: #fff;
      column-gap: 1.25rem;
      @media (min-width: 640px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (min-width: 768px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
      &.three{
        
        @media (min-width: 768px) {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      &.four{
        
        @media (min-width: 768px) {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
      }
/* 
      @media (min-width: 1024px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      @media (min-width: 1280px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      } */
    }

    .card{
      background-color: white;
      border: 1px solid #EAECF0;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.06);
      border-radius: 4px;
      padding: 1rem 1.25rem;

      label{
        letter-spacing: -0.025em;
        font-weight: 500;
        color: #364a63;
        margin-bottom: 0.5rem;
      }
    }
  }
`;