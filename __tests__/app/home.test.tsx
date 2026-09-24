import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

const renderLoadedHome = async () => {
  render(<Home />);

  return screen.findByRole(
    "heading",
    {
      name: /transformo ideias em sites sistemas e aplicativos de alta performance/i,
    },
    { timeout: 2500 },
  );
};

describe("Home page", () => {
  it("renders the main navigation, hero CTA and project section", async () => {
    await renderLoadedHome();

    expect(screen.getByRole("navigation", { name: /navegação principal/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /fale comigo/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /solicitar orçamento/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /projetos em destaque/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /abrir projeto plataforma saas white label/i })).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: /projetos em destaque/i })).getAllByRole("button", { name: /abrir projeto/i })).toHaveLength(5);
  });

  it("opens and closes a project gallery by keyboard-accessible buttons", async () => {
    const user = userEvent.setup();
    await renderLoadedHome();

    await user.click(screen.getByRole("button", { name: /abrir projeto plataforma saas white label/i }));

    const gallery = screen.getByRole("dialog", { name: /plataforma saas white label/i });
    expect(within(gallery).getAllByAltText("HealthCloud — visão principal")[0]).toHaveAttribute("src", "/images/HealthCloud_01.png");
    const thumbnails = within(gallery).getAllByRole("button", { name: /abrir imagem \d de plataforma saas white label/i });
    expect(thumbnails.map((button) => within(button).getByRole("img").getAttribute("src"))).toEqual(
      [1, 2, 3, 4, 5].map((index) => `/images/HealthCloud_0${index}.png`),
    );
    expect(screen.getByRole("button", { name: /fechar galeria/i })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: /fechar galeria/i }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /plataforma saas white label/i })).not.toBeInTheDocument();
    });
  });

  it("shows the back-to-top button after scroll and scrolls to the top", async () => {
    const user = userEvent.setup();
    await renderLoadedHome();

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 360,
    });
    fireEvent.scroll(window);

    const button = await screen.findByRole("button", { name: /voltar ao topo/i });
    await user.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({ behavior: "smooth", top: 0 });
  });

  it("renders the six solution cards and the accessible technology marquee", async () => {
    await renderLoadedHome();

    const services = screen.getByRole("region", {
      name: /soluções digitais completas para produtos/i,
    });
    const marquee = screen.getByRole("region", { name: /tecnologias principais/i });

    expect(within(services).getAllByRole("article")).toHaveLength(6);
    expect(within(marquee).getAllByRole("listitem")).toHaveLength(22);
    expect(within(services).getByRole("heading", { name: "AI" })).toBeInTheDocument();
    expect(within(services).getByText(/Codex e Claude no VS Code/i)).toBeInTheDocument();
  });

  it("renders the professional timeline and the final contact section", async () => {
    await renderLoadedHome();

    const timeline = screen.getByRole("region", {
      name: /da formação à construção de produtos digitais/i,
    });
    const footer = screen.getByRole("contentinfo", {
      name: /vamos construir o que vem a seguir/i,
    });

    expect(within(timeline).getAllByRole("article")).toHaveLength(5);
    expect(within(timeline).getByRole("link", { name: /vamos conversar/i })).toHaveAttribute(
      "href",
      "#contato",
    );
    expect(within(footer).getByRole("link", { name: /enviar e-mail para wesley farias/i })).toHaveAttribute(
      "href",
      "mailto:wesleyfariasbe@gmail.com",
    );
    expect(within(footer).getByText(/engenheiro de software/i)).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /baixar currículo/i })).toHaveAttribute(
      "href",
      "/curriculo-wesley-farias.pdf",
    );
    expect(document.querySelectorAll("footer")).toHaveLength(1);
  });
});
