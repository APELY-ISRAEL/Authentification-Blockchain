import Image from "next/image";
import { Inter } from 'next/font/google'
import { Navbar } from "@/components/ui/Navbar";
import Provider from "@/components/Provider";
import { Banniere } from "@/components/ui/banniere";
import { Footer } from "@/components/ui/footer";
import { Form } from "@/components/ui/form";

const inter = Inter({ subsets: ['latin'] })
// export default function Home() {
//   return (
//     <div className="flex justify-center items-center ">
//       <Form/>
//     </div>
//   )
//    }

   export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className={inter.className}>
        <Provider {...Navbar}>
        
        </Provider>
          <Banniere/>
          <Footer/>
        </body>
       
      </html>
    )
  }
  
