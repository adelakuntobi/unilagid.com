// import Footer from "./Footer"

import Head from "next/head"

export const getCurrentYear = () => {
  return new Date().getFullYear()
}
export const getExpiry = () => {
  const d = new Date()
  const month = d.getMonth() + 1
  const year = d.getFullYear() + 3
  const lastNumberOfYear = year.toString().slice(-2)
  return `${month < 10 ? `0${month}` : month}/${lastNumberOfYear}`
}

export default function AuthLayout(props: { children: any }) {

  const { children } = props


  return (
    <>
      <Head>
        <title>Studentify</title>
        <link rel="shortcut icon" href="/img/logo.svg" type="image/x-icon" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='z-40 items-center justify-between flex-col px-4 onboard lg:py-10 '>
        {children}
      </div>
      {/* <div>
        2022, toni
      </div> */}
      {/* <Footer /> */}
      <footer className="py-6 container  mx-auto">
        @2023
      </footer>
    </>
  )
}
