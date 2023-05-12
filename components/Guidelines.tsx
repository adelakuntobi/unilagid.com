import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from 'react';
import styled from 'styled-components';


type InputProps = {
  guideline: any;
};

const Guidelines: React.FC<InputProps> = (props) => {
  const { guideline } = props
  return (
    <Rules className=''>
      <h4 className='text-lg font-medium my-2'>{guideline.title}</h4>
      <p>{guideline.text}</p>
      {
        guideline.list && (
          <ul className='list-disc list-inside requirements'>
            <li>Requirements for the quality of passport photos:</li>
            {
              guideline.list.map((item: string , index: Key | null | undefined) => (
                <li key={index}>{item}</li>
              ))
            }
          </ul>
        )
      }
      {
        guideline.img && (
          <>
            <img src={`/img/guidelines/${guideline.img}.svg`} alt="" />
            <div className='items-center gap-1 text-sm'>
              <span>From left to right</span>
              <ul className='items-center gap-5 list-decimal pl-5'>
                {
                  guideline.errors.map((item: string , index: Key | null | undefined) => (
                    <li key={index}>{item},</li>
                  ))
                }
                <li> good passport photo.</li>
              </ul>
            </div>

          </>
        )}
    </Rules>
  );
};


const Rules = styled.div`
margin-bottom: 1.5rem;
  h4{
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
  }
  .text{
    font-weight: 400;
    font-size: 14px;
    line-height: 28px;
  }
  img{
    width: fit-content;
    max-height: 270px;
  }

  ul.requirements{
    
    li{
      text-transform: lowercase;
      line-height: 1.75;
      font-size: 14px;
      &:first-of-type{
        list-style: none;
        text-transform: capitalize;
        font-weight: 500;
        margin-bottom: 2rem;
      }
    }
  }
`


export default Guidelines;