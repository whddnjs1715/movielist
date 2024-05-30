import { ReactNode } from "react";
import Header from 'components/header/header';
import Footer from 'components/footer/footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}