"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Send,
  Briefcase,
  GraduationCap,
  Award,
  Menu,
  X,
  Download,
  ExternalLink,
} from "lucide-react";

const projectsData = [
  {
    title: "Organon - Domine seu tempo",
    image: "/images/projects/organon.png",
    description:
      "Aplicativo completo de organização (To-Do, Calendário, Hábitos, Diário e Projetos)",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Firebase"],
    category: ["Destaques", "Web"],
    repoLink: "https://github.com/renancmd/organon",
    liveLink: "https://organon-red.vercel.app",
  },
  {
    title: "Vrum - (Em Desenvolvimento)",
    image: "/images/projects/vrum.png",
    description:
      "Aplicação web completa de um E-commerce para venda e compra de carros",
    technologies: ["NextJS", "Tailwind", "SpringBoot", "Docker", "PostgreSQL"],
    category: ["Destaques", "Web"],
    repoLink: "https://github.com/renancmd/vrum",
    liveLink: "https://meu-app-clima.com",
  },
  {
    title: "FridgeEasy - Faculdade",
    image: "/images/projects/fridgeeasy.png",
    description:
      "Aplicação web completa com reconhecimento de imagem por IA (Inteligência Artificial) para criação e procura de receitas.",
    technologies: ["HTML", "CSS", "JavaScript", "Java", "Spark", "PostgreSQL"],
    category: ["Destaques", "Web"],
    repoLink: "https://github.com/renancmd/fridge-easy",
    liveLink: "https://github.com/renancmd/fridge-easy",
  },
  {
    title: "My Organizer",
    image: "/images/projects/my-organizer.png",
    description:
      "Aplicação web full stack. To-Do App com autenticação segura usando RestAPI, JWT e Bcrypt.",
    technologies: ["NextJS", "Java", "SpringBoot", "Docker", "PostgreSQL"],
    category: ["Destaques", "Web"],
    repoLink: "https://github.com/renancmd/my-organizer-server",
    liveLink: "https://my-organizer-client.vercel.app/sign-in",
  },
  {
    title: "Verde Diff - Faculdade",
    image: "/images/projects/verde-diff.png",
    description:
      "Comparador de Saídas para o questões do Verde - PUC Minas (Verde Diff)",
    technologies: ["Python"],
    category: ["Destaques", "GUI/CLI"],
    repoLink: "https://github.com/renancmd/verde-diff",
    liveLink: "https://github.com/renancmd/verde-diff",
  },
  {
    title: "Procura Cine",
    image: "/images/projects/procura-cine.jpeg",
    description:
      "Consome uma API para exibir informações de filmes para que usuários possam decidir o que assistir",
    technologies: ["NexJS", "TypeScript", "SASS"],
    category: ["Destaques", "Web"],
    repoLink: "https://github.com/renancmd/procura-cine",
    liveLink: "https://procura-cine.vercel.app/",
  },
  {
    title: "Unboredom",
    image: "/images/projects/unboredom.png",
    description:
      "Aplicação web de mini jogos para jogar quando estiver entediado.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: ["Web"],
    repoLink: "https://github.com/renancmd/unboredom",
    liveLink: "https://unboredom.vercel.app/",
  },
  {
    title: "Jogo da cobrinha",
    image: "/images/projects/python-logo.png",
    description:
      "Clássico jogo da cobrinha, projeto para estudar POO em python.",
    technologies: "Python, Turtle",
    category: ["GUI/CLI"],
    repoLink: "https://github.com/renancmd/snake-game",
    liveLink: "https://github.com/renancmd/snake-game",
  },
  {
    title: "Advinhe o estado (USA)",
    image: "/images/projects/python-logo.png",
    description:
      "Mini game para tentar advinhar os 50 estados dos Estados Unidos.",
    technologies: "Python, Turtle",
    category: ["GUI/CLI"],
    repoLink: "https://github.com/renancmd/us-state-game",
    liveLink: "https://github.com/renancmd/us-state-game",
  },
  {
    title: "Cross turle, cross!",
    image: "/images/projects/python-logo.png",
    description:
      "Game simples estilo Crossy road para treinar uso de bibliotecas python.",
    technologies: "Python, Turtle",
    category: ["GUI/CLI"],
    repoLink: "https://github.com/renancmd/turtle-crossing-game",
    liveLink: "https://github.com/renancmd/turtle-crossing-game",
  },
];

