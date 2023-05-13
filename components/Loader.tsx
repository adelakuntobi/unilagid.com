import styled, { keyframes } from 'styled-components'
interface LoaderProps {
  readonly bigger?: any;
  readonly smaller?: any;
  readonly radius?: any;
};
export default function CircleLoader(props:any) {
  const { onModal } = props
  
  return (
    <div className='items-center'>
      {
        onModal ?
        <Styles
          bigger="70px"
          smaller="50px"
          radius="5px"></Styles> :
          <Styles /> 
      }
    </div>
  )
}

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotationBack = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;


const Styles = styled.div<LoaderProps>`
  width: ${props => props.bigger || "22px"};
  height: ${props => props.bigger || "22px"};
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 2px solid;
  border-width: ${props => props.radius || "2px"};
  border-color: #FFF #FFF transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;


  &::after{
    content: '';  
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 2px solid;
    border-width: ${props => props.radius || "2px"};
    border-color: transparent #17ffe2 #17ffe2;
    width: ${props => props.smaller || "12px"};
    height: ${props => props.smaller || "12px"};
    border-radius: 50%;
    animation: ${rotationBack} 0.5s linear infinite;
    transform-origin: center center;
  }
`;