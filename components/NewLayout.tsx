// import Footer from "./Footer"

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