export default function PortfolioPage() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado para o filtro de projetos
  const [activeFilter, setActiveFilter] = useState("Destaques");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus("Mensagem enviada com sucesso!");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        setFormStatus(
          errorData.error ||
            "Falha ao enviar a mensagem. Por favor, tente novamente."
        );
      }
    } catch {
      setFormStatus("Ocorreu um erro. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#sobre-mim", label: "Sobre mim" },
    { href: "#projetos", label: "Projetos" }, // Link adicionado
    { href: "#contato", label: "Contato" },
  ];

  // Filtra os projetos com base na aba ativa
  const filteredProjects = projectsData.filter((project) =>
    project.category.includes(activeFilter)
  );

  return (
    <div className="bg-gray-900 text-gray-100 font-sans antialiased">
      {/* ===== HEADER ===== */}
      <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-cyan-400">
            Renan
          </a>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <nav className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-cyan-400 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ===== SEÇÃO HOME ===== */}
        <section
          id="home"
          className="min-h-screen flex items-center bg-gray-900"
        >
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
              Renan <span className="text-cyan-400">Mendes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Ciência da Computação
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              <a
                href="https://www.linkedin.com/in/renan-mendes-vieira-de-carvalho/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
              >
                <Linkedin size={32} />
              </a>
              <a
                href="https://github.com/renancmd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
              >
                <Github size={32} />
              </a>
            </div>
            {/* ===== NOVOS BOTÕES ===== */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#contato"
                className="bg-cyan-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                Entre em Contato
              </a>
              <a
                href="Renan (Currículo) - Virtual.pdf"
                download="curriculo-renan.pdf"
                className="border border-cyan-500 text-cyan-500 font-bold py-3 px-8 rounded-full hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Download size={20} /> Baixar Currículo
              </a>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO SOBRE MIM ===== */}
        <section id="sobre-mim" className="py-20 bg-gray-800">
          {/* ... (código da seção sobre mim permanece o mesmo) ... */}
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Sobre Mim</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
                <Briefcase size={40} className="text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Habilidades</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>React & Next.js</li>
                  <li>TypeScript & JavaScript</li>
                  <li>Spark & SpringBoot</li>
                  <li>Java & Python</li>
                  <li>PostgreSQL & Firebase</li>
                  <li>Engenharia de Software & Métodologia Ágil</li>
                  <li>Engenharia de requistos & BPMN</li>
                  <li>SCRUM & Modelagem de Banco de Dados</li>
                </ul>
              </div>
              <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
                <GraduationCap size={40} className="text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Educação</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    <strong>Ciência da Computação</strong>
                    <br />
                    PUC Minas (2024 - Atualmente)
                  </p>
                  <p>
                    <strong>CS50 2025 - Havard</strong>
                    <br />
                    Curso intensivo da Universidade de Harvard (2025)
                  </p>
                  <p>
                    <strong>AWS Cloud</strong>
                    <br />
                    AWS Educate - Em andamento
                  </p>
                </div>
              </div>
              <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
                <Award size={40} className="text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Certificados</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    <strong>Inglês</strong>
                    <br />
                    <a
                      href="https://www.cambly.com/en/certificate/verify/ac3c8d84?lang=en"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cambly
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== NOVA SEÇÃO DE PROJETOS ===== */}
        <section id="projetos" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">
              Meus Projetos
            </h2>

            {/* Filtros */}
            <div className="flex justify-center gap-4 mb-12">
              {["Destaques", "Web", "GUI/CLI"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`font-semibold py-2 px-6 rounded-full transition-colors duration-300 ${activeFilter === filter ? "bg-cyan-500 text-gray-900" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Grid de Projetos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <Image
                    src={project.image}
                    alt={`Imagem do projeto ${project.title}`}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(Array.isArray(project.technologies)
                        ? project.technologies
                        : project.technologies.split(",")
                      ).map((tech) => (
                        <span
                          key={tech.trim()}
                          className="bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                      >
                        <Github size={20} /> Repositório
                      </a>
                      {project.liveLink !== "#" && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                        >
                          <ExternalLink size={20} /> Visualizar
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO CONTATO ===== */}
        <section id="contato" className="py-20 bg-gray-800">
          {/* ... (código da seção de contato permanece o mesmo) ... */}
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4">
              Vamos Conversar?
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Envie uma mensagem e retornarei em breve.
            </p>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Seu email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-gray-900 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                  placeholder="nome@email.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="bg-gray-900 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                  placeholder="Preciso de um desenvolvedor"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Sua mensagem
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-gray-900 border border-gray-600 text-gray-100 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                  placeholder="Escreva sua mensagem aqui..."
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cyan-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Mensagem <Send className="ml-2" size={18} />
                    </>
                  )}
                </button>
                {formStatus && (
                  <p
                    className={`mt-4 text-sm ${formStatus.includes("sucesso") ? "text-green-400" : "text-red-400"}`}
                  >
                    {formStatus}
                  </p>
                )}
              </div>
            </form>
            <div className="flex justify-center space-x-6 mt-16">
              <a
                href="https://www.linkedin.com/in/renan-mendes-vieira-de-carvalho/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
              >
                <Linkedin size={32} />
              </a>
              <a
                href="https://github.com/renancmd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
              >
                <Github size={32} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ===== RODAPÉ ===== */}
      <footer className="bg-gray-900 py-6">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Renan. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
