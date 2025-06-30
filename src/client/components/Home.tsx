import { Calendar } from "@client/components/Calendar";
import { Header } from "@client/components/Header";

export const Home = () => {
  return (
    <main className="layout">
      <Header />
      <Calendar />
    </main>
  );
};
