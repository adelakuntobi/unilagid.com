import Guidelines from '@/components/Guidelines';
import Layout from '@/components/Layout';
import styled from 'styled-components';

const Dashboard = () => {

  const guidelinesArr = [
    {
      title: 'Photo size',
      text: 'Standard format: 2 x 2 inches (or 51 x 51 mm) in size (White Background)'
    },
    {
      title: "Width of face",
      text: "Between 16 mm and 20 mm from ear to ear."
    },
    {
      title: "Length of face",
      text: "Ages 11 and above: between 26 mm and 30 mm from chin to crown.",
      img: "length-of-face",
      errors: [
        'other side not visible',
        'not centeralized'
      ]
    },
    {
      title: "Quality of photo",
      list: [
        'colour photo',
        'true likeness and no more than six months old when the application is submitted',
        'natural representation',
        'sharp image, with sufficient contrast and detail',
        'undamaged',
        'not a reproduction (copy)',
        'unaltered by computer software',
        'printed on high-quality, smooth photo paper',
        'minimum 400 dpi resolution',
      ],
      img: "quality-of-photo",
      errors: [
        'blurry image',
        'too little contrast'
      ]
    },
    {
      title: "Glasses",
      list: [
        'eyes fully visible',
        'fully transparent lenses',
        'no glare on the glasses',
        'no shadow',
      ],
      img: "glasses",
      errors: [
        'blurry image',
        'too little contrast'
      ]
    }
  ]

  const guidelines2 = [
    {
      title: "Lightning",
      list: [
        'even',
        'not overexposed or underexposed',
        'no shadow on the face or in the background',
        'no reflection on the face',
        'no reflection caused by accessories',
      ],
      img: "lightning",
      errors: [
        'non-uniform color',
      ]
    },
    {
      title: "Position",
      list: [
        'head facing forward',
        'eyes horizontally aligned',
        'head not tilted',
        'shoulders straight',
      ],
      img: "position",
      errors: [
        'head tilted',
      ]
    },
    {
      title: "Background",
      list: [
        'White',
        'plain',
        'all one colour',
        'uniform colour (no fade)',
        'sufficient contrast with head',
      ],
      img: "background",
      errors: [
        'head tilted',
      ]
    },
  ]


  return (
    <Layout>
      {/* <section>
        <div className='bg-[#219653] text-white  px-10 py-12  relative overflow-hidden'>
          <img src="/img/dashboard-pattern.svg" className='absolute object-cover top-0 left-0 bottom-0 z-0 w-full h-full' alt="" />
          <div className='max-w-7xl mx-auto flex-col md:flex-row items-center justify-between'>
            <div className=''>
              <h4 className='text-2xl font-semibold'>Welcome,<span className='text-3xl'> Oguntunde Victor</span></h4>
              <p className='font-semibold text-lg'>Programme : Bachelor of Science in Electrical and Electronics Engineering</p>
            </div>
            <img className='relative z-10' src="/img/dashboard-header.svg" alt="" />
          </div>
        </div>
      </section> */}

      <section className='bg-gray-50 py-28'>
        <div className='max-w-7xl mx-auto items-center gap-10'>

          <img src="/img/portal-victor.jfif" className=' w-56 h-64 rounded-md shadow' alt="" />
          <div>
            <span className='bg-[#ffbe00] text-xs rounded-sm px-2 py-1 font-bold'>Returning Student</span>
            <h1 className='text-5xl my-2 font-bold'> <span className='uppercase'>Adelakun,</span> Oluwatobiloba Ayomipo</h1>
            <h2 className='text-2xl font-bold'>160403048</h2>
            <div className='flex flex-wrap gap-x-6 gap-y-2 max-w-xl mt-3'>
              <HeaderProfile>
                <label>Faculty:</label>
                <p>Engineering</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Department:</label>
                <p>Electrical and Electronics Engineering</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Gender:</label>
                <p>Male</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Hostel:</label>
                <p>Eni Njoku</p>
              </HeaderProfile>
              <HeaderProfile>
                <label>Year of Admission:</label>
                <p>2018/2019</p>
              </HeaderProfile>
            </div>
            <button className=' px-5 py-3 h-auto mt-6'>
              Download Virtual Card
            </button>
          </div>

        </div>
      </section>
      <section className='max-w-7xl mx-auto px-4'>
        <div className='mt-8 max-w-5xl'>
          <h4 className='font-bold text-2xl mb-2'>Photo Requirements for Unilag Identity Cards</h4>
          <p className='text-[#495057]'>Photos used for ID cards must meet certain requirements. These include requirements concerning dimensions, photo quality, background, appearance, position, facial expression, glasses, lighting and framing.</p>
        </div>

        <div className='my-6'>
          <h4 className='text-lg font-bold '>Dimensions</h4>
          <div className='grid gap-6 grid-cols-1 lg:grid-cols-2 '>
            <div>
              {
                guidelinesArr.map((guideline, index) => (
                  <Guidelines key={index} guideline={guideline} />
                ))
              }
            </div>
            <div>

              {
                guidelines2.map((guideline, index) => (
                  <Guidelines key={index} guideline={guideline} />
                ))
              }
            </div>
          </div>
          <button className='px-12 mt-8'>Continue</button>
        </div>
      </section>
    </Layout>
  );
};


const HeaderProfile = styled.div`
display: flex;
align-items: center;
/* font-size: 14px; */
gap: 5px;
font-weight: 500;
label{
  /* font-weight: 700; */
  color: #908f8f;
}
p{
    font-weight: 600;
    color  : #3d3f45;
    }
`

export default Dashboard;