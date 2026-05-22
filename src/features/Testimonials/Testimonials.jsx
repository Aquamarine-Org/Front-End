import { TestimonialsColumn } from "@/features/TestimonialsColumn/TestimonialsColumn.jsx";
import { motion } from "motion/react";

import styles from "./Testimonials.module.css";

const testimonials = [
  {
    text: "Depois que instalamos a Aquamarine, conseguimos identificar um vazamento invisível que estava aumentando nossa conta havia meses. O alerta chegou no celular antes do problema virar prejuízo.",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    name: "Mariana Souza",
    role: "Arquiteta",
  },
  {
    text: "O aplicativo é muito simples de usar. Em poucos minutos consegui acompanhar o consumo da casa inteira e entender exatamente onde estávamos desperdiçando água.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Ricardo Almeida",
    role: "Engenheiro Civil",
  },
  {
    text: "Viajo bastante a trabalho e sempre tinha medo de acontecer algum vazamento enquanto estivesse fora. Hoje consigo monitorar tudo remotamente e fechar o registro pelo celular.",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    name: "Fernanda Lima",
    role: "Analista Financeira",
  },
  {
    text: "A instalação foi mais simples do que imaginei. O sistema começou a monitorar o consumo imediatamente e os relatórios ajudaram muito no controle da conta de água.",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "Carlos Henrique",
    role: "Administrador",
  },
  {
    text: "O recurso de alertas inteligentes realmente faz diferença. Recebemos uma notificação de consumo anormal durante a madrugada e evitamos um grande desperdício.",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    name: "Juliana Martins",
    role: "Empresária",
  },
  {
    text: "O histórico de consumo trouxe uma visão que eu nunca tive sobre minha casa. Agora consigo identificar padrões e economizar de forma muito mais consciente.",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    name: "Eduardo Ribeiro",
    role: "Consultor de TI",
  },
  {
    text: "Como síndico, a Aquamarine trouxe muito mais transparência para o condomínio. Os relatórios ajudam bastante nas assembleias e na prestação de contas.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    name: "Paulo Mendes",
    role: "Síndico Profissional",
  },
  {
    text: "Além de reduzir desperdício, o sistema passa uma sensação real de segurança. Saber que posso agir rapidamente em uma emergência muda completamente a experiência.",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    name: "Camila Rocha",
    role: "Designer de Interiores",
  },
  {
    text: "A proposta é moderna, mas o que mais gostei foi a praticidade. Tudo é muito intuitivo e os alertas realmente ajudam a evitar surpresas na conta.",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    name: "André Ferreira",
    role: "Empresário",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>O que nossos usuários dizem</h2>

          <p className={styles.description}>
            Veja o que nossos clientes dizem sobre nós.
          </p>
        </motion.div>

        <div className={styles.columns}>
          <TestimonialsColumn testimonials={firstColumn} duration={15} />

          <TestimonialsColumn
            testimonials={secondColumn}
            className={styles.hiddenMd}
            duration={19}
          />

          <TestimonialsColumn
            testimonials={thirdColumn}
            className={styles.hiddenLg}
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
