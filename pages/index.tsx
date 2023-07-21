import Logo from '@/components/Logo'
import Head from 'next/head'
import Image from 'next/image'
import { AiOutlineUserAdd } from "react-icons/ai"
import { TbCloudUpload } from "react-icons/tb"
import { HiOutlineCreditCard } from "react-icons/hi"
import { BsSendPlus } from "react-icons/bs"
import Link from 'next/link'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { motion } from "framer-motion"
import 'react-accessible-accordion/dist/fancy-example.css';
import styled from 'styled-components'

export default function Home() {
  const features = [
    {
      icon: AiOutlineUserAdd,
      heading: "Easily register an account",
      desc: "This may involve providing personal information such as your name, student ID number, and email address."
    },
    {
      icon: TbCloudUpload,
      heading: "Upload all required information",
      desc: "As a Student, you’ll need to provide all required information that meets our platform's specifications."
    },
    {
      icon: HiOutlineCreditCard,
      heading: "Verify your Identity in one step",
      desc: "Provide additional inform like your JAMB Reg Number. This is to help us verify that you are who you say you are."
    },
    {
      icon: BsSendPlus,
      heading: "Review Credentials and Submit",
      desc: "Upon completed of all necessary steps, review to ensure that all the information is accurate and complete."
    },
  ];
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible
  };

  return (
    <div>
      <Head>
        <title>Studentify</title>
        <link rel="shortcut icon" href="/img/logo.svg" type="image/x-icon" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className='min-h-screen bg-[#FEF3F2]'>

        <img src="/img/bg-pattern.svg" className='w-full h-full absolute left-0 object-cover opacity-60' alt="" />
        <nav className='bg-[#fef3f2] z-10 relative'>
          <div className='items-center justify-between gap-3 container py-6'>

            <Logo />
            <ul className='!hidden md:!flex items-center gap-10'>
              <li>Home</li>
              <li>About</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>

            <Link href="/login">
              <button className='px-6 md:px-12'>Create card</button>
            </Link>

          </div>
        </nav>
        <div className='items-center justify-center px-4  text-center gap-8 mx-auto z-[10] relative max-w-5xl' style={{ height: "calc(100vh - 192px)" }}>
          <div className='hidden md:block'>
            <motion.img
              initial={{ y: -10 }}
              animate={{ y: 10 }}
              transition={{
                type: "smooth",
                repeatType: "mirror",
                duration: 2,
                repeat: Infinity,
              }}
              src='/img/student1.png' alt="" />
            <img className='relative -left-11 my-5' src='/img/arrow.svg' alt="" />
            <motion.img
              initial={{ y: 10 }}
              animate={{ y: -10 }}
              transition={{
                type: "linear",
                repeatType: "mirror",
                duration: 2,
                repeat: Infinity,
              }}
              className='relative left-11 my-5' src='/img/student2.png' alt="" />
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 1 } }}
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}

            className='items-center justify-center flex-col px-0 md:px-4 max-w-5xl text-center gap-4 mx-auto z-[10] relative'>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible
              }}
              className='other-font text-4xl md:text-6xl font-medium text-center text-[#101828]'>
              Studying at <span className='bg-[#FFBE00] rounded-full px-3'>Unilag?</span> <br />
              Create your Student ID</motion.h1>
            <motion.p variants={itemVariants} className='text-[#333333] text-sm md:text-xl'>No more waiting for hours in the school office or standing long queues. Simply upload your photo and fill out your information</motion.p>
            <Link href="/login" className='w-full'>
              <motion.button variants={itemVariants}
              // initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.6 },
              }}
              whileTap={{ scale: 0.9 }}
              // whileInView={{ opacity: 1 }}
               className='w-full mx-auto md:w-auto px-14'>Get Started</motion.button>
            </Link>
          </motion.div>


          <div className='hidden md:block'>
            <motion.img
               initial={{ y: -10 }}
              animate={{ y: 10 }}
              transition={{
                type: "smooth",
                repeatType: "mirror",
                duration: 2,
                repeat: Infinity,
              }}
            src='/img/student3.png' alt="" />
            <img className='relative -right-11 my-8' src='/img/arrow2.svg' alt="" />
            <motion.img
               initial={{ y: 10 }}
              animate={{ y: -10 }}
              transition={{
                type: "smooth",
                repeatType: "mirror",
                duration: 2,
                repeat: Infinity,
              }}
            className='relative -left-11 my-5' src='/img/student4.png' alt="" />
          </div>
        </div>
      </header>


      <main className='mb-32'>
        <section className='container !max-w-6xl flex-col-reverse md:flex-row items-center gap-24 py-24'>
          <div className='w-full md:w-6/12'>
            <h3 className='text-3xl md:text-6xl other-font mb-12 font-light'>Create your student ID with just a few clicks.</h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {
                features.map((feature, index) => (
                  <div key={index} className='rounded-[14px] p-6' style={{
                    border: "1.7119px solid #E8E8E8"
                  }}
                  >
                    <div className='bg-[#E8F2EE] w-10 h-10 rounded-full grid place-items-center mb-4'>
                      <feature.icon className='text-xl text-[#219653]' />
                    </div>
                    <h4 className='text-base md:text-lg font-medium mb-1.5'>{feature.heading}</h4>
                    <p className='text-sm md:text-base'>{feature.desc}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <img src="/img/phone-mockup.svg" alt="" />
        </section>
        <section className='py-24 mb-24 bg-[#FFFBFA]'>
          <div className='container !max-w-6xl '>
            <h3 className='text-5xl other-font mb-12 text-center mx-auto !font-light'>Commonly Asked<br /> Questions</h3>
            {/* FAQ */}
            <Accordion>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    What is this ID creation platform for ?
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    Exercitation in fugiat est ut ad ea cupidatat ut in
                    cupidatat occaecat ut occaecat consequat est minim minim
                    esse tempor laborum consequat esse adipisicing eu
                    reprehenderit enim.
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    How do I receive my student ID after creating it?
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    In ad velit in ex nostrud dolore cupidatat consectetur
                    ea in ut nostrud velit in irure cillum tempor laboris
                    sed adipisicing eu esse duis nulla non.
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    What should I do if I encounter problems or errors?
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    In ad velit in ex nostrud dolore cupidatat consectetur
                    ea in ut nostrud velit in irure cillum tempor laboris
                    sed adipisicing eu esse duis nulla non.
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    How do I register for an account?
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    In ad velit in ex nostrud dolore cupidatat consectetur
                    ea in ut nostrud velit in irure cillum tempor laboris
                    sed adipisicing eu esse duis nulla non.
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </section>


        <section className='bg-[#219653] text-white container !max-w-7xl flex-col-reverse md:flex-col items-center rounded-none md:rounded-3xl gap-x-24 gap-y-6 lg:!px-32'>
          <div className='flex flex-col gap-2 items-start pb-10 md:pb-0'>
            <h3 className='text-3xl md:text-5xl leading-tight '>One app.<br />
              All Processes.</h3>
            <p className='mb-5 text-sm md:text-lg'>Enjoy the ease of ID creation. Benefits include convenience, efficiency, cost-effectiveness, customization, security, sustainability, and accessibility.</p>
            <Link href="/login">
              <button className='px-14 bg-white text-black font-bold border-none'>Get Started</button>
            </Link>
          </div>
          <img className=' rounded-t-[53px] mt-20' src='/img/app-mockup.svg' alt="" />

        </section>

      </main>

      <footer className='bg-[#101828] rounded-t-[52px] text-white pt-5 '>
        <div className="container">
          <div className='grid gap-6 grid-cols-2 md:grid-cols-5 py-16'>
            <div className='col-span-3'>
              <div className='items-center gap-2 '>
                <img src='/img/logo.svg' alt="" />
                <p className='uppercase text-[#fff] leading-none font-bold'>
                  University <br /> of Lagos
                </p>
              </div>
            </div>
            <div>
              <FooterUls>
                <li>OFFICIAL CONTACT</li>
                <li><a href="http://unilag.edu.ng">unilag.edu.ng</a></li>
                <li><a href="tel:+234 507 364 616">+234 507 364 616</a></li>
              </FooterUls>
            </div>
            <div>
              <FooterUls>
                <li>For enquiries</li>
                <li> <a href="mailto:hello@unilag.edu.ng">hello@unilag.edu.ng</a></li>
                <li><a href="tel:+234 507 364 616">+234 507 364 616</a></li>
              </FooterUls>
            </div>
          </div>
          <div className='flex-col items-center justify-between !text-[#eeececb2] font-bold gap-x-6 gap-y-3 py-6'>
            <small>&copy; 2023 UNILAG. All rights reserved</small>
            <div className='items-center gap-4 md:gap-8'>

              <small>Terms and conditions</small>
              <small>Privacy Policy</small>
              <small>Cookie policy</small>
            </div>
          </div>
        </div>

      </footer>

    </div>
  )
}


const FooterUls = styled.ul`
  li{
    font-weight: 400;
    font-size: 18.0228px;
    line-height: 32px;
    letter-spacing: -0.379502px;
    color: #FFFCF9;

    &:first-of-type{
      letter-spacing: -0.316251px;
      text-transform: uppercase;
      color: rgba(238, 236, 236, 0.7);
      margin-bottom: 6px;
    }

    @media (max-width: 1024px) { 
      font-size: 16px;
      line-height: 24px;
    }	
  }


`
